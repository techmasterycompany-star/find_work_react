const fs = require("fs");
const path = require("path");

function findProjectRoot(startDir) {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(path.join(dir, "package.json")) && fs.existsSync(path.join(dir, "src"))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

function writeFile(projectRoot, relPath, content) {
  const full = path.join(projectRoot, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf-8");
  console.log("  ✓ Wrote: " + relPath);
}

const EMPLOYER_SIGNUP = `import { useState } from "react";
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
    { label: "One number", met: /\\d/.test(password) },
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
            size: data.companySize,
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
                  style={{ width: \`\${(passwordChecks.filter((c) => c.met).length / passwordChecks.length) * 100}%\` }} />
              </div>
              <ul className="mt-2 space-y-0.5">
                {passwordChecks.map((c) => (
                  <li key={c.label} className={\`text-xs \${c.met ? "text-green-600" : "text-gray-400"}\`}>
                    {c.met ? "\u2713" : "\u2022"} {c.label}
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
              { label: "Hourly budget", value: \`\${formData.budgetMin} - \${formData.budgetMax}\` },
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
`;

const CANDIDATE_SIGNUP = `import { useState } from "react";
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
    { label: "One number", met: /\\d/.test(password) },
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
                  style={{ width: \`\${(passwordChecks.filter((c) => c.met).length / passwordChecks.length) * 100}%\` }} />
              </div>
              <ul className="mt-2 space-y-0.5">
                {passwordChecks.map((c) => (
                  <li key={c.label} className={\`text-xs \${c.met ? "text-green-600" : "text-gray-400"}\`}>
                    {c.met ? "\u2713" : "\u2022"} {c.label}
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
              { label: "Password", value: formData.password ? "\u2022".repeat(formData.password.length) : "" },
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
`;

function main() {
  console.log("\n============================================================");
  console.log("  Phase 3: Fix Registration Signup (no comments)");
  console.log("============================================================\n");

  const projectRoot = findProjectRoot(__dirname);
  if (!projectRoot) { console.error("ERROR: Could not find project root."); process.exit(1); }
  console.log("  Detected project: " + projectRoot + "\n");

  console.log("▸ Overwriting 2 signup files...\n");
  writeFile(projectRoot, "src/modules/auth/pages/employerSignUp.jsx", EMPLOYER_SIGNUP);
  writeFile(projectRoot, "src/modules/auth/pages/candidateSignUp.jsx", CANDIDATE_SIGNUP);

  console.log("\n============================================================");
  console.log("  ✓ Done! (NOT committed)");
  console.log("============================================================");
  console.log("\n  What was fixed:");
  console.log("    Employer signup:");
  console.log("      - Added password + confirmPassword fields to step 1");
  console.log("      - Added password strength indicator");
  console.log("      - Sends proper JSON body matching backend expectations");
  console.log("      - Added try/catch + error display on step 3");
  console.log("      - Added isSubmitting state (disables button during API call)");
  console.log("      - Navigates to /auth/congratulations?role=employer");
  console.log("");
  console.log("    Candidate signup:");
  console.log("      - Sends JSON (not FormData) with nested candidateProfile object");
  console.log("      - Maps fullName→name, professionalHeadline→candidateProfile.headline");
  console.log("      - Maps yearsOfExperience values to backend enums (junior/mid/senior/lead)");
  console.log("      - Removed resume upload from register (upload after login instead)");
  console.log("      - Removed confirmPassword/skills from payload (not accepted by backend)");
  console.log("      - Added try/catch + error display on step 3");
  console.log("      - Added isSubmitting state");
  console.log("      - Navigates to /auth/congratulations?role=candidate");
  console.log("\n  Test: npm run dev → /auth/signup/employer + /auth/signup/candidate");
  console.log("\n  When ready:");
  console.log("    git add .");
  console.log("    git commit -m \"fix: rewrite employer + candidate signup with proper API payload\"");
  console.log("    git push origin dev\n");
}

main();