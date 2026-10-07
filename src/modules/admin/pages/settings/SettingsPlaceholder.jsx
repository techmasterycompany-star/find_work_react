// =====================================================================
// SettingsPlaceholder — for settings pages without a Figma design yet
// ---------------------------------------------------------------------
// Used by Security, Roles & Permissions, Platform Settings, and Help
// Center. Shows a friendly "coming soon" message so the sidebar links
// don't 404. Replace with the real page when the design is ready.
// =====================================================================

import SettingsBreadcrumb from '../../components/settings/SettingsBreadcrumb';

export default function SettingsPlaceholder({ section }) {
  return (
    <div className="flex flex-col gap-6">
      <SettingsBreadcrumb items={[{ label: 'Setting' }, { label: section }]} />

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-[#D4D4D8] bg-white p-12 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F3FF]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
              stroke="#7C3AED"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-[20px] font-semibold text-[#27272A]">
          {section} — Coming Soon
        </h2>
        <p className="mt-2 max-w-md text-[14px] text-[#71717A]">
          This section hasn't been designed yet. Once the Figma frame is
          ready, we'll build it out. For now, this is a placeholder so the
          sidebar link doesn't lead to a dead end.
        </p>
      </div>
    </div>
  );
}
