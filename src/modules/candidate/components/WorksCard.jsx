export default function WorksCard({title,description,icon,stepbadge,selected}) {
  return (
    <div className="w-full flex-center flex-col">
      <div className={`icon w-20 h-20 rounded-full flex-center mb-4 ${selected ? "bg-primary text-white" : "bg-surface text-primary border-1 border-primary "} `}>
         {icon}
      </div>
      <div className={`text-[12px] font-bold w-fit px-3 py-2 h-6 mb-2 rounded-full flex-center ${selected ? "bg-primary text-white" : "bg-[#F5F3FF] text-primary"}`}>{stepbadge}</div>
      <h3 className="text-text-primary font-bold text-md mb-2">{title}</h3>
      <p className="text-[12px] text-center font-normal text-text-secondary w-full">{description}</p>
    </div>
  );
}
