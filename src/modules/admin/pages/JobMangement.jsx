import { useState } from "react";
import { initialJobs, PAGE_SIZE } from "../services/JobMockData";
import { useMemo } from "react";
import JobsFilters from "../components/JobsFilters";
import JobsTable from "../components/JobsTable";
import JobStatsCards from "../components/JobStatsCards";
import JobDetailsModal from "../components/JobDetailsModal";

export default function JobMangement() {
  const [jobs, setJobs] = useState(initialJobs);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  //calculating
  const stats = useMemo(() => {
    const count = (status) =>
      jobs.filter((job) => job.status === status).length;
    const pending = count("pending");
    const approved = count("approved");
    const rejected = count("rejected");
    const total = jobs.length;

    return {
      pending,
      approved,
      rejected,
      total,
      pendingPercentage: total ? (pending / total) * 100 : 0,
      approvedPercentage: total ? (approved / total) * 100 : 0,
      rejectedPercentage: total ? (rejected / total) * 100 : 0,
      totalPercentage: total ? (total / total) * 100 : 0,
    };
  }, [jobs]);

  const counts = {
    all: stats.total,
    approved: stats.approved,
    rejected: stats.rejected,
    pending: stats.pending,
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return jobs.filter(
      (job) =>
        (tab === "all" || job.status === tab) &&
        (!q || job.title.toLowerCase().includes(q)) &&
        (!date || job.date === date),
    );
  }, [jobs, tab, search, date]);

  const rows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  const updateStatus = (id, status) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job)),
    );

    setSelected(null);
  };
  console.log(stats);
  return (
    <>
      <div className="flex flex-col gap-6">
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
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          onReview={setSelected}
        />
        {selected && (
          <JobDetailsModal
            job={selected}
            onClose={() => setSelected(null)}
            onActivate={(id) => updateStatus(id, "activated")}
            onReject={(id) => updateStatus(id, "rejected")}
          />
        )}
      </div>
    </>
  );
}
