export function TextAreaField({ id, label, required = false, error, className = "", ...props }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-primary"> *</span>}
      </label>
      <textarea id={id} className={`min-h-28 w-full resize-y rounded-lg border px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-purple-100 ${error ? "border-red-400" : "border-gray-300"}`} {...props} />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function ChoiceGroup({ label, required = false, name, options, value, onChange, error }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-gray-700">{label}{required && <span className="text-primary"> *</span>}</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {options.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={(event) => onChange(event.target.value)} className="h-4 w-4 accent-[#7c3aed]" />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </fieldset>
  );
}

export function CheckGroup({ label, options, values, onChange }) {
  const toggle = (value) => onChange(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-gray-700">{label}</legend>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={values.includes(option)} onChange={() => toggle(option)} className="h-4 w-4 rounded accent-[#7c3aed]" />
            {option}
          </label>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-400">Select all key perks you provide.</p>
    </fieldset>
  );
}
