import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const STATUS_STYLES = {
  shortlisted: { label: "Shortlisted", cls: "bg-green-500/10 text-[#22C55E]" },
  accepted: { label: "Shortlisted", cls: "bg-green-500/10 text-[#22C55E]" },
  interview: { label: "Interview", cls: "bg-violet-100 text-violet-700" },
  UnderReview: { label: "Under Review", cls: "bg-section-1 text-primary" },
  under_review: { label: "Under Review", cls: "bg-section-1 text-primary" },
  submitted: { label: "New", cls: "bg-[#E4E4E7] text-[#52525B]" },
  New: { label: "New", cls: "bg-[#E4E4E7] text-[#52525B]" },
  pending: { label: "Pending", cls: "bg-amber-100 text-amber-700" },
  rejected: { label: "Rejected", cls: "bg-red-500/10 text-[#EF4444]" },
  cancelled: { label: "Cancelled", cls: "bg-gray-200 text-gray-600" },
};

export function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? { label: status ?? "Unknown", cls: "bg-gray-100 text-gray-600" };
  return <span className={`rounded px-2 py-1 text-xs ${style.cls}`}>{style.label}</span>;
}

export default function ApplicantsCard({ applicant }) {
  const user = applicant ?? {};
  const { jobId } = useParams();
  return (
    <div
      className="flex-between mb-6 border-1 border-border1 rounded-2sm p-4"
      key={user.id}
    >
      <div className="users flex-gap16 w-[600px]">
        <div className="img w-12 h-12">
          {user.img ? (
            <img className="max-w-full rounded-full" src={user.img} alt="" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold text-sm">
              {(user.name || "?").slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="content">
          <h3 className="text-text-primary font-bold text-md">{user.name}</h3>
          <div className="flex-gap8">
            <span className="text-sm font-medium text-text-secondary">
              {user.job}
            </span>
            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            <span className="text-sm font-medium text-text-secondary">
              {user.exp}
            </span>
          </div>
          <span className="text-text-placholder text-[12px] font-medium block">
            Applied on {user.joindate}
          </span>
        </div>
      </div>
      <div className="w-[72px]">
        <div className="w-full h-18 flex-center flex-col">
          <p className="text-lg font-semibold text-primary mb-2">
            {parseInt(user.match ?? 0)}%
          </p>
          <span className="text-[12px] font-medium text-text-placholder">
            Match Score
          </span>
        </div>
      </div>
      <div className="flex-gap16 w-[320px] justify-end">
        <StatusBadge status={user.status} />
        <Link to={`/employer/myjobs/applicants/${jobId}/profile/${user.id}`}>
          <button
            className="flex items-center justify-center w-fit h-10 py-2 px-4 text-primary
                 font-bold border-1 border-primary rounded-2sm cursor-pointer text-sm hover:bg-primary hover:text-white"
          >
            View Profile
          </button>
        </Link>
        <div className="flex-gap12">
          <div className="icon w-8 h-8 flex-center rounded-2sm p-2 bg-status-green-fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.3336 4L6.00097 11.3328L2.66797 7.99971" stroke="#00875A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="icon w-8 h-8 flex-center rounded-2sm p-2 bg-status-error-fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M9.99939 6.00005L5.99907 10.0004M5.99907 6.00005L9.99939 10.0004M14.6664 8.00021C14.6664 11.6824 11.6814 14.6674 7.99923 14.6674C4.31704 14.6674 1.33203 11.6824 1.33203 8.00021C1.33203 4.31801 4.31704 1.33301 7.99923 1.33301C11.6814 1.33301 14.6664 4.31801 14.6664 8.00021Z" stroke="#EF4444" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
