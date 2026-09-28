import { Link } from "react-router-dom";
import Button from "../components/common/button";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-cream-100 text-center px-4">
    <h1 className="text-7xl font-bold text-primary-600 font-brand">404</h1>
    <p className="text-primary-500 mt-4 mb-6">
      Oops! This page seems to have wandered off the menu.
    </p>
    <Link to="/">
      <Button variant="accent">← Back to Home</Button>
    </Link>
  </div>
);
export default NotFound;
