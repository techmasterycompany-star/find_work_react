import { Link } from "react-router-dom";
import background from "../../../assets/background2.jpg";
export default function AboutHero() {
  return (
    <section className="w-full h-200">
      <div className="relative">
        <div className="w-full h-[540px]">
          <img
            className="max-w-full w-full max-h-full h-full"
            src={background}
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[#2a2a36] opacity-45"></div>
        </div>
        <div className="content w-[1280px] h-fit absolute top-0 left-0 py-16 px-20 ">
          <div className="badge mb-8">Our Story</div>
          <h1 className="text-[56px] text-white font-semibold mb-8 flex">
            We Connect <span className="text-primary block flex-center w-[200px] h-fit bg-white skew-x-12 rotate-5 mx-2">Talent</span> with Opportunity
          </h1>
          <p className="text-sm font-medium text-[#fff] w-[400px] leading-6">
            Job4U was built on a simple belief: the best person for any job
            could be anywhere in the world. We built the platform to prove it.
          </p>
          <div className="mt-8 flex items-center justify-start gap-4">
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
      </div>
    </section>
  );
}
