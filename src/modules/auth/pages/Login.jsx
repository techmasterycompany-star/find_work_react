import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../../components/FormField";
import { useAuth } from "../../../context/AuthContext";
import RoleTabs from "../components/RoleTabs";

import loginImage from "../../../assets/Candidate Panel Graphic.png";
import logo from "../../../assets/Brand Logo.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState("employer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};

    if (!email) nextErrors.email = "Required";
    if (!password) nextErrors.password = "Required";

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setIsSubmitting(true);

    try {
      const user = await login({ email, password });

      if (user.role === "employer") {
        navigate("/employer");
      } else if (user.role === "candidate") {
        navigate("/candidate");
      } else {
        setErrors({ password: "Your account role is not supported." });
      }
    } catch (err) {
      if (err.response?.data?.reason === "PENDING_APPROVAL") {
        setErrors({
          password: "Your account is still pending admin approval.",
        });
      } else {
        setErrors({ password: "Invalid email or password" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative flex min-h-screen flex-col bg-white px-8 py-8">
        <div className="absolute left-8 top-8">
          <img src={logo} alt="Job4U" className="h-10 w-auto object-contain" />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <h1 className="text-xl font-bold text-gray-900">Welcome Back</h1>

            <p className="mt-1 text-sm text-gray-500">
              Sign in to your Job4U account
            </p>

            <div className="mt-5">
              <RoleTabs value={role} onChange={setRole} />
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <FormField
                id="email"
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="you@company.com"
              />

              <FormField
                id="password"
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  Remember me
                </label>

                <Link
                  to="/auth/forgot-password"
                  className="text-purple-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-purple-600 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to="/auth/role-select"
              className="font-medium text-purple-600 hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:block h-screen w-full overflow-hidden">
        <img
          src={loginImage}
          alt="Where Ambition Meets Opportunity"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
    </div>
  );
}
