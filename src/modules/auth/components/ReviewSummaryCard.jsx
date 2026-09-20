export default function ReviewSummaryCard({ title, onEdit, fields }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-purple-600 hover:underline"
        >
          Edit
        </button>
      </div>
      <dl className="space-y-1.5">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <dt className="text-gray-500">{label}</dt>
            <dd className="text-gray-900 font-medium">{value || "—"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
