import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../../components/common/button";
import { authService } from "../../service/authService";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    setServerError("");
    setIsLoading(true);
    try {
      const res = await authService.login({
        email: data.email.trim(),
        password: data.password,
      });

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", JSON.stringify(res.data.data));

      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setServerError(
        err.response?.data?.message || "Invalid credentials. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
      <div className="flex items-center justify-center p-6 md:p-10 lg:p-12">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-brand-green">
                मेरो <span className="text-brand-orange">Recipe</span>
              </span>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-bold uppercase tracking-wider mb-3">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Admin Access
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-brand-green mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Sign in to manage recipes, categories, and content.
            </p>
          </div>

          {serverError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">
              <svg
                className="w-4 h-4 text-red-500 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs text-red-700 font-medium">{serverError}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setValue("email", "admin@gmail.com");
              setValue("password", "admin123");
            }}
            className="w-full mb-4 flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-brand-green/5 border border-brand-green/10 hover:bg-brand-green/10 transition-colors text-left group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <svg
                className="w-4 h-4 text-brand-green shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs text-gray-600 truncate">
                Demo: <code className=" text-brand-green">admin@gmail.com</code>{" "}
                / <code className=" text-brand-green">admin123</code>
              </span>
            </div>
            <span className="hover:cursor-pointer text-[10px] font-bold uppercase tracking-wide text-brand-orange group-hover:underline shrink-0">
              Use
            </span>
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-brand-green mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border text-sm text-brand-green placeholder-gray-400 transition-all duration-200 focus:outline-none ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-leaf/30"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-brand-green mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={`w-full pl-10 pr-10 py-2.5 rounded-lg bg-white border text-sm text-brand-green placeholder-gray-400 transition-all duration-200 focus:outline-none ${
                    errors.password
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-brand-green focus:ring-2 focus:ring-brand-leaf/30"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-green transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-[11px] text-red-500 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-200 text-center">
            <p className="text-[11px] text-gray-500">
              Not an admin?{" "}
              <Link
                to="/"
                className="text-brand-orange font-semibold hover:underline"
              >
                Return to Home
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex relative bg-linear-to-br from-brand-green via-[#1e6b3e] to-brand-leaf items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-10 -right-20 w-125 h-125nded-full bg-brand-orange blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-100 h-100 rounded-full bg-brand-leaf blur-[100px]" />
        </div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-md text-center text-white px-8">
          <div className="text-6xl mb-5">👨‍🍳</div>
          <h2 className="text-2xl font-bold mb-3">
            Manage your kitchen with ease
          </h2>
          <p className="text-sm text-white/80 leading-relaxed mb-6">
            Add new recipes, update existing ones, manage categories, and keep
            your collection fresh — all from one clean dashboard.
          </p>

          <div className="space-y-2.5 text-left">
            {[
              "Add & edit recipes in seconds",
              "Manage categories and tags",
              "Track what's trending",
              "Publish or unpublish instantly",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
