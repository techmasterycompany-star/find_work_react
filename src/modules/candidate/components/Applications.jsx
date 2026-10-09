import { useMyApplications } from "../hooks/useCandidateQueries";
import { toApplicationCard } from "../../public/services/publicAdapters";

function CompanyLogo({ logo }) {
  if (logo) {
    return (
      <img src={logo} alt="" className="h-9 w-9 shrink-0 rounded-lg object-cover bg-zinc-100" />
    );
  }
  return (
    <div className="grid grid-cols-2 gap-0.5 h-9 w-9 shrink-0">
      <span className="bg-red-500 rounded-tl" />
      <span className="bg-amber-400 rounded-tr" />
      <span className="bg-green-500 rounded-bl" />
      <span className="bg-violet-600 rounded-br" />
    </div>
  );
}

function ActiveApplyCard({ app }) {
  const statusCls = app.status === "Interview Scheduled" || app.status === "Accepted"
    ? "text-status-green-dark bg-status-green-fill"
    : app.status === "Rejected"
      ? "text-red-700 bg-red-100"
      : "text-amber-700 bg-amber-100";

  return (
    <div className="p-6 rounded-2sm bg-card-2 border-1 border-border1 w-full h-fit">
      <div className="flex justify-between items-start pb-4 border-b-1 border-border1 mb-4">
        <div className="info flex gap-1 mb-4">
          <div className="img h-14 w-14 flex justify-items-start items-center">
            <CompanyLogo logo={app.companyLogo} />
          </div>
          <div className="txt mb-1">
            <h4 className="text-md font-bold text-text-primary">
              {app.title}
            </h4>
            <span className="text-[12px] font-normal text-text-secondary">
              {app.types}
            </span>
          </div>
        </div>
        <div className={`h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex items-center justify-center font-semibold ${statusCls}`}>
          {app.status}
        </div>
      </div>
      <div className="flex-between">
        <div className="text-text-secondary font-normal text-[12px]">{app.posted}</div>
        <button className="text-primary font-semibold text-sm hover:underline cursor-pointer">{app.btn}</button>
      </div>
    </div>
  );
}

export default function Applications() {
  const { data: rawApps = [], isLoading, isError } = useMyApplications();
  const apps = rawApps.map(toApplicationCard).slice(0, 3);

  return (
    <section className="p-20 bg-surface">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-zinc-900">
          Active Applications
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Real-time status updates on roles you have applied for.
        </p>
      </div>

      {isLoading ? (
        <p className="py-8 text-center text-sm text-zinc-500">Loading applications…</p>
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500">Failed to load applications.</p>
      ) : apps.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-zinc-500">You have no applications yet.</p>
          <a href="/candidate/find-jobs" className="mt-3 inline-block text-sm font-semibold text-violet-600 hover:underline">
            Browse jobs →
          </a>
        </div>
      ) : (
        <div className="flex-gap24">
          {apps.map((app) => (
            <ActiveApplyCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </section>
  );
}
