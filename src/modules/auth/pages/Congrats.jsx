import { useSearchParams, Link } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";

export default function Congrats() {
  const [searchParams] = useSearchParams();

  const role = searchParams.get("role") || "candidate";

  const dashboardPath =
    role === "employer" ? "/employer/home" : "/candidate/home";

  const roleText = role === "employer" ? "employer" : "candidate";

  return (
    <AuthLayout>
      <div className="relative flex w-full justify-center px-5 py-20">
        {/* Decorative elements */}

        <span className="absolute left-[18%] top-[25px] text-[#F4B400] text-xl">
          ◆
        </span>

        <span className="absolute left-[24%] top-[105px] text-[#8B5CF6] text-lg">
          ✣
        </span>

        <span className="absolute right-[18%] top-[45px] text-[#8B5CF6] text-lg">
          ■
        </span>

        <span className="absolute right-[11%] top-[135px] text-[#F4B400] text-xl">
          ✣
        </span>

        <span className="absolute left-[22%] bottom-[65px] h-2 w-2 rounded-full bg-[#C4B5FD]" />

        <span className="absolute left-[14%] bottom-[15px] h-3 w-3 rounded-full bg-[#F4B400]" />

        <span className="absolute right-[15%] bottom-[0px] h-3 w-3 rounded-full bg-[#8B5CF6]" />

        {/* Congratulations Card */}
        <div
          className="
            flex
            h-[455px]
            w-[800px]
            max-w-full
            flex-col
            items-center
            justify-center
            rounded-[24px]
            border
            border-[#E4E4E7]
            bg-white
            p-[48px]
            shadow-[0px_16px_32px_0px_rgba(15,23,42,0.05)]
          "
        >
          {/* Card Content */}
          <div className="flex w-full max-w-[704px] flex-col items-center gap-8 text-center">
            {/* Success Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCFCE7]">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-[#22C55E]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-[24px] font-bold leading-[32px] text-[#18181B]">
                Congratulations!
              </h1>

              <p className="text-[16px] font-medium leading-6 text-[#8B5CF6]">
                Your {roleText} account has been successfully created
              </p>

              <p className="max-w-[650px] text-[14px] leading-5 text-[#71717A]">
                Welcome to Job4U! Your profile is ready. Start exploring
                thousands of freelance opportunities from top companies
                worldwide.
              </p>
            </div>

            {/* Main Button */}
            <div className="w-full">
              <Link
                to={dashboardPath}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  rounded-lg
                  bg-[#7C3AED]
                  px-6
                  text-[14px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#6D28D9]
                "
              >
                Go to{" "}
                {role === "employer"
                  ? "Employer HomePage"
                  : "Candidate HomePage"}
              </Link>
            </div>

            {/* Secondary Link */}
            <p className="text-[12px] text-[#71717A]">
              Or, back to{" "}
              <Link
                to="/jobs"
                className="font-medium text-[#7C3AED] hover:underline"
              >
                Explore Job Directory
              </Link>
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}