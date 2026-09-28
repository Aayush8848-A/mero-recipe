const StatsRow = ({ stats }) => {
  const items = [
    {
      key: "total",
      label: "Total Recipes",
      value: stats.total || 0,
      icon: (
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
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      color: "from-brand-green to-brand-leaf",
      bg: "bg-brand-green/5",
      border: "border-brand-green/10",
    },
    {
      key: "published",
      label: "Published",
      value: stats.published || 0,
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-brand-leaf to-[#3d8c40]",
      bg: "bg-brand-leaf/5",
      border: "border-brand-leaf/10",
    },
    {
      key: "drafts",
      label: "Drafts",
      value: stats.drafts || 0,
      icon: (
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      color: "from-gray-400 to-gray-500",
      bg: "bg-gray-50",
      border: "border-gray-100",
    },
    {
      key: "featured",
      label: "Featured",
      value: stats.featured || 0,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: "from-brand-orange to-[#d97a1f]",
      bg: "bg-brand-orange/5",
      border: "border-brand-orange/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.key}
          className={`bg-white rounded-2xl border ${item.border} p-5 shadow-sm hover:shadow-md transition-all duration-200`}
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center text-brand-green`}
            >
              {item.icon}
            </div>
          </div>
          <p
            className={`text-3xl font-bold bg-linear-to-r ${item.color} bg-clip-text text-transparent`}
          >
            {item.value}
          </p>
          <p className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-wide">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsRow;
