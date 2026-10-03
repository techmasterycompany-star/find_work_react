import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineMoon,
  HiOutlineBell,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import { useAuth } from "../../../context/AuthContext";

export default function AdminHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const pageTitle =
    location.pathname === "/admin/users"
      ? "User Management"
      : location.pathname === "/admin"
        ? "Overview" 
        : location.pathname === "/admin/jobs"
        ? "Job Management"
        : "Admin Dashboard";

  const name = user?.name || "Ahmed Ibrahim";
  const email = user?.email || "ahmed@example.com";

  return (
    <header className="flex h-[114px] w-full items-center bg-white px-6">
      <div className="flex h-[66px] w-full items-center justify-between gap-8">
        {/* ================= LEFT ================= */}
        <div className="flex h-[66px] w-[177px] flex-col justify-center gap-2">
          <p className="text-[16px] font-semibold leading-[19px] text-[#52525B]">
            Welcome back, {name.split(" ")[0]}
          </p>

          <h1 className="text-[32px] font-bold leading-[39px] text-[#27272A] w-[300px]">
            {pageTitle}
          </h1>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="flex h-[66px] flex-1 items-center justify-end gap-3">
          {/* Search */}
          <div className="flex h-[48px] w-[327px] shrink-0 items-center gap-3 rounded-[8px] border border-[#D4D4D8] bg-[#FAFAFA] px-5">
            <HiOutlineMagnifyingGlass className="h-6 w-6 shrink-0 text-[#141B34]" />

            <input
              type="text"
              placeholder="Search.."
              className="w-full bg-transparent text-[14px] font-normal leading-[17px] text-[#27272A] outline-none placeholder:text-[#9CA3AF]"
            />
          </div>

          {/* Actions */}
          <div className="flex h-[48px] items-center px-2">
            <div className="flex h-[48px] items-center">
              {/* Dark Mode */}
              <button
                type="button"
                className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] text-black transition hover:bg-[#F5F3FF]"
              >
                <HiOutlineMoon className="h-6 w-6" />
              </button>

              {/* Language */}
              <button
                type="button"
                className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] text-black transition hover:bg-[#F5F3FF]"
              >
                <span className="text-[15px] font-medium">AR</span>
              </button>

              {/* Notification */}
              <button
                type="button"
                onClick={() => navigate("/admin/notifications")}
                className="relative flex h-[48px] w-[48px] items-center justify-center rounded-[12px] text-black transition hover:bg-[#F5F3FF]"
              >
                <HiOutlineBell className="h-6 w-6" />

                <span className="absolute right-[4px] top-[4px] flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[12px] font-semibold leading-[15px] text-white">
                  6
                </span>
              </button>
            </div>
          </div>

          {/* ================= PROFILE ================= */}
          <div className="flex h-[66px] w-[261px] shrink-0 items-center rounded-lg bg-white px-4">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex w-full items-center gap-2"
            >
              {/* Avatar */}
              <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#EDE9FE]">
                <span className="text-[13px] font-semibold text-[#6D28D9]">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* User Info */}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 text-left">
                <p className="text-[14px] font-normal leading-[17px] text-[#27272A]">
                  {name}
                </p>

                <p className="truncate text-[12px] font-normal leading-[15px] text-[#A1A1AA]">
                  {email}
                </p>
              </div>

              <HiOutlineChevronDown
                className={`h-[18px] w-[18px] shrink-0 text-[#8D929B] transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-6 top-[90px] z-50 w-52 overflow-hidden rounded-lg border border-[#E4E4E7] bg-white shadow-lg">
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[#F5F3FF]"
                >
                  Profile
                </button>

                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-sm hover:bg-[#F5F3FF]"
                >
                  Settings
                </button>

                <button
                  type="button"
                  className="w-full border-t border-[#E4E4E7] px-4 py-3 text-left text-sm text-[#EF4444] hover:bg-red-50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
