import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import FormField from "../../../components/FormField";
import SelectField from "../../../components/SelectField";
import SignupWizardShell from "../components/SignupWizardShell";
import ReviewSummaryCard from "../components/ReviewSummaryCard";
import useSignupWizard from "../hooks/Usesignupwizard";
import { register } from "../services/authApi";

const EXPERIENCE_OPTIONS = [
  { value: "junior", label: "0 - 2 years" },
  { value: "mid", label: "2 - 5 years" },
  { value: "senior", label: "5 - 8 years" },
  { value: "lead", label: "8+ years" },
];

const STEP_TITLES = {
  1: "Account Information",
  2: "Profile Information",
  3: "Review Your Information",
};

const WIZARD_CONFIG = {
  totalSteps: 3,
  stepFields: {
    1: ["fullName", "email", "password", "confirmPassword"],
    2: ["professionalHeadline", "skills", "yearsOfExperience"],
  },
  initialData: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    professionalHeadline: "",
    skills: "",
    yearsOfExperience: "",
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

export default function CandidateSignup() {
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
          name: data.fullName,
          email: data.email,
          password: data.password,
          role: "candidate",
          candidateProfile: {
            headline: data.professionalHeadline,
            bio: data.skills,
            location: "",
            portfolio_url: "",
            experience_level: data.yearsOfExperience,
          },
        });
        navigate("/auth/congratulations?role=candidate");
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
        nextLabel={step === 3 ? "Create Account" : "Next step"}
        isSubmitting={isSubmitting}
      >
        {step === 1 && (
          <div className="space-y-4">
            <FormField id="fullName" label="Full name" required
              value={formData.fullName} onChange={(e) => updateField("fullName", e.target.value)}
              error={errors.fullName} placeholder="Johnathan Doe" />
            <div>
              <FormField id="email" label="Email address" type="email" required
                value={formData.email} onChange={(e) => updateField("email", e.target.value)}
                error={errors.email} placeholder="candidate@job4u.com" />
              <p className="mt-1 text-xs text-gray-400">A verification link will be sent to this address</p>
            </div>
            <div>
              <FormField id="password" label="Password" type="password" required
                value={formData.password} onChange={(e) => updateField("password", e.target.value)}
                error={errors.password} placeholder="CandidatePass1" />
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
              error={errors.confirmPassword} placeholder="CandidatePass1" />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <FormField id="professionalHeadline" label="Professional headline" required
              value={formData.professionalHeadline} onChange={(e) => updateField("professionalHeadline", e.target.value)}
              error={errors.professionalHeadline} placeholder="Senior Frontend Engineer" />
            <FormField id="skills" label="Skills (comma separated)" required
              value={formData.skills} onChange={(e) => updateField("skills", e.target.value)}
              error={errors.skills} placeholder="React, TypeScript, Next.js, Figma, Tailwind CSS" />
            <SelectField id="yearsOfExperience" label="Years of experience" required options={EXPERIENCE_OPTIONS}
              value={formData.yearsOfExperience} onChange={(e) => updateField("yearsOfExperience", e.target.value)}
              error={errors.yearsOfExperience} />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <ReviewSummaryCard title="Account Details" onEdit={() => setStep(1)} fields={[
              { label: "Full name", value: formData.fullName },
              { label: "Email address", value: formData.email },
              { label: "Password", value: formData.password ? "•".repeat(formData.password.length) : "" },
            ]} />
            <ReviewSummaryCard title="Profile Details" onEdit={() => setStep(2)} fields={[
              { label: "Professional headline", value: formData.professionalHeadline },
              { label: "Skills", value: formData.skills },
              { label: "Experience", value: EXPERIENCE_OPTIONS.find((o) => o.value === formData.yearsOfExperience)?.label ?? formData.yearsOfExperience },
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
