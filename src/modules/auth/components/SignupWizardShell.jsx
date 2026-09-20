import StepIndicator from "../../../components/StepIndicator";
import logo from "../../../assets/Brand Logo.png";

const STEP_LABELS = ["Account", "Profile", "Review"];

export default function SignupWizardShell({
  step,
  title,
  children,
  onBack,
  onNext,
  nextLabel,
  isSubmitting,
}) {
  return (
    <div className="w-full h-full flex flex-col">

      {/* Logo + Step Indicator */}
      <div className="flex flex-col items-center gap-[16px]">
        <img
          src={logo}
          alt="Job4U"
          className="w-[72px] h-[48px] object-contain"
        />

        <StepIndicator
          steps={STEP_LABELS}
          currentStep={step}
        />
      </div>

      {/* Title */}
      <h2 className="mt-[24px] text-[18px] leading-[24px] font-semibold text-gray-900">
        {title}
      </h2>

      {/* Form Content */}
      <div className="mt-[16px] flex-1">
        {children}
      </div>

      {/* Buttons */}
      <div className="w-full h-[48px] flex gap-[16px]">
        <button
          type="button"
          onClick={onBack}
          className="
            flex-1
            h-[48px]
            rounded-[8px]
            border
            border-gray-300
            bg-white
            text-[14px]
            font-medium
            text-gray-700
            hover:bg-gray-50
          "
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="
            flex-1
            h-[48px]
            rounded-[8px]
            bg-purple-600
            text-white
            text-[14px]
            font-semibold
            hover:bg-purple-700
            disabled:opacity-60
          "
        >
          {nextLabel}
        </button>
      </div>

    </div>
  );
}