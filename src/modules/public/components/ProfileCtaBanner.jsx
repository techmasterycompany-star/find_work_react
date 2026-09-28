import { Link } from "react-router-dom";
import profilepic from "../../../assets/cta-illustration.png";

const TRUST_POINTS = [
  "Free forever",
  "No credit card required",
  "1,000+ daily matches",
];

export default function ProfileCtaBanner() {
  return (
    <section className="px-20 py-16 bg-violet-50">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-sm font-medium text-violet-600">
            🚀 Start Your Journey
          </span>
          <h2 className="mt-4 text-3xl font-bold text-zinc-900">
            Ready to stand out from the crowd?
          </h2>
          <p className="mt-3 text-zinc-600 max-w-lg">
            Create your professional profile in minutes and let top employers
            discover you. Join over 50,000 candidates already finding their
            dream roles.
          </p>

          <div className="mt-6 flex items-center gap-6">
            <Link
              to="/auth/role-select"
              className="px-5 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700"
            >
              Create Free Profile
            </Link>
            <Link
              to="/how-it-works"
              className="text-sm font-semibold text-violet-600 hover:underline"
            >
              See How It Works
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap gap-8 text-sm text-zinc-600">
            {TRUST_POINTS.map((point) => (
              <span key={point} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                {point}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:block rounded-2xl ml-70 overflow-hidden h-[300px] ">
          <img src={profilepic} alt="" />
        </div>
      </div>
    </section>
  );
}
