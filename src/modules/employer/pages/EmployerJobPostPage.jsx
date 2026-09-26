import { useRef, useState } from "react";
import FormField from "../../../components/FormField";
import SelectField from "../../../components/SelectField";
import useJobPostFlow from "../hooks/useJobPostFlow";
import JobPostShell from "../components/JobPostShell";
import { CheckGroup, ChoiceGroup, TextAreaField } from "../components/JobPostFields";

const CATEGORIES = ["Design", "Development", "Product", "Marketing", "Operations"].map((value) => ({ value, label: value }));
const EXPERIENCE = ["Entry level", "Mid level", "Senior level", "Lead / Manager"].map((value) => ({ value, label: value }));
const INDUSTRIES = ["Technology", "Finance", "Healthcare", "Education", "Other"].map((value) => ({ value, label: value }));
const COMPANY_SIZES = ["1-10", "11-50", "51-200", "201-500", "500+"].map((value) => ({ value, label: `${value} employees` }));
const BENEFITS = ["Health Insurance", "Dental & Vision Care", "Professional Development", "401(k) Matching", "Paid Time Off (PTO)", "Gym Membership / Wellness stipend", "Hybrid Work Environment", "Flexible Working Hours", "Parental Leave"];

const stepContent = {
  1: { title: "Step 1: Job Details", description: "Provide basic information about the role to help target the right candidates." },
  2: { title: "Step 2: Job Description & Skills", description: "Detail the duties, required qualifications, and daily responsibilities for this role." },
  3: { title: "Step 3: Compensation & Benefits", description: "Be transparent about salary ranges and the extra perks that make your workplace attractive." },
  4: { title: "Step 4: Company Information", description: "Highlight your company culture, logo, and links to build trust and attract applicants." },
  5: { title: "Step 5: Review & Publish", description: "Double check the draft copy before broadcasting it live to thousands of job seekers." },
};

function ReviewSection({ title, onEdit, children }) {
  return <section className="rounded-lg border border-gray-200 p-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold text-gray-900">{title}</h2><button type="button" onClick={onEdit} className="text-sm font-semibold text-primary hover:underline">Edit</button></div>{children}</section>;
}

export default function EmployerJobPostPage() {
  const flow = useJobPostFlow();
  const fileInput = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const { step, formData, errors, isPublished, updateField, goBack, goNext, publish, setStep, setErrors, setIsPublished } = flow;

  const chooseLogo = async (file) => {
    if (!file) return;
    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      updateField("logo", null);
      setErrors((current) => ({ ...current, logo: "Use a PNG, JPG, or GIF image." }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      updateField("logo", null);
      setErrors((current) => ({ ...current, logo: "Logo files must be 2MB or smaller." }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(previewUrl);
      if (image.width < 200 || image.height < 200) {
        updateField("logo", null);
        setErrors((current) => ({ ...current, logo: "Logo dimensions must be at least 200 × 200px." }));
        return;
      }
      updateField("logo", file);
    };
    image.onerror = () => {
      URL.revokeObjectURL(previewUrl);
      updateField("logo", null);
      setErrors((current) => ({ ...current, logo: "The selected logo could not be read." }));
    };
    image.src = previewUrl;
  };

  const logoError = errors.logo;

  if (isPublished) {
    return <main className="min-h-screen bg-[#fafafa] px-4 py-16"><section className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">✓</div><h1 className="mt-5 text-2xl font-bold text-gray-900">Job post ready</h1><p className="mt-2 text-sm text-gray-500">This frontend-only flow has completed locally. No job post was sent to or saved by a backend service.</p><button type="button" onClick={() => { setStep(5); setIsPublished(false); }} className="mt-6 text-sm font-semibold text-primary hover:underline">Return to review</button></section></main>;
  }

  const content = stepContent[step];
  return (
    <JobPostShell step={step} title={content.title} description={content.description} onBack={goBack} onNext={step === 5 ? publish : goNext}>
      {step === 1 && <div className="space-y-6">
        <FormField id="jobTitle" label="Job title" required value={formData.jobTitle} onChange={(event) => updateField("jobTitle", event.target.value)} error={errors.jobTitle} />
        <div className="grid gap-5 sm:grid-cols-2"><SelectField id="jobCategory" label="Job category" required options={CATEGORIES} value={formData.jobCategory} onChange={(event) => updateField("jobCategory", event.target.value)} error={errors.jobCategory} /><SelectField id="experienceLevel" label="Experience level" required options={EXPERIENCE} value={formData.experienceLevel} onChange={(event) => updateField("experienceLevel", event.target.value)} error={errors.experienceLevel} /></div>
        <ChoiceGroup label="Job Type" required name="jobType" value={formData.jobType} onChange={(value) => updateField("jobType", value)} error={errors.jobType} options={[{ value: "Full-Time", label: "Full-Time" }, { value: "Part-Time", label: "Part-Time" }, { value: "Contract Base", label: "Contract Base" }, { value: "Internship", label: "Internship" }]} />
        <FormField id="location" label="Location" required value={formData.location} onChange={(event) => updateField("location", event.target.value)} error={errors.location} />
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={formData.isRemote} onChange={(event) => updateField("isRemote", event.target.checked)} className="h-4 w-4 rounded accent-[#7c3aed]" />This is a fully remote position</label>
      </div>}

      {step === 2 && <div className="space-y-6"><TextAreaField id="overview" label="Job overview" required value={formData.overview} onChange={(event) => updateField("overview", event.target.value)} error={errors.overview} maxLength={512} /><TextAreaField id="responsibilities" label="Responsibilities" required value={formData.responsibilities} onChange={(event) => updateField("responsibilities", event.target.value)} error={errors.responsibilities} /><TextAreaField id="qualifications" label="Qualifications" required value={formData.qualifications} onChange={(event) => updateField("qualifications", event.target.value)} error={errors.qualifications} /><TextAreaField id="skills" label="Skills" required value={formData.skills} onChange={(event) => updateField("skills", event.target.value)} error={errors.skills} /></div>}

      {step === 3 && <div className="space-y-7"><div className="grid gap-5 sm:grid-cols-3"><SelectField id="currency" label="Currency" required options={[{ value: "USD", label: "USD" }, { value: "EUR", label: "EUR" }, { value: "EGP", label: "EGP" }]} value={formData.currency} onChange={(event) => updateField("currency", event.target.value)} error={errors.currency} /><FormField id="salaryMin" label="Minimum salary" required type="number" min="0" value={formData.salaryMin} onChange={(event) => updateField("salaryMin", event.target.value)} error={errors.salaryMin} /><FormField id="salaryMax" label="Maximum salary" required type="number" min="0" value={formData.salaryMax} onChange={(event) => updateField("salaryMax", event.target.value)} error={errors.salaryMax} /></div><ChoiceGroup label="Salary Period" required name="salaryPeriod" value={formData.salaryPeriod} onChange={(value) => updateField("salaryPeriod", value)} error={errors.salaryPeriod} options={[{ value: "Yearly", label: "Yearly" }, { value: "Monthly", label: "Monthly" }, { value: "Hourly", label: "Hourly" }]} /><CheckGroup label="Offered Benefits" options={BENEFITS} values={formData.benefits} onChange={(values) => updateField("benefits", values)} /></div>}

      {step === 4 && <div className="space-y-6"><FormField id="companyName" label="Company name" required value={formData.companyName} onChange={(event) => updateField("companyName", event.target.value)} error={errors.companyName} /><div><p className="mb-1 text-sm font-medium text-gray-700">Company Logo <span className="text-primary">*</span></p><button type="button" onClick={() => fileInput.current?.click()} onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(event) => { event.preventDefault(); setIsDragging(false); chooseLogo(event.dataTransfer.files?.[0]); }} className={`flex h-36 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed text-sm ${isDragging ? "border-primary bg-purple-50" : "border-gray-300"}`}><span className="text-lg text-gray-400">↑</span><span className="mt-2 text-gray-600">{formData.logo ? formData.logo.name : "Drag and drop your logo here, or browse"}</span><span className="mt-1 text-xs text-gray-400">Supports PNG, JPG, GIF up to 2MB</span></button><input ref={fileInput} type="file" accept="image/png,image/jpeg,image/gif" className="hidden" onChange={(event) => chooseLogo(event.target.files?.[0])} /><p className="mt-2 text-xs text-gray-400">Upload high-res PNG or JPG (Min 200×200 px)</p>{logoError && <p className="mt-1 text-xs text-red-500">{logoError}</p>}</div><FormField id="companyWebsite" label="Company website" required type="url" value={formData.companyWebsite} onChange={(event) => updateField("companyWebsite", event.target.value)} error={errors.companyWebsite} /><div className="grid gap-5 sm:grid-cols-2"><SelectField id="industry" label="Industry" required options={INDUSTRIES} value={formData.industry} onChange={(event) => updateField("industry", event.target.value)} error={errors.industry} /><SelectField id="companySize" label="Company size" required options={COMPANY_SIZES} value={formData.companySize} onChange={(event) => updateField("companySize", event.target.value)} error={errors.companySize} /></div><TextAreaField id="companyDescription" label="About the company" required value={formData.companyDescription} onChange={(event) => updateField("companyDescription", event.target.value)} error={errors.companyDescription} /><TextAreaField id="companyCulture" label="Company culture" required value={formData.companyCulture} onChange={(event) => updateField("companyCulture", event.target.value)} error={errors.companyCulture} /></div>}

      {step === 5 && <div className="space-y-6"><ReviewSection title="1. Job Details" onEdit={() => setStep(1)}><p className="font-semibold text-gray-900">{formData.jobTitle}</p><p className="mt-2 text-sm text-gray-500">{[formData.jobCategory, formData.experienceLevel, formData.jobType, formData.location].filter(Boolean).join(" · ")}</p></ReviewSection><ReviewSection title="2. Job Description Preview" onEdit={() => setStep(2)}><h3 className="text-sm font-semibold text-gray-900">Overview</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{formData.overview}</p><h3 className="mt-5 text-sm font-semibold text-gray-900">Responsibilities</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">{formData.responsibilities}</p><p className="mt-4 text-sm text-gray-500">Skills: {formData.skills}</p></ReviewSection><ReviewSection title="3. Compensation & Benefits" onEdit={() => setStep(3)}><p className="text-lg font-semibold text-gray-900">{formData.currency} {formData.salaryMin} – {formData.salaryMax} <span className="text-sm font-normal text-gray-500">/ {formData.salaryPeriod}</span></p><p className="mt-3 text-sm text-gray-600">Benefits: {formData.benefits.length ? formData.benefits.join(" · ") : "None selected"}</p></ReviewSection><ReviewSection title="4. Company Information" onEdit={() => setStep(4)}><p className="font-semibold text-gray-900">{formData.companyName}</p><p className="mt-1 text-sm text-gray-500">{formData.companyWebsite}</p><p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">{formData.companyDescription}</p></ReviewSection></div>}
    </JobPostShell>
  );
}
