import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";
import { recipeService } from "../service/recipeService";
import HeroSection from "../components/home/HeroSection";
import CallToAction from "../components/home/CallToAction";
import LatestRecipes from "../components/home/LatestRecipes";
import FeaturedRecipes from "../components/home/FeaturedRecipes";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await recipeService.getFeatured();
        setRecipes(res.data.data || []);
      } catch (err) {
        console.error("Failed to load recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection />

      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <Loader text="Fetching delicious recipes..." />
        ) : recipes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <p className="text-brand-green text-xl font-bold">
              No recipes yet 🍽️
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Check back soon for delicious additions.
            </p>
          </div>
        ) : (
          <FeaturedRecipes />
        )}
      </section>
      <LatestRecipes />

      <CallToAction />
    </div>
  );
};

export default Home;
