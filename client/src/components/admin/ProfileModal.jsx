import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/button";
import { authService } from "../../service/authService";

const ProfileModal = ({ isOpen, onClose, user, onUserUpdate }) => {
  const [activeTab, setActiveTab] = useState("info"); 
  const [infoLoading, setInfoLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  const infoForm = useForm({
    defaultValues: { name: "", email: "" },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (isOpen && user) {
      infoForm.reset({
        name: user.name || "",
        email: user.email || "",
      });
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setInfoMessage(null);
      setPasswordMessage(null);
      setActiveTab("info");
    }
  }, [isOpen, user]);

  const handleInfoSubmit = async (data) => {
    setInfoLoading(true);
    setInfoMessage(null);
    try {
      const res = await authService.updateProfile({
        name: data.name,
        email: data.email,
      });

      const updatedUser = res.data.data;
      localStorage.setItem("adminUser", JSON.stringify(updatedUser));
      onUserUpdate?.(updatedUser);

      setInfoMessage({ type: "success", text: "Profile updated" });
      setTimeout(() => setInfoMessage(null), 3000);
    } catch (err) {
      setInfoMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile",
      });
    } finally {
      setInfoLoading(false);
    }
  };

  const handlePasswordSubmit = async (data) => {
    setPasswordLoading(true);
    setPasswordMessage(null);
    try {
      await authService.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      passwordForm.reset();
      setPasswordMessage({
        type: "success",
        text: "Password changed successfully",
      });
      setTimeout(() => setPasswordMessage(null), 3000);
    } catch (err) {
      setPasswordMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to change password",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleClose = () => {
    if (infoLoading || passwordLoading) return;
    onClose();
  };

  return (
    <>
      <div
        onClick={handleClose}
        className={`
          fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-60
          flex items-center justify-center p-4
          transition-opacity duration-200
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh]
            flex flex-col overflow-hidden
            transition-all duration-300
            ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="relative bg-linear-to-br from-brand-green to-brand-leaf px-6 md:px-8 py-8 text-white">
            <button
              onClick={handleClose}
              disabled={infoLoading || passwordLoading}
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold border-2 border-white/30 shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold leading-tight">
                  {user?.name || "Admin"}
                </h2>
                <p className="text-white/80 text-sm">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-orange/90 text-white text-[10px] font-bold uppercase tracking-wider">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Admin
                  </span>
                  {user?.createdAt && (
                    <span className="text-white/70 text-xs">
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 px-6 md:px-8">
            <div className="flex gap-1 -mb-px">
              {[
                { key: "info", label: "Personal Info" },
                { key: "password", label: "Change Password" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    px-4 py-3 text-sm font-bold border-b-2 transition-colors
                    ${
                      activeTab === tab.key
                        ? "border-brand-orange text-brand-orange"
                        : "border-transparent text-gray-500 hover:text-brand-green"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
            {activeTab === "info" && (
              <form
                onSubmit={infoForm.handleSubmit(handleInfoSubmit)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-brand-green mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className={inputClass(infoForm.formState.errors.name)}
                    {...infoForm.register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Name is too short" },
                    })}
                  />
                  {infoForm.formState.errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {infoForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-green mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={inputClass(infoForm.formState.errors.email)}
                    {...infoForm.register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {infoForm.formState.errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {infoForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {infoMessage && (
                  <StatusBanner
                    type={infoMessage.type}
                    text={infoMessage.text}
                  />
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={infoLoading}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}

            {activeTab === "password" && (
              <form
                onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-brand-green mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className={inputClass(
                      passwordForm.formState.errors.currentPassword,
                    )}
                    {...passwordForm.register("currentPassword", {
                      required: "Current password is required",
                    })}
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-green mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    className={inputClass(
                      passwordForm.formState.errors.newPassword,
                    )}
                    {...passwordForm.register("newPassword", {
                      required: "New password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {passwordForm.formState.errors.newPassword && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-green mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                    className={inputClass(
                      passwordForm.formState.errors.confirmPassword,
                    )}
                    {...passwordForm.register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordForm.watch("newPassword") ||
                        "Passwords do not match",
                    })}
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-500 font-medium">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {passwordMessage && (
                  <StatusBanner
                    type={passwordMessage.type}
                    text={passwordMessage.text}
                  />
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={passwordLoading}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const inputClass = (error) =>
  `w-full px-4 py-2.5 rounded-xl bg-white border-2 text-sm text-brand-green placeholder-gray-400 transition-all focus:outline-none ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-leaf/20"
  }`;

const StatusBanner = ({ type, text }) => {
  const isError = type === "error";
  return (
    <div
      className={`
        flex items-start gap-3 p-3.5 rounded-xl border
        ${isError ? "bg-red-50 border-red-100" : "bg-brand-leaf/5 border-brand-leaf/20"}
      `}
    >
      <div
        className={`
          w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5
          ${isError ? "bg-red-500" : "bg-brand-leaf"}
        `}
      >
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          {isError ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          )}
        </svg>
      </div>
      <p
        className={`text-sm font-medium ${isError ? "text-red-700" : "text-brand-green"}`}
      >
        {text}
      </p>
    </div>
  );
};

export default ProfileModal;
