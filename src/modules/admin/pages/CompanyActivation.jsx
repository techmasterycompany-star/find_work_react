import { useMemo, useState } from 'react';
import StatsCards from '../components/StatsCards';
import ActivationFilters from '../components/ActivationFilters';
import CompaniesTable from '../components/CompaniesTable';
import CompanyDetailsModal from '../components/CompanyDetailsModal';
import { useActivateUser, useAdminUsers, useSuspendUser } from '../hooks/useAdminQueries';
import { toCompanyRow } from '../services/adminAdapters';

const PAGE_SIZE = 10;

export default function CompanyActivation() {

  const { data: rawUsers = [], isLoading, isError, error } = useAdminUsers();
  const activateMutation = useActivateUser();
  const suspendMutation = useSuspendUser();

  const [tab, setTab] = useState('all'); 
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);


  const companies = useMemo(() => {
    return rawUsers
      .filter((u) => u.role === 'employer')
      .map(toCompanyRow);
  }, [rawUsers]);

  const stats = useMemo(() => {
    const count = (s) => companies.filter((c) => c.status === s).length;
    return {
      pending: count('pending'),
      activated: count('activated'),
      rejected: count('rejected'),
      total: companies.length,
    };
  }, [companies]);

  const counts = {
    all: stats.total,
    activated: stats.activated,
    rejected: stats.rejected,
    pending: stats.pending,
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return companies.filter(
      (c) =>
        (tab === 'all' || c.status === tab) &&
        (!q || c.name.toLowerCase().includes(q)) &&
        (!date || c.submittedAt === date),
    );
  }, [companies, tab, search, date]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  
  const handleActivate = (companyId) => {
    activateMutation.mutate(companyId, {
      onSuccess: () => setSelected(null),
    });
  };

  const handleReject = (companyId) => {
    suspendMutation.mutate(companyId, {
      onSuccess: () => setSelected(null),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load companies: {error?.message ?? 'unknown error'}
        </div>
      )}

      <StatsCards stats={stats} onSelect={withReset(setTab)} />

      <ActivationFilters
        tab={tab}
        counts={counts}
        onTabChange={withReset(setTab)}
        search={search}
        onSearchChange={withReset(setSearch)}
        date={date}
        onDateChange={withReset(setDate)}
      />

      <CompaniesTable
        rows={rows}
        total={filtered.length}
        page={safePage}
        pageSize={PAGE_SIZE}
        totalPages={totalPages}
        onPageChange={setPage}
        onReview={setSelected}
        isLoading={isLoading}
      />

      {selected && (
        <CompanyDetailsModal
          company={selected}
          onClose={() => setSelected(null)}
          onActivate={handleActivate}
          onReject={handleReject}
          isActivating={activateMutation.variables === selected.id}
          isRejecting={suspendMutation.variables === selected.id}
          activateError={activateMutation.error?.response?.data?.message}
          rejectError={suspendMutation.error?.response?.data?.message}
        />
      )}
    </div>
  );
}
