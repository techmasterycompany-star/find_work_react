export default function StepIndicator({ steps, currentStep }) {
  return (
    <div className="w-full h-[53px] flex items-start">
      {steps.map((label, i) => {
        const stepNum = i + 1;

        const isComplete = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div
            key={label}
            className="flex items-start flex-1 last:flex-none"
          >
            {/* Step */}
            <div className="w-[40px] flex flex-col items-center shrink-0">
              {/* Circle */}
              <div
                className={`
                  w-[24px]
                  h-[24px]
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-[12px]
                  leading-none
                  font-semibold
                  ${
                    isComplete || isActive
                      ? "bg-purple-600 text-white"
                      : "bg-white border border-gray-300 text-gray-400"
                  }
                `}
              >
                {isComplete ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[13px] h-[13px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>

              {/* Label */}
              <span
                className={`
                  mt-[4px]
                  text-[10px]
                  leading-[13px]
                  whitespace-nowrap
                  ${
                    isActive
                      ? "text-purple-600 font-medium"
                      : "text-gray-400 font-normal"
                  }
                `}
              >
                {label}
              </span>
            </div>

            {/* Connector */}
            {stepNum < steps.length && (
              <div
                className={`
                  flex-1
                  h-[2px]
                  mt-[11px]
                  ${
                    isComplete
                      ? "bg-purple-600"
                      : "bg-gray-200"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}