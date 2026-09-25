import Input from "./input";
export default function Marketing(){
    return(
       <section className="px-20 py-20 bg-section-1 flex-between bg-section-1">
         <div className="content">
           <div className="mb-3 h-7 w-fit flex items-center gap-[6px] bg-badge-2 py-[6px] px-3 rounded-xl text-primary font-normal">
            🏢
             Hire Top Talent
          </div>
          <h3 className="mb-3 text-4xl font-bold text-text-primary">Find your next great hire, faster.</h3>
          <p className="font-normal text-md w-[700px] text-text-secondary">Post jobs, search candidates, and connect with top talent in minutes. Join over 10,000 companies already hiring smarter.</p>
          <Input btntext="Find Talent" firstplaceholder="Search candidates by skill, role, or keyword" secondplaceholder="location"/> {/*component*/}
          <div className="mt-6 flex-gap24">
             <div className="text-[12px] font-normal text-text-secondary flex-gap6">
               <div className="w-2 h-2 rounded-2sm bg-status-green-dark"></div>
               Free forever
             </div>
                 <div className="text-[12px] font-normal text-text-secondary flex-gap6">
               <div className="w-2 h-2 rounded-2sm bg-status-green-dark"></div>
               No credit card required
             </div>
                 <div className="text-[12px] font-normal text-text-secondary flex-gap6">
               <div className="w-2 h-2 rounded-2sm bg-status-green-dark"></div>
              500K+ active candidates
             </div>
          </div>
         </div>
         <div className="img w-[440px] h-[360px]"><img className="max-w-full rounded-xl" src="src\assets\team.png" alt="" /></div>
       </section>
    );
}

