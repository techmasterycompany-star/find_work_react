// =====================================================================
// useModerationSettings — localStorage-backed moderation config
// ---------------------------------------------------------------------
// The Postman collection has NO endpoints for moderation settings, so
// we persist everything to localStorage. When the backend exposes
// /admin/settings/moderation, swap the read/write functions below to
// call the API instead — the rest of the code stays unchanged.
//
// Shape:
//   {
//     controls: {
//       jobApprovalRequired: true,
//       jobEditReApproval: true,
//       autoFlagSuspiciousJobs: true,
//       reviewApprovalRequired: true,
//       commentApprovalRequired: true,
//       allowReportReviews: true,
//       allowReportComments: true,
//     },
//     reports: {
//       autoFlagReportedContent: true,
//       reportCategories: ['Spam', 'Fraud / Scam', ...],
//       blockedWords: ['Spam', 'Fraud / Scam', ...],
//       blockedWordsAppliesTo: { jobs: true, reviews: false, comments: true, profiles: false },
//       blockedWordsAction: { flagForReview: false, blockContent: false },
//       autoHideAfterReports: 3,
//       autoHideEnabled: true,
//       autoFlagUsersAfterReports: 3,
//       autoFlagUsersEnabled: true,
//     }
//   }
// =====================================================================

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'job4u_admin_moderation_settings';

const DEFAULTS = {
  controls: {
    jobApprovalRequired: true,
    jobEditReApproval: true,
    autoFlagSuspiciousJobs: true,
    reviewApprovalRequired: true,
    commentApprovalRequired: true,
    allowReportReviews: true,
    allowReportComments: true,
  },
  reports: {
    autoFlagReportedContent: true,
    reportCategories: [
      'Spam',
      'Fraud / Scam',
      'Fake Job',
      'Inappropriate Content',
      'Harassment',
      'Misleading Information',
    ],
    blockedWords: [
      'Spam',
      'Fraud / Scam',
      'Fake Job',
      'Inappropriate Content',
      'Harassment',
      'Misleading Information',
    ],
    blockedWordsAppliesTo: {
      jobs: true,
      reviews: false,
      comments: true,
      profiles: false,
    },
    blockedWordsAction: {
      flagForReview: false,
      blockContent: false,
    },
    autoHideAfterReports: 3,
    autoHideEnabled: true,
    autoFlagUsersAfterReports: 3,
    autoFlagUsersEnabled: true,
  },
};

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    // Deep-merge with defaults so new fields don't break old saved data
    return {
      controls: { ...DEFAULTS.controls, ...(parsed.controls ?? {}) },
      reports: { ...DEFAULTS.reports, ...(parsed.reports ?? {}) },
    };
  } catch {
    return DEFAULTS;
  }
}

function writeToStorage(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage might be full or disabled — fail silently, settings are
    // still in memory for the session.
  }
}

export function useModerationSettings() {
  const [settings, setSettings] = useState(readFromStorage);
  const [saved, setSaved] = useState(false);

  // Persist on every change
  useEffect(() => {
    writeToStorage(settings);
  }, [settings]);

  // Update a single toggle in the controls section
  const setControl = useCallback((key, value) => {
    setSettings((prev) => ({
      ...prev,
      controls: { ...prev.controls, [key]: value },
    }));
  }, []);

  // Update a single toggle/value in the reports section
  const setReport = useCallback((key, value) => {
    setSettings((prev) => ({
      ...prev,
      reports: { ...prev.reports, [key]: value },
    }));
  }, []);

  // Add a tag to either reportCategories or blockedWords
  const addTag = useCallback((key, label) => {
    const trimmed = label.trim();
    if (!trimmed) return;
    setSettings((prev) => {
      const list = prev.reports[key] ?? [];
      if (list.includes(trimmed)) return prev; // dedupe
      return {
        ...prev,
        reports: { ...prev.reports, [key]: [...list, trimmed] },
      };
    });
  }, []);

  // Remove a tag from either reportCategories or blockedWords
  const removeTag = useCallback((key, label) => {
    setSettings((prev) => {
      const list = prev.reports[key] ?? [];
      return {
        ...prev,
        reports: { ...prev.reports, [key]: list.filter((t) => t !== label) },
      };
    });
  }, []);

  // Update a nested toggle inside reports (e.g. blockedWordsAppliesTo.jobs)
  const setReportNested = useCallback((group, key, value) => {
    setSettings((prev) => ({
      ...prev,
      reports: {
        ...prev.reports,
        [group]: { ...prev.reports[group], [key]: value },
      },
    }));
  }, []);

  // "Save Changes" button — since we already persist to localStorage on
  // every change, this just flashes a "Saved!" indicator. When the real
  // backend exists, this is where the POST /admin/settings/moderation
  // call would go.
  const save = useCallback(() => {
    writeToStorage(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [settings]);

  return {
    settings,
    setControl,
    setReport,
    addTag,
    removeTag,
    setReportNested,
    save,
    saved,
  };
}
