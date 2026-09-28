import { Button } from "@mui/material";
import { useContext, useState } from "react";
import ButtonFull from "./Buttonfull";
import ButtonFit from "./ButtonFit";
import { filtercontext } from "../../../context/filterstates";
import CandidateCardList from "./CandidatesCardlist";

export default function CompanyFilter() {
  const [open, setopen] = useState(false);
  const [opensize, setopensize] = useState(false);
  const [opensalary, setopensalary] = useState(false);
  const { companyChecked, setcompanyChecked, radioChecked, setradioChecked } =
    useContext(filtercontext);

  function CategoreyCheckValue(e) {
    console.log("value:", e.target.value);
    console.log("check:", e.target.checked);

    setcompanyChecked((prev) => ({
      ...prev,
      categorey: e.target.checked
        ? [...prev.categorey, e.target.value]
        : prev.categorey.filter((item) => item !== e.target.value),
    }));
  }

  function SizeCheckValue(e) {
    setcompanyChecked((prev) => ({
      ...prev,
      size: e.target.checked
        ? [...prev.size, e.target.value]
        : prev.size.filter((item) => item !== e.target.value),
    }));
  }

  function SalaryCheckValue(e) {
    setradioChecked(e.target.value);
  }

function CloseCategorey(categoryToRemove) {
  setcompanyChecked(prev => ({
    ...prev,
    categorey: prev.categorey.filter(
      category => category !== categoryToRemove
    )
  }));
}
function CloseSize(sizeToRemove) {
  setcompanyChecked(prev => ({
    ...prev,
    size: prev.size.filter(
      size => size !== sizeToRemove
    )
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
                checked={companyChecked.categorey.includes("UI/UX Designer")}
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
                checked={companyChecked.categorey.includes("Project Manager")}
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
                checked={companyChecked.categorey.includes(
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
                checked={companyChecked.categorey.includes("Software Tester")}
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
                checked={companyChecked.categorey.includes("Graphic Designer")}
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
            {companyChecked.categorey.length > 0
              ? companyChecked.categorey.map((c) => (
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
      {/* size */}
      <div className="py-2 border-b-1 border-b-border1 mb-2">
        <button
          value={opensize}
          className="w-full h-10 px-4 py-2 flex-gap4 relative cursor-pointer flex-between text-text-primary text-lg font-medium"
          onClick={() => {
            setopensize(!opensize);
          }}
        >
          Company size
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 transition-transform duration-200 ${opensize ? "rotate-180 text-primary" : "rotate-0"} `}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
        {opensize ? (
          <div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="1 - 50"
                checked={companyChecked.size.includes("1 - 50")}
                onChange={SizeCheckValue}
                type="checkbox"
                name="50size"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="50size"
                className="text-md text-text-secondary font-medium"
              >
                1 - 50
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="51 - 200"
                checked={companyChecked.size.includes("51 - 200")}
                onChange={SizeCheckValue}
                type="checkbox"
                name="200size"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="200size"
                className="text-md text-text-secondary font-medium"
              >
                51 - 200
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="201 - 500"
                checked={companyChecked.size.includes("201 - 500")}
                onChange={SizeCheckValue}
                type="checkbox"
                name="500size"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="500size"
                className="text-md text-text-secondary font-medium"
              >
                201 - 500
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="501 - 1000"
                checked={companyChecked.size.includes("501 - 1000")}
                onChange={SizeCheckValue}
                type="checkbox"
                name="1000size"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="1000size"
                className="text-md text-text-secondary font-medium"
              >
                501 - 1000
              </label>
            </div>
            <div className="w-full h-10 px-4 py-2 flex-gap8">
              <input
                value="1000+"
                checked={companyChecked.size.includes("1000+")}
                onChange={SizeCheckValue}
                type="checkbox"
                name="+1000s"
                className="size-6 cursor-pointer accent-primary"
              />
              <label
                htmlFor="+1000s"
                className="text-md text-text-secondary font-medium"
              >
                1000+
              </label>
            </div>
              {companyChecked.size.length > 0
              ? companyChecked.size.map((size) => (
                  <div
                    key={size}
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
                    {size}

                    <button
                      className="cursor-pointer"
                      onClick={() => CloseSize(size)}
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
                {radioChecked 
              ? 
                  <div
                    className="mt-2 h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex-between font-semibold text-primary bg-btn-secondary"
                  >
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
