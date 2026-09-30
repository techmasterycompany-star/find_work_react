import {
  HiOutlineMagnifyingGlass,
  HiOutlineChevronDown,
  HiOutlineCalendarDays,
} from "react-icons/hi2";

export default function UserManagementFilters() {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Search */}
      <div className="flex h-[48px] w-[327px] items-center gap-3 rounded-[8px] border border-[#D4D4D8] bg-[#FAFAFA] px-4">
        <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0 text-[#A1A1AA]" />

        <input
          type="text"
          placeholder="Search by name..."
          className="w-full bg-transparent text-[12px] text-[#27272A] outline-none placeholder:text-[#A1A1AA]"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-[48px] min-w-[126px] items-center justify-between gap-3 rounded-[8px] border border-[#D4D4D8] bg-white px-4 text-[12px] text-[#52525B]"
        >
          <span>All Statuses</span>
          <HiOutlineChevronDown className="h-4 w-4 text-[#71717A]" />
        </button>

        <button
          type="button"
          className="flex h-[48px] min-w-[112px] items-center justify-between gap-3 rounded-[8px] border border-[#D4D4D8] bg-white px-4 text-[12px] text-[#52525B]"
        >
          <span>User Type</span>
          <HiOutlineChevronDown className="h-4 w-4 text-[#71717A]" />
        </button>

        <button
          type="button"
          className="flex h-[48px] min-w-[135px] items-center justify-between gap-2 rounded-[8px] border border-[#D4D4D8] bg-white px-4 text-[12px] text-[#52525B]"
        >
          <span className="flex items-center gap-2">
            <HiOutlineCalendarDays className="h-4 w-4 text-[#71717A]" />
            May 28, 2026
          </span>

          <HiOutlineChevronDown className="h-4 w-4 text-[#71717A]" />
        </button>
      </div>
    </div>
  );
}
