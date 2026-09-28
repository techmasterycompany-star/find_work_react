const FEATURES = [
  {
    title: 'Easy Job Search',
    description: 'Search thousands of opportunities with smart filters by location, salary, industry, and experience level - all in seconds.',
    tag: 'Smart filtering',
    color: 'violet',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Quick Apply',
    description: 'Apply to multiple jobs with a single click using your Job4U profile. No repetitive forms, just fast, seamless applications.',
    tag: 'One-click apply',
    color: 'green',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Career Growth',
    description: 'Access career resources, salary insights, and personalized job recommendations to accelerate your professional development.',
    tag: 'Personalized insights',
    color: 'amber',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5h16M4 10h10M4 15h13M4 20h7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const COLOR_CLASSES = {
  violet: {
    border: 'border-violet-300',
    iconBox: 'border-violet-300 text-violet-600',
    tagText: 'text-violet-600',
    tagDot: 'bg-violet-600',
    decoration: 'bg-violet-100',
  },
  green: {
    border: 'border-green-300',
    iconBox: 'border-green-300 text-green-600',
    tagText: 'text-green-600',
    tagDot: 'bg-green-600',
    decoration: 'bg-green-100',
  },
  amber: {
    border: 'border-amber-300',
    iconBox: 'border-amber-300 text-amber-600',
    tagText: 'text-amber-600',
    tagDot: 'bg-amber-600',
    decoration: 'bg-amber-100',
  },
};

export default function WhyChooseSection() {
  return (
    <section className="px-20 py-16">
      <h2 className="text-2xl font-bold text-zinc-900">Why Choose Job4U</h2>
      <p className="mt-1 text-sm text-zinc-500">Everything you need to land your next great opportunity, all in one place</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f) => {
          const c = COLOR_CLASSES[f.color];
          return (
            <div key={f.title} className={`relative overflow-hidden rounded-2xl border-2 ${c.border} bg-white p-6`}>
              <div className={`absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-40 ${c.decoration}`} />

              <div className={`relative h-12 w-12 rounded-xl border-2 flex items-center justify-center ${c.iconBox}`}>
                {f.icon}
              </div>
              <h3 className="relative mt-5 text-lg font-bold text-zinc-900">{f.title}</h3>
              <p className="relative mt-2 text-sm text-zinc-500">{f.description}</p>
              <div className="relative mt-4 flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${c.tagDot}`} />
                <span className={`text-xs font-medium ${c.tagText}`}>{f.tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}