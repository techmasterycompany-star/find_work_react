import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import FormField from "../../../components/FormField";
import SelectField from "../../../components/SelectField";
import SignupWizardShell from "../components/SignupWizardShell";
import ReviewSummaryCard from "../components/ReviewSummaryCard";
import useSignupWizard from "../hooks/Usesignupwizard";
import { register } from "../services/authApi";

const INDUSTRY_OPTIONS = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const COMPANY_SIZE_OPTIONS = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "50-200", label: "50-200 employees" },
  { value: "200+", label: "200+ employees" },
];

const EXPERIENCE_OPTIONS = [
  { value: "entry", label: "Entry Level" },
  { value: "mid-senior", label: "Mid-Senior Level" },
  { value: "senior", label: "Senior Level" },
];

const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within 1 month" },
  { value: "3-months", label: "Within 3 months" },
];

const STEP_TITLES = {
  1: "Account & Company Information",
  2: "Hiring Preferences",
  3: "Review Your Information",
};

const WIZARD_CONFIG = {
  totalSteps: 3,
  stepFields: {
    1: ["companyName", "companyEmail", "password", "confirmPassword", "industry", "companySize", "companyWebsite"],
    2: ["jobCategories", "experienceLevel", "budgetMin", "budgetMax", "hiringTimeline"],
  },
  initialData: {
    companyName: "",
    companyEmail: "",
    password: "",
    confirmPassword: "",
    industry: "",
    companySize: "",
    companyWebsite: "",
    jobCategories: "",
    experienceLevel: "",
    budgetMin: "",
    budgetMax: "",
    hiringTimeline: "",
  },
};

function getPasswordChecks(password) {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /\d/.test(password) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
}

export default function EmployerSignup() {
  const navigate = useNavigate();
  const { step, formData, errors, setErrors, updateField, goNext, goBack, submit, setStep } = useSignupWizard(WIZARD_CONFIG);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const passwordChecks = getPasswordChecks(formData.password);

  const handleBack = () => (step === 1 ? navigate("/auth/role-select") : goBack());

  const handleNext = () => {
    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
        return;
      }
      if (!passwordChecks.every((c) => c.met)) {
        setErrors((prev) => ({ ...prev, password: "Password does not meet all requirements" }));
        return;
      }
    }
    if (step < 3) return goNext();

    submit(async (data) => {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await register({
          name: data.companyName,
          email: data.companyEmail,
          password: data.password,
          role: "employer",
          employerProfile: {
            company_name: data.companyName,
            industry: data.industry,
            website: data.companyWebsite,
          },
        });
        navigate("/auth/congratulations?role=employer");
      } catch (err) {
        const msg = err?.response?.data?.message ?? err?.message ?? "Registration failed. Please try again.";
        setSubmitError(msg);
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <AuthLayout>
      <SignupWizardShell
        step={step}
        title={STEP_TITLES[step]}
        onBack={handleBack}
        onNext={handleNext}
        nextLabel={step === 3 ? "Create Employer Account" : "Next step"}
        isSubmitting={isSubmitting}
      >
        {step === 1 && (
          <div className="space-y-4">
            <FormField id="companyName" label="Company name" required
              value={formData.companyName} onChange={(e) => updateField("companyName", e.target.value)}
              error={errors.companyName} placeholder="Acme Corporation" />
            <FormField id="companyEmail" label="Company email" type="email" required
              value={formData.companyEmail} onChange={(e) => updateField("companyEmail", e.target.value)}
              error={errors.companyEmail} placeholder="hr@acme.com" />
            <div>
              <FormField id="password" label="Password" type="password" required
                value={formData.password} onChange={(e) => updateField("password", e.target.value)}
                error={errors.password} placeholder="Create a strong password" />
              <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full bg-purple-600 transition-all"
                  style={{ width: `${(passwordChecks.filter((c) => c.met).length / passwordChecks.length) * 100}%` }} />
              </div>
              <ul className="mt-2 space-y-0.5">
                {passwordChecks.map((c) => (
                  <li key={c.label} className={`text-xs ${c.met ? "text-green-600" : "text-gray-400"}`}>
                    {c.met ? "✓" : "•"} {c.label}
                  </li>
                ))}
              </ul>
            </div>
            <FormField id="confirmPassword" label="Confirm password" type="password" required
              value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)}
              error={errors.confirmPassword} placeholder="Re-enter password" />
            <SelectField id="industry" label="Industry" required options={INDUSTRY_OPTIONS}
              value={formData.industry} onChange={(e) => updateField("industry", e.target.value)}
              error={errors.industry} />
            <SelectField id="companySize" label="Company size" required options={COMPANY_SIZE_OPTIONS}
              value={formData.companySize} onChange={(e) => updateField("companySize", e.target.value)}
              error={errors.companySize} />
            <FormField id="companyWebsite" label="Company website" required
              value={formData.companyWebsite} onChange={(e) => updateField("companyWebsite", e.target.value)}
              error={errors.companyWebsite} placeholder="techventures.com" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <FormField id="jobCategories" label="Job categories" required
              value={formData.jobCategories} onChange={(e) => updateField("jobCategories", e.target.value)}
              error={errors.jobCategories} placeholder="Frontend Development, UI/UX Design" />
            <SelectField id="experienceLevel" label="Preferred experience level" required options={EXPERIENCE_OPTIONS}
              value={formData.experienceLevel} onChange={(e) => updateField("experienceLevel", e.target.value)}
              error={errors.experienceLevel} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly budget range <span className="text-purple-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <FormField id="budgetMin" label="" className="[&>label]:hidden"
                  value={formData.budgetMin} onChange={(e) => updateField("budgetMin", e.target.value)}
                  error={errors.budgetMin} placeholder="$50/hr" />
                <FormField id="budgetMax" label="" className="[&>label]:hidden"
                  value={formData.budgetMax} onChange={(e) => updateField("budgetMax", e.target.value)}
                  error={errors.budgetMax} placeholder="$120/hr" />
              </div>
            </div>
            <SelectField id="hiringTimeline" label="Hiring timeline" required options={TIMELINE_OPTIONS}
              value={formData.hiringTimeline} onChange={(e) => updateField("hiringTimeline", e.target.value)}
              error={errors.hiringTimeline} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <ReviewSummaryCard title="Company Details" onEdit={() => setStep(1)} fields={[
              { label: "Company name", value: formData.companyName },
              { label: "Business email", value: formData.companyEmail },
              { label: "Industry", value: formData.industry },
              { label: "Company size", value: formData.companySize },
              { label: "Website", value: formData.companyWebsite },
            ]} />
            <ReviewSummaryCard title="Hiring Preferences" onEdit={() => setStep(2)} fields={[
              { label: "Job categories", value: formData.jobCategories },
              { label: "Preferred experience", value: formData.experienceLevel },
              { label: "Hourly budget", value: `${formData.budgetMin} - ${formData.budgetMax}` },
              { label: "Hiring timeline", value: formData.hiringTimeline },
            ]} />
            {submitError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}
          </div>
        )}
      </SignupWizardShell>
    </AuthLayout>
  );
}
