import { FiArrowUpRight } from "react-icons/fi";

const GRADIENT = "bg-[linear-gradient(180deg,#2E1658_0%,#632FBE_100%)]";

function Notch({ dark }) {
  return (
    <span className="absolute right-0 top-0 flex size-[46px] items-center justify-center rounded-bl-[22px] bg-[#FAFAFA]">
      <span
        className={`flex size-9 items-center justify-center rounded-full ${
          dark
            ? GRADIENT + " text-white"
            : "border border-[#F5F3FF] bg-white text-zinc-600"
        }`}
      >
        <FiArrowUpRight size={16} />
      </span>
    </span>
  );
}

export default function JobStatsCards({ stats, onSelect }) {
  const fmt = (n) => n.toLocaleString("en-US");

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Pending (highlighted) */}
      <button
        type="button"
        onClick={() => onSelect("all")}
        className={`relative h-[156px] overflow-hidden rounded-lg p-6 text-left text-zinc-200 ${GRADIENT}`}
      >
        <Notch dark />
        <p className="text-xs">Total Jobs</p>
        <p className="mt-5 text-2xl font-semibold">{fmt(stats.total)}</p>
        <div className="flex items-center gap-1 pt-5">
          <span className="text-[14px] font-medium text-[#22C55E]">
            {fmt(stats.totalPercentage)}%
          </span>
          <span className="text-[14px] text-[#ffffff]">From last week</span>
        </div>
      </button>

      <StatCard
        label="Pending Approval"
        labelclass="text-[#FCA108]"
        value={fmt(stats.pending)}
        caption="of all jobs"
        captionClass="text-[#22C55E]"
        onClick={() => onSelect("pending")}
        stats={stats.pendingPercentage}
      />
      <StatCard
        label="Approved"
        labelclass="text-[#22C55E]"
        value={fmt(stats.approved)}
        onClick={() => onSelect("approved")}
        stats={stats.approvedPercentage}
      />
      <StatCard
        label="Rejected"
        labelclass="text-[#EF4444]"
        value={fmt(stats.rejected)}
        caption="of all jobs"
        captionClass=""
        onClick={() => onSelect("rejected")}
        stats={stats.rejectedPercentage}
      />
    </div>
  );
}

function StatCard({ label,labelclass, value, onClick, stats }) {
  const fmt = (n) => n.toLocaleString("en-US");
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[156px] overflow-hidden rounded-lg bg-white p-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
    >
      <Notch />
      <p className={`text-xs font-medium ${labelclass}`}>{label}</p>
      <p className="mt-5 text-2xl font-semibold text-zinc-600">{value}</p>

      <div className="flex items-center gap-1 pt-5">
        <span className="text-[14px] font-medium text-[#22C55E]">
          {fmt(stats)}%
        </span>
        <span className="text-[14px] text-[#52525B]">of all jobs</span>
      </div>
    </button>
  );
}
