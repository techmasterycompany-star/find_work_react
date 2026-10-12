import { useEffect, useRef, useState } from "react";
import { HiOutlineCamera } from "react-icons/hi2";
import {
  useEmployerProfile,
  useUpdateEmployerProfile,
  useUploadEmployerLogo,
} from "../hooks/useEmployerQueries";

const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Education", "Other"];

function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "C";
  return parts[0].slice(0, 1).toUpperCase();
}

export default function EmployerProfileTab() {
  const { data: profile, isLoading } = useEmployerProfile();
  const updateProfile = useUpdateEmployerProfile();
  const uploadLogo = useUploadEmployerLogo();
  const fileInput = useRef(null);

  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoError, setLogoError] = useState("");

  useEffect(() => {
    if (!profile) return;
    const p = profile.employerProfile ?? profile;
    setCompanyName(p.companyName ?? "");
    setWebsite(p.website ?? "");
    setDescription(p.description ?? "");
    setIndustry(p.industry ?? "");
    setLogoUrl(p.logoUrl ?? p.logo ?? "");
  }, [profile]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile.mutate({
      companyName,
      website,
      description,
      industry,
    });
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setLogoError("Use a PNG, JPG, or GIF image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setLogoError("Logo files must be 2MB or smaller.");
      return;
    }
    setLogoError("");
    try {
      await uploadLogo.mutateAsync(file);
      const reader = new FileReader();
      reader.onload = () => setLogoUrl(reader.result);
      reader.readAsDataURL(file);
    } catch (err) {
      setLogoError(
        err?.response?.data?.message ??
          err?.message ??
          "Logo upload failed.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Company logo"
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(companyName)
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={uploadLogo.isPending}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow ring-1 ring-gray-200 hover:bg-gray-50 disabled:opacity-60"
              title="Change logo"
            >
              <HiOutlineCamera className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg,image/gif"
              className="hidden"
              onChange={handleLogoChange}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Company Profile
            </h2>
            <p className="text-sm text-gray-500">
              Public information visible to candidates
            </p>
            {logoError && (
              <p className="mt-1 text-xs text-red-500">{logoError}</p>
            )}
            {uploadLogo.isSuccess && (
              <p className="mt-1 text-xs text-emerald-600">Logo updated.</p>
            )}
          </div>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-gray-500">
            Loading profile…
          </p>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <LabeledInput
              label="Company Name"
              required
              value={companyName}
              onChange={setCompanyName}
              placeholder="e.g. Job4U Inc."
            />

            <LabeledInput
              label="Website"
              required
              type="url"
              value={website}
              onChange={setWebsite}
              placeholder="https://your-company.com"
            />

            <LabeledTextarea
              label="Company Description"
              required
              value={description}
              onChange={setDescription}
              placeholder="Tell candidates about your company, mission and values"
              max={312}
            />

            <LabeledSelect
              label="Industry"
              required
              value={industry}
              onChange={setIndustry}
              options={INDUSTRIES}
            />

            <LabeledInput
              label="Company Size"
              required
              value=""
              onChange={() => {}}
              disabled
              hint="Coming soon"
            />

            <LabeledInput
              label="Founded Year"
              required
              type="number"
              value=""
              onChange={() => {}}
              disabled
              hint="Coming soon"
            />

            <LabeledInput
              label="Company Location"
              required
              value=""
              onChange={() => {}}
              disabled
              hint="Coming soon"
            />

            <LabeledTextarea
              label="Company Benefits"
              required
              value=""
              onChange={() => {}}
              disabled
              hint="Coming soon"
              max={512}
              placeholder="List perks and benefits your company offers"
            />

            <LabeledTextarea
              label="Company Culture"
              required
              value=""
              onChange={() => {}}
              disabled
              hint="Coming soon"
              max={512}
              placeholder="Describe your company culture and work environment"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
              >
                {updateProfile.isPending ? "Saving…" : "Save Changes"}
              </button>
            </div>
            {updateProfile.isSuccess && (
              <p className="text-right text-xs text-emerald-600">
                Profile saved.
              </p>
            )}
            {updateProfile.isError && (
              <p className="text-right text-xs text-red-500">
                Failed to save: {updateProfile.error?.message}
              </p>
            )}
          </form>
        )}
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Contact Info
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <LabeledInput
            label="Company Email"
            required
            type="email"
            value=""
            onChange={() => {}}
            disabled
            hint="Coming soon"
          />
          <LabeledInput
            label="Phone Number"
            required
            type="tel"
            value=""
            onChange={() => {}}
            disabled
            hint="Coming soon"
          />
          <div className="flex justify-end">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Social Links
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <LabeledInput
            label="LinkedIn"
            value=""
            onChange={() => {}}
            disabled
            hint="Coming soon"
            placeholder="https://linkedin.com/company/your-company"
          />
          <LabeledInput
            label="LinkedIn (secondary)"
            value=""
            onChange={() => {}}
            disabled
            hint="Coming soon"
            placeholder="https://linkedin.com/company/your-company-2"
          />
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-400"
          >
            + Add Link
          </button>
          <div className="flex justify-end">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-400"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function LabeledInput({
  label,
  required,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  hint,
  icon,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && (
          <span className="ml-1 text-[10px] text-gray-400">({hint})</span>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={[
            "w-full rounded-lg border bg-white px-3 py-2.5 text-sm",
            disabled
              ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200",
            icon ? "pr-10" : "",
          ].join(" ")}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

function LabeledTextarea({
  label,
  required,
  value,
  onChange,
  placeholder,
  max,
  disabled,
  hint,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && (
          <span className="ml-1 text-[10px] text-gray-400">({hint})</span>
        )}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={max}
        rows={4}
        disabled={disabled}
        className={[
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm",
          disabled
            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200",
        ].join(" ")}
      />
      {max && (
        <p className="mt-1 text-right text-[10px] text-gray-400">
          {value.length}/{max}
        </p>
      )}
    </div>
  );
}

function LabeledSelect({
  label,
  required,
  value,
  onChange,
  options,
  disabled,
  hint,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && (
          <span className="ml-1 text-[10px] text-gray-400">({hint})</span>
        )}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:bg-gray-50 disabled:text-gray-400"
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
