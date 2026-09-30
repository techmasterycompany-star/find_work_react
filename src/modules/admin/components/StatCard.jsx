import { HiOutlineArrowUpRight, HiOutlineArrowUp } from "react-icons/hi2";

export default function StatCard({
  title,
  value,
  action,
  purple = false,
  percentage,
  subtitle,
}) {
  if (purple) {
    return (
      <div className="relative h-[156px] w-[264px] overflow-hidden rounded-lg bg-gradient-to-b from-[#2E1658] to-[#632FBE]">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-3 -top-3 h-[60px] w-[60px] rounded-full border border-white/5" />
        <div className="pointer-events-none absolute -right-12 top-8 h-[94px] w-[94px] rounded-full border border-dashed border-white/10" />
        <div className="pointer-events-none absolute left-16 top-32 h-[94px] w-[94px] rounded-full border border-dashed border-white/10" />
        <div className="pointer-events-none absolute left-28 top-32 h-[94px] w-[94px] rounded-full border border-dashed border-white/10" />

        {/* Arrow */}
        <button
          type="button"
          className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#2E1658] to-[#632FBE]"
        >
          <HiOutlineArrowUpRight className="h-5 w-5 text-white" />
        </button>

        <div className="absolute left-6 top-6 flex flex-col gap-5">
          <p className="text-[12px] font-normal leading-[15px] text-[#E4E4E7]">
            {title}
          </p>

          <p className="text-[24px] font-semibold leading-[29px] text-[#E4E4E7]">
            {value}
          </p>

          <button
            type="button"
            className="flex items-center gap-2 text-[14px] font-semibold leading-[17px] text-white"
          >
            {action}
            <HiOutlineArrowUpRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[156px] w-[264px] overflow-hidden rounded-lg bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.3)]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-3 -top-3 h-[60px] w-[60px] rounded-full border border-[#F5F3FF]" />

      <button
        type="button"
        className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[#F5F3FF] bg-white"
      >
        <HiOutlineArrowUpRight className="h-5 w-5 text-[#52525B]" />
      </button>

      <div className="absolute left-6 top-6 flex w-[208px] flex-col gap-5">
        <p className="text-[12px] font-normal leading-[15px] text-[#52525B]">
          {title}
        </p>

        <p className="text-[24px] font-semibold leading-[29px] text-[#52525B]">
          {value}
        </p>

        {action ? (
          <button
            type="button"
            className="flex items-center gap-2 text-[14px] font-semibold leading-[17px] text-[#52525B]"
          >
            {action}
            <HiOutlineArrowUpRight className="h-5 w-5" />
          </button>
        ) : (
          <div className="flex items-center gap-1">
            <HiOutlineArrowUp className="h-4 w-4 text-[#22C55E]" />

            <span className="text-[14px] font-normal leading-[17px] text-[#22C55E]">
              {percentage}
            </span>

            <span className="text-[14px] font-normal leading-[17px] text-[#52525B]">
              {subtitle}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}