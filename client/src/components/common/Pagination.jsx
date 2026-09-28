const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
    return pages;
  };

  const btnBase =
    "min-w-[40px] h-10 px-3 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-400";

  return (
    <div className="flex items-center justify-center gap-2 my-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-primary-600 bg-white border-2 border-cream-300 hover:border-primary-600 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-2 text-primary-400">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${btnBase} ${
              currentPage === page
                ? "bg-primary-600 text-white shadow-soft"
                : "text-primary-700 bg-white border-2 border-cream-300 hover:border-accent-500 hover:text-accent-500"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-primary-600 bg-white border-2 border-cream-300 hover:border-primary-600 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
