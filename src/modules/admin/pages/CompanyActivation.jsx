import { useState, useMemo } from "react";
import StatsCards from "../components/StatsCards";
import ActivationFilters from "../components/ActivationFilters";
import CompaniesTable from "../components/CompaniesTable";
import CompanyDetailsModal from "../components/CompanyDetailsModal";
import { initialCompanies, PAGE_SIZE } from "../services/mockData";

export default function CompanyActivation() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [tab, setTab] = useState("all"); // all | pending | activated | rejected
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const stats = useMemo(() => {
    const count = (s) => companies.filter((c) => c.status === s).length;
    return {
      pending: count("pending"),
      activated: count("activated"),
      rejected: count("rejected"),
      total: companies.length,
    };
  }, [companies]);

  const counts = {
    all: stats.total,
    activated: stats.activated,
    rejected: stats.rejected,
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return companies.filter(
      (c) =>
        (tab === "all" || c.status === tab) &&
        (!q || c.name.toLowerCase().includes(q)) &&
        (!date || c.submittedAt === date),
    );
  }, [companies, tab, search, date]);

  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Any filter change goes back to page 1
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const updateStatus = (id, status) => {
    // TODO: replace with API call (axios / react-query mutation)
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
    setSelected(null);
  };

  return (
    <div className="flex flex-col gap-6">
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
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        onReview={setSelected}
      />

      {selected && (
        <CompanyDetailsModal
          company={selected}
          onClose={() => setSelected(null)}
          onActivate={(id) => updateStatus(id, "activated")}
          onReject={(id) => updateStatus(id, "rejected")}
        />
      )}
    </div>
  );
}
