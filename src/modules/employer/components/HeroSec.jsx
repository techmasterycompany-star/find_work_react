import Button from "./ButtonFit";
export default function Hero() {
  return (
    <>
      <div className="main flex-between z-0 relative px-20 py-28 bg-linear-to-r from-#F5F3FF from-100% to-#FFF to-0% h-[440px] w-full overflow-hidden">
        <div className="title z-100">
          <div className="h-7 w-fit flex items-center gap-[6px] bg-badge-2 py-[6px] px-3 rounded-xl text-primary font-normal">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Premium Hiring Active
          </div>
          <h1 className="text-text-primary font-bold text-[42px] my-6">
            Welcome back, TechVentures
          </h1>
          <p className="text-text-secondary font-normal text-md w-[774px]">
            Your current open roles are attracting top-tier engineering and
            design talent. Review your applications, matched candidates, and
            interview timeline below.
          </p>
          <div className="actions mt-6 flex-gap16">
            <Button>Post A Job Free</Button>
            <button className="bg-none text-md border-1 w-fit h-10 py-2 px-4 border-primary rounded-2sm cursor-pointer text-primary font-bold">
              Browse Candidates
            </button>
          </div>
        </div>
        <div className="states">
          <div className="big-card z-50 animate-scale w-[380px] flex items-center gap-4 bg-white p-5 rounded-xl shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
            <div className="img w-16 h-16 ">
              <img
                className="max-w-full rounded-2sm"
                src="src\assets\company_logo.png"
                alt=""
              />
            </div>
            <div className="cont">
              <h3 className="text-lg text-text-primary font-bold">
                TechVentures Inc.
              </h3>
              <span className="text-text-placholder font-normal mt-[6px] text-sm">
                Enterprise Tech & SaaS Solutions
              </span>
              <div className="tags flex items-center gap-2 mt-[6px]">
                <span className="py-1 px-2 block flex-center h-5 w-fit rounded-sm bg-status-green-fill text-status-green-dark text-[12px]">
                  Pro Recruiter
                </span>
                <span className="text-[12px] text-primary font-semibold">
                  Billing & Usage
                </span>
              </div>
            </div>
          </div>
          <div className="cards grid grid-cols-3 gap-3 w-[380px] mt-8">
            <div className="box bg-surface p-4 rounded-lg shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
              <p className="mb-1 text-[22px] font-bold text-primary">4</p>
              <span className="text-[12px]  font-medium text-text-placholder">Active job posts</span>
            </div>
             <div className="box bg-surface p-4 rounded-lg shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
              <p className="mb-1 text-[22px] font-bold text-warning">182</p>
              <span className="text-[12px] font-medium text-text-placholder">Total applicants</span>
            </div>
             <div className="box bg-surface p-4 rounded-lg shadow-[0px 8px 24px] shadow-2xl shadow-card-shadow border-border1">
              <p className="mb-1 text-[22px] font-bold text-status-green-dark">12</p>
              <span className="text-[12px] font-medium text-text-placholder">Total Interviews</span>
            </div>
          </div>
        </div>
      </div>
      <div className="shapes z-0 ">
        <div className="w-[520px] h-[520px]  z-[-2] absolute left-[-180px] top-[80px] bg-radial from-section-1 from-[50%] from-[50%] to-section-1-linear to-[100%] mix-blend-multiply blur-3xl"></div>
        <div className="w-[380px] h-[380px]  z-[-2] absolute left-[-120px] top-[130px]  rounded-full bg-[#F3E8FF] mix-blend-multiply blur-3xl opacity-40"></div>
        <div className="w-[380px] h-[380px]  z-[-2] absolute right-[0px] top-[-20px] rounded-full bg-[#F3E8FF] opacity-[60%] "></div>
        <div className="w-[220px] h-[220px]  z-[-2] absolute right-[120px] top-[220px] rounded-full bg-[#F3E8FF] opacity-[60%] "></div>
      </div>
    </>
  );
}
