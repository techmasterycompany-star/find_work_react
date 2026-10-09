import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { HiOutlineMoon } from "react-icons/hi";
import { HiOutlineLanguage } from "react-icons/hi2";
import { useAuth } from "../context/AuthContext";
import { logout as logoutRequest } from "../modules/auth/services/authApi";
import NotificationsBell from "../modules/employer/components/NotificationsBell";
import CandidateNotificationsBell from "../modules/candidate/components/CandidateNotificationsBell";

const NAV_CONFIG = {
  guest: {
    links: [
      { label: "Home", to: "/", end: true },
      { label: "Find Jobs", to: "/find-jobs" },
      { label: "Companies", to: "/companies" },
      { label: "About Us", to: "/about" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  employer: {
    links: [
      { label: "Home", to: "/employer", end: true },
      { label: "Post a Job", to: "/employer/posting" },
      { label: "Candidates", to: "/employer/candidatespage" },
      { label: "Companies", to: "/companies" },
      { label: "About Us", to: "/about" },
      { label: "Pricing", to: "/employer/pricing" },
    ],
    menu: [
      { label: "Company Profile", to: "/employer" },
      { label: "Analytics", to: "/employer/analytics" },
      { label: "My Jobs", to: "/employer/posting" },
      { label: "Notifications", to: "/employer/notifications" },
      { label: "Settings", to: "/employer/settings" },
    ],
  },
  candidate: {
    links: [
      { label: "Home", to: "/candidate", end: true },
      { label: "Find Jobs", to: "/candidate/find-jobs" },
      { label: "Companies", to: "/companies" },
      { label: "About Us", to: "/about" },
      { label: "Pricing", to: "/candidate/pricing" },
    ],
    menu: [
      { label: "Analytics", to: "/candidate/analytics" },
      { label: "Saved Jobs", to: "/candidate/saved" },
      { label: "Settings", to: "/candidate/settings" },
      { label: "Log Out", to: "__logout__" },
    ],
  },
};

export default function Navbar() {
  const { isAuthenticated, role, user, clearSession } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const config = isAuthenticated
    ? (NAV_CONFIG[role] ?? NAV_CONFIG.guest)
    : NAV_CONFIG.guest;
  const displayName =
    user?.companyName ||
    user?.name ||
    (role === "employer" ? "Employer" : "Candidate");

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await logoutRequest();
    } catch {
    } finally {
      clearSession();
      navigate("/");
    }
  };

  return (
    <header className="flex items-center justify-between w-full h-22 px-20 py-5 border-b border-zinc-200 bg-white">
      <Link to="/" className="flex items-center gap-1 font-bold text-zinc-900">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 text-white text-sm">
          J4
        </span>
        Job<span className="text-violet-600">4U</span>
      </Link>

      <nav>
        <ul className="flex items-center gap-1">
          {config.links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {({ isActive }) => (
                <li
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? "text-violet-600"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {link.label}
                </li>
              )}
            </NavLink>
          ))}
        </ul>
      </nav>

      {!isAuthenticated ? (
        <Link
          to="/auth/login"
          className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700"
        >
          Log In
        </Link>
      ) : (
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="h-12 w-12 rounded-xl flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
          >
            <HiOutlineMoon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Language"
            className="h-12 w-12 rounded-xl flex items-center justify-center text-zinc-600 hover:bg-zinc-100"
          >
            <HiOutlineLanguage className="h-5 w-5" />
          </button>
          {role === "employer" ? (
            <NotificationsBell />
          ) : (
            <CandidateNotificationsBell />
          )}

          <span className="px-3 text-sm text-zinc-500 border-l border-zinc-200 ml-2">
            {role === "employer" ? "Employer" : "Candidate"}
          </span>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl hover:bg-zinc-100"
            >
              <span className="h-8 w-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-semibold">
                {displayName[0]}
              </span>
              <span className="text-sm font-medium text-zinc-800">
                {displayName}
              </span>
              <svg
                viewBox="0 0 24 24"
                className={`h-4 w-4 text-zinc-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="m6 9 6 6 6-6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-14 w-52 rounded-xl border border-zinc-200 bg-white shadow-lg overflow-hidden z-50">
                {config.menu.map((item) =>
                  item.to === "__logout__" ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-semibold text-red-600 hover:bg-zinc-50 border-b border-zinc-100"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-3 text-sm text-zinc-700 hover:bg-zinc-50 border-b border-zinc-100"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}