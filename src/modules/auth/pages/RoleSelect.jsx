import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import RoleOptionCard from "../components/RoleOptionCard";

const CandidateIcon = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" />
  </svg>
);

const EmployerIcon = (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="8" width="16" height="12" rx="2" />
    <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeLinecap="round" />
  </svg>
);

export default function RoleSelect() {
  const [role, setRole] = useState("employer");
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/auth/signup/${role}`);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center mb-6">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white text-sm font-bold mb-2">
          J4
        </span>
        <h1 className="text-xl font-bold text-gray-900">Create your account</h1>
        <p className="mt-1 text-sm text-gray-500">
          Choose how you want to use the platform to tailor your experience
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <RoleOptionCard
          icon={CandidateIcon}
          title="Candidate"
          description="Find freelance jobs, showcase your expert portfolio, and work with top global clients."
          selected={role === "candidate"}
          onSelect={() => setRole("candidate")}
        />
        <RoleOptionCard
          icon={EmployerIcon}
          title="Employer"
          description="Post jobs, find high-quality candidate profiles, and scale your product teams."
          selected={role === "employer"}
          onSelect={() => setRole("employer")}
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-6 w-full py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700"
      >
        Continue as {role === "employer" ? "Employer" : "Candidate"}
      </button>

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-purple-600 font-medium hover:underline"
        >
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
