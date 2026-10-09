import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import FormField from "../../../components/FormField";
import logo from "../../../assets/Brand Logo.png";
import loginImage from "../../../assets/Candidate Panel Graphic.png";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, isAuthenticated, role, isInitializing } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isInitializing) return null;
  if (isAuthenticated && role === "admin") {
    return <Navigate to="/admin" replace />;
  }

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

      if (user.role !== "admin") {
        setErrors({
          password:
            "This account is not an admin account. Please use the regular login page.",
        });
        localStorage.removeItem("token");
      } else {
        navigate("/admin", { replace: true });
      }
    } catch (err) {
      if (err.response?.data?.reason === "PENDING_APPROVAL") {
        setErrors({ password: "Your account is still pending approval." });
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
            <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
            <p className="mt-1 text-sm text-gray-500">
              Restricted access — Job4U administrators only.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <FormField
                id="email"
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                placeholder="admin@job4u.com"
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
