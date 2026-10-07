// =====================================================================
// ModerationReportsTab — Frames 3 + 4 combined
// ---------------------------------------------------------------------
// Four sections:
//   1. General reporting toggles (4 toggles)
//   2. Report Categories (removable tags + add new)
//   3. Blocked Words (tags + "Applies To" toggles + Action checkboxes)
//   4. Automatic Actions (number steppers + toggles)
// =====================================================================

import { useState } from 'react';
import SettingsCard, { SettingsRow } from './SettingsCard';
import ToggleSwitch from './ToggleSwitch';
import RemovableTag from './RemovableTag';
import NumberStepper from './NumberStepper';
import { HiOutlinePlus, HiOutlinePencil } from 'react-icons/hi2';

export default function ModerationReportsTab({
  settings,
  setReport,
  setReportNested,
  addTag,
  removeTag,
}) {
  const [newCategory, setNewCategory] = useState('');
  const [newWord, setNewWord] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    addTag('reportCategories', newCategory);
    setNewCategory('');
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.trim()) return;
    addTag('blockedWords', newWord);
    setNewWord('');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Section 1: General reporting toggles */}
      <SettingsCard
        title="General"
        description="Control how reported content is handled on the platform."
      >
        <SettingsRow
          title="Require comment approval"
          description="Review comments before they appear publicly."
        >
          <ToggleSwitch
            checked={settings.commentApprovalRequired ?? false}
            onChange={(v) => setReport('commentApprovalRequired', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Allow users to report reviews"
          description="Let users report reviews that violate platform guidelines."
        >
          <ToggleSwitch
            checked={settings.allowReportReviews ?? true}
            onChange={(v) => setReport('allowReportReviews', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Allow users to report comments"
          description="Let users report inappropriate or harmful comments."
        >
          <ToggleSwitch
            checked={settings.allowReportComments ?? true}
            onChange={(v) => setReport('allowReportComments', v)}
          />
        </SettingsRow>

        <SettingsRow
          title="Automatically flag reported content"
          description="Automatically flag content when it receives a user report for admin review."
        >
          <ToggleSwitch
            checked={settings.autoFlagReportedContent}
            onChange={(v) => setReport('autoFlagReportedContent', v)}
          />
        </SettingsRow>
      </SettingsCard>

      {/* Section 2: Report Categories */}
      <SettingsCard
        title="Report Categories"
        description="Manage the reasons users can select when reporting content."
        actions={
          <button
            type="button"
            aria-label="Edit categories"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#52525B] transition hover:bg-[#F4F4F5]"
          >
            <HiOutlinePencil className="h-4 w-4" />
          </button>
        }
      >
        <div className="py-4">
          {/* Existing tags */}
          <div className="flex flex-wrap gap-2">
            {settings.reportCategories.length === 0 && (
              <p className="text-[13px] text-[#A1A1AA]">
                No categories yet. Add one below.
              </p>
            )}
            {settings.reportCategories.map((cat) => (
              <RemovableTag
                key={cat}
                label={cat}
                onRemove={() => removeTag('reportCategories', cat)}
              />
            ))}
          </div>

          {/* Add new category */}
          <form onSubmit={handleAddCategory} className="mt-4 flex gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name..."
              className="h-10 flex-1 rounded-lg border border-[#D4D4D8] bg-white px-4 text-[14px] text-[#27272A] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#7C3AED]"
            />
            <button
              type="submit"
              className="flex h-10 items-center gap-1.5 rounded-lg border border-[#7C3AED] px-4 text-[14px] font-medium text-[#7C3AED] transition hover:bg-[#F5F3FF]"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Add
            </button>
          </form>
        </div>
      </SettingsCard>

      {/* Section 3: Blocked Words */}
      <SettingsCard
        title="Blocked Words"
        description="Add a word or phrase that should be flagged or blocked."
        actions={
          <button
            type="button"
            aria-label="Edit blocked words"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#52525B] transition hover:bg-[#F4F4F5]"
          >
            <HiOutlinePencil className="h-4 w-4" />
          </button>
        }
      >
        <div className="py-4">
          {/* Existing words */}
          <div className="flex flex-wrap gap-2">
            {settings.blockedWords.length === 0 && (
              <p className="text-[13px] text-[#A1A1AA]">
                No blocked words yet. Add one below.
              </p>
            )}
            {settings.blockedWords.map((word) => (
              <RemovableTag
                key={word}
                label={word}
                onRemove={() => removeTag('blockedWords', word)}
              />
            ))}
          </div>

          {/* Add new word */}
          <form onSubmit={handleAddWord} className="mt-4 flex gap-2">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="New blocked word..."
              className="h-10 flex-1 rounded-lg border border-[#D4D4D8] bg-white px-4 text-[14px] text-[#27272A] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#7C3AED]"
            />
            <button
              type="submit"
              className="flex h-10 items-center gap-1.5 rounded-lg border border-[#7C3AED] px-4 text-[14px] font-medium text-[#7C3AED] transition hover:bg-[#F5F3FF]"
            >
              <HiOutlinePlus className="h-4 w-4" />
              Add
            </button>
          </form>

          {/* Applies To */}
          <div className="mt-6 rounded-lg border border-[#F0F0F2] p-4">
            <h4 className="text-[14px] font-semibold text-[#27272A]">Applies To</h4>
            <p className="mt-1 text-[12px] text-[#71717A]">
              Choose where the blocked word should be detected:
            </p>

            <div className="mt-3 divide-y divide-[#F0F0F2]">
              {['jobs', 'reviews', 'comments', 'profiles'].map((key) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-3"
                >
                  <span className="text-[13px] font-medium capitalize text-[#27272A]">
                    {key}
                  </span>
                  <ToggleSwitch
                    checked={settings.blockedWordsAppliesTo[key]}
                    onChange={(v) =>
                      setReportNested('blockedWordsAppliesTo', key, v)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="mt-4 rounded-lg border border-[#F0F0F2] p-4">
            <h4 className="text-[14px] font-semibold text-[#27272A]">Action</h4>
            <p className="mt-1 text-[12px] text-[#71717A]">
              Choose what happens when a blocked word is detected:
            </p>

            <div className="mt-3 flex flex-col gap-2">
              <label className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={settings.blockedWordsAction.flagForReview}
                  onChange={(e) =>
                    setReportNested(
                      'blockedWordsAction',
                      'flagForReview',
                      e.target.checked,
                    )
                  }
                  className="h-4 w-4 rounded border-[#D4D4D8] text-[#7C3AED] focus:ring-[#7C3AED]"
                />
                <span className="text-[13px] text-[#27272A]">Flag for review</span>
              </label>
              <label className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  checked={settings.blockedWordsAction.blockContent}
                  onChange={(e) =>
                    setReportNested(
                      'blockedWordsAction',
                      'blockContent',
                      e.target.checked,
                    )
                  }
                  className="h-4 w-4 rounded border-[#D4D4D8] text-[#7C3AED] focus:ring-[#7C3AED]"
                />
                <span className="text-[13px] text-[#27272A]">Block content</span>
              </label>
            </div>
          </div>
        </div>
      </SettingsCard>

      {/* Section 4: Automatic Actions */}
      <SettingsCard
        title="Automatic actions"
        description="Configure automated responses based on report thresholds."
      >
        <SettingsRow
          title="Automatically hide content after receiving reports"
          description="Automatically flag content when it receives a user report for admin review."
        >
          <div className="flex items-center gap-3">
            <NumberStepper
              value={settings.autoHideAfterReports}
              onChange={(v) => setReport('autoHideAfterReports', v)}
            />
            <ToggleSwitch
              checked={settings.autoHideEnabled}
              onChange={(v) => setReport('autoHideEnabled', v)}
            />
          </div>
        </SettingsRow>

        <SettingsRow
          title="Automatically flag users after receiving reports"
          description="Automatically flag users when they receive a certain number of reports."
        >
          <div className="flex items-center gap-3">
            <NumberStepper
              value={settings.autoFlagUsersAfterReports}
              onChange={(v) => setReport('autoFlagUsersAfterReports', v)}
            />
            <ToggleSwitch
              checked={settings.autoFlagUsersEnabled}
              onChange={(v) => setReport('autoFlagUsersEnabled', v)}
            />
          </div>
        </SettingsRow>
      </SettingsCard>
    </div>
  );
}
