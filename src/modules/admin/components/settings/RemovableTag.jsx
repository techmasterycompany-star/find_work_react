// =====================================================================
// RemovableTag — small pill with an X button
// ---------------------------------------------------------------------
// Used for Report Categories and Blocked Words. Clicking the X calls
// onRemove with the tag's id.
// =====================================================================

import { HiOutlineXMark } from 'react-icons/hi2';

export default function RemovableTag({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#F4F4F5] px-3 py-1.5 text-[12px] font-medium text-[#27272A]">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="flex h-4 w-4 items-center justify-center rounded text-[#A1A1AA] transition hover:bg-[#E4E4E7] hover:text-[#52525B]"
      >
        <HiOutlineXMark className="h-3 w-3" />
      </button>
    </span>
  );
}
