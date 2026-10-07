// =====================================================================
// ModerationControlsTab — Frame 2 (toggle cards)
// ---------------------------------------------------------------------
// Two collapsible cards:
//   1. Job Approval — 3 toggles
//   2. Review & Comment Moderation — 4 toggles
// =====================================================================

import SettingsCard, { SettingsRow } from './SettingsCard';
import ToggleSwitch from './ToggleSwitch';

export default function ModerationControlsTab({ settings, setControl }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Job Approval */}
      <SettingsCard
        title="Job Approval"
        description="Control how jobs are reviewed and approved before appearing on the platform."
      >
        <SettingsRow
          title="Require approval for new jobs"
          description="Review and approve new job posts before they are published."
        >
          <ToggleSwitch
            checked={settings.jobApprovalRequired}
            onChange={(v) => setControl('jobApprovalRequired', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Require re-approval after editing"
          description="Review edited jobs before the changes are published."
        >
          <ToggleSwitch
            checked={settings.jobEditReApproval}
            onChange={(v) => setControl('jobEditReApproval', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Automatically flag suspicious jobs"
          description="Flag jobs that may contain suspicious or inappropriate content for review."
        >
          <ToggleSwitch
            checked={settings.autoFlagSuspiciousJobs}
            onChange={(v) => setControl('autoFlagSuspiciousJobs', v)}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Review & Comment Moderation */}
      <SettingsCard
        title="Review & Comment Moderation"
        description="Control how reviews and comments are reviewed, flagged and managed for inappropriate content."
      >
        <SettingsRow
          title="Require review approval"
          description="Review user reviews before they are published."
        >
          <ToggleSwitch
            checked={settings.reviewApprovalRequired}
            onChange={(v) => setControl('reviewApprovalRequired', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Require comment approval"
          description="Review comments before they appear publicly."
        >
          <ToggleSwitch
            checked={settings.commentApprovalRequired}
            onChange={(v) => setControl('commentApprovalRequired', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Allow users to report reviews"
          description="Let users report reviews that violate platform guidelines."
        >
          <ToggleSwitch
            checked={settings.allowReportReviews}
            onChange={(v) => setControl('allowReportReviews', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Allow users to report comments"
          description="Let users report inappropriate or harmful comments."
        >
          <ToggleSwitch
            checked={settings.allowReportComments}
            onChange={(v) => setControl('allowReportComments', v)}
          />
        </SettingsRow>
      </SettingsCard>
    </div>
  );
}
