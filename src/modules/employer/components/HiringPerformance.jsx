const states=[
    {
        label:"Total Hires",
        value:18
    },
     {
        label:"Interview → Hire Rate",
        value:"37.5%"
    },
     {
        label:"Average Time to Hire",
        value:"18 days"
    },
     {
        label:"Offer Acceptance Rate",
        value:"82%"
    }

]
export default function HiringPerformance() {
  return (
    <div className="w-full h-full rounded-lg bg-white border-1 border-border1 p-4">
      <h3 className="text-text-primary font-bold text-lg mb-3">Hiring Performance</h3>
      <div className="grid grid-cols-2 gap-3 h-[320px]">
            {states.map((info)=>{
        return(
            <div className="border-1 h-full border-border1 w-full h-full rounded-2sm flex flex-col gap-4 items-center justify-center p-6">
              <h4 className="text-2xl font-bold text-text-primary">{info.value}</h4>
              <span className="text-sm text-text-placholder font-medium">{info.label}</span>
            </div>
        );
      })}
      </div>
    </div>
  );
}
