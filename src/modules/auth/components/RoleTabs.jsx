export default function RoleTabs({ value, onChange }) {
  const tabs = [
    { key: 'employer', label: 'Employer' },
    { key: 'candidate', label: 'Candidate' },
  ];
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`py-1.5 rounded-md text-sm font-medium transition-colors
            ${value === tab.key ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}