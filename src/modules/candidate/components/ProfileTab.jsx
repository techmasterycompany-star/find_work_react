import { useEffect, useMemo, useState } from "react";
import { HiOutlineEnvelope, HiOutlineCalendar } from "react-icons/hi2";
import { useAuth } from "../../../context/AuthContext";
import {
  useCandidateProfile,
  useUpdateCandidateProfile,
} from "../hooks/useCandidateQueries";

function splitName(fullName = "") {
  const parts = String(fullName).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

const COMING_SOON_FIELDS = [
  "Phone number",
  "Country",
  "Address",
];

export default function ProfileTab() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useCandidateProfile();
  const updateProfile = useUpdateCandidateProfile();

  const { first, last } = useMemo(() => splitName(user?.name), [user]);

  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [openToWork, setOpenToWork] = useState(true);

  useEffect(() => {
    if (!profile) return;
    const p = profile.candidateProfile ?? profile;
    setBio(p.bio ?? "");
    setLocation(p.location ?? "");
    setHeadline(p.headline ?? "");
    setPortfolioUrl(p.portfolio_url ?? "");
    setExperienceLevel(p.experience_level ?? "");
  }, [profile]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile.mutate({
      bio,
      location,
      headline,
      portfolio_url: portfolioUrl,
      experience_level: experienceLevel,
    });
  };

  const handleSaveAvailability = (e) => {
    e.preventDefault();
    updateProfile.mutate({
      experience_level: experienceLevel,
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div className="mb-5 flex items-center gap-4">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
              {(user?.name ?? "U").slice(0, 1).toUpperCase()}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow ring-1 ring-gray-200 hover:bg-gray-50"
              title="Change avatar (coming soon)"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                <path d="M5 5a3 3 0 016 0v3h1a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h1V5zm5 1a1 1 0 00-2 0v3h2V6z" />
              </svg>
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">My Profile</h2>
            <p className="text-sm text-gray-500">Personal information</p>
          </div>
        </div>

        {isLoading ? (
          <p className="py-8 text-center text-sm text-gray-500">Loading profile…</p>
        ) : (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <LabeledInput
                label="First Name"
                required
                value={first}
                onChange={() => {}}
                readOnly
                hint="From your account"
              />
              <LabeledInput
                label="Last Name"
                required
                value={last}
                onChange={() => {}}
                readOnly
                hint="From your account"
              />
            </div>

            <LabeledInput
              label="Email"
              required
              type="email"
              value={user?.email ?? ""}
              onChange={() => {}}
              readOnly
              hint="From your account"
              icon={<HiOutlineEnvelope className="h-4 w-4 text-gray-400" />}
            />

            {COMING_SOON_FIELDS.map((label) => (
              <LabeledInput
                key={label}
                label={label}
                required
                value=""
                onChange={() => {}}
                disabled
                hint="Coming soon"
              />
            ))}

            <LabeledTextarea
              label="Bio"
              required
              value={bio}
              onChange={setBio}
              placeholder="Write your description here"
              max={500}
            />

            <LabeledInput
              label="Headline"
              value={headline}
              onChange={setHeadline}
              placeholder="e.g. Senior UI/UX Designer"
            />

            <LabeledInput
              label="Location"
              value={location}
              onChange={setLocation}
              placeholder="e.g. Cairo, Egypt"
            />

            <LabeledInput
              label="Portfolio URL"
              value={portfolioUrl}
              onChange={setPortfolioUrl}
              placeholder="https://your-portfolio.com"
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
              <p className="text-right text-xs text-emerald-600">Profile saved.</p>
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
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Availability</h2>
        <form onSubmit={handleSaveAvailability} className="space-y-4">
          <label className="flex items-center gap-3 text-sm text-gray-700">
            <input
              type="radio"
              name="open-to-work"
              checked={openToWork}
              onChange={() => setOpenToWork(true)}
              className="h-4 w-4 accent-violet-600"
            />
            Open to work
          </label>

          <LabeledInput
            label="Available From"
            required
            type="date"
            value={availableFrom}
            onChange={setAvailableFrom}
            icon={<HiOutlineCalendar className="h-4 w-4 text-gray-400" />}
            disabled
            hint="Coming soon"
          />

          <LabeledSelect
            label="Preferred employment type"
            required
            value={employmentType}
            onChange={setEmploymentType}
            options={["Full-time", "Part-time", "Contract", "Freelance", "Internship"]}
            disabled
            hint="Coming soon"
          />

          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-600">
              Experience level <span className="text-gray-400">(saved to backend)</span>
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            >
              <option value="">Select…</option>
              {["entry", "junior", "mid", "senior", "lead"].map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60"
            >
              {updateProfile.isPending ? "Saving…" : "Save Changes"}
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
  readOnly,
  disabled,
  hint,
  icon,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && <span className="ml-1 text-[10px] text-gray-400">({hint})</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          className={[
            "w-full rounded-lg border bg-white px-3 py-2.5 text-sm",
            disabled || readOnly
              ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
              : "border-gray-300 text-gray-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200",
            icon ? "pr-10" : "",
          ].join(" ")}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</span>
        )}
      </div>
    </div>
  );
}

function LabeledTextarea({ label, required, value, onChange, placeholder, max }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={max}
        rows={4}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      />
      {max && (
        <p className="mt-1 text-right text-[10px] text-gray-400">
          {value.length}/{max}
        </p>
      )}
    </div>
  );
}

function LabeledSelect({ label, required, value, onChange, options, disabled, hint }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {hint && <span className="ml-1 text-[10px] text-gray-400">({hint})</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:bg-gray-50 disabled:text-gray-400"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
