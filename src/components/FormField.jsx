export default function FormField({
  id,
  label,
  required = false,
  error,
  type = "text",
  className = "",
  ...inputProps
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
      <input
        id={id}
        type={type}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
          ${error ? "border-red-400" : "border-gray-300"}`}
        {...inputProps}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
