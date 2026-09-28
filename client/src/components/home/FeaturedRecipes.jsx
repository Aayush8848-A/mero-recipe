import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";
import Loader from "../common/Loader";
import { recipeService } from "../../service/recipeService";
import { API_URL } from "../../constant/apiConstant";

const FeaturedRecipes = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await recipeService.getFeatured();
        setRecipes(res.data.data || []);
      } catch (err) {
        if (err.response?.status === 404) {
          setRecipes([]);
        } else {
          console.error("Failed to load featured recipes:", err);
          setError("Couldn't load featured recipes right now.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <SectionHeader onBrowse={() => navigate("/search")} />
          <div className="py-16">
            <Loader text="Fetching featured recipes..." />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <SectionHeader onBrowse={() => navigate("/search")} />
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-2xl mx-auto">
            <p className="text-3xl mb-3">⚠️</p>
            <p className="text-brand-green font-bold mb-1">
              Something went wrong
            </p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Try again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (recipes.length === 0) {
    return (
      <section className="bg-gray-50">
        <div className="container mx-auto px-4 md:px-8 py-20">
          <SectionHeader onBrowse={() => navigate("/search")} />
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-2xl mx-auto">
            <p className="text-4xl mb-3">⭐</p>
            <p className="text-brand-green text-xl font-bold">
              No featured recipes yet
            </p>
            <p className="text-gray-500 text-sm mt-2">
              We're curating something delicious. Check back soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [hero, ...rest] = recipes;
  const sideRecipes = rest.slice(0, 4);

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 py-20">
        <SectionHeader onBrowse={() => navigate("/search")} />

        {sideRecipes.length === 0 ? (
          <FeaturedHeroCard
            recipe={hero}
            onClick={() => navigate(`/recipes/${hero._id}`)}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <FeaturedHeroCard
                recipe={hero}
                onClick={() => navigate(`/recipes/${hero._id}`)}
              />
            </div>

            <div className="lg:col-span-5 grid gap-6 sm:grid-cols-2">
              {sideRecipes.map((recipe) => (
                <FeaturedMiniCard
                  key={recipe._id}
                  recipe={recipe}
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const SectionHeader = ({ onBrowse }) => (
  <div className="mb-10">
    <div className="h-1 w-24 bg-linear-to-r from-brand-green to-brand-orange rounded-full mb-6" />

    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold text-brand-orange uppercase tracking-widest mb-2">
          ★ Handpicked
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-brand-green">
          Featured Recipes
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          A curated selection to inspire your next meal
        </p>
      </div>

      <Button
        variant="outline"
        size="md"
        onClick={onBrowse}
        className="bg-white hover:bg-gray-50"
      >
        View All →
      </Button>
    </div>
  </div>
);

const FeaturedHeroCard = ({ recipe, onClick }) => {
  const imgSrc =`${API_URL}/uploads/${recipe.recipeImage}`;

  return (
    <article
      onClick={onClick}
      className="
        group relative cursor-pointer overflow-hidden rounded-3xl
        h-105 lg:h-130
        bg-brand-green shadow-lg hover:shadow-2xl
        transition-all duration-300
      "
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
          🍽️
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />

      <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange text-white text-xs font-bold tracking-wide shadow-lg">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.9L22 9.9l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.3L2 9.9l7.1-1z" />
        </svg>
        Featured
      </div>

      {recipe.category && (
        <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-brand-green text-xs font-bold tracking-wide">
          {recipe.category}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 line-clamp-2">
          {recipe.title}
        </h3>

        {recipe.description && (
          <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 max-w-xl">
            {recipe.description}
          </p>
        )}

        <div className="flex items-center gap-5 text-white/90 text-sm font-medium">
          {recipe.cookingTime && (
            <span className="flex items-center gap-1.5">
              <ClockIcon />
              {recipe.cookingTime} min
            </span>
          )}
          {recipe.servings && (
            <span className="flex items-center gap-1.5">
              <UsersIcon />
              {recipe.servings} servings
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

const FeaturedMiniCard = ({ recipe, onClick }) => {
  const imgSrc = recipe.recipeImage
    ? `${API_URL}/uploads/${recipe.recipeImage}`
    : null;

  return (
    <article
      onClick={onClick}
      className="
        group relative cursor-pointer overflow-hidden rounded-2xl
        h-50
        bg-brand-green shadow-md hover:shadow-xl
        transition-all duration-300
      "
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={recipe.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
          🍽️
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h4 className="text-white text-base font-bold leading-snug line-clamp-2">
          {recipe.title}
        </h4>
        <div className="mt-1.5 flex items-center gap-3 text-white/80 text-xs font-medium">
          {recipe.cookingTime && (
            <span className="flex items-center gap-1">
              <ClockIcon small />
              {recipe.cookingTime} min
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

const ClockIcon = ({ small }) => (
  <svg
    className={small ? "w-3 h-3" : "w-4 h-4"}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UsersIcon = () => (
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
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

export default FeaturedRecipes;
