export default function WorkExperience({value}) {
  return (
    <div className="mb-5">
      <h4 className="font-bold text-lg text-text-primary mb-3">{value.companyjob}</h4>
      <span className="font-medium text-sm text-primary block mb-3">{value.company}</span>
      <p className="font-medium text-md text-text-secondary mb-4">
        {value.worksummary}
      </p>
      <div className="w-[176px] h-8 bg-section-1 flex-center rounded-full border-1 border-primary font-medium text-sm text-text-primary">
        <span>{value.joincompanydate}</span>
      </div>
    </div>
  );
}
