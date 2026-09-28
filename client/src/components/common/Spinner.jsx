const Spinner = ({ size = "md", color = "primary" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-10 h-10 border-[3px]",
    xl: "w-16 h-16 border-4",
  };

  const colors = {
    primary: "border-primary-200 border-t-primary-600",
    accent: "border-accent-200 border-t-accent-500",
    white: "border-white/30 border-t-white",
  };

  return (
    <div
      className={`
        inline-block rounded-full animate-spin
        ${sizes[size]} ${colors[color]}
      `}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
