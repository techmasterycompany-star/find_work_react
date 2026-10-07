// =====================================================================
// ModerationSettings — container with Controls / Reports tabs
// ---------------------------------------------------------------------
// Owns the active-tab state and the shared settings hook. The two tab
// panels are lazy-rendered so toggles in one tab don't remount the
// other (avoids losing in-progress edits).
// =====================================================================

import { useState } from 'react';
import SettingsBreadcrumb from '../../components/settings/SettingsBreadcrumb';
import SettingsTabs from '../../components/settings/SettingsTabs';
import ModerationControlsTab from '../../components/settings/ModerationControlsTab';
import ModerationReportsTab from '../../components/settings/ModerationReportsTab';
import { useModerationSettings } from '../../hooks/settings/useModerationSettings';

const TABS = [
  { key: 'controls', label: 'Controls' },
  { key: 'reports', label: 'Reports' },
];

export default function ModerationSettings() {
  const [tab, setTab] = useState('controls');
  const moderation = useModerationSettings();

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb + Save */}
      <div className="flex items-center justify-between">
        <SettingsBreadcrumb items={[{ label: 'Setting' }, { label: 'Moderation' }]} />
        <div className="flex items-center gap-3">
          {moderation.saved && (
            <span className="text-[13px] font-medium text-[#22C55E]">
              ✓ Saved successfully
            </span>
          )}
          <button
            type="button"
            onClick={moderation.save}
            className="rounded-lg bg-[#7C3AED] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#6D28D9]"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <SettingsTabs tabs={TABS} value={tab} onChange={setTab} />

      {/* Tab panel */}
      {tab === 'controls' ? (
        <ModerationControlsTab
          settings={moderation.settings.controls}
          setControl={moderation.setControl}
        />
      ) : (
        <ModerationReportsTab
          settings={moderation.settings.reports}
          setReport={moderation.setReport}
          setReportNested={moderation.setReportNested}
          addTag={moderation.addTag}
          removeTag={moderation.removeTag}
        />
      )}
    </div>
  );
}
