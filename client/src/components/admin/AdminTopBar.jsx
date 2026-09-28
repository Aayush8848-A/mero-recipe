import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminTopBar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-brand-green to-brand-leaf flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-shadow">
            म
          </div>
          <div className="leading-tight hidden sm:block">
            <p className="text-sm font-bold text-brand-green">मेरो Recipe</p>
            <p className="text-[10px] font-semibold text-brand-orange uppercase tracking-widest">
              Studio
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-green transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          >
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            View Site
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100"
            >
              <div className="w-7 h-7 rounded-full bg-linear-to-br from-brand-orange to-[#d97a1f] flex items-center justify-center text-white text-xs font-bold">
                {user[0]?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <span className="text-sm font-semibold text-brand-green hidden sm:inline">
                {user[0]?.name?.split(" ")[0] || "Admin"}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden py-1.5">
                <div className="px-4 py-2.5 border-b border-gray-100">
                  <p className="text-sm font-bold text-brand-green truncate">
                    {user[0]?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user[0]?.email || "admin@recipe.com"}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2.5"
                >
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar;
