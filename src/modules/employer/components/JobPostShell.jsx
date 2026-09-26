const STEP_LABELS = ["Job Details", "Description", "Compensation", "Company", "Review"];

export default function JobPostShell({ step, title, description, onBack, onNext, children }) {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="border-y border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2 px-4 py-5 sm:px-6">
          {STEP_LABELS.map((label, index) => {
            const stepNumber = index + 1;
            const complete = stepNumber < step;
            const active = stepNumber === step;

            return (
              <div key={label} className="flex min-w-0 flex-1 items-center last:flex-none">
                <div className="flex min-w-0 items-center gap-2">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${complete || active ? "bg-primary text-white" : "border border-gray-300 bg-white text-gray-400"}`}>
                    {complete ? "✓" : stepNumber}
                  </span>
                  <span className={`hidden truncate text-sm sm:block ${active ? "font-semibold text-primary" : "text-gray-500"}`}>
                    {label}
                  </span>
                </div>
                {stepNumber < STEP_LABELS.length && <span className={`mx-2 h-px flex-1 ${complete ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            );
          })}
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-6 sm:px-12 sm:py-10">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </div>
          <div className="px-6 py-8 sm:px-12">{children}</div>
        </section>
      </main>

      <div className="sticky bottom-0 border-t border-gray-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl justify-between px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} disabled={step === 1} className="h-11 rounded-lg border border-gray-300 px-5 text-sm font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-40">
            Back
          </button>
          <button type="button" onClick={onNext} className="h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:opacity-90">
            {step === 5 ? "Publish Job" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
