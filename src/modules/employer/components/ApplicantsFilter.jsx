import { useState } from "react";
import ButtonFull from "./Buttonfull";
import { useContext } from "react";
import { filtercontext } from "../../../context/filterstates";

export default function ApplicantsFilter() {
  const [open, setopen] = useState(false);
  const [openstatus, setopenstatus] = useState(false);
   const [sort, setsort] = useState("match");
  const { ApplicantsChecked, setApplicantsChecked } = useContext(filtercontext);

  function CategoreyCheckValue(e) {
    console.log("value:", e.target.value);
    console.log("check:", e.target.checked);

    setApplicantsChecked((prev) => ({
      ...prev,
      categorey: e.target.checked
        ? [...prev.categorey, e.target.value]
        : prev.categorey.filter((item) => item !== e.target.value),
    }));
  }

  function StatusCheckValue(e) {
    console.log("value:", e.target.value);
    console.log("check:", e.target.checked);

    setApplicantsChecked((prev) => ({
      ...prev,
      status: e.target.checked
        ? [...prev.status, e.target.value]
        : prev.status.filter((item) => item !== e.target.value),
    }));
  }

  function CloseCategorey(categoryToRemove) {
    setApplicantsChecked((prev) => ({
      ...prev,
      categorey: prev.categorey.filter(
        (category) => category !== categoryToRemove,
      ),
    }));
  }

  function CloseStatus(statusToRemove) {
    setApplicantsChecked((prev) => ({
      ...prev,
      status: prev.status.filter((status) => status !== statusToRemove),
    }));
  }

function InputskillsControl(e) {
    return setApplicantsChecked({ ...ApplicantsChecked, skill: e.target.value });
  }
   function Close() {
    return setApplicantsChecked({ ...ApplicantsChecked, skill: "" });
  }

  return (
    <div className="w-[296px] rounded-2sm border-1 border-border1 bg-card-2 py-4 px-2">
      {/*title*/}
      <div className="px-4 py-2 border-b-1 border-b-border1 text-text-primary text-lg font-medium mb-2">
        All Filters
      </div>
      {/* categorey */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={open}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopen(!open);
          }}
        >
          Categorey
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
                value="UI/UX Designer"
                checked={ApplicantsChecked.categorey.includes("UI/UX Designer")}
                onChange={CategoreyCheckValue}
                type="checkbox"
                name="ui/ux"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="ui/ux"
                className="text-md text-text-secondary font-medium"
              >
                UI/UX Designer
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Project Manager"
                checked={ApplicantsChecked.categorey.includes(
                  "Project Manager",
                )}
                onChange={CategoreyCheckValue}
                type="checkbox"
                name="manager"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="manager"
                className="text-md text-text-secondary font-medium"
              >
                Project Manager
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Software Developer"
                checked={ApplicantsChecked.categorey.includes(
                  "Software Developer",
                )}
                onChange={CategoreyCheckValue}
                type="checkbox"
                name="dev"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="dev"
                className="text-md text-text-secondary font-medium"
              >
                Software Developer
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Software Tester"
                checked={ApplicantsChecked.categorey.includes(
                  "Software Tester",
                )}
                onChange={CategoreyCheckValue}
                type="checkbox"
                name="test"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="test"
                className="text-md text-text-secondary font-medium"
              >
                Software Tester
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Graphic Designer"
                checked={ApplicantsChecked.categorey.includes(
                  "Graphic Designer",
                )}
                onChange={CategoreyCheckValue}
                type="checkbox"
                name="design"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="design"
                className="text-md text-text-secondary font-medium"
              >
                Graphic Designer
              </label>
            </div>
            {ApplicantsChecked.categorey.length > 0
              ? ApplicantsChecked.categorey.map((c) => (
                  <div
                    key={c}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {c}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseCategorey(c)}
                    >
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
                ))
              : null}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Status */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={openstatus}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopenstatus(!openstatus);
          }}
        >
          Status
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${openstatus ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {openstatus ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="All Applicants"
                checked={ApplicantsChecked.status.includes("All Applicants")}
                onChange={StatusCheckValue}
                type="checkbox"
                name="all"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="all"
                className="text-md text-text-secondary font-medium"
              >
                All Applicants
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Shortlisted"
                checked={ApplicantsChecked.status.includes("Shortlisted")}
                onChange={StatusCheckValue}
                type="checkbox"
                name="shortlist"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="shortlist"
                className="text-md text-text-secondary font-medium"
              >
                Shortlisted
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Under Review"
                checked={ApplicantsChecked.status.includes("Under Review")}
                onChange={StatusCheckValue}
                type="checkbox"
                name="review"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="review"
                className="text-md text-text-secondary font-medium"
              >
                Under Review
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Rejected"
                checked={ApplicantsChecked.status.includes("Rejected")}
                onChange={StatusCheckValue}
                type="checkbox"
                name="reject"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="reject"
                className="text-md text-text-secondary font-medium"
              >
                Rejected
              </label>
            </div>
            {ApplicantsChecked.status.length > 0
              ? ApplicantsChecked.status.map((c) => (
                  <div
                    key={c}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {c}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseStatus(c)}
                    >
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
                ))
              : null}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Sort By */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <label
          htmlFor="Sort"
          className="px-4 h-10 py-2 text-text-primary text-lg font-medium"
        >
          Sort By 
        </label>
        <br></br>
      <select className="w-full h-12 rounded-2sm border-1 border-border1 px-3 py-2 mt-3 outline-0" value={sort} onChange={(e)=>{
         setsort(e.target.value)
      }}>
        <option value="match">Highest Match Score</option>
        <option value="rate">Highest Rate</option>
      </select>
        <datalist id="Sort">
          <option value="Highest Match Score"></option>
          <option value="React"></option>
          <option value="Design System"></option>
        </datalist>
      </div>
      {/* btn */}
      <ButtonFull
        onClick={() => {
          return null;
        }}
      >
        Apply Filter
      </ButtonFull>
    </div>
  );
}
