import { useState, useEffect } from "react";
import { HiOutlineXMark, HiOutlineSparkles } from "react-icons/hi2";
import { useAuth } from "../../../context/AuthContext";
import { useApplyJob, useGenerateCoverLetter } from "../hooks/useJobDetails";

export default function ApplyJobModal({ job, open, onClose }) {
  const { user } = useAuth();
  const applyJob = useApplyJob();
  const generateCover = useGenerateCoverLetter();

  const [coverLetter, setCoverLetter] = useState("");
  const [message, setMessage] = useState("");
  const [contactEmail, setContactEmail] = useState(user?.email ?? "");
  const [contactPhone, setContactPhone] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    if (user?.email) setContactEmail(user.email);
  }, [user]);

  if (!open) return null;

  const handleGenerateCover = () => {
    if (resumeText.trim().length < 50) {
      alert("Please paste at least 50 characters of your resume/experience first so the AI can personalize the cover letter.");
      return;
    }
    generateCover.mutate(
      { jobId: job.id, resumeText },
      {
        onSuccess: (data) => {
          const generated = data?.coverLetter ?? data?.cover_letter ?? data?.text ?? "";
          if (generated) setCoverLetter(generated);
        },
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactEmail || !contactPhone) {
      alert("Contact email and phone are required.");
      return;
    }
    const formData = new FormData();
    if (resumeFile) formData.append("resume", resumeFile);
    formData.append("resume_text", resumeText);
    formData.append("cover_letter", coverLetter);
    formData.append("message", message);
    formData.append("contact_email", contactEmail);
    formData.append("contact_phone", contactPhone);

    applyJob.mutate(
      { jobId: job.id, formData },
      {
        onSuccess: () => {
          alert("Application submitted successfully!");
          onClose();
        },
        onError: (err) => {
          const msg = err?.response?.data?.message ?? err?.message ?? "Failed to submit application";
          alert(msg);
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Apply for {job?.title}</h2>
            <p className="text-sm text-gray-500">{job?.company}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Your experience / resume text
              <span className="ml-1 text-xs text-gray-400">(used for AI cover letter)</span>
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={3}
              placeholder="Paste your resume summary or describe your relevant experience (min 50 chars for AI generation)..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Cover letter</label>
              <button
                type="button"
                onClick={handleGenerateCover}
                disabled={generateCover.isPending}
                className="inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-200 disabled:opacity-60"
              >
                <HiOutlineSparkles className="h-3.5 w-3.5" />
                {generateCover.isPending ? "Generating..." : "Generate with AI"}
              </button>
            </div>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              placeholder="Write your cover letter here, or click Generate with AI above..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Message to employer <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              placeholder="Anything else you'd like to say..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Contact email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Contact phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                placeholder="+20 ..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Resume PDF <span className="text-xs text-gray-400">(optional — uses your profile resume if omitted)</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-violet-700 hover:file:bg-violet-100"
            />
            {resumeFile && (
              <p className="mt-1 text-xs text-emerald-600">
                Selected: {resumeFile.name}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={applyJob.isPending}
              className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 disabled:opacity-60"
            >
              {applyJob.isPending ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
