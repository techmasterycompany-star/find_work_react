// =====================================================================
// AccountSettings — Frame 1 (profile form, no backend)
// ---------------------------------------------------------------------
// The user said this frame "doesn't have a specific functionality
// either in the back or figma", so we build the UI only. The form is
// pre-filled from the logged-in admin's profile (AuthContext), and
// the "Save Changes" button shows a success indicator. No network
// call is made — when the backend exposes /admin/account, wire it up
// in the handleSave function below.
// =====================================================================

import { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import SettingsBreadcrumb from '../../components/settings/SettingsBreadcrumb';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';

export default function AccountSettings() {
  const { user } = useAuth();

  // Pre-fill from auth context, fall back to the Figma defaults so the
  // page looks right even before login.
  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] ?? 'Ahmed',
    lastName: user?.name?.split(' ').slice(1).join(' ') ?? 'Ibrahim',
    email: user?.email ?? 'ahmedebrahim11@gmail.com',
    phone: user?.phone ?? '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Validate required fields
    const nextErrors = {};
    if (!form.firstName) nextErrors.firstName = 'Required';
    if (!form.lastName) nextErrors.lastName = 'Required';
    if (!form.email) nextErrors.email = 'Required';
    if (!form.phone) nextErrors.phone = 'Required';
    if (form.password && form.password.length < 8)
      nextErrors.password = 'Must be at least 8 characters';
    if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = 'Passwords do not match';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    // TODO: when backend exposes /admin/account, POST form here.
    // For now, just flash the saved indicator.
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <SettingsBreadcrumb items={[{ label: 'Setting' }, { label: 'Account' }]} />

      {/* Main card with double border (outer solid, inner dotted) */}
      <form
        onSubmit={handleSave}
        className="rounded-xl border-2 border-[#3B82F6] bg-white"
      >
        <div className="rounded-[10px] border border-dotted border-[#93C5FD] p-8">
          {/* Avatar area */}
          <div className="mb-8 flex flex-col items-center justify-center gap-3 py-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F5F3FF]">
              {/* User icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                  fill="#7C3AED"
                />
              </svg>
            </div>
            <p className="text-[12px] text-[#71717A]">Account avatar</p>
          </div>

          {/* Personal information */}
          <h2 className="mb-4 text-[18px] font-semibold text-[#27272A]">
            Personal information
          </h2>

          <div className="grid grid-cols-2 gap-5">
            {/* First Name */}
            <Field
              label="First Name"
              required
              value={form.firstName}
              onChange={setField('firstName')}
              error={errors.firstName}
              placeholder="Input"
            />

            {/* Last Name */}
            <Field
              label="Last Name"
              required
              value={form.lastName}
              onChange={setField('lastName')}
              error={errors.lastName}
              placeholder="Input"
            />

            {/* Email */}
            <Field
              label="Personal Email"
              required
              type="email"
              value={form.email}
              onChange={setField('email')}
              error={errors.email}
              placeholder="Input"
            />

            {/* Phone */}
            <Field
              label="Phone number"
              required
              type="tel"
              value={form.phone}
              onChange={setField('phone')}
              error={errors.phone}
              placeholder="Input"
            />

            {/* Password */}
            <Field
              label="Password"
              required
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={setField('password')}
              error={errors.password}
              placeholder="Input"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="text-[#9CA3AF] transition hover:text-[#52525B]"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="h-5 w-5" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              }
            />

            {/* Confirm Password */}
            <Field
              label="Confirm Password"
              required
              type={showConfirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={setField('confirmPassword')}
              error={errors.confirmPassword}
              placeholder="Input"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  className="text-[#9CA3AF] transition hover:text-[#52525B]"
                >
                  {showConfirm ? (
                    <HiOutlineEyeSlash className="h-5 w-5" />
                  ) : (
                    <HiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              }
            />
          </div>

          {/* Save Changes button */}
          <div className="mt-8 flex items-center justify-end gap-3">
            {saved && (
              <span className="text-[13px] font-medium text-[#22C55E]">
                ✓ Saved successfully
              </span>
            )}
            <button
              type="submit"
              className="rounded-lg bg-[#7C3AED] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#6D28D9]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Reusable form field
function Field({ label, required, error, trailing, ...inputProps }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13px] font-medium text-[#27272A]">
        {label}
        {required && <span className="text-[#EF4444]">*</span>}
      </span>
      <div className="relative">
        <input
          {...inputProps}
          className={`h-11 w-full rounded-lg border bg-white px-4 text-[14px] text-[#27272A] outline-none transition placeholder:text-[#9CA3AF] ${
            error
              ? 'border-[#EF4444] focus:border-[#EF4444]'
              : 'border-[#D4D4D8] focus:border-[#7C3AED]'
          }`}
        />
        {trailing && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <span className="text-[11px] text-[#EF4444]">{error}</span>
      )}
    </label>
  );
}
