import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TopRated from "./TopRated";
import MostSuccessful from "./MostSuccessful";
import MostViewed from "./MostViewed";
import Filter from "./Filter";
import CandidateCardList from "../components/CandidatesCardlist"

export default function CandidatesMenu() {
  const [displayvalue, setdisplayvalue] = useState("popular");


const results = () => {
  if (displayvalue == "mostviewed") {
    return <MostViewed />;
  } else if (displayvalue == "top rated") {
    return <TopRated />;
  } else if (displayvalue == "successful") {
    return <MostSuccessful />;
  } else {
    return <CandidateCardList />
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
        value="popular"
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
        Most Popular
      </ToggleButton>
      <ToggleButton
        value="mostviewed"
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
        Most Viewed
      </ToggleButton>
      <ToggleButton
        value="top rated"
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
        Top Rated
      </ToggleButton>
      <ToggleButton
        value="successful"
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
        Most Successful
      </ToggleButton>
    </ToggleButtonGroup>
    <section className="px-20 pt-12 pb-25 w-full">
      <div className="flex items-start gap-5">
        <Filter />
        <div className="w-full h-fit grid grid-cols-2 gap-5">
          {results()}
          {/* {skillresult()} */}
        </div>
      </div>
    </section>
  </>
);
}
