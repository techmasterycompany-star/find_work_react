import { useState } from 'react';

export default function useSignupWizard({ totalSteps, stepFields, initialData }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (targetStep) => {
    const fields = stepFields[targetStep] || [];
    const nextErrors = {};
    fields.forEach((field) => {
      if (!formData[field]) nextErrors[field] = 'Required';
    });
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return false;
    setStep((s) => Math.min(s + 1, totalSteps));
    return true;
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async (onSubmit) => {
    for (let s = 1; s < totalSteps; s++) {
      if (!validateStep(s)) return;
    }
    await onSubmit(formData);
  };

  return { step, formData, errors, setErrors, updateField, goNext, goBack, submit, setStep };
}