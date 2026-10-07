// =====================================================================
// AdminSidebar — updated with expandable Settings accordion
// ---------------------------------------------------------------------
// The Settings item now expands to show 6 sub-items (Account,
// Security, Moderation, Roles & Permissions, Platform Settings, Help
// Center). The accordion auto-expands when the user is on any
// /admin/settings/* route so they can see where they are.
//
// All other sidebar markup (logo, collapse button, main nav, logout)
// is preserved exactly as before.
// =====================================================================

import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineCog6Tooth,
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
  HiOutlineUserCircle,
  HiOutlineFlag,
} from "react-icons/hi2";

import {
  LuLayoutDashboard,
  LuBuilding2,
  LuChartNoAxesColumnIncreasing,
  LuPanelLeftClose,
} from "react-icons/lu";

const mainLinks = [
  { label: "Overview", to: "/admin", icon: LuLayoutDashboard, end: true },
  { label: "User Management", to: "/admin/users", icon: HiOutlineUsers },
  { label: "Job Management", to: "/admin/jobs", icon: HiOutlineBriefcase },
  { label: "Company activation", to: "/admin/companies", icon: LuBuilding2 },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: LuChartNoAxesColumnIncreasing,
  },
];

// Settings sub-items — only the 2 pages that have Figma designs
// (Account = frame 1, Moderation = frames 2-4). Other sections
// (Security, Roles, Platform, Help) are omitted per request.
const settingsSubLinks = [
  {
    label: "Account",
    to: "/admin/settings/account",
    icon: HiOutlineUserCircle,
  },
  {
    label: "Moderation",
    to: "/admin/settings/moderation",
    icon: HiOutlineFlag,
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearSession } = useAuth();

  // Auto-expand the Settings accordion when on any /admin/settings/* route
  const onSettingsRoute = location.pathname.startsWith("/admin/settings");
  const [settingsOpen, setSettingsOpen] = useState(onSettingsRoute);

  const handleLogout = () => {
    clearSession();
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[200px] flex-col bg-[#C6B4F7] px-4 py-6 text-[#24113F]">
      {/* Logo + collapse button */}
      <div className="mb-7 flex items-center justify-between px-1">
        <img
          src="/src/assets/logo.png"
          alt="Job4U"
          className="h-auto w-[48px] object-contain"
        />
        <button
          type="button"
          className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-[#5D3A91] text-[#5D3A91]"
        >
          <LuPanelLeftClose className="h-[11px] w-[11px]" />
        </button>
      </div>

      {/* Divider */}
      <div className="mb-4 h-px w-full bg-[#9E8ACB]" />

      {/* Main navigation */}
      <nav className="flex-1">
        <div className="space-y-1">
          {mainLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex h-[29px] items-center gap-2 rounded-[7px] px-2.5 text-[10px] font-medium transition ${
                    isActive
                      ? "bg-[#9C6CF0] text-[#24113F]"
                      : "text-[#2D1B49] hover:bg-[#B39CEB]"
                  }`
                }
              >
                <Icon className="h-[14px] w-[14px] shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom navigation */}

      {/* Settings accordion */}
      <div>
        <button
          type="button"
          onClick={() => setSettingsOpen((v) => !v)}
          className={`flex h-[29px] w-full items-center gap-2 rounded-[7px] px-2.5 text-[10px] font-medium transition ${
            onSettingsRoute
              ? "bg-[#9C6CF0] text-[#24113F]"
              : "text-[#2D1B49] hover:bg-[#B39CEB]"
          }`}
        >
          <HiOutlineCog6Tooth className="h-[14px] w-[14px] shrink-0" />
          <span className="flex-1 text-left">Settings</span>
          <HiOutlineChevronDown
            className={`h-[10px] w-[10px] shrink-0 transition-transform ${
              settingsOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sub-items */}
        {settingsOpen && (
          <div className="mt-1 space-y-0.5 pl-3">
            {settingsSubLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex h-[26px] items-center gap-2 rounded-[5px] px-2 text-[9px] font-medium transition ${
                      isActive
                        ? "bg-[#9C6CF0] text-[#24113F]"
                        : "text-[#2D1B49] hover:bg-[#B39CEB]"
                    }`
                  }
                >
                  <Icon className="h-[12px] w-[12px] shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <button
          type="button"
          onClick={handleLogout}
          className="flex h-[29px] w-full items-center gap-2 rounded-[7px] px-2.5 text-[10px] font-medium text-[#2D1B49] transition hover:bg-[#B39CEB]"
        >
          <HiOutlineArrowRightOnRectangle className="h-[14px] w-[14px]" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
