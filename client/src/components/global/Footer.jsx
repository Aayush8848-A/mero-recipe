import Logo from "../common/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white mt-20">
      <div className="container mx-auto px-4 md:px-8 py-16 grid gap-12 md:grid-cols-3">
        <div className="space-y-4">
          <Logo size="md" />
          <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
            Authentic recipes curated with love. Cook, share, and enjoy the
            flavors of Nepal, one dish at a time.
          </p>
          <div className="flex gap-4 pt-2"></div>
        </div>

        <div>
          <h4 className="text-brand-orange font-semibold mb-6 text-lg tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                Browse Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-orange font-semibold mb-6 text-lg tracking-wide">
            Categories
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/search?category=Breakfast"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                Breakfast
              </Link>
            </li>
            <li>
              <Link
                to="/search?category=Lunch"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                Lunch
              </Link>
            </li>
            <li>
              <Link
                to="/search?category=Dinner"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                Dinner
              </Link>
            </li>
            <li>
              <Link
                to="/search?category=Dessert"
                className="text-gray-300 hover:text-brand-leaf transition-colors duration-200"
              >
                Dessert
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8 py-6 text-center text-xs text-gray-400">
          © {currentYear} मेरो Recipe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
