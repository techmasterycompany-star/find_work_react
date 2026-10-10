import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import HeaderSec from "../../../components/HeaderSec";
import ApplicationsCard from "../components/ApplicationsCard";

export default function MyJobs() {
  const [type, settype] = useState("Applicants");
  let listViewed = <ApplicationsCard />;
  const results = () => {
    if (type == "Applicants") {
      return listViewed;
    } else {
      return null;
    }
  };
  return (
    <>
      <HeaderSec
        title="MyJobs"
        description="Track your jobs, applications and hiring performance."
        titlestart={0}
        titleend={12}
        spanstart={0}
        spanend={0}
      ></HeaderSec>
      <ToggleButtonGroup
        value={type}
        sx={{
          backgroundColor: "white",
          width: "1380px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "12px 24px",
          borderRadius: "22px",
          margin: "auto",
          marginTop: "40px",
          marginBottom: "24px",

          "& .MuiToggleButton-root": {
            textTransform: "none",
            padding: "8px",
            height: "48px",
            borderRadius: "12px",
            borderColor: "#eee",
            borderWidth: "2px",
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
          value="Applicants"
          onChange={(e) => {
            settype(e.target.value);
          }}
          className="w-full"
        >
          Applications
        </ToggleButton>
        <ToggleButton
          value="MyJobs"
          onChange={(e) => {
            settype(e.target.value);
          }}
          className="w-full"
        >
          MyJobs
        </ToggleButton>
      </ToggleButtonGroup>
      {results()}
    </>
  );
}
