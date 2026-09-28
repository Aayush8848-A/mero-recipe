import { Link } from "react-router-dom";

const Logo = ({ size = "md", showText = false, to = "/" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-28 h-28",
  };

  return (
    <Link to={to} className="flex items-center gap-3 group">
      <img
        src="/logo.png"
        alt="मेरो Recipe"
        className={`${sizes[size]} object-contain transition-transform group-hover:scale-105`}
      />
      {showText && (
        <span className="font-brand font-bold text-xl text-primary-600 tracking-tight">
          मेरो <span className="text-accent-500">Recipe</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
