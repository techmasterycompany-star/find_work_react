
import { NavLink, Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Find Jobs", to: "/jobs" },
  { label: "Companies", to: "/companies" },
  { label: "About Us", to: "/about" },
  { label: "Pricing", to: "/pricing" },
];

export default function PublicHeader() {
  return (
    <header className="relative h-[70px] w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-[54px]">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={logo}
            alt="Job4U"
            className="h-[40px] w-auto object-contain"
          />
        </Link>

        {/* Navigation - centered */}
        <nav className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 items-center gap-[30px]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex h-full items-center text-[12px] font-medium transition-colors ${
                  isActive
                    ? "text-violet-600"
                    : "text-zinc-800 hover:text-violet-600"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-[9px]">

          {/* Dark mode */}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-800 hover:bg-zinc-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Language */}
          <button
            type="button"
            aria-label="Language"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-medium text-zinc-800 hover:bg-zinc-100"
          >
            En
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-800 hover:bg-zinc-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M10 21h4" strokeLinecap="round" />
            </svg>
          </button>

          {/* Role */}
          <div className="ml-[2px] border-l border-zinc-300 pl-[18px]">
            <span className="text-[12px] font-medium text-zinc-600">
              Employer
            </span>
          </div>

          {/* Login */}
          <Link
            to="/auth/login"
            className="ml-[5px] flex h-[34px] items-center gap-2 rounded-[10px] bg-violet-600 px-[14px] text-[13px] font-medium text-white transition-colors hover:bg-violet-700"
          >
            Log In

            <svg
              viewBox="0 0 24 24"
              className="h-[14px] w-[14px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="m10 17 5-5-5-5M15 12H3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
