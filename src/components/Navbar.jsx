import { NavLink } from "react-router-dom";

// Change this path to your actual Job4U logo
import logo from "../assets/Brand Logo.png";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Find Jobs", to: "/jobs" },
  { label: "Companies", to: "/companies" },
  { label: "About Us", to: "/about" },
  { label: "Pricing", to: "/pricing" },
];

export default function Navbar() {
  return (
    <header className="w-full h-[88px] bg-white border border-gray-200 rounded-lg">
      <div className="w-full h-full px-[80px] flex items-center justify-between">

        {/* ================= LOGO ================= */}
        <NavLink to="/" className="shrink-0">
          <img
            src={logo}
            alt="Job4U"
            className="w-[72px] h-[48px] object-contain"
          />
        </NavLink>

        {/* ================= NAVIGATION TABS ================= */}
        <nav className="w-[465px] h-[40px] flex items-center justify-between">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[14px] font-medium transition-colors ${
                  isActive
                    ? "text-[#6D3DF5]"
                    : "text-gray-800 hover:text-[#6D3DF5]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="w-[366px] h-[48px] flex items-center justify-end gap-[20px]">

          {/* Dark Mode */}
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="w-[24px] h-[24px] flex items-center justify-center text-gray-800"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[20px] h-[20px]"
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
            aria-label="Change language"
            className="w-[24px] h-[24px] flex items-center justify-center text-gray-800"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[20px] h-[20px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <rect
                x="5"
                y="5"
                width="14"
                height="14"
                rx="2"
              />
              <path
                d="M8 9h8M8 12h8M8 15h5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="w-[24px] h-[24px] flex items-center justify-center text-gray-800"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-[21px] h-[21px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 21h4"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Divider */}
          <div className="h-[32px] w-px bg-gray-300 mx-[2px]" />

          {/* Employer */}
          <NavLink
            to="/employer"
            className="text-[14px] font-medium text-gray-700 hover:text-gray-900 whitespace-nowrap"
          >
            Employer
          </NavLink>

          {/* Login */}
          <NavLink
            to="/auth/login"
            className="w-[111px] h-[40px] rounded-[12px] bg-[#6D3DF5] text-white text-[14px] font-semibold flex items-center justify-center gap-[8px] hover:bg-[#5d31dc] transition-colors"
          >
            <span>Log In</span>

            {/* Login icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-[18px] h-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M10 17l5-5-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 12H3"
                strokeLinecap="round"
              />
              <path
                d="M21 3v18"
                strokeLinecap="round"
              />
            </svg>
          </NavLink>

        </div>
      </div>
    </header>
  );
}