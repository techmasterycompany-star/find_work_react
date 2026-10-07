// =====================================================================
// AdminHeader — dropdown items now wired to real routes
// ---------------------------------------------------------------------
// Changes:
//   - "Profile"   → navigates to /admin/settings/account
//   - "Settings"  → navigates to /admin/settings
//   - "Log out"   → calls clearSession() + navigates to /admin/login
//
// The dropdown also closes when you click an item or click outside.
// =====================================================================

import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HiOutlineMagnifyingGlass,
  HiOutlineMoon,
  HiOutlineBell,
  HiOutlineChevronDown,
} from 'react-icons/hi2';
import { useAuth } from '../../../context/AuthContext';
import { useAdminNotifications } from '../hooks/useAdminQueries';

export default function AdminHeader() {
  const { user, clearSession } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { data: notifications = [] } = useAdminNotifications();
  const unreadCount = notifications.filter((n) => n.read === false).length;

  const pageTitle =
    location.pathname === '/admin/users'
      ? 'User Management'
      : location.pathname === '/admin'
        ? 'Overview'
        : location.pathname === '/admin/jobs'
          ? 'Job Management'
          : location.pathname === '/admin/companies'
            ? 'Company Activation'
            : location.pathname === '/admin/notifications'
              ? 'Notifications'
              : location.pathname.startsWith('/admin/settings')
                ? 'Settings'
                : 'Admin Dashboard';

  const name = user?.name || 'Ahmed Ibrahim';
  const email = user?.email || 'ahmed@example.com';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfile = () => {
    setOpen(false);
    navigate('/admin/settings/account');
  };

  const handleSettings = () => {
    setOpen(false);
    navigate('/admin/settings');
  };

  const handleLogout = () => {
    setOpen(false);
    clearSession();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="flex h-[114px] w-full items-center bg-white px-6">
      <div className="flex h-[66px] w-full items-center justify-between gap-8">
        {/* ================= LEFT ================= */}
        <div className="flex h-[66px] w-[177px] flex-col justify-center gap-2">
          <p className="text-[16px] font-semibold leading-[19px] text-[#52525B]">
            Welcome back, {name.split(' ')[0]}
          </p>
          <p className="text-[14px] font-normal leading-[17px] text-[#71717A]">
            {pageTitle}
          </p>
        </div>

        {/* ================= CENTER: SEARCH ================= */}
        <div className="flex h-[66px] flex-1 items-center justify-end gap-3">
          <div className="flex h-[48px] w-[327px] items-center gap-3 rounded-[8px] border border-[#D4D4D8] bg-[#FAFAFA] px-4">
            <HiOutlineMagnifyingGlass className="h-5 w-5 shrink-0 text-[#A1A1AA]" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full bg-transparent text-[14px] text-[#27272A] outline-none placeholder:text-[#A1A1AA]"
            />
          </div>

          {/* ================= RIGHT: ICONS ================= */}
          <button
            type="button"
            className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] text-black transition hover:bg-[#F5F3FF]"
          >
            <HiOutlineMoon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/notifications')}
            className="relative flex h-[48px] w-[48px] items-center justify-center rounded-[12px] text-black transition hover:bg-[#F5F3FF]"
          >
            <HiOutlineBell className="h-6 w-6" />
            {unreadCount > 0 && (
              <span className="absolute right-[4px] top-[4px] flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[12px] font-semibold leading-[15px] text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* ================= PROFILE DROPDOWN ================= */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-[66px] w-[261px] shrink-0 items-center rounded-lg bg-white px-4"
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
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-6 top-[90px] z-50 w-52 overflow-hidden rounded-lg border border-[#E4E4E7] bg-white shadow-lg">
                <button
                  type="button"
                  onClick={handleProfile}
                  className="w-full px-4 py-3 text-left text-sm text-[#27272A] transition hover:bg-[#F5F3FF]"
                >
                  Profile
                </button>

                <button
                  type="button"
                  onClick={handleSettings}
                  className="w-full px-4 py-3 text-left text-sm text-[#27272A] transition hover:bg-[#F5F3FF]"
                >
                  Settings
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full border-t border-[#E4E4E7] px-4 py-3 text-left text-sm text-[#EF4444] transition hover:bg-red-50"
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
