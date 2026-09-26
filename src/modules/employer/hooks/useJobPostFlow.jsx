import { useState } from "react";

const INITIAL_DATA = {
  jobTitle: "",
  jobCategory: "",
  experienceLevel: "",
  jobType: "",
  location: "",
  isRemote: false,
  overview: "",
  responsibilities: "",
  qualifications: "",
  skills: "",
  currency: "USD",
  salaryMin: "",
  salaryMax: "",
  salaryPeriod: "",
  benefits: [],
  companyName: "",
  logo: null,
  companyWebsite: "",
  industry: "",
  companySize: "",
  companyDescription: "",
  companyCulture: "",
};

const STEP_FIELDS = {
  1: ["jobTitle", "jobCategory", "experienceLevel", "jobType", "location"],
  2: ["overview", "responsibilities", "qualifications", "skills"],
  3: ["currency", "salaryMin", "salaryMax", "salaryPeriod"],
  4: ["companyName", "logo", "companyWebsite", "industry", "companySize", "companyDescription", "companyCulture"],
};

export default function useJobPostFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [isPublished, setIsPublished] = useState(false);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validateStep = (stepNumber) => {
    const nextErrors = {};

    (STEP_FIELDS[stepNumber] || []).forEach((field) => {
      if (!formData[field]) nextErrors[field] = "Required";
    });

    if (stepNumber === 3 && Number(formData.salaryMin) > Number(formData.salaryMax)) {
      nextErrors.salaryMax = "Maximum salary must be greater than the minimum";
    }

    setErrors((current) => ({ ...current, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return false;
    setStep((current) => Math.min(current + 1, 5));
    return true;
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 1));

  const publish = () => {
    for (let stepNumber = 1; stepNumber <= 4; stepNumber += 1) {
      if (!validateStep(stepNumber)) {
        setStep(stepNumber);
        return false;
      }
    }

    setIsPublished(true);
    return true;
  };

  return {
    step,
    formData,
    errors,
    isPublished,
    updateField,
    goNext,
    goBack,
    publish,
    setStep,
    setErrors,
    setIsPublished,
  };
}
