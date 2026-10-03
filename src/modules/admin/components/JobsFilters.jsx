import { FiCalendar, FiSearch } from "react-icons/fi";

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "pending" },
  { key: "approved", label: "approved" },
  { key: "rejected", label: "Rejected" },
];

export default function JobsFilters({
  tab,
  counts,
  onTabChange,
  search,
  onSearchChange,
  date,
  onDateChange,
}) {
  return (
    <div className="flex items-center justify-between gap-6">
      {/* Segments */}
      <div className="flex h-[55px] items-center gap-8 rounded-xl bg-[#F4F4F5] px-4">
        {TABS.map(({ key, label }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              className={`flex h-[42px] items-center justify-center gap-2 rounded-lg px-3 text-base ${
                active
                  ? "bg-[#FAFAFA] font-bold text-[#7C3AED] shadow-[0_0_4px_rgba(0,0,0,0.25)]"
                  : "font-medium text-zinc-600"
              }`}
            >
              {label}
              <span
                className={`min-w-[18px] rounded-sm px-1 text-center text-xs ${
                  active
                    ? "bg-[#DDD6FE] font-bold text-[#7C3AED]"
                    : "bg-[#DFE1E6] text-zinc-600"
                }`}
              >
                {counts[key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search + date */}
      <div className="flex items-center gap-4">
        <label className="flex h-12 w-[327px] items-center gap-3 rounded-lg border border-zinc-300 bg-[#FAFAFA] px-5">
          <FiSearch size={20} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by Job name"
            className="w-full bg-transparent text-sm text-zinc-800 outline-none placeholder:text-gray-400"
          />
        </label>

        <label className="flex h-10 w-[194px] cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 bg-[#FAFAFA] px-4">
          <FiCalendar size={20} className="shrink-0 text-[#4A4F5A]" />
          <input
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-zinc-600 outline-none"
          />
        </label>
      </div>
    </div>
  );
}
