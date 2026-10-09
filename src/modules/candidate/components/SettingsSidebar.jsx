import { useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineUserCircle,
  HiOutlineBell,
  HiOutlineDocumentText,
  HiOutlineEye,
  HiOutlineChatBubbleLeftRight,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineChartBar,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useAuth } from "../../../context/AuthContext";
import { logout as logoutRequest } from "../../auth/services/authApi";

export const SETTINGS_TABS = [
  {
    id: "profile",
    label: "My Profile",
    icon: HiOutlineUserCircle,
    kind: "tab",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: HiOutlineBell,
    kind: "navigate",
    to: "/candidate/notifications",
  },
  {
    id: "resume",
    label: "Resume & Documents",
    icon: HiOutlineDocumentText,
    kind: "tab",
  },
  {
    id: "privacy",
    label: "Privacy & Visibility",
    icon: HiOutlineEye,
    kind: "placeholder",
  },
  {
    id: "messages",
    label: "Messages",
    icon: HiOutlineChatBubbleLeftRight,
    kind: "placeholder",
  },
  {
    id: "preferences",
    label: "Job Preferences",
    icon: HiOutlineAdjustmentsHorizontal,
    kind: "placeholder",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: HiOutlineChartBar,
    kind: "navigate",
    to: "/candidate/analytics",
  },
];

function getInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function SettingsSidebar({ activeTab, onChangeTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, clearSession } = useAuth();

  const handleItemClick = (tab) => {
    if (tab.kind === "navigate") {
      navigate(tab.to);
      return;
    }
    if (tab.kind === "tab") {
      onChangeTab(tab.id);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutRequest();
    } catch {
    }
    clearSession();
    navigate("/");
  };

  const displayName = user?.name ?? "Candidate";
  const displayRole = user?.candidateProfile?.headline ?? "Job Seeker";
  const displayLocation = user?.candidateProfile?.location ?? "Earth";

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-gray-900/80 to-gray-900" />
        <div className="relative p-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-xl font-bold text-white ring-2 ring-white">
                {getInitials(displayName)}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-white">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.3 3.3 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-white">
                {displayName}
              </p>
              <p className="truncate text-xs text-gray-200">{displayRole}</p>
              <p className="mt-0.5 text-[10px] text-gray-300">
                📍 {displayLocation}
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <ul className="py-2">
          {SETTINGS_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.kind === "tab" && tab.id === activeTab;
            const isPlaceholder = tab.kind === "placeholder";
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => handleItemClick(tab)}
                  disabled={isPlaceholder}
                  className={[
                    "flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition",
                    isActive
                      ? "border-l-4 border-violet-600 bg-violet-50 text-violet-700"
                      : "border-l-4 border-transparent text-gray-600 hover:bg-gray-50",
                    isPlaceholder ? "cursor-not-allowed opacity-50" : "",
                  ].join(" ")}
                  title={isPlaceholder ? "Coming soon" : tab.label}
                >
                  <Icon className="h-4 w-4" />
                  <span className="flex-1 text-left">{tab.label}</span>
                  {isPlaceholder && (
                    <span className="text-[10px] text-gray-400">Soon</span>
                  )}
                </button>
              </li>
            );
          })}

          <li className="my-1 border-t border-gray-100" />
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 border-l-4 border-transparent px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
