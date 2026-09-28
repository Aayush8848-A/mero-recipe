import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeCard from "../components/recipe/RecipeCard";
import Loader from "../components/common/Loader";
import Button from "../components/common/button";
import { recipeService } from "../service/recipeService";
import { useMinimumLoading } from "../hooks/useMinimumLoading";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const ingredient = searchParams.get("ingredient") || "";
  const minCookingTime = searchParams.get("minCookingTime") || "";
  const maxCookingTime = searchParams.get("maxCookingTime") || "";
  const minServings = searchParams.get("minServings") || "";
  const maxServings = searchParams.get("maxServings") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 9;

  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const showLoader = useMinimumLoading(loading, 900);

  const [localSearch, setLocalSearch] = useState(keyword);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);

      const apiParams = { page, limit, sortBy, order };
      if (keyword) apiParams.keyword = keyword;
      if (category) apiParams.category = category;
      if (ingredient) apiParams.ingredient = ingredient;
      if (minCookingTime) apiParams.minCookingTime = minCookingTime;
      if (maxCookingTime) apiParams.maxCookingTime = maxCookingTime;
      if (minServings) apiParams.minServings = minServings;
      if (maxServings) apiParams.maxServings = maxServings;

      const res = await recipeService.search(apiParams);

      setRecipes(res.data.data || []);
      setPagination(res.data.pagination || null);
    } catch (err) {
      if (err.response?.status === 404) {
        setRecipes([]);
        setPagination({ total: 0, page: 1, totalPages: 0 });
      } else {
        console.error("Failed to search recipes:", err);
      }
    } finally {
      setLoading(false);
    }
  }, [
    keyword,
    category,
    ingredient,
    minCookingTime,
    maxCookingTime,
    minServings,
    maxServings,
    sortBy,
    order,
    page,
    limit,
  ]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  useEffect(() => {
    setLocalSearch(keyword);
  }, [keyword]);

  const updateParams = (updates, resetPage = true) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    if (resetPage) newParams.set("page", "1");

    setSearchParams(newParams);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateParams({ keyword: localSearch.trim() });
  };

  const handleCategoryClick = (cat) => {
    updateParams({ category: category === cat ? "" : cat });
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setLocalSearch("");
  };

  const hasActiveFilters =
    keyword ||
    category ||
    ingredient ||
    minCookingTime ||
    maxCookingTime ||
    minServings ||
    maxServings ||
    sortBy !== "createdAt";

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <section className="bg-linear-to-br from-brand-green to-brand-leaf py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {keyword && category
              ? `"${keyword}" in ${category}`
              : keyword
                ? `Results for "${keyword}"`
                : category
                  ? `${category} Recipes`
                  : "Browse All Recipes"}
          </h1>

          <form
            onSubmit={handleSearch}
            className="max-w-2xl flex gap-2 bg-white p-2 rounded-2xl shadow-lg"
          >
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="flex-1 px-4 py-3 rounded-xl bg-transparent text-brand-green placeholder-gray-400 focus:outline-none"
            />
            <Button type="submit" variant="accent" size="md">
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-brand-green hidden md:inline">
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 ${
                  category === cat
                    ? "bg-brand-orange border-brand-orange text-white shadow-md"
                    : "bg-white border-gray-200 text-brand-green hover:border-brand-orange"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-sm font-semibold text-brand-green hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              Advanced Filters
            </button>

            <select
              value={`${sortBy}-${order}`}
              onChange={(e) => {
                const [newSortBy, newOrder] = e.target.value.split("-");
                updateParams({ sortBy: newSortBy, order: newOrder });
              }}
              className="text-sm font-medium text-brand-green bg-white border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-brand-green cursor-pointer"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="cookingTime-asc">Quickest to Cook</option>
              <option value="cookingTime-desc">Longest to Cook</option>
              <option value="title-asc">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-brand-green mb-2">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  defaultValue={ingredient}
                  onBlur={(e) => updateParams({ ingredient: e.target.value })}
                  placeholder="e.g., chicken, rice, onion"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-brand-green focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-green mb-2">
                  Cooking Time (min)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={minCookingTime}
                    onBlur={(e) =>
                      updateParams({ minCookingTime: e.target.value })
                    }
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-brand-green focus:outline-none text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    defaultValue={maxCookingTime}
                    onBlur={(e) =>
                      updateParams({ maxCookingTime: e.target.value })
                    }
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-brand-green focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-green mb-2">
                  Servings
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue={minServings}
                    onBlur={(e) =>
                      updateParams({ minServings: e.target.value })
                    }
                    placeholder="Min"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-brand-green focus:outline-none text-sm"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    defaultValue={maxServings}
                    onBlur={(e) =>
                      updateParams({ maxServings: e.target.value })
                    }
                    placeholder="Max"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-brand-green focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={clearAllFilters}
                  className="text-sm font-semibold text-red-500 hover:text-red-600"
                >
                  ✕ Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && pagination && (
          <p className="text-gray-500 mb-6">
            Showing{" "}
            <span className="font-bold text-brand-green">{recipes.length}</span>{" "}
            of{" "}
            <span className="font-bold text-brand-green">
              {pagination.total}
            </span>{" "}
            recipe{pagination.total !== 1 ? "s" : ""}
          </p>
        )}

        {showLoader ? (
          <Loader text="Searching for recipes..." />
        ) : recipes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-brand-green text-xl font-bold mb-2">
              No recipes found
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your filters or search with a different keyword.
            </p>
            <Button variant="outline" onClick={clearAllFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrevPage}
                  onClick={() => updateParams({ page: page - 1 }, false)}
                >
                  ← Previous
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1,
                  )
                    .filter((p) => {
                      return (
                        p === 1 ||
                        p === pagination.totalPages ||
                        Math.abs(p - page) <= 1
                      );
                    })
                    .map((p, idx, arr) => (
                      <span key={p} className="flex items-center">
                        {idx > 0 && arr[idx - 1] !== p - 1 && (
                          <span className="px-2 text-gray-400">...</span>
                        )}
                        <button
                          onClick={() => updateParams({ page: p }, false)}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                            p === page
                              ? "bg-brand-green text-white"
                              : "bg-white text-brand-green border border-gray-200 hover:border-brand-green"
                          }`}
                        >
                          {p}
                        </button>
                      </span>
                    ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNextPage}
                  onClick={() => updateParams({ page: page + 1 }, false)}
                >
                  Next →
                </Button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
