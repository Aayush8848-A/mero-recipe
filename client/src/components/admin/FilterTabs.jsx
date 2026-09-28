import { useEffect, useState } from "react";

const TABS = [
  { key: "all", label: "All", count: null },
  { key: "published", label: "Published" },
  { key: "drafts", label: "Drafts" },
  { key: "featured", label: "Featured" },
];

const FilterTabs = ({
  activeFilter = "all",
  onFilterChange,
  search = "",
  onSearchChange,
  counts = {},
  onNewRecipe,
}) => {
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange(localSearch);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);

  // Sync external search → local input
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-2xl border border-gray-100 shadow-sm">
          {TABS.map((tab) => {
            const isActive = activeFilter === tab.key;
            const count = counts[tab.key];
            return (
              <button
                key={tab.key}
                onClick={() => onFilterChange(tab.key)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200
                  flex items-center gap-2
                  ${
                    isActive
                      ? "bg-brand-green text-white shadow-sm"
                      : "text-gray-500 hover:text-brand-green hover:bg-gray-50"
                  }
                `}
              >
                {tab.label}
                {typeof count === "number" && (
                  <span
                    className={`
                      text-[10px] font-bold px-1.5 py-0.5 rounded-full
                      ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}
                    `}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={onNewRecipe}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-brand-orange to-[#d97a1f] text-white text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
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

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search recipes by title, ingredient..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-gray-100 text-brand-green placeholder-gray-400 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-leaf/20 transition-all"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterTabs;
