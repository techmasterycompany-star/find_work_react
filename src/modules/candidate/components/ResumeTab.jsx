import { useEffect, useState } from "react";
import {
  useCandidateProfile,
  useUpdateCandidateSkills,
  useUploadCandidateResume,
} from "../hooks/useCandidateQueries";
import {
  HiOutlinePlus,
  HiOutlineCloudArrowUp,
  HiOutlineXMark,
} from "react-icons/hi2";

const INITIAL_SKILLS = [
  "UI Design",
  "UX Design",
  "Figma",
  "Design Systems",
  "Wireframing",
];

export default function ResumeTab() {
  const { data: profile } = useCandidateProfile();
  const updateSkills = useUpdateCandidateSkills();
  const uploadResume = useUploadCandidateResume();

  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [newSkill, setNewSkill] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [savedResumeName, setSavedResumeName] = useState("");

  useEffect(() => {
    if (!profile) return;
    const p = profile.candidateProfile ?? profile;
    if (Array.isArray(p.skills) && p.skills.length > 0) {
      setSkills(p.skills.map((s) => (typeof s === "string" ? s : s.name)));
    }
    if (p.resumeUrl || p.resume) {
      const url = p.resumeUrl ?? p.resume;
      setSavedResumeName(url.split("/").pop() ?? "resume.pdf");
    }
  }, [profile]);

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setNewSkill("");
      return;
    }
    setSkills([...skills, trimmed]);
    setNewSkill("");
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSaveSkills = (e) => {
    e.preventDefault();
    updateSkills.mutate(skills.map((name) => ({ name })));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setResumeFile(file);
  };

  const handleSaveResume = (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    uploadResume.mutate(resumeFile, {
      onSuccess: (data) => {
        const url = data?.resumeUrl ?? data?.url ?? data?.resume;
        if (url)
          setSavedResumeName(String(url).split("/").pop() ?? "resume.pdf");
        setResumeFile(null);
      },
    });
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Open to work
        </h2>
        <div className="space-y-4 opacity-60">
          <div className="flex items-center gap-3">
            <span className="inline-block h-5 w-9 rounded-full bg-gray-300" />
            <span className="text-sm text-gray-500">Toggle (Coming soon)</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DisabledField label="Available from *" type="date" />
            <DisabledSelectField
              label="Preferred employment type *"
              options={["Full-time", "Part-time", "Contract"]}
            />
          </div>
          <div className="flex justify-end opacity-60">
            <span className="rounded-full bg-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-500">
              Save Changes
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Professional Information
        </h2>
        <div className="space-y-4 opacity-60">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DisabledField label="Job title *" />
            <DisabledField label="Years of experience *" />
            <DisabledField label="Education *" />
            <DisabledField label="Industry *" />
          </div>
          <DisabledTextarea
            label="Summary *"
            placeholder="write your description"
            counter="0/512"
          />
          <DisabledTextarea
            label="Work Experience *"
            placeholder="write your description company"
            counter="0/512"
          />
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Skills <span className="text-red-500">*</span>
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Saved to your candidate profile.
        </p>
        <form onSubmit={handleSaveSkills} className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                  className="text-gray-400 hover:text-red-500"
                >
                  <HiOutlineXMark className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Add a skill…"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
            <button
              type="button"
              onClick={addSkill}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-700"
              aria-label="Add skill"
            >
              <HiOutlinePlus className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updateSkills.isPending}
              className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-60"
            >
              {updateSkills.isPending ? "Saving…" : "Save Changes"}
            </button>
          </div>
          {updateSkills.isSuccess && (
            <p className="text-right text-xs text-emerald-600">Skills saved.</p>
          )}
          {updateSkills.isError && (
            <p className="text-right text-xs text-red-500">
              Failed: {updateSkills.error?.message}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Certifications <span className="text-red-500">*</span>
        </h2>
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 px-6 py-10 text-center opacity-60">
          <HiOutlineCloudArrowUp className="mx-auto mb-2 h-8 w-8 text-gray-400" />
          <p className="text-sm font-medium text-gray-600">
            Drag &amp; drop files here or click to browse
          </p>
          <p className="text-xs text-gray-400">Supports: PDF, PNG, JPG</p>
          <p className="mt-3 text-[10px] text-gray-400">Coming soon</p>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          Resume <span className="text-red-500">*</span>
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Upload a PDF to attach to your applications.
        </p>

        <form onSubmit={handleSaveResume} className="space-y-4">
          {savedResumeName && !resumeFile && (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm">
              <span className="font-medium text-gray-700">
                {savedResumeName}
              </span>
              <button
                type="button"
                onClick={() => setSavedResumeName("")}
                aria-label="Remove resume"
                className="text-gray-400 hover:text-red-500"
              >
                <HiOutlineXMark className="h-4 w-4" />
              </button>
            </div>
          )}

          {resumeFile && (
            <div className="flex items-center justify-between rounded-lg border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm">
              <span className="font-medium text-violet-700">
                {resumeFile.name}
              </span>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                aria-label="Cancel upload"
                className="text-violet-400 hover:text-red-500"
              >
                <HiOutlineXMark className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <label className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-violet-600 text-white hover:bg-violet-700">
              <HiOutlinePlus className="h-5 w-5" />
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-500">
              {resumeFile ? "Click Save to upload" : "Click + to choose a file"}
            </span>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!resumeFile || uploadResume.isPending}
              className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-60"
            >
              {uploadResume.isPending ? "Uploading…" : "Save Changes"}
            </button>
          </div>
          {uploadResume.isSuccess && (
            <p className="text-right text-xs text-emerald-600">
              Resume uploaded.
            </p>
          )}
          {uploadResume.isError && (
            <p className="text-right text-xs text-red-500">
              Failed: {uploadResume.error?.message}
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
function DisabledField({ label, type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">
        {label}
      </label>
      <input
        type={type}
        disabled
        placeholder="Coming soon"
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-400"
      />
    </div>
  );
}

function DisabledSelectField({ label, options = [] }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">
        {label}
      </label>
      <select
        disabled
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-400"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function DisabledTextarea({ label, placeholder, counter }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">
        {label}
      </label>
      <textarea
        disabled
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-400"
      />
      {counter && (
        <p className="mt-1 text-right text-[10px] text-gray-400">{counter}</p>
      )}
    </div>
  );
}
