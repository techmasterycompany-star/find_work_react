import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import Table from "./Table";


export default function JobPerformance() {
    const [displayvalue, setdisplayvalue] = useState("all");
  return (
    <div className="w-full h-fit rounded-lg bg-white border-1 border-border1 p-4">
      {/* title */}
      <div className="flex-between mb-4">
        <h3 className="text-text-primary font-bold text-lg">Job Performance</h3>
        <div className="w-fit flex items-center justify-end">
          <button
            type="button"
            className="flex h-8 items-center gap-1 rounded-lg border border-[#C1C5CD] bg-white px-2 font-['Inter'] text-sm text-[#52525B]"
          >
            last 30 days
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 9L12 14L17 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* filters */}
      <ToggleButtonGroup
            value={displayvalue}
            sx={{
              gap: "16px",
              display: "flex",
              width: "608px",
              margin: "auto",
      
              "& .MuiToggleButton-root": {
                border: "1px solid #D4D4D8",
                borderRadius: "8px",
                textTransform: "none",
              },
      
              "& .MuiToggleButton-root.Mui-selected": {
                backgroundColor: "#7c3aed !important",
                color: "#fff",
              },
      
              "& .MuiToggleButton-root.Mui-selected:hover": {
                backgroundColor: "#7c3aed !important",
              },
            }}
          >
            <ToggleButton
              value="all"
              onChange={(e) => {
                setdisplayvalue(e.target.value);
              }}
              sx={{
                width: "fit-content",
                padding: " 8px 16px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: " #52525B",
                fontWeight: "medium",
                fontSize: "16px",
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="active"
              onChange={(e) => {
                setdisplayvalue(e.target.value);
              }}
              sx={{
                width: "fit-content",
                padding: " 8px 16px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: " #52525B",
                fontWeight: "medium",
                fontSize: "16px",
              }}
            >
              Active
            </ToggleButton>
            <ToggleButton
              value="close"
              onChange={(e) => {
                setdisplayvalue(e.target.value);
              }}
              sx={{
                width: "fit-content",
                padding: " 8px 16px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: " #52525B",
                fontWeight: "medium",
                fontSize: "16px",
              }}
            >
              Closed
            </ToggleButton>
            <ToggleButton
              value="pending"
              onChange={(e) => {
                setdisplayvalue(e.target.value);
              }}
              sx={{
                width: "fit-content",
                padding: " 8px 16px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: " #52525B",
                fontWeight: "medium",
                fontSize: "16px",
              }}
            >
              Pending
            </ToggleButton>
      </ToggleButtonGroup>
      <div className="mt-6">
         <Table/>
      </div>
    </div>
  );
}
