export default function Applications() {
  const JOBS = Array.from({ length: 3 }, () => ({
    title: "UI/UX Designer",
    posted: "Applied 3 days ago",
    types: "Stripe",
    btn: "View Interview Prep",
    status: "Interview Scheduled",
  }));

  function CompanyLogo() {
    return (
      <div className="grid grid-cols-2 gap-0.5 h-9 w-9 shrink-0">
        <span className="bg-red-500 rounded-tl" />
        <span className="bg-amber-400 rounded-tr" />
        <span className="bg-green-500 rounded-bl" />
        <span className="bg-violet-600 rounded-br" />
      </div>
    );
  }
  
  function ActiveApplyCard({ job }) {
    return (
      <div className="p-6 rounded-2sm bg-card-2 border-1 border-border1 w-full h-fit">
        <div className="flex justify-between items-start pb-4 border-b-1 border-border1 mb-4">
          <div className="info flex gap-1 mb-4">
            <div className="img h-14 w-14 flex justify-items-start items-center">
              <CompanyLogo />
            </div>
            <div className="txt mb-1">
              <h4 className="text-md font-bold text-text-primary">
                {job.title}
              </h4>
              <span className="text-[12px] font-normal text-text-secondary">
                {job.types}
              </span>
            </div>
          </div>
          <div className="h-5 w-fit py-1 px-2 rounded-[4px] text-[12px] flex items-center justify-center font-semibold text-status-green-dark bg-status-green-fill">
            {job.status}
          </div>
        </div>
        <div className="flex-between">
            <div className="text-text-secondary font-normal text-[12px]">{job.posted}</div>
            <button className="text-primary font-semibold text-sm hover:underline cursor-pointer">{job.btn}</button>
        </div>
      </div>
    );
  }

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
      <div className="flex-gap24">
         {JOBS.map((job,i)=>{
           return <ActiveApplyCard key={i} job={job}/>
         })}

      </div>
     
    </section>
  );
}
