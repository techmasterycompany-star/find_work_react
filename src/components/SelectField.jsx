export default function SelectField({
  id,
  label,
  required = false,
  error,
  options,
  placeholder = "Select...",
  className = "",
  ...selectProps
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-purple-600"> *</span>}
      </label>
      <select
        id={id}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          ${error ? "border-red-400" : "border-gray-300"}`}
        {...selectProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
