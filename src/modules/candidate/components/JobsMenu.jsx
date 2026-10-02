import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import JobsFilter from "../../public/components/JobsFilter";
import { jobcontext } from "../../../context/JobContext";
import { useContext } from "react";
import FindJobCard from "../../public/components/FindJobCard";
import nosave from "../../../assets/nosave.png";
import ButtonFit from "../../employer/components/ButtonFit"
import { Link } from "react-router-dom";

export default function JobsMenu() {
  const [displayvalue, setdisplayvalue] = useState("all");

  const { jobs } = useContext(jobcontext);

  const savedJobs = jobs.filter((job) => job.isSaved === true);
  //main
  const savedMapped = savedJobs.map((job) => (
    <FindJobCard key={job.id} job={job} />
  ));

  let UnAppliedfilter = savedJobs.filter((f) => {
    return f.isSaved === true && f.apply == false;
  });

  //main
  let unapplied = UnAppliedfilter.map((m) => {
    return <FindJobCard key={m.id} job={m} />;
  });

  let activejobs = savedJobs.filter((f) => {
    return f.isSaved === true && f.active === true;
  });

  //main
  const active = activejobs.map((m) => {
    return <FindJobCard key={m.id} job={m} />;
  });

  let Appliedfilter = savedJobs.filter((f) => {
    return f.isSaved === true && f.apply;
  });

  //main
  const applied = Appliedfilter.map((m) => {
    return <FindJobCard key={m.id} job={m} />;
  });

  let expiredfilter = savedJobs.filter((f) => {
    return f.isSaved === true && f.isExpired;
  });

  //main
  const expired = expiredfilter.map((m) => {
    return <FindJobCard key={m.id} job={m} />;
  });

  const results = () => {
    if (displayvalue == "unapplied") {
      return unapplied;
    } else if (displayvalue == "active") {
      return active;
    } else if (displayvalue == "applied") {
      return applied;
    } else if (displayvalue == "expired") {
      return expired;
    } else {
      return savedMapped;
    }
  };

  const noJobs = (
    <div className="flex-center flex-col w-[1100px] h-[500px]">
      <div className="img w-120 h-80">
        <img className="max-w-full" src={nosave} alt="" />
      </div>
      {" "}
      <h3 className="text-2xl font-bold text-text-primary mb-3 mt-[20px]">No Saved Jobs Yet!</h3>
      <p className="text-md text-text-secondary font-medium mb-6">Jobs you save will appear here for easy access later.</p>
      <Link to="/candidate/FindJobs">
         <ButtonFit>Browse Jobs</ButtonFit>
      </Link>
    </div>
  );
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
            {results() == "" ? noJobs : results()}
          </div>
        </div>
      </section>
    </>
  );
}
