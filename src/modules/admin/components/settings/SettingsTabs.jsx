// =====================================================================
// SettingsTabs — segmented control for the Moderation page
// ---------------------------------------------------------------------
// Renders a horizontal tab bar. `tabs` is an array of { key, label }.
// `value` is the active tab key; `onChange` receives the new key.
// =====================================================================

export default function SettingsTabs({ tabs, value, onChange }) {
  return (
    <div className="flex h-[55px] items-center rounded-xl bg-[#F4F4F5] px-4">
      <div className="flex h-[42px] items-center gap-6">
        {tabs.map((tab) => {
          const active = tab.key === value;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChange(tab.key)}
              className={`flex h-[42px] items-center justify-center gap-2 rounded-lg px-4 text-[16px] transition ${
                active
                  ? 'bg-[#FAFAFA] font-bold text-[#7C3AED] shadow-[0_0_4px_rgba(0,0,0,0.25)]'
                  : 'font-medium text-[#52525B] hover:text-[#27272A]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
