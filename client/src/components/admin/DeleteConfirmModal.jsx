const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  recipe,
  isLoading,
}) => {
  if (!recipe) return null;

  return (
    <>
      <div
        onClick={!isLoading ? onClose : undefined}
        className={`
          fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50
          flex items-center justify-center p-4
          transition-opacity duration-200
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-white rounded-3xl shadow-2xl max-w-md w-full p-6
            transition-all duration-300
            ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          `}
        >
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-5 mx-auto">
            <svg
              className="w-7 h-7 text-red-500"
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
          </div>

          <h3 className="text-xl font-bold text-brand-green text-center mb-2">
            Delete this recipe?
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            <span className="font-bold text-gray-700">"{recipe.title}"</span>{" "}
            will be permanently removed. This action can't be undone.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Deleting...
                </>
              ) : (
                "Delete Recipe"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmModal;
