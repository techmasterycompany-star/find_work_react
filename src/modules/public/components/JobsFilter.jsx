import { useContext, useState } from "react";
import ButtonFull from "../../employer/components/Buttonfull";
import { filtercontext } from "../../../context/filterstates";

export default function JobsFilter() {
  const [open, setopen] = useState(false);
  const [opensalary, setopensalary] = useState(false);
  const [openDate, setopenDate] = useState(false);
  const [openEducation, setopenEducation] = useState(false);
  const [openType, setopenType] = useState(false);
  const [openmodes, setopenmodes] = useState(false);

  const { jobChecked, setjobChecked, radioChecked, setradioChecked } =
    useContext(filtercontext);

  function CategoreyCheckValue(e) {
    console.log("value:", e.target.value);
    console.log("check:", e.target.checked);
    setjobChecked((prev) => ({
      ...prev,
      categorey: e.target.checked
        ? [...prev.categorey, e.target.value]
        : prev.categorey.filter((item) => item !== e.target.value),
    }));
  }

  function DateCheckValue(e) {
     setjobChecked((prev) => ({
      ...prev,
      date: e.target.checked
        ? [...prev.date, e.target.value]
        : prev.date.filter((item) => item !== e.target.value),
    }));
  }

   function EducationCheckValue(e) {
    setjobChecked((prev) => ({
      ...prev,
      education: e.target.checked
        ? [...prev.education, e.target.value]
        : prev.education.filter((item) => item !== e.target.value),
    }));
  }

  
   function JobTypeCheckValue(e) {
   setjobChecked((prev) => ({
      ...prev,
      jobtype: e.target.checked
        ? [...prev.jobtype, e.target.value]
        : prev.jobtype.filter((item) => item !== e.target.value),
    }));
  }

    
   function ModesCheckValue(e) {
    setjobChecked((prev) => ({
      ...prev,
      mode: e.target.checked
        ? [...prev.mode, e.target.value]
        : prev.mode.filter((item) => item !== e.target.value),
    }));
  }


  function SalaryCheckValue(e) {
    setradioChecked(e.target.value);
  }

  function CloseCategorey(categoryToRemove) {
    setjobChecked((prev) => ({
      ...prev,
      categorey: prev.categorey.filter(
        (category) => category !== categoryToRemove,
      ),
    }));
  }

  function CloseDate(dateToRemove) {
   setjobChecked((prev) => ({
      ...prev,
      date: prev.date.filter((date) => date !== dateToRemove),
    }));
  }

  function CloseEducation(educationToRemove) {
   setjobChecked((prev) => ({
      ...prev,
      education: prev.education.filter((education) => education !== educationToRemove),
    }));
  }

    function CloseJob(jobToRemove) {
   setjobChecked((prev) => ({
      ...prev,
      jobtype: prev.jobtype.filter((jobtype) => jobtype !== jobToRemove),
    }));
  }

    function CloseMode(modeToRemove) {
       setjobChecked((prev) => ({
      ...prev,
      mode: prev.mode.filter((mode) => mode !== modeToRemove),
    }));
  }


  function CloseSalary() {
    setradioChecked("");
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
                checked={jobChecked.categorey.includes("UI/UX Designer")}
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
                checked={jobChecked.categorey.includes("Project Manager")}
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
                checked={jobChecked.categorey.includes(
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
                checked={jobChecked.categorey.includes("Software Tester")}
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
                checked={jobChecked.categorey.includes("Graphic Designer")}
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
            {jobChecked.categorey.length > 0
              ? jobChecked.categorey.map((c) => (
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
      {/* date */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={openDate}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopenDate(!openDate);
          }}
        >
          Publication date
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${openDate ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {openDate ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Last 24 hours"
                checked={jobChecked.date.includes("Last 24 hours")}
                onChange={DateCheckValue}
                type="checkbox"
                name="24"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="24"
                className="text-md text-text-secondary font-medium"
              >
                Last 24 hours
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Last 3 days"
                checked={jobChecked.date.includes("Last 3 days")}
                onChange={DateCheckValue}
                type="checkbox"
                name="3"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="3"
                className="text-md text-text-secondary font-medium"
              >
                Last 3 days
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Last 7 days"
                checked={jobChecked.date.includes("Last 7 days")}
                onChange={DateCheckValue}
                type="checkbox"
                name="7"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="7"
                className="text-md text-text-secondary font-medium"
              >
                Last 7 days
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Last 14 days"
                checked={jobChecked.date.includes("Last 14 days")}
                onChange={DateCheckValue}
                type="checkbox"
                name="14"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="14"
                className="text-md text-text-secondary font-medium"
              >
                Last 14 days
              </label>
            </div>
            {jobChecked.date.length > 0
              ? jobChecked.date.map((date) => (
                  <div
                    key={date}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {date}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseDate(date)}
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
      {/* Education level */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={openEducation}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopenEducation(!openEducation);
          }}
        >
          Education level
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${openEducation ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {openEducation ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Bachelor's degree"
                checked={jobChecked.education.includes("Bachelor's degree")}
                onChange={EducationCheckValue}
                type="checkbox"
                name="bachelor"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="bachelor"
                className="text-md text-text-secondary font-medium"
              >
                Bachelor's degree
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Masters"
                checked={jobChecked.education.includes("Masters")}
                onChange={EducationCheckValue}
                type="checkbox"
                name="master"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="master"
                className="text-md text-text-secondary font-medium"
              >
                Masters
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Student"
                checked={jobChecked.education.includes("Student")}
                onChange={EducationCheckValue}
                type="checkbox"
                name="student"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="student"
                className="text-md text-text-secondary font-medium"
              >
                Student
              </label>
            </div>
             {jobChecked.education.length > 0
              ? jobChecked.education.map((e) => (
                  <div
                    key={e}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {e}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseEducation(e)}
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
      {/* Job type */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={openType}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopenType(!openType);
          }}
        >
          Job type
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${openType ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {openType ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Full-Time"
                checked={jobChecked.jobtype.includes("Full-Time")}
                onChange={JobTypeCheckValue}
                type="checkbox"
                name="full"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="full"
                className="text-md text-text-secondary font-medium"
              >
                Full-Time
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Part-Time"
                checked={jobChecked.jobtype.includes("Part-Time")}
                onChange={JobTypeCheckValue}
                type="checkbox"
                name="part"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="part"
                className="text-md text-text-secondary font-medium"
              >
                Part-Time
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Internship"
                checked={jobChecked.jobtype.includes("Internship")}
                onChange={JobTypeCheckValue}
                type="checkbox"
                name="Internship"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="Internship"
                className="text-md text-text-secondary font-medium"
              >
                Internship
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Temporary"
                checked={jobChecked.jobtype.includes("Temporary")}
                onChange={JobTypeCheckValue}
                type="checkbox"
                name="Temporary"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="Temporary"
                className="text-md text-text-secondary font-medium"
              >
                Temporary
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Contract Base"
                checked={jobChecked.jobtype.includes("Contract Base")}
                onChange={JobTypeCheckValue}
                type="checkbox"
                name="Contract Base"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="Contract Base"
                className="text-md text-text-secondary font-medium"
              >
                Contract Base
              </label>
            </div>
            {jobChecked.jobtype.length > 0
              ? jobChecked.jobtype.map((j) => (
                  <div
                    key={j}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {j}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseJob(j)}
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
      {/* Salary (Monthly) */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={opensalary}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopensalary(!opensalary);
          }}
        >
          Salary (Monthly)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${opensalary ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {opensalary ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="$10 - $100"
                checked={radioChecked === "$10 - $100"}
                onChange={SalaryCheckValue}
                type="radio"
                name="salary"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="100"
                className="text-md text-text-secondary font-medium"
              >
                $10 - $100
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="$100 - $1,000"
                checked={radioChecked === "$100 - $1,000"}
                onChange={SalaryCheckValue}
                type="radio"
                name="salary"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="1k"
                className="text-md text-text-secondary font-medium"
              >
                $100 - $1,000
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="$1,000 - $10,000"
                checked={radioChecked === "$1,000 - $10,000"}
                onChange={SalaryCheckValue}
                type="radio"
                name="salary"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="salary"
                className="text-md text-text-secondary font-medium"
              >
                $1,000 - $10,000
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="$10,000 - $100,000"
                checked={radioChecked === "$10,000 - $100,000"}
                onChange={SalaryCheckValue}
                type="radio"
                name="salary"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="100k"
                className="text-md text-text-secondary font-medium"
              >
                $10,000 - $100,000
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="$100,000 Up"
                checked={radioChecked === "$100,000 Up"}
                onChange={SalaryCheckValue}
                type="radio"
                name="salary"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="+100k"
                className="text-md text-text-secondary font-medium"
              >
                $100,000 Up
              </label>
            </div>
            {radioChecked ? (
              <div className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary">
                {radioChecked}

                <button
                  className="cursor-pointer"
                  onClick={() => CloseSalary()}
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
            ) : null}
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Work modes */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={openmodes}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopenmodes(!openmodes);
          }}
        >
          Work modes
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${openmodes ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {openmodes ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Remote job"
                checked={jobChecked.mode.includes("Remote job")}
                onChange={ModesCheckValue}
                type="checkbox"
                name="remote"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="remote"
                className="text-md text-text-secondary font-medium"
              >
                Remote job
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Hybrid"
                checked={jobChecked.mode.includes("Hybrid")}
                onChange={ModesCheckValue}
                type="checkbox"
                name="Hybrid"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="Hybrid"
                className="text-md text-text-secondary font-medium"
              >
                Hybrid
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="Onsite"
                checked={jobChecked.mode.includes("Onsite")}
                onChange={ModesCheckValue}
                type="checkbox"
                name="Onsite"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="Onsite"
                className="text-md text-text-secondary font-medium"
              >
                Onsite
              </label>
            </div>
            {jobChecked.mode.length > 0
              ? jobChecked.mode.map((m) => (
                  <div
                    key={m}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {m}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseMode(m)}
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
      {/* btn */}
      <ButtonFull
        onClick={() => {
          <CandidateCardList />;
        }}
      >
        Apply Filter
      </ButtonFull>
    </div>
  );
}