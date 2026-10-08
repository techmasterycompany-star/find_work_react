import BreadCrump from "../../../components/BreadCrump";
import HeaderSecTwo from "../../../components/HeaderSecTwo";
import { CompanyContext } from "../../../context/CompanyContext";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import company from "../../../assets/company.png";
import CompanyContentInfo from "../../employer/components/CompanyContentInfo";
import CandidateOverview from "../../employer/components/CandidateOverview";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterFill } from "react-icons/ri";
import { RiLinkedinFill } from "react-icons/ri";
import { RiGithubFill } from "react-icons/ri";
import CompanyCommentsCard from "../../employer/components/CompanyComments";
import JobCard from "../../employer/components/JobCard";
import EmployerCard from "../../employer/components/EmployerCard";
import Card from "../../employer/components/CompaniesCard";
import { jobcontext } from "../../../context/JobContext";
import HeaderSecThree from "./HeaderSecThree";

export default function JobDetails() {
  const { jobdata } = useContext(jobcontext);

  //   const { companyId } = useParams();

  //   const oneCompany = companyData.find((c) => {
  //     return c.id == companyId;
  //   });

  return (
    <>
      {jobdata.slice(0,1).map((job) => {
        return (
          <div className="w-full h-fit">
            {/* header */}
            <div
              className="overflow-x-hidden bg-linear-to-b from-#EDE9FE to-bg-surface mb-14"
              key={job}
            >
              <HeaderSecThree
                title="Discover Top Companies"
                BreadCrump={
                  <BreadCrump
                    firstlink="jobs"
                    secondlink="job details"
                  />
                }
                data={job}
              />
            </div>
            
     
          </div>
        );
      })}
    </>
  );
}
