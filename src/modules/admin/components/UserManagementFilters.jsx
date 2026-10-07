import { HiOutlineMagnifyingGlass, HiOutlineChevronDown, HiOutlineCalendarDays } from 'react-icons/hi2';

const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'Employer', label: 'Employers' },
  { value: 'Candidate', label: 'Candidates' },
  { value: 'Admin', label: 'Admins' },
];

export default function UserManagementFilters({ search, onSearchChange, type, onTypeChange }) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Search */}
      <div className="flex h-[48px] w-[327px] items-center gap-3 rounded-[8px] border border-[#D4D4D8] bg-[#FAFAFA] px-4">
        <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0 text-[#A1A1AA]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name..."
          className="w-full bg-transparent text-[12px] text-[#27272A] outline-none placeholder:text-[#A1A1AA]"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {/* Type dropdown — real, controlled */}
        <div className="relative">
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="flex h-[48px] min-w-[126px] cursor-pointer appearance-none items-center justify-between gap-3 rounded-[8px] border border-[#D4D4D8] bg-white px-4 pr-9 text-[12px] text-[#52525B] outline-none hover:border-[#A1A1AA]"
          >
            {TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <HiOutlineChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#71717A]" />
        </div>

        {/* Status dropdown — visual placeholder (future enhancement) */}
        <button
          type="button"
          className="flex h-[48px] min-w-[126px] items-center justify-between gap-3 rounded-[8px] border border-[#D4D4D8] bg-white px-4 text-[12px] text-[#52525B] opacity-70"
        >
          <span>All Statuses</span>
          <HiOutlineChevronDown className="h-4 w-4 text-[#71717A]" />
        </button>

        {/* Date — visual placeholder */}
        <button
          type="button"
          className="flex h-[48px] min-w-[135px] items-center justify-between gap-2 rounded-[8px] border border-[#D4D4D8] bg-white px-4 text-[12px] text-[#52525B] opacity-70"
        >
          <span className="flex items-center gap-2">
            <HiOutlineCalendarDays className="h-4 w-4 text-[#71717A]" />
            Filter by date
          </span>
          <HiOutlineChevronDown className="h-4 w-4 text-[#71717A]" />
        </button>
      </div>
    </div>
  );
}
