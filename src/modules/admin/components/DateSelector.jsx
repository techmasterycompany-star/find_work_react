import {
  HiOutlineCalendarDays,
  HiOutlineChevronDown,
} from "react-icons/hi2";

export default function DateSelector() {
  return (
    <button
      type="button"
      className="flex h-[40px] w-[194px] items-center justify-center gap-3 rounded-lg border border-[#C1C5CD] bg-white px-4"
    >
      <HiOutlineCalendarDays className="h-6 w-6 text-[#141B34]" />

      <span className="text-[14px] font-medium leading-[17px] text-[#52525B]">
        August 2026
      </span>

      <HiOutlineChevronDown className="h-5 w-5 text-[#4A4F5A]" />
    </button>
  );
}