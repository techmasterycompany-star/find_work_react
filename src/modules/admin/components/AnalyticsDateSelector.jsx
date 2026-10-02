import { useState } from "react";

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="#4A4F5A"
        strokeWidth="1.5"
      />

      <path
        d="M7 3V7M17 3V7M3 10H21"
        stroke="#4A4F5A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 9L12 14L17 9"
        stroke="#4A4F5A"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AnalyticsDateSelector() {
  const [date, setDate] = useState("May 28, 2026");

  return (
    <div className="flex justify-end">
      <div className="flex h-10 w-[194px] items-center justify-center gap-2.5 rounded-lg border border-[#C1C5CD] bg-white px-4">
        <CalendarIcon />

        <input
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-[100px] border-0 bg-transparent font-['Inter'] text-sm font-medium text-[#52525B] outline-none"
          aria-label="Analytics date"
        />

        <ChevronDown />
      </div>
    </div>
  );
}
