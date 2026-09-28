import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  "For Candidates": [
    "Find Job",
    "Create Resume",
    "Job Alerts",
    "Saved Jobs",
    "Create Account",
  ],
  "For Employers": [
    "Post a Job",
    "Talent Search",
    "Enterprise Solutions",
    "Pricing Plans",
    "Success Stories",
  ],
  Resources: ["Resources", "Help Center", "Guideline", "Contact Support"],
};

function LogoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 5a3 3 0 0 1 6 0v3H9V7Zm3 6a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.96 1.43-3.96 4.07V10.5H7.5v3h2.67V21h3.33Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.8.1 4.1 4.1 0 0 0 3.9 2.9A8.3 8.3 0 0 1 2 18.6a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.25 8.75h3.4V21h-3.4V8.75Zm6.2 0h3.26v1.68h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.07 2.27 4.07 5.22V21h-3.4v-5.63c0-1.34-.02-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V21h-3.4V8.75Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.38 8.38 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M12 19V5M5 12l7-7 7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIAL_ICONS = [FacebookIcon, TwitterIcon, LinkedinIcon, GithubIcon];

export default function Footer() {
  return (
    <footer className="relative bg-[#2B1453] px-20 py-14 text-white">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <LogoIcon />
            Job<span className="text-violet-400">4U</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-zinc-400">
            Job4U is a smart job search and recruitment platform that connects
            job seekers with employers. Find your next opportunity today.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {SOCIAL_ICONS.map((Icon, i) => (
              <button
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <h4 className="font-semibold">{heading}</h4>
            <ul className="mt-4 space-y-3">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-sm text-zinc-400 hover:text-white"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
        <span className="mx-auto text-sm text-zinc-400">
          © 2026 Job4U . All rights reserved.
        </span>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
          <ArrowUpIcon />
        </button>
      </div>

      <button className="fixed bottom-8 right-8 flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg hover:bg-violet-600">
        <ChatIcon />
      </button>
    </footer>
  );
}
