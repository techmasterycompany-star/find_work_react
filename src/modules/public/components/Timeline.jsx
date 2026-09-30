export default function Timeline({date,description}) {
  return (
    <div className="flex-gap12 mb-8">
      <span className="text-text-primary font-bold text-lg">{date}</span>
      <div className="flex items-center w-full">
        <div className="w-6 h-6 bg-primary rounded-full mr-3"></div>
        <div className="bg-card-2 rounded-md border-1 border-border1 flex items-center p-6 w-full h-16">
          <p className="text-sm font-medium text-text-secondary">{description}</p>
        </div>
      </div>
    </div>
  );
}
