import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/button";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

  return (
    <section className="relative bg-linear-to-br from-brand-green via-[#1e6b3e] to-brand-leaf overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-125 h-125 rounded-full bg-brand-orange blur-[100px] animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 -left-20 w-100 h-100 rounded-full bg-[#4CAF50] blur-[100px] animate-[float_10s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative container mx-auto px-4 md:px-8 py-16 md:py-8 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-5 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm animate-[fadeInUp_0.6s_ease-out_both]">
              🍛 Authentic Nepali Flavors
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md animate-[fadeInUp_0.6s_ease-out_0.1s_both]">
              Discover the Taste of{" "}
              <span className="bg-gray-200 rounded px-2 text-brand-orange drop-shadow-none">
                मेरो Recipe
              </span>
            </h1>

            <p className="max-w-xl lg:max-w-none mx-auto lg:mx-0 text-white/90 text-lg mb-10 drop-shadow-sm animate-[fadeInUp_0.6s_ease-out_0.2s_both]">
              Explore handpicked recipes from every corner of Nepal — from spicy
              curries to sweet delights. Cook, share, and savor.
            </p>

            <form
              onSubmit={handleSearch}
              className="max-w-xl mx-auto lg:mx-0 flex gap-2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(242,142,43,0.2)] animate-[fadeInUp_0.6s_ease-out_0.3s_both]"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recipes . . . ."
                className="flex-1 px-4 py-3 rounded-xl bg-transparent text-brand-green placeholder-gray-400 focus:outline-none font-medium"
              />
              <Button type="submit" variant="accent" size="md">
                Search
              </Button>
            </form>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8 animate-[fadeInUp_0.6s_ease-out_0.4s_both]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => navigate(`/search?category=${cat}`)}
                  className="px-5 py-2 rounded-full text-sm font-semibold bg-white/10 border border-white/20 text-white hover:bg-brand-orange hover:border-brand-orange hover:scale-105 transition-all duration-200"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full max-w-sm mx-auto md:aspect-4/5 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
              <div className="absolute inset-0 rounded-[3rem] bg-brand-orange/20 blur-2xl scale-95 animate-[pulse_6s_ease-in-out_infinite]" />

              <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="/chef.jpg"
                  alt="A happy chef wearing a tall white toque"
                  loading="eager"
                  fetchpriority="high"
                  className="w-full h-full object-cover object-top animate-[slowZoom_20s_ease-in-out_infinite_alternate]"
                />

                <div className="absolute inset-0 bg-linear-to-t from-brand-green/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
                  <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-xl shrink-0">
                    👨‍🍳
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">
                      Shared with love by
                    </p>
                    <p className="text-brand-green font-bold text-sm truncate">
                      Our head chef
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl p-2 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite]">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-xl">
                  🍲
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Recipes</p>
                  <p className="text-brand-green font-bold text-lg leading-none">
                    10+
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl p-2 flex items-center gap-3 animate-[float_5s_ease-in-out_infinite_reverse]">
                <div className="w-10 h-10 rounded-xl bg-brand-leaf/10 flex items-center justify-center text-xl">
                  ⭐
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Loved by</p>
                  <p className="text-brand-green font-bold text-lg leading-none">
                    10k+
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes slowZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
