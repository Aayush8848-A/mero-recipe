import { useState, useRef, useEffect } from "react";
import { API_URL } from "../../constant/apiConstant";

const RecipeAdminCard = ({
  recipe,
  onEdit,
  onDelete,
  onTogglePublish,
  onToggleFeatured,
  isHighlighted = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const imageUrl = recipe.recipeImage
    ? `${API_URL}/uploads/${recipe.recipeImage}`
    : null;

  return (
    <div
      className={`
        group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm
        hover:shadow-xl transition-all duration-300
        ${isHighlighted ? "ring-2 ring-brand-orange animate-[highlight_2s_ease-out]" : ""}
      `}
    >
      <div className="relative h-44 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍽️
          </div>
        )}

        {recipe.isFeatured && (
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}

        <div
          className={`
            absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
            backdrop-blur-md flex items-center gap-1.5
            ${
              recipe.isPublished
                ? "bg-brand-leaf/90 text-white"
                : "bg-gray-800/70 text-white"
            }
          `}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full ${recipe.isPublished ? "bg-white animate-pulse" : "bg-gray-400"}`}
          />
          {recipe.isPublished ? "Live" : "Draft"}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-green leading-tight line-clamp-1 mb-1">
          {recipe.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">
          {recipe.description || "No description"}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium mb-4">
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {recipe.cookingTime} min
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {recipe.servings}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{recipe.category}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <ToggleSwitch
            checked={recipe.isPublished}
            onChange={() => onTogglePublish(recipe)}
            label="Publish"
            color="green"
          />
          <ToggleSwitch
            checked={recipe.isFeatured}
            onChange={() => onToggleFeatured(recipe)}
            label="Feature"
            color="orange"
            disabled={!recipe.isPublished}
          />
        </div>

        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gray-50 hover:bg-brand-green hover:text-white text-brand-green text-xs font-bold transition-all duration-200"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
              aria-label="More actions"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 bottom-full mb-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-1 z-20">
                <a
                  href={`/recipes/${recipe._id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
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
                  Preview
                </a>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(recipe);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes highlight {
          0%   { box-shadow: 0 0 0 0 rgba(242,142,43,0.5); }
          100% { box-shadow: 0 0 0 20px rgba(242,142,43,0); }
        }
      `}</style>
    </div>
  );
};

const ToggleSwitch = ({ checked, onChange, label, color, disabled }) => {
  const colors = {
    green: checked ? "bg-brand-leaf" : "bg-gray-200",
    orange: checked ? "bg-brand-orange" : "bg-gray-200",
  };

  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`
        flex-1 inline-flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold
        transition-all duration-200
        ${checked ? "text-white" : "text-gray-500"} 
        ${colors[color]}
        ${disabled ? "opacity-40 cursor-not-allowed" : "hover:opacity-90"}
      `}
    >
      <span>{label}</span>
      <div
        className={`
          w-8 h-4 rounded-full relative transition-colors
          ${checked ? "bg-white/30" : "bg-gray-300"}
        `}
      >
        <div
          className={`
            absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-all
            ${checked ? "left-4" : "left-0.5"}
          `}
        />
      </div>
    </button>
  );
};

export default RecipeAdminCard;
