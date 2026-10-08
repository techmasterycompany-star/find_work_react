// =====================================================================
// NumberStepper — minus / value / plus control
// ---------------------------------------------------------------------
// Used in the Automatic Actions section of the Reports tab. Lets the
// admin set a threshold (e.g. "auto-hide after 3 reports"). Min value
// is 1, max is 100.
// =====================================================================

import { HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi2';

export default function NumberStepper({ value, onChange, min = 1, max = 100 }) {
  const clamp = (n) => Math.max(min, Math.min(max, n));
  return (
    <div className="flex h-[36px] w-[88px] items-center rounded-lg border border-[#D4D4D8] bg-white">
      <button
        type="button"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= min}
        aria-label="Decrease"
        className="flex h-full w-9 items-center justify-center text-[#52525B] transition hover:bg-[#F4F4F5] disabled:opacity-40"
      >
        <HiOutlineMinus className="h-4 w-4" />
      </button>
      <span className="flex h-full w-10 items-center justify-center border-x border-[#D4D4D8] text-[14px] font-semibold text-[#27272A]">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= max}
        aria-label="Increase"
        className="flex h-full w-9 items-center justify-center text-[#52525B] transition hover:bg-[#F4F4F5] disabled:opacity-40"
      >
        <HiOutlinePlus className="h-4 w-4" />
      </button>
    </div>
  );
}
