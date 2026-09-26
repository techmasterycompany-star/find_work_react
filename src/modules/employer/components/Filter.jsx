import { Button } from "@mui/material";
import { useContext, useState } from "react";
import ButtonFull from "./Buttonfull";
import ButtonFit from "./ButtonFit";
import { filtercontext } from "../../../context/filterstates";
import CandidateCardList from "./CandidatesCardlist";

export default function Filter() {
  const [open, setopen] = useState(false);
  const {
    checked,
    setchecked,
    inputjobvalue,
    inputskillvalue,
    setinputjobvalue,
    setinputskillvalue,
  } = useContext(filtercontext);

  function ExpCheckValue(e) {
    return setchecked({ ...checked, exp: {checked : e.target.checked , value : e.target.checked ? e.target.value : ""} });
  }
  function AvailablitityCheckValue(e) {
    return setchecked({ ...checked, available:{ checked : e.target.checked, value : e.target.checked ? e.target.value : ""} });
  }

  function InputskillsControl(e) {
    return setinputskillvalue({ ...inputskillvalue, skill: e.target.value });
  }
  function InputlocationControl(e) {
    return setinputskillvalue({ ...inputskillvalue, location: e.target.value });
  }

  function InputjobsControl(e) {
    return setinputjobvalue(e.target.value);
  }
  function Close() {
    return setinputskillvalue({ ...inputskillvalue, skill: "" });
  }

  function Closejob() {
    return setinputjobvalue("");
  }

    function Closeloc() {
    return setinputskillvalue({ ...inputskillvalue, location: ""});;
  }
  return (
    <div className="w-[296px] rounded-2sm border-1 border-border1 bg-card-2 py-4 px-2">
      {/*title*/}
      <div className="px-4 py-2 border-b-1 border-b-border1 text-text-primary text-lg font-medium mb-2">
        All Filters
      </div>
      {/* experience */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={open}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopen(!open);
          }}
        >
          Experience
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${open ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {open ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="All Experience"
                checked={checked.exp.value == "All Experience"}
                onChange={ExpCheckValue}
                type="checkbox"
                name="all"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="all"
                className="text-md text-text-secondary font-medium"
              >
                All Experience
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="0-1 years"
                checked={checked.exp.value == "0-1 years"}
                onChange={ExpCheckValue}
                type="checkbox"
                name="1y"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="1y"
                className="text-md text-text-secondary font-medium"
              >
                0-1 years
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="1-3 years"
                checked={checked.exp.value == "1-3 years"}
                onChange={ExpCheckValue}
                type="checkbox"
                name="3y"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="3y"
                className="text-md text-text-secondary font-medium"
              >
                1-3 years
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="3-5 years"
                checked={checked.exp.value == "3-5 years"}
                onChange={ExpCheckValue}
                type="checkbox"
                name="5y"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="5y"
                className="text-md text-text-secondary font-medium"
              >
                3-5 years
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="5+ years"
                checked={checked.exp.value == "5+ years"}
                onChange={ExpCheckValue}
                type="checkbox"
                name="+5y"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="+5y"
                className="text-md text-text-secondary font-medium"
              >
                5+ years
              </label>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* skills */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <label
          htmlFor="Skill"
          className="px-4 h-10 py-2 text-text-primary text-lg font-medium"
        >
          Skills
        </label>
        <br></br>
        <input
          value={inputskillvalue.skill}
          onChange={InputskillsControl}
          id="skill"
          list="Skills"
          placeholder="Select or type a skill"
          className="px-4 h-10 py-2 w-full outline-none border-1 border-border1 rounded-2sm"
        />
        {inputskillvalue.skill != "" ? (
          <div className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary">
            {inputskillvalue.skill}
            <button className="cursor-pointer" onClick={Close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-icon-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}
        <datalist id="Skills">
          <option value="figma"></option>
          <option value="React"></option>
          <option value="Design System"></option>
          <option value="Prototype"></option>
          <option value="Javascript"></option>
          <option value="wireframe"></option>
          <option value="Node Js"></option>
          <option value="PostgreSQl"></option>
          <option value="Go"></option>
          <option value="AWS"></option>
          <option value="Terraform"></option>
          <option value="CI/CD"></option>
          <option value="SQL"></option>
          <option value="Tableau"></option>
          <option value="Python"></option>
          <option value="vue.js"></option>
        </datalist>
      </div>
      {/* jobs */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <label
          htmlFor="job"
          className="px-4 h-10 py-2 text-text-primary text-lg font-medium"
        >
          Job Title
        </label>
        <br></br>
        <input
          value={inputjobvalue}
          onChange={InputjobsControl}
          id="job"
          list="job-list"
          placeholder="Select or type a job"
          className="px-4 h-10 py-2 w-full outline-none border-1 border-border1 rounded-2sm"
        />
        {inputjobvalue != "" ? (
          <div className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary">
            {inputjobvalue}
            <button className="cursor-pointer" onClick={Closejob}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-icon-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}
        <datalist id="job-list">
          <option value="Frontend Developer"></option>
          <option value="Lead UI/UX Designer"></option>
          <option value="Senior Full-Stack Engineer"></option>
          <option value="Backend Engineer"></option>
          <option value="DevOps Engineer"></option>
          <option value="Data Analyst"></option>
          <option value="Product Designer"></option>
        </datalist>
      </div>
      {/* Location */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <label
          htmlFor=""
          className="w-full h-10 px-4 py-2 text-text-primary text-lg font-medium"
        >
          Location
        </label>
        <br></br>
        <select
          value={inputskillvalue.location}
          onChange={InputlocationControl}
          className="px-4 h-10 py-2 w-full outline-none border-1 border-border1 rounded-2sm"
        >
          <option value="" disabled>
            select location
          </option>
          <option value="remote">Remote</option>
          <option value="onsite">Onsite</option>
          <option value="hybird">Hybird</option>
        </select>
        {inputskillvalue.location != "" ? (
          <div className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary">
            {inputskillvalue.location}
            <button className="cursor-pointer" onClick={Closeloc}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 text-icon-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Availibility */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <label
          htmlFor=""
          className="w-full h-10 px-4 py-2 text-text-primary text-lg font-medium"
        >
          Availability
        </label>
        <div className="w-full h-10 px-4 py-2 flex-gap8">
          <input
            value="Available NOW"
            checked={checked.available.value == "Available NOW"}
            onChange={AvailablitityCheckValue}
            type="checkbox"
            name="all"
            className="size-6 cursor-pointer accent-primary"
          />
          <label
            htmlFor="all"
            className="text-md text-text-secondary font-medium"
          >
            Available NOW
          </label>
        </div>
        <div className="w-full h-10 px-4 py-2 flex-gap8">
          <input
            value="Open To Opportunity"
            checked={checked.available.value == "Open To Opportunity"}
            onChange={AvailablitityCheckValue}
            type="checkbox"
            name="all"
            className="size-6 cursor-pointer accent-primary"
          />
          <label
            htmlFor="all"
            className="text-md text-text-secondary font-medium"
          >
            Open To Opportunity
          </label>
        </div>
      </div>
      {/* btn */}
      <ButtonFull onClick={()=>{
        <CandidateCardList />
      }}>Apply Filter</ButtonFull>
    </div>
  );
}
