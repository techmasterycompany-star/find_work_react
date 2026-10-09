import { useState } from "react";
import SettingsSidebar, { SETTINGS_TABS } from "../components/SettingsSidebar";
import ProfileTab from "../components/ProfileTab";
import ResumeTab from "../components/ResumeTab";

function ComingSoon({ title, message }) {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
        <span className="text-violet-600 text-xl font-bold">!</span>
      </div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}

export default function CandidateSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account, preferences and privacy
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <SettingsSidebar activeTab={activeTab} onChangeTab={setActiveTab} />

        <div className="flex-1">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "resume" && <ResumeTab />}
          {activeTab === "privacy" && (
            <ComingSoon
              title="Privacy & Visibility"
              message="This section is coming soon. Backend support is in progress."
            />
          )}
          {activeTab === "messages" && (
            <ComingSoon
              title="Messages"
              message="This section is coming soon. Backend support is in progress."
            />
          )}
          {activeTab === "preferences" && (
            <ComingSoon
              title="Job Preferences"
              message="This section is coming soon. Backend support is in progress."
            />
          )}
        </div>
      </div>
    </div>
  );
}

export { SETTINGS_TABS };
