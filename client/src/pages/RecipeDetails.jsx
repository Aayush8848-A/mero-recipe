import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/common/button";
import Loader from "../components/common/Loader";
import { recipeService } from "../service/recipeService";
import { API_URL } from "../constant/apiConstant";

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await recipeService.getById(recipeId);
        setRecipe(res.data.data);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader text="Plating your recipe..." />
      </div>
    );

  if (!recipe)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-brand-green mb-4">
          Recipe not found 🍽️
        </h2>
        <Button onClick={() => navigate("/search")} variant="primary">
          Back to Recipes
        </Button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <section className="relative w-full h-[50vh] md:h-[60vh] bg-brand-green overflow-hidden">
        <img
          src={`${API_URL}uploads/${recipe.recipeImage}`}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
          <div className="container mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-semibold hover:bg-white/30 transition-all"
            >
              ← Back
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-xs font-bold uppercase tracking-wider">
                {recipe.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                ⏱ {recipe.cookingTime} mins
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                🍽 {recipe.servings} Servings
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight drop-shadow-lg">
              {recipe.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 lg:p-12 border border-gray-100">
          <p className="text-lg text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100">
            {recipe.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-brand-green">
                    Ingredients
                  </h2>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <ul className="space-y-3">
                  {recipe.ingredients?.map((ingredient, index) => {
                    const isChecked = checkedIngredients.includes(index);
                    return (
                      <li
                        key={index}
                        onClick={() => toggleIngredient(index)}
                        className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                          isChecked
                            ? "bg-gray-50 border-transparent opacity-50"
                            : "bg-white border-gray-100 hover:border-brand-leaf/50 hover:shadow-sm"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isChecked
                              ? "bg-brand-leaf border-brand-leaf"
                              : "border-gray-300"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span
                          className={`text-sm font-medium transition-all ${
                            isChecked
                              ? "line-through text-gray-400"
                              : "text-gray-700"
                          }`}
                        >
                          {ingredient}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold text-brand-green">
                  Instructions
                </h2>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div className="space-y-8">
                {recipe.instructions?.map((step, index) => (
                  <div key={index} className="flex gap-5 group">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-brand-green/10 text-brand-green font-bold flex items-center justify-center text-lg group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-16 p-6 rounded-2xl bg-linear-to-r from-gray-50 to-white border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand-green flex items-center justify-center text-white text-xl font-bold shadow-md">
                  {recipe.author?.name?.charAt(0) || "C"}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Recipe by</p>
                  <p className="text-lg font-bold text-brand-green">
                    {recipe.author?.name || "Chef"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetails;
