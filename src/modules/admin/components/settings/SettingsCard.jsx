// =====================================================================
// SettingsCard — collapsible card with header (title + description)
// ---------------------------------------------------------------------
// Used in the Moderation page. Header shows title, description, and a
// chevron that toggles the body open/closed. Body holds the settings
// rows (passed as children).
// =====================================================================

import { useState } from 'react';
import { HiOutlineChevronUp, HiOutlineChevronDown } from 'react-icons/hi2';

export default function SettingsCard({
  title,
  description,
  children,
  defaultOpen = true,
  actions,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-lg border border-[#E4E4E7] bg-white">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 py-5">
        <div className="flex-1">
          <h3 className="text-[16px] font-semibold leading-[19px] text-[#27272A]">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-[12px] leading-[15px] text-[#71717A]">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {actions}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Collapse section' : 'Expand section'}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#71717A] transition hover:bg-[#F4F4F5]"
          >
            {open ? (
              <HiOutlineChevronUp className="h-5 w-5" />
            ) : (
              <HiOutlineChevronDown className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Divider */}
      {open && <div className="h-px w-full bg-[#F0F0F2]" />}

      {/* Body */}
      {open && <div className="px-6 py-2">{children}</div>}
    </section>
  );
}

// A single row inside a SettingsCard: title + description on the left,
// control (toggle, checkbox, etc.) on the right.
export function SettingsRow({ title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex-1">
        <p className="text-[13px] font-medium leading-[16px] text-[#27272A]">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-[12px] leading-[15px] text-[#71717A]">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
