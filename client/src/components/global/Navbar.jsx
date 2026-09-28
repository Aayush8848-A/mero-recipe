import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../common/Logo";
import Button from "../common/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Browse Recipes", to: "/search" },
    { name: "About", to: "/about" },
  ];

  const isAdmin = !!(
    localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken")
  );

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 md:px-8 flex items-center justify-between h-20">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo size="lg" />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-colors duration-200 relative py-2 ${
                    isActive
                      ? "text-brand-orange"
                      : "text-brand-green hover:text-brand-leaf"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {isAdmin ? (
            <>
              <span className="text-sm text-brand-green font-medium">
                Hi, <span className="font-bold">Chef</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/login")}
              className="shadow-md hover:shadow-lg transition-all"
            >
              Login
            </Button>
          )}
        </div>

        <button
          className="md:hidden text-brand-green p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-6 space-y-4 shadow-xl absolute w-full left-0">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-base font-semibold transition-colors ${
                  isActive
                    ? "text-brand-orange"
                    : "text-brand-green hover:text-brand-leaf"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-gray-100">
            {isAdmin ? (
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => navigate("/admin-dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
