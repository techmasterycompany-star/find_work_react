import { Link } from "react-router-dom";

export function Banner() {
  return (
    <section className="p-20 flex-center">
      <div className="mt-16 relative overflow-hidden rounded-3xl bg-purple-950 px-16 py-14 text-center text-white w-[1280px]">
        <div className="pointer-events-none absolute -left-10 -bottom-16 h-52 w-52 rounded-full bg-violet-800/40" />
        <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-violet-800/40" />

        <h3 className="text-3xl font-bold  mx-auto w-full">
          Get placed in front of verified remote employers
        </h3>
        <p className="mt-4 text-zinc-300 max-w-xl mx-auto">
        Pro candidates receive a verified badge, instant application boosts, and exclusive early access to high-budget freelance contracts 24 hours before anyone else.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/auth/role-select"
            className="px-6 py-3 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700"
          >
            Upgrade to Premium — $9/mo
          </Link>
          <Link
            to="/jobs"
            className="px-6 py-3 rounded-lg border border-white text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Compare Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
