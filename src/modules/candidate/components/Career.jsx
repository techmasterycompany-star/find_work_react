import CareerCard from "./CareerCard";

let skills=[
    {
        title:"Tailwind CSS",
        percent:34,
        jobnum:412,
    },
      {
        title:"Figma Prototyping",
        percent: 21,
        jobnum:650,
    },
      {
        title:"TypeScript",
        percent:45,
        jobnum:818,
    },
      {
        title:"Next.js Framework",
        percent:50,
        jobnum:289,
    },
];
let skillslist=skills.map((skill,i)=>{
   return (
    <div className="pb-3 flex-between border-b-1 border-b-border1 w-full mb-5 h-fit" key={i}>
        <div>
            <h4 className="text-lg text-text-primary font-semibold mb-1/2">{skill.title}</h4>
            <span className="text-status-green-dark text-[12px] font-normal">+{skill.percent}% this month</span>
        </div>
        <div className="w-fit h-6 px-4 py-1 flex-center bg-surface rounded-full border-1 border-border1 text-[12px] text-text-secondary font-semibold">{skill.jobnum} jobs</div>
    </div>
   );
});

export default function Career() {
  return (
    <section className="p-20 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900">
          Grow Your Freelance Career
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Expert insights and high-demand trending skills to level up your work.
        </p>
      </div>
      <div className="flex items-center gap-8">
        {/* articles */}
        <div className="w-full h-full">
          <CareerCard />
        </div>
        {/* demand skills */}
        <div className="w-full h-full bg-card-2 border-1 border-primary p-8 rounded-lg">
          <div className="title">
            <h3 className="text-lg text-text-primary font-semibold mb-2">
              High Demand Skills
            </h3>
            <p className="font-medium text-[12px] text-text-secondary">
              Top matching skills currently searched by tech hirers
            </p>
          </div>
          <div className="mt-6">
            {skillslist}
          </div>
        </div>
      </div>
    </section>
  );
}
