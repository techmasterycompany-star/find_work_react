import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import JobsFilter from "../../public/components/JobsFilter";
import AllSaved from "./AllSavedFilter";
import ActiveSaved from "./ActiveSavedFilter";
import AppliedSaved from "./AppliedSaved";
import UnAppliedSaved from "./UnAppliedSaved";
import ExpiredSaved from "./ExpiredSaved";
import NoSavedJobs from "./NoSaved";


export default function JobsMenu() {
  const [displayvalue, setdisplayvalue] = useState("all");

  const results = () => {
    if (displayvalue == "unapplied") {
      return <UnAppliedSaved/>;
    } else if (displayvalue == "active") {
      return <ActiveSaved />;
    } else if (displayvalue == "applied") {
      return <AppliedSaved />;
    } else if (displayvalue == "expired") {
      return <ExpiredSaved />;
    } else {
      return <AllSaved />;
    }
  };

  return (
    <>
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
          value="unapplied"
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
          Not Applied
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
          value="applied"
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
          Applied
        </ToggleButton>
        <ToggleButton
          value="expired"
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
          Expired
        </ToggleButton>
      </ToggleButtonGroup>
      <section className="px-20 pt-12 pb-25 w-full">
        <div className="flex items-start gap-5">
          <JobsFilter />
          <div className="w-full h-fit grid grid-cols-2 gap-5">
            {results()}
          </div>
        </div>
      </section>
    </>
  );
}