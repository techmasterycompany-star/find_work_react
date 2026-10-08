import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import MonthlyPricing from "./MonthlyPricing";
import YearlyPricing from "./YearlyPricing";


export default function Pricing({
  firsttitle,
  titlespan,
  description,
  plans = [],
  isLoading = false,
  isError = false,
  error = null,
  onSelectPlan,
  checkoutError = null,
  isCheckingOut = false,
}) {
  const [pricetype, setpricetype] = useState("monthly");

  const result = () => {
    const shared = {
      plans,
      isLoading,
      isError,
      error,
      onSelectPlan,
      isCheckingOut,
    };
    if (pricetype === "Yearly") {
      return <YearlyPricing {...shared} />;
    }
    return <MonthlyPricing {...shared} />;
  };

  return (
    <>
      <section className="bg-card-2 pt-16">
        <div className="m-auto w-[590px]">
          <span className="text-primary text-sm text-center block mb-6">
            PRICING PLANES
          </span>
          <h1 className="font-bold text-4xl text-text-primary text-center leading-15 w-[552px] mb-4">
            {firsttitle}
            <br></br>
            <span className="text-primary">{titlespan}</span>
          </h1>
          <p className="text-md text-text-secondary w-full text-center">
            {description}
          </p>
        </div>
        <ToggleButtonGroup
          value={pricetype}
          sx={{
            backgroundColor: "white",
            width: "560px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "12px 24px",
            borderRadius: "22px",
            margin: "auto",
            marginTop: "40px",
            marginBottom: checkoutError ? "24px" : "112px",

            "& .MuiToggleButton-root": {
              textTransform: "none",
              padding: "8px",
              height: "40px",
              borderRadius: "12px",
              border: "none",
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
          <ToggleButton value="monthly" onChange={(e) => {
            setpricetype(e.target.value);
          }} className="w-full">
            Monthly
          </ToggleButton>
          <ToggleButton value="Yearly" onChange={(e) => {
            setpricetype(e.target.value);
          }} className="w-full">
            Yearly
          </ToggleButton>
          <div className="w-full h-10 py-1 px-2 rounded-[4px] text-md flex items-center justify-center font-semibold text-primary bg-btn-secondary">
            Save 20%
          </div>
        </ToggleButtonGroup>
        {checkoutError && (
          <div className="mx-auto mb-8 max-w-2xl rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {checkoutError}
          </div>
        )}
        {result()}
      </section>
    </>
  );
}
