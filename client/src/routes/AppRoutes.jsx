import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import RecipeDetails from "../pages/RecipeDetails";
import SearchResults from "../pages/SearchResults";
import AboutUs from "../pages/AboutUs";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "recipes/:recipeId", element: <RecipeDetails /> },
      { path: "search", element: <SearchResults /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin-dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
