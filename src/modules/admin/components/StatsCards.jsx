import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const GRADIENT = "bg-[linear-gradient(180deg,#2E1658_0%,#632FBE_100%)]";

function Notch({ dark }) {
  return (
    <span className="absolute right-0 top-0 flex size-[46px] items-center justify-center rounded-bl-[22px] bg-[#FAFAFA]">
      <span
        className={`flex size-9 items-center justify-center rounded-full ${
          dark ? GRADIENT + " text-white" : "border border-[#F5F3FF] bg-white text-zinc-600"
        }`}
      >
        <FiArrowUpRight size={16} />
      </span>
    </span>
  );
}

export default function StatsCards({ stats, onSelect }) {
  const fmt = (n) => n.toLocaleString("en-US");

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Pending (highlighted) */}
      <button
        type="button"
        onClick={() => onSelect("pending")}
        className={`relative h-[156px] overflow-hidden rounded-lg p-6 text-left text-zinc-200 ${GRADIENT}`}
      >
        <Notch dark />
        <p className="text-xs">Pending Activation</p>
        <p className="mt-5 text-2xl font-semibold">{fmt(stats.pending)}</p>
        <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
          Requires your review <FiArrowRight size={18} />
        </span>
      </button>

      <StatCard
        label="Active Companies"
        value={fmt(stats.activated)}
        caption="Activated companies"
        captionClass="text-[#22C55E]"
        onClick={() => onSelect("activated")}
      />
      <StatCard
        label="Rejected"
        value={fmt(stats.rejected)}
        caption="Rejected companies"
        captionClass="text-[#EF4444]"
        onClick={() => onSelect("rejected")}
      />
      <StatCard
        label="Total Companies"
        value={fmt(stats.total)}
        caption="All companies"
        captionClass="text-zinc-600"
        onClick={() => onSelect("all")}
      />
    </div>
  );
}

function StatCard({ label, value, caption, captionClass, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[156px] overflow-hidden rounded-lg bg-white p-6 text-left shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
    >
      <Notch />
      <p className="text-xs text-zinc-600">{label}</p>
      <p className="mt-5 text-2xl font-semibold text-zinc-600">{value}</p>
      <p className={`mt-5 text-sm font-semibold ${captionClass}`}>{caption}</p>
    </button>
  );
}