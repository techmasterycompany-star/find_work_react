// =====================================================================
// JobManagement — wired to /admin/reviewjobs + /admin/approve + /admin/reject
// ---------------------------------------------------------------------
// The original page kept `initialJobs` in useState and updated status
// locally. Now:
//   - jobs come from useReviewJobs() (react-query)
//   - approve/reject call the real mutations
//   - on success, react-query invalidates ['admin','review-jobs'] so
//     the table refreshes automatically.
//
// The child components (JobStatsCards, JobsFilters, JobsTable,
// JobDetailsModal) are kept untouched — they receive the same shape
// of props they had before.
// =====================================================================

import { useMemo, useState } from 'react';
import JobsFilters from '../components/JobsFilters';
import JobsTable from '../components/JobsTable';
import JobStatsCards from '../components/JobStatsCards';
import JobDetailsModal from '../components/JobDetailsModal';
import { useApproveJob, useRejectJob, useReviewJobs } from '../hooks/useAdminQueries';
import { toJobRow } from '../services/adminAdapters';

const PAGE_SIZE = 10;

export default function JobMangement() {
  // ----- Data -----
  const { data: rawJobs = [], isLoading, isError, error } = useReviewJobs();
  const approveMutation = useApproveJob();
  const rejectMutation = useRejectJob();

  // ----- UI state (same as original) -----
  const [tab, setTab] = useState('all'); // all | pending | approved | rejected
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  // ----- Adapt backend → UI shape -----
  const jobs = useMemo(() => rawJobs.map(toJobRow), [rawJobs]);

  // ----- Stats -----
  const stats = useMemo(() => {
    const count = (status) => jobs.filter((j) => j.status === status).length;
    const pending = count('pending');
    const approved = count('approved');
    const rejected = count('rejected');
    const total = jobs.length;
    return {
      pending,
      approved,
      rejected,
      total,
      pendingPercentage: total ? (pending / total) * 100 : 0,
      approvedPercentage: total ? (approved / total) * 100 : 0,
      rejectedPercentage: total ? (rejected / total) * 100 : 0,
      totalPercentage: 100,
    };
  }, [jobs]);

  const counts = {
    all: stats.total,
    approved: stats.approved,
    rejected: stats.rejected,
    pending: stats.pending,
  };

  // ----- Filter + paginate -----
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (tab === 'all' || j.status === tab) &&
        (!q || j.title.toLowerCase().includes(q)) &&
        (!date || j.submittedAt === date),
    );
  }, [jobs, tab, search, date]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  // ----- Mutations -----
  const handleApprove = (jobId) => {
    approveMutation.mutate(jobId, {
      onSuccess: () => setSelected(null),
      onError: () => {
        /* keep modal open so the admin sees the failure */
      },
    });
  };

  const handleReject = (jobId) => {
    rejectMutation.mutate(jobId, {
      onSuccess: () => setSelected(null),
    });
  };

  const mutatingId = approveMutation.variables ?? rejectMutation.variables;

  return (
    <div className="flex flex-col gap-6">
      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load jobs pending review: {error?.message ?? 'unknown error'}
        </div>
      )}

      <JobStatsCards stats={stats} onSelect={withReset(setTab)} />

      <JobsFilters
        tab={tab}
        counts={counts}
        onTabChange={withReset(setTab)}
        search={search}
        onSearchChange={withReset(setSearch)}
        date={date}
        onDateChange={withReset(setDate)}
      />

      <JobsTable
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
        <JobDetailsModal
          job={selected}
          onClose={() => setSelected(null)}
          onActivate={(id) => handleApprove(id)}
          onReject={(id) => handleReject(id)}
          isApproving={approveMutation.variables === selected.id}
          isRejecting={rejectMutation.variables === selected.id}
          approveError={approveMutation.error?.response?.data?.message}
          rejectError={rejectMutation.error?.response?.data?.message}
        />
      )}
    </div>
  );
}
