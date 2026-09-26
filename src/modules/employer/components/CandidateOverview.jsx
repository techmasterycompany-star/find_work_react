export default function CandidateOverview({title, value, icon}) {
  return (
    <div className="flex-gap8 mb-5">
      <div className="icon w-10 h-10 flex-center bg-section-1 p-1 rounded-2sm">
        {icon}
      </div>
      <div className="content">
        <p className="text-md font-semibold text-text-secondary mb-1">
          {title}
        </p>
        <span className="text-sm font-normal text-text-secondary">{value}</span>
      </div>
    </div>
  );
}
