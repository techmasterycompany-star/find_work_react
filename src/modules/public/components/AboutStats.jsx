const QUICK_STATS = [
  { value: "2.4M+", label: "Registered Freelancers" },
  { value: "850K+", label: "Projects Completed" },
  { value: "190+", label: "Countries Served" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function AboutStats(){
    return(
        <section className="py-12 px-20 flex-center bg-surface w-full h-[280px] mt-[-260px]">
            <div className="w-[1280px] h-[172px] bg-primary flex-center py-12 px-6 rounded-2sm">
            <div className="flex-gap20">
                {QUICK_STATS.map((state,i)=>{
                    return (
                    <div key={i} className="w-[266px] h-20">
                        <h3 className="font-bold text-3xl text-center text-white mb-3">{state.value}</h3>
                        <span className="text-xl text-center block font-medium text-[#E4E4E7]">{state.label}</span>
                    </div>
                    );
                })}
            </div>
        </div>
        </section>
       
    );
}