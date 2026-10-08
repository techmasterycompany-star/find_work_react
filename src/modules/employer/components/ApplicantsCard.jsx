import { useContext } from "react";
import { UserContext } from "../../../context/UsersContext";
import { Link } from "react-router-dom";

export const STATUS_STYLES = {
  shortlisted: { label: "Shortlisted", cls: "bg-green-500/10 text-[#22C55E]" },
  UnderReview: { label: "Under Review", cls: "bg-section-1 text-primary" },
  New: { label: "New", cls: "bg-[#E4E4E7] text-[#52525B]" },
  rejected: { label: "Rejected", cls: "bg-red-500/10 text-[#EF4444]" },
};

export function StatusBadge({ status }) {
  const { label, cls } = STATUS_STYLES[status];
  return <span className={`rounded px-2 py-1 text-xs ${cls}`}>{label}</span>;
}

export default function ApplicantsCard() {
  const { candidatedata } = useContext(UserContext);
  return (
    <>
      <div className="w-full h-fit p-5 rounded-2sm border-1 border-border1">
        {candidatedata.map((user) => {
          return (
            <div className="flex-between" key={user.id}>
              {/* user info */}
              <div className="users flex-gap16">
                <div className="img w-12 h-12">
                  <img
                    className="max-w-full rounded-full"
                    src={user.img}
                    alt=""
                  />
                </div>
                <div className="content">
                  <h3 className="text-text-primary font-bold text-md">
                    {user.name}
                  </h3>
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
              {/* actions */}
              <div className="flex-gap16">
                {/* match */}
                <div>
                  <p className="text-lg font-semibold text-primary mb-2">
                    {parseInt(user.match)}
                  </p>
                  <span className="text-[12px] font-medium text-text-placholder">
                    Match Score
                  </span>
                </div>
                {/* status */}
                <StatusBadge status={user.status} />
                {/* btn */}
                <Link to={`profile/${user.id}`}>
                  <button
                    className="flex items-center justify-center w-fit h-10 py-2 px-4 text-primary
                 font-bold border-1 border-primary rounded-2sm cursor-pointer text-md hover:bg-primary hover:text-white"
                  >
                    View Profile
                  </button>
                </Link>

                {/* acceptance */}
                <div className="flex-gap12">
                  <div className="icon w-8 h-8 flex-center rounded-2sm p-2 bg-status-green-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M13.3336 4L6.00097 11.3328L2.66797 7.99971"
                        stroke="#00875A"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                  <div className="icon w-8 h-8 flex-center rounded-2sm p-2 bg-status-error-fill">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.99939 6.00005L5.99907 10.0004M5.99907 6.00005L9.99939 10.0004M14.6664 8.00021C14.6664 11.6824 11.6814 14.6674 7.99923 14.6674C4.31704 14.6674 1.33203 11.6824 1.33203 8.00021C1.33203 4.31801 4.31704 1.33301 7.99923 1.33301C11.6814 1.33301 14.6664 4.31801 14.6664 8.00021Z"
                        stroke="#EF4444"
                        stroke-linecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
