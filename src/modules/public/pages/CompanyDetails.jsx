import BreadCrump from "../../../components/BreadCrump";
import HeaderSecTwo from "../../../components/HeaderSecTwo";
import { useParams } from "react-router-dom";
import company from "../../../assets/company.png";
import CompanyContentInfo from "../../employer/components/CompanyContentInfo";
import CandidateOverview from "../../employer/components/CandidateOverview";
import {
  RiFacebookFill,
  RiTwitterFill,
  RiLinkedinFill,
  RiGithubFill,
} from "react-icons/ri";
import CompanyCommentsCard from "../../employer/components/CompanyComments";
import JobCard from "../../employer/components/JobCard";
import EmployerCard from "../../employer/components/EmployerCard";
import CompanyCard from "../../employer/components/CompaniesCard";
import {
  useCompanyById,
  useCompanies,
} from "../../public/hooks/usePublicQueries";

export default function CompanyDetails() {
  const { companyId } = useParams();
  const { data: oneCompany, isLoading, isError } = useCompanyById(companyId);
  const { data: allCompanies = [] } = useCompanies();
  const relatedCompanies = allCompanies
    .filter((c) => String(c.id) !== String(companyId))
    .slice(0, 3);
  const companycard = relatedCompanies.map((m) => (
    <CompanyCard key={m.id} company={m} />
  ));

  if (isLoading) {
    return (
      <div className="py-20 text-center text-sm text-gray-500">
        Loading company…
      </div>
    );
  }
  if (isError || !oneCompany) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-500">Failed to load company.</p>
        <p className="mt-2 text-xs text-gray-400">Company ID: {companyId}</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-fit">
        <div
          className="overflow-x-hidden bg-linear-to-b from-#EDE9FE to-bg-surface mb-14"
          key={oneCompany.id}
        >
          <HeaderSecTwo
            title="Discover Top Companies"
            BreadCrumb={
              <BreadCrump firstlink="Companies" secondlink="Company details" />
            }
            data={oneCompany}
            description="Explore leading companies, learn about their culture, and find your next career opportunity."
            img={company}
          />
        </div>
        <section className="w-[1380px]  ml-20 bg-surface mb-20">
          <div className=" flex justify-between w-full items-start">
            <div className="content w-full">
              <CompanyContentInfo
                title="About Company"
                value={oneCompany.description || "No description available."}
              />
              <CompanyContentInfo
                title="Company Culture"
                value={oneCompany.description || "—"}
              />
              <CompanyContentInfo
                title="Company Benefits"
                value={oneCompany.description || "—"}
              />
            </div>
            <div className="menu w-fit">
              <div className="actions flex-center gap-3 mb-6">
                <button
                  className="flex items-center justify-center w-full h-14 py-2 px-4  bg-primary text-white
                  font-bold border-0 rounded-2sm cursor-pointer text-md"
                >
                  Follow
                </button>
                <button className="icon w-14 h-14 rounded-2sm p-2 flex-center border-1 border-primary cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.3076 4.25C12.0266 4.24999 13.3953 4.25026 14.4678 4.39844C15.5758 4.55156 16.4786 4.87503 17.1895 5.60547C17.8974 6.33313 18.2087 7.25292 18.3564 8.38184C18.5 9.47983 18.5 10.8825 18.5 12.6523V18.0459C18.5 19.1448 18.4996 20.0524 18.4014 20.7334C18.3013 21.427 18.0694 22.1205 17.3965 22.5039C16.784 22.8527 16.1105 22.7792 15.5527 22.5986C14.9899 22.4163 14.4215 22.0875 13.9062 21.7402C13.3851 21.3889 12.8743 20.9886 12.4316 20.6396L12.3818 20.5996C11.9464 20.2562 11.5989 19.983 11.335 19.8135C10.9595 19.5723 10.7261 19.4236 10.5381 19.3291C10.3657 19.2424 10.2928 19.2344 10.25 19.2344C10.2072 19.2344 10.1343 19.2424 9.96191 19.3291C9.77389 19.4236 9.54052 19.5723 9.16504 19.8135C8.90132 19.9829 8.55406 20.2558 8.11914 20.5986L8.11816 20.5996L8.06836 20.6396C7.62572 20.9886 7.11488 21.3889 6.59375 21.7402C6.07844 22.0875 5.51008 22.4163 4.94727 22.5986C4.38956 22.7792 3.71598 22.8527 3.10352 22.5039C2.43053 22.1205 2.19864 21.427 2.09863 20.7334C2.00034 20.0518 1.99997 19.1431 2 18.043V12.6523C1.99999 10.8825 1.99994 9.47985 2.14355 8.38184C2.29125 7.25293 2.60249 6.33312 3.31055 5.60547C4.02131 4.87502 4.92426 4.55156 6.03223 4.39844C7.1047 4.25026 8.47349 4.24999 10.1924 4.25H10.3076ZM10.25 5.75C8.46073 5.75 7.19617 5.7515 6.23828 5.88379C5.30419 6.01285 4.77323 6.25324 4.38574 6.65137C3.99546 7.05244 3.75775 7.60625 3.63086 8.57617C3.50142 9.56554 3.5 10.87 3.5 12.707V17.9805C3.5 19.1582 3.50202 19.9579 3.58301 20.5195C3.66403 21.0812 3.79401 21.1707 3.8457 21.2002C3.93467 21.2509 4.11607 21.2914 4.48535 21.1719C4.84964 21.0539 5.28067 20.8156 5.75488 20.4961C6.22333 20.1803 6.69344 19.8136 7.13965 19.4619L7.22461 19.3945C7.62606 19.0778 8.02683 18.7622 8.35449 18.5518L8.38379 18.5322C8.7207 18.3158 9.02082 18.1225 9.28809 17.9883C9.57895 17.8421 9.8895 17.7344 10.25 17.7344C10.6105 17.7344 10.921 17.8421 11.2119 17.9883C11.4792 18.1225 11.7793 18.3157 12.1162 18.5322L12.1455 18.5518C12.4732 18.7622 12.8739 19.0777 13.2754 19.3945L13.3604 19.4619C13.8066 19.8136 14.2766 20.1803 14.7451 20.4961C15.2194 20.8156 15.6504 21.0539 16.0146 21.1719C16.384 21.2914 16.5653 21.2509 16.6543 21.2002C16.7059 21.1707 16.836 21.0814 16.917 20.5195C16.998 19.9579 17 19.1582 17 17.9805V12.707C17 10.87 16.9986 9.56554 16.8691 8.57617C16.7423 7.60624 16.5046 7.05244 16.1143 6.65137C15.7268 6.25323 15.1958 6.01285 14.2617 5.88379C13.3039 5.75149 12.0392 5.75 10.25 5.75Z"
                      fill="#7C3AED"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-[412px] h-[800px] rounded-md border-2 border-border1 bg-card-2 p-6">
                <div className="overview">
                  <h3 className="font-bold text-xl text-text-primary mb-5">
                    Company Overview
                  </h3>
                  <CandidateOverview
                    title="Primary industry"
                    value={oneCompany.companyScope || "Information Technology"}
                    icon={null}
                  />
                  <CandidateOverview
                    title="Company Size"
                    value={oneCompany.employeesnum || "—"}
                    icon={null}
                  />
                  <CandidateOverview
                    title="Open jobs"
                    value={String(oneCompany.openjobsnum ?? 0)}
                    icon={null}
                  />
                  <CandidateOverview
                    title="Total views"
                    value={String(oneCompany.views ?? 0)}
                    icon={null}
                  />
                  <CandidateOverview
                    title="Location"
                    value={oneCompany.Address || "—"}
                    icon={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ml-20 mb-20 flex gap-4">
          <RiFacebookFill className="h-8 w-8 text-violet-600" />
          <RiTwitterFill className="h-8 w-8 text-violet-600" />
          <RiLinkedinFill className="h-8 w-8 text-violet-600" />
          <RiGithubFill className="h-8 w-8 text-violet-600" />
        </div>

        <section className="ml-20 mb-20">
          <h3 className="mb-6 text-xl font-bold text-text-primary">
            Related Companies
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {companycard}
          </div>
        </section>
      </div>
    </>
  );
}
