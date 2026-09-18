export default function RoleOptionCard({ icon, title, description, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-xl border-2 p-4 transition-colors
        ${selected ? 'border-purple-600 bg-purple-50/40' : 'border-gray-200 hover:border-gray-300'}`}
    >
      <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="font-semibold text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-3">
        <span
          className={`inline-block h-4 w-4 rounded-full border-2
            ${selected ? 'border-purple-600' : 'border-gray-300'}`}
        >
          {selected && <span className="block h-2 w-2 m-0.5 rounded-full bg-purple-600" />}
        </span>
      </div>
    </button>
  );
}