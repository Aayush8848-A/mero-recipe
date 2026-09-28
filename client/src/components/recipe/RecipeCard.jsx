import { Link } from "react-router-dom";
import { API_URL } from "../../constant/apiConstant";

const RecipeCard = ({ recipe }) => {
  return (
    <Link
      to={`/recipes/${recipe._id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-4/3 bg-cream-200 overflow-hidden">
        {recipe.recipeImage ? (
          <img
            src={`${API_URL}/uploads/${recipe.recipeImage}`}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-300 text-4xl">
            🍽️
          </div>
        )}

        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-semibold shadow-soft">
          {recipe.category}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-brand font-bold text-lg text-primary-700 group-hover:text-accent-500 transition line-clamp-1">
          {recipe.title}
        </h3>
        <p className="text-sm text-primary-500 mt-1 line-clamp-2">
          {recipe.description || "A delicious recipe waiting to be discovered."}
        </p>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-cream-200 text-xs text-primary-500">
          <span className="flex items-center gap-1">
            ⏱️ {recipe.cookingTime} min
          </span>
          <span className="flex items-center gap-1">
            👥 {recipe.servings} servings
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
