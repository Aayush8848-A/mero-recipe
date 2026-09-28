import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import AdminTopBar from "../../components/admin/AdminTopBar";
import StatsRow from "../../components/admin/StatsRow";
import FilterTabs from "../../components/admin/FilterTabs";
import RecipeAdminCard from "../../components/admin/RecipeAdminCard";
import RecipeFormModal from "../../components/admin/RecipeFormModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";
import Loader from "../../components/common/Loader";
import { recipeService } from "../../service/recipeService";
import ProfileModal from "../../components/admin/ProfileModal";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") || "all";
  const searchQuery = searchParams.get("search") || "";

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formModal, setFormModal] = useState({ open: false, recipe: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, recipe: null });
  const [mutationLoading, setMutationLoading] = useState(false);

  const [toast, setToast] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("adminUser") || "{}");
    } catch {
      return {};
    }
  });

  const [profileOpen, setProfileOpen] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await recipeService.getAllAdmin();
      setRecipes(res.data.data || []);
    } catch (err) {
      console.error("Failed to load recipes:", err);
      setError("Failed to load recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const stats = useMemo(() => {
    const total = recipes.length;
    const published = recipes.filter((r) => r.isPublished).length;
    const drafts = recipes.filter((r) => !r.isPublished).length;
    const featured = recipes.filter((r) => r.isFeatured).length;
    return { total, published, drafts, featured };
  }, [recipes]);

  const filterCounts = useMemo(
    () => ({
      all: stats.total,
      published: stats.published,
      drafts: stats.drafts,
      featured: stats.featured,
    }),
    [stats],
  );

  const visibleRecipes = useMemo(() => {
    let list = [...recipes];

    // Filter
    if (activeFilter === "published") {
      list = list.filter((r) => r.isPublished);
    } else if (activeFilter === "drafts") {
      list = list.filter((r) => !r.isPublished);
    } else if (activeFilter === "featured") {
      list = list.filter((r) => r.isFeatured);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.ingredients?.some((i) => i.toLowerCase().includes(q)),
      );
    }

    // Sort: newest first
    return list.sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );
  }, [recipes, activeFilter, searchQuery]);

  const handleFilterChange = (filter) => {
    const params = new URLSearchParams(searchParams);
    if (filter === "all") params.delete("filter");
    else params.set("filter", filter);
    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (!value.trim()) params.delete("search");
    else params.set("search", value);
    setSearchParams(params, { replace: true });
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFormSubmit = async (formData) => {
    const isEdit = !!formModal.recipe;
    setMutationLoading(true);
    try {
      if (isEdit) {
        const res = await recipeService.update(formModal.recipe._id, formData);
        const updated = res.data.data;
        setRecipes((prev) =>
          prev.map((r) => (r._id === updated._id ? updated : r)),
        );
        showToast("Recipe updated successfully");
        setHighlightId(updated._id);
      } else {
        const res = await recipeService.create(formData);
        const created = res.data.data;
        setRecipes((prev) => [created, ...prev]);
        showToast("Recipe created successfully");
        setHighlightId(created._id);
      }
      closeFormModal();
      setTimeout(() => setHighlightId(null), 2000);
    } catch (err) {
      console.error("Save failed:", err);
      showToast(
        err.response?.data?.message || "Failed to save recipe",
        "error",
      );
    } finally {
      setMutationLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.recipe) return;
    setMutationLoading(true);
    try {
      await recipeService.remove(deleteModal.recipe._id);
      setRecipes((prev) =>
        prev.filter((r) => r._id !== deleteModal.recipe._id),
      );
      showToast("Recipe deleted successfully");
      closeDeleteModal();
    } catch (err) {
      console.error("Delete failed:", err);
      showToast(
        err.response?.data?.message || "Failed to delete recipe",
        "error",
      );
    } finally {
      setMutationLoading(false);
    }
  };

  const handleTogglePublish = async (recipe) => {
    const nextState = !recipe.isPublished;

    setRecipes((prev) =>
      prev.map((r) =>
        r._id === recipe._id
          ? {
              ...r,
              isPublished: nextState,
              // If unpublishing, un-feature too
              isFeatured: nextState ? r.isFeatured : false,
            }
          : r,
      ),
    );

    try {
      const res = await recipeService.togglePublish(recipe._id);
      const updated = res.data.data;
      setRecipes((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r)),
      );
      showToast(nextState ? "Recipe published" : "Recipe unpublished");
    } catch (err) {
      console.error("Publish toggle failed:", err);
      // Revert
      setRecipes((prev) =>
        prev.map((r) => (r._id === recipe._id ? recipe : r)),
      );
      showToast(
        err.response?.data?.message || "Failed to toggle publish",
        "error",
      );
    }
  };

  const handleToggleFeatured = async (recipe) => {
    if (!recipe.isPublished && !recipe.isFeatured) {
      showToast("Publish the recipe before featuring it", "error");
      return;
    }

    const nextState = !recipe.isFeatured;

    setRecipes((prev) =>
      prev.map((r) =>
        r._id === recipe._id ? { ...r, isFeatured: nextState } : r,
      ),
    );

    try {
      const res = await recipeService.toggleFeatured(recipe._id);
      const updated = res.data.data;
      setRecipes((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r)),
      );
      showToast(nextState ? "Added to featured" : "Removed from featured");
    } catch (err) {
      console.error("Feature toggle failed:", err);
      setRecipes((prev) =>
        prev.map((r) => (r._id === recipe._id ? recipe : r)),
      );
      showToast(
        err.response?.data?.message || "Failed to toggle featured",
        "error",
      );
    }
  };

  const openCreateModal = () => setFormModal({ open: true, recipe: null });
  const openEditModal = (recipe) => setFormModal({ open: true, recipe });
  const closeFormModal = () => setFormModal({ open: false, recipe: null });

  const openDeleteModal = (recipe) => setDeleteModal({ open: true, recipe });
  const closeDeleteModal = () => setDeleteModal({ open: false, recipe: null });

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminTopBar user={user} onProfileClick={() => setProfileOpen(true)} />
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onUserUpdate={(updated) => setUser(updated)}
      />

      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-green">
            Welcome back, {user?.name?.split(" ")[0] || "Chef"} 👋
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your recipes, publish new dishes, and curate what's featured.
          </p>
        </div>

        <div className="mb-8">
          <StatsRow stats={stats} />
        </div>

        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          search={searchQuery}
          onSearchChange={handleSearchChange}
          counts={filterCounts}
          onNewRecipe={openCreateModal}
        />

        {loading ? (
          <div className="py-20">
            <Loader text="Loading your recipes..." />
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-red-100 max-w-lg mx-auto">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="text-brand-green font-bold text-lg mb-1">
              Something went wrong
            </p>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button
              onClick={fetchRecipes}
              className="px-5 py-2.5 rounded-xl bg-brand-green text-white font-bold text-sm hover:bg-[#144a2a] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : visibleRecipes.length === 0 ? (
          <EmptyState
            filter={activeFilter}
            search={searchQuery}
            onCreate={openCreateModal}
            onClearFilters={() => {
              setSearchParams({});
            }}
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleRecipes.map((recipe) => (
              <RecipeAdminCard
                key={recipe._id}
                recipe={recipe}
                isHighlighted={highlightId === recipe._id}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onTogglePublish={handleTogglePublish}
                onToggleFeatured={handleToggleFeatured}
              />
            ))}
          </div>
        )}
      </main>

      <RecipeFormModal
        isOpen={formModal.open}
        recipe={formModal.recipe}
        onClose={closeFormModal}
        onSubmit={handleFormSubmit}
        isLoading={mutationLoading}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.open}
        recipe={deleteModal.recipe}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        isLoading={mutationLoading}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

const EmptyState = ({ filter, search, onCreate, onClearFilters }) => {
  const hasFilters = filter !== "all" || search;

  return (
    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 max-w-2xl mx-auto">
      <div className="text-6xl mb-4">
        {search
          ? "🔍"
          : filter === "drafts"
            ? "📝"
            : filter === "featured"
              ? "⭐"
              : "🍽️"}
      </div>
      <h3 className="text-xl font-bold text-brand-green mb-2">
        {search
          ? `No recipes match "${search}"`
          : filter === "drafts"
            ? "No drafts"
            : filter === "featured"
              ? "No featured recipes yet"
              : "No recipes yet"}
      </h3>
      <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
        {search
          ? "Try a different search term or clear the filters."
          : filter === "drafts"
            ? "All your recipes are published. Nice work!"
            : filter === "featured"
              ? "Star a published recipe to feature it on the home page."
              : "Start your collection by adding your first recipe."}
      </p>

      <div className="flex items-center justify-center gap-3">
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            Clear Filters
          </button>
        )}
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-brand-orange to-[#d97a1f] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New Recipe
        </button>
      </div>
    </div>
  );
};

const Toast = ({ message, type }) => {
  const isError = type === "error";
  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-200
        px-5 py-3 rounded-2xl shadow-2xl
        flex items-center gap-3
        text-sm font-bold text-white
        animate-[toastIn_0.3s_ease-out]
        ${isError ? "bg-red-500" : "bg-brand-green"}
      `}
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        {isError ? (
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
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
      {message}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
