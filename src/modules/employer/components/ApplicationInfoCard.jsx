import { useContext } from "react";
import { jobcontext } from "../../../context/JobContext";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../context/UsersContext";

export default function ApplicationInfoCard() {
  const { jobdata } = useContext(jobcontext);
  const {candidatedata}=useContext(UserContext);
  const { applicantsId } = useParams();

  let data = jobdata.find((f) => {
    return f.id == applicantsId;
  });

  const stats = [
    {
      label: "Total Applicants",
      value: `${parseInt(data.applications.length)}`,
    },
    {
      label: "Shortlisted",
      value: candidatedata.filter(
        (s) =>{ return ( s.status === "shortlisted");}
      ).length,
    },
     {
      label: "Under Review",
      value: candidatedata.filter(
        (s) =>{ return ( s.status === "UnderReview");}
      ).length,
    },
  ];

  return (
    <div className="w-full h-fit rounded-md border-1 border-border1 bg-white p-6 flex-between">
      <div className="jobprofile flex-gap16">
        <div className="img w-14 h-14">
          <img className="max-w-full rounded-md" src={data.img} alt="" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {data.title}
          </h3>
          <div className="flex-gap8">
            <span className="text-text-secondary font-medium text-md">
              {data.company}
            </span>
            <div className="bg-gray-400 h-2 w-2 rounded-full"></div>
            <span>{data.date}</span>
            <div className="status">
              <div className="badge">{data.status}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="stats">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((state) => {
            return (
              <div className="flex flex-col items-center justify-center">
                <p className={`mb-2 text-4xl font-bold ${state.label == "Shortlisted" ? "text-status-green-dark": state.label == "Under Review" ? "text-[#0072C3]" : "text-primary" }`}>{state.value}</p>
                <span className="text-[12px] text-text-placholder font-medium">
                  {state.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
