import { useContext, useState } from "react";
import { UserContext } from "../../../context/UsersContext";
import { useParams } from "react-router-dom";
import BreadCrump from "../../../components/BreadCrump";
import ButtonFull from "../components/Buttonfull";

export default function ApplicantDetails() {
  const [status, setstatus] = useState("review");
  const { candidatedata } = useContext(UserContext);
  const { profileId } = useParams();

  const applicant = candidatedata.find((f) => {
    return f.id == profileId;
  });
  const skills = (applicant?.skills ?? []).map((s, i) => ({
    id: s.id ?? i,
    skill: s.skillname ?? s.name ?? String(s),
  }));
  return (
    <div className="min-h-screen overflow-x-hidden pt-20 px-20 bg-linear-to-b  from-[#EDE9FE] to-[#ffffff] w-full h-fit">
      <BreadCrump
        firstlink={"Ui/Ux Designer"}
        secondlink={"Applications"}
        thirdlink={applicant.name}
      />
      <div className="flex gap-8 items-start">
        {/* first column */}
        <div className="w-full">
          {/* user info */}
          <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1 bg-white mb-6">
            <div className="users flex-gap16">
              <div className="img w-16 h-16">
                <img
                  className="max-w-full rounded-full"
                  src={applicant.img}
                  alt=""
                />
              </div>
              <div className="content">
                <h3 className="text-text-primary font-bold text-lg">
                  {applicant.name}
                </h3>
                <div className="flex-gap8">
                  <span className="text-sm font-medium text-text-secondary">
                    {applicant.job}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span className="text-sm font-medium text-text-secondary">
                    {applicant.exp}
                  </span>
                </div>
                <div className="flex-gap12 mt-1">
                  <div className="flex-gap2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-5 text-text-secondary"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                      />
                    </svg>

                    <span className="text-text-secondary font-medium text-sm">
                      {applicant.Address}
                    </span>
                  </div>
                  <div className="flex-gap2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14.6664 4.66679L8.67195 8.48441C8.46853 8.60254 8.23748 8.66476 8.00223 8.66476C7.76699 8.66476 7.53593 8.60254 7.33251 8.48441L1.33203 4.66679M2.66547 2.66699H13.333C14.0694 2.66699 14.6664 3.26389 14.6664 4.00019V11.9994C14.6664 12.7357 14.0694 13.3326 13.333 13.3326H2.66547C1.92903 13.3326 1.33203 12.7357 1.33203 11.9994V4.00019C1.33203 3.26389 1.92903 2.66699 2.66547 2.66699Z"
                        stroke="#A1A1AA"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                    <span className="text-text-secondary font-medium text-sm">
                      {applicant.name}@design.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* cover letter */}
          <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1 bg-white mb-6">
            <h3 className="text-text-primary font-bold text-lg">
              Cover Letter
            </h3>
            <p className="text-sm text-text-secondary font-medium w-full break-all">
              {applicant.educationsummary}
            </p>
          </div>
          {/* Work Experience */}
          <div className="w-full h-fit p-8 rounded-2sm border-1 border-border1 bg-white mb-6">
            <h3 className="text-text-primary font-bold text-lg mb-5">
              Work Experience
            </h3>
            <div className="border-b-1 border-border1 pb-4 mb-4">
              <div className="flex-between">
                <p className="text-md font-medium text-text-primary">
                  {applicant.companyjob}
                </p>
                <span className="text-primary text-sm font-medium">
                  {applicant.joincompanydate}-{applicant.certificatedate}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  {applicant.company}
                </p>
                <ul className="list-disc pl-4">
                  <li>
                    Spearheaded the design of a next-generation mobile banking
                    experience, increasing active retention by 22%.
                  </li>
                  <li>
                    Maintained and governed the enterprise-wide design token
                    system across Web and Native platforms.
                  </li>
                </ul>
              </div>
            </div>
            <div className="pb-4">
              <div className="flex-between">
                <p className="text-md font-medium text-text-primary">
                  {applicant.companyjob}
                </p>
                <span className="text-primary text-sm font-medium">
                  {applicant.joincompanydate}-{applicant.certificatedate}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">
                  {applicant.company}
                </p>
                <ul className="list-disc pl-4">
                  <li>
                    Spearheaded the design of a next-generation mobile banking
                    experience, increasing active retention by 22%.
                  </li>
                  <li>
                    Maintained and governed the enterprise-wide design token
                    system across Web and Native platforms.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* skills */}
          <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1 bg-white mb-6">
            <h3 className="text-text-primary font-bold text-lg">
              Skills & Expertise
            </h3>
            <div className="flex-gap8">
              <div className="grid grid-cols-3 gap-y-4 mt-3">
                {skills.length === 0 && (
                  <p className="col-span-3 text-sm text-zinc-400">
                    No skills listed.
                  </p>
                )}
                {skills.map((m) => (
                  <div key={m.id}>
                    <span className="badge">{m.skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* second column */}
        <div className="w-[800px]">
          <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1 bg-white mb-6">
            <div>
              <div className="pb-4 border-b-1 border-b-border1 flex flex-col gap-3 justify-center items-center">
                <div className="w-25 h-25 border-4 bg-section-2 border-primary flex-center text-primary text-3xl font-bold rounded-full">
                  {parseInt(applicant.match)}%
                </div>
                <span className="block">Excellent Fit Match</span>
              </div>
              <div>
                <span className="text-sm font-medium text-text-secondary block mb-3 mt-5">
                  Application Status
                </span>
                <select
                  value={status}
                  onChange={(e) => {
                    setstatus(e.target.value);
                  }}
                  className="w-full bg-card-2 outline-none border-1 border-primary px-4 rounded-2sm h-12"
                >
                  <option value="review">Under Review</option>
                  <option value="new">New</option>
                  <option value="rejected">Rejected</option>
                  <option value="shortlisted">Shortlisted</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1 bg-white mb-6">
            <h3 className="text-lg font-bold text-text-primary mb-3">
              Documents
            </h3>
            <div className="w-full outline-none border-1 border-border1 px-4 rounded-2sm h-12 flex-between">
              <div className="flex-gap8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 text-primary"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <span>{applicant.name}_CV.pdf</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4 text-grey-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1 bg-white mb-6">
            <h3 className="text-lg font-bold text-text-primary mb-3">
              Quick Actions
            </h3>
            <div className="border-b-1 border-b-border1 pb-3">
              <ButtonFull>Schedule Interview</ButtonFull>
              <button className="text-center w-full cursor-pointer text-primary my-3 hover:underline">
                Shortlist Candidate
              </button>
              <button className="text-center w-full cursor-pointer text-text-secondary mb-3 hover:underline">
                Send Message
              </button>
            </div>
             <button className="text-center w-full cursor-pointer text-status-red-dark my-3 hover:underline">
                Reject Candidate
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}
