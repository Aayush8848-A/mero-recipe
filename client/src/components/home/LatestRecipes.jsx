import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../recipe/RecipeCard";
import Button from "../common/button";
import Loader from "../common/Loader";
import { recipeService } from "../../service/recipeService";

const PAGE_SIZE = 6;

const LatestRecipes = () => {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const fetchPage = useCallback(async (pageNum, append = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError("");

      const res = await recipeService.getAll({
        featured: "false",
        page: pageNum,
        limit: PAGE_SIZE,
      });

      const { data, pagination } = res.data;

      setRecipes((prev) => (append ? [...prev, ...data] : data));
      setHasNext(!!pagination?.hasNextPage);
    } catch (err) {
      console.error("Failed to load latest recipes:", err);
      setError("Couldn't load recipes right now.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next, true);
  };

  /* ---------- Section wrapper (always rendered) ---------- */
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="h-1 w-24 bg-linear-to-r from-brand-orange to-brand-green rounded-full mb-8" />

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green">
              More to Explore
            </h2>
            <p className="text-gray-500 mt-2 text-lg">
              Fresh from the kitchen — our latest additions
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => navigate("/search")}
            className="bg-white hover:bg-gray-50"
          >
            Browse All →
          </Button>
        </div>

        {loading ? (
          <div className="py-16">
            <Loader text="Loading more recipes..." />
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-2xl mb-2">⚠️</p>
            <p className="text-brand-green font-bold mb-1">
              Something went wrong
            </p>
            <p className="text-gray-500 text-sm mb-5">{error}</p>
            <Button variant="outline" size="sm" onClick={() => fetchPage(1)}>
              Try again
            </Button>
          </div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-brand-green font-bold text-lg mb-1">
              Nothing new yet
            </p>
            <p className="text-gray-500 text-sm">
              New recipes will show up here as they're published.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>

            <div className="flex justify-center mt-14">
              {hasNext ? (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLoadMore}
                  isLoading={loadingMore}
                  className="shadow-md hover:shadow-lg transition-all px-8"
                >
                  {loadingMore ? "Loading..." : "Load more recipes"}
                </Button>
              ) : (
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="h-px w-12 bg-gray-200" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    You've reached the end
                  </span>
                  <span className="h-px w-12 bg-gray-200" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestRecipes;
