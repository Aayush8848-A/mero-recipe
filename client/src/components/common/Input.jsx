import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      name,
      type = "text",
      error,
      required = false,
      icon,
      textarea = false,
      rows = 4,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles = `
    w-full px-4 py-2.5 rounded-xl
    bg-white border-2
    text-brand-green placeholder-gray-400
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-1
    ${
      error
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : "border-gray-200 focus:border-brand-green focus:ring-brand-leaf/30"
    }
    ${icon ? "pl-11" : ""}
  `;

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label
            htmlFor={name}
            className="block mb-1.5 text-sm font-medium text-brand-green"
          >
            {label}
            {required && <span className="text-brand-orange ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-green/60">
              {icon}
            </span>
          )}

          {textarea ? (
            <textarea
              id={name}
              name={name}
              rows={rows}
              ref={ref}
              className={`${baseStyles} resize-none`}
              {...props}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              ref={ref}
              className={baseStyles}
              {...props}
            />
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
