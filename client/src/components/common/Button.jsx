
const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-green text-white hover:bg-[#144a2a] focus:ring-brand-green shadow-soft hover:shadow-card",

    accent:
      "bg-brand-orange text-white hover:bg-[#d97a1f] focus:ring-brand-orange shadow-soft hover:shadow-card",

    leaf: "bg-brand-leaf text-white hover:bg-[#3d8c40] focus:ring-brand-leaf shadow-soft hover:shadow-card",

    outline:
      "border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus:ring-brand-green",

    ghost: "text-brand-green hover:bg-[#e8f5e9] focus:ring-brand-green",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-base gap-2",
    lg: "px-7 py-3.5 text-lg gap-2.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
