import { NavLink } from "react-router-dom";

import {
  HiOutlineUsers,
  HiOutlineBriefcase,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

import {
  LuLayoutDashboard,
  LuBuilding2,
  LuChartNoAxesColumnIncreasing,
  LuPanelLeftClose,
} from "react-icons/lu";

const mainLinks = [
  {
    label: "Overview",
    to: "/admin",
    icon: LuLayoutDashboard,
    end: true,
  },
  {
    label: "User Management",
    to: "/admin/users",
    icon: HiOutlineUsers,
  },
  {
    label: "Job Management",
    to: "/admin/jobs",
    icon: HiOutlineBriefcase,
  },
  {
    label: "Company activation",
    to: "/admin/companies",
    icon: LuBuilding2,
  },
  {
    label: "Analytics",
    to: "/admin/analytics",
    icon: LuChartNoAxesColumnIncreasing,
  },
];

const bottomLinks = [
  {
    label: "Settings",
    to: "/admin/settings",
    icon: HiOutlineCog6Tooth,
  },
  {
    label: "Help Center",
    to: "/admin/help",
    icon: HiOutlineQuestionMarkCircle,
  },
];

export default function AdminSidebar() {
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
      <div className="space-y-1">
        {bottomLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
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

        <button
          type="button"
          className="flex h-[29px] w-full items-center gap-2 rounded-[7px] px-2.5 text-[10px] font-medium text-[#2D1B49] transition hover:bg-[#B39CEB]"
        >
          <HiOutlineArrowRightOnRectangle className="h-[14px] w-[14px]" />

          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
