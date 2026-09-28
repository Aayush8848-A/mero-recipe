import { useNavigate } from "react-router-dom";
import Button from "../components/common/button";

const AboutUs = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      title: "Authentic Recipes",
      description:
        "Every dish is rooted in generations of culinary tradition, carefully preserved and shared.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Made with Love",
      description:
        "We believe great food is an act of care. Every recipe is tested, tasted, and tweaked until it shines.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "A World of Flavors",
      description:
        "From the hills of Nepal to global kitchens — a growing collection of recipes from every corner.",
    },
  ];

  const stats = [
    { number: "500+", label: "Recipes" },
    { number: "50+", label: "Categories" },
    { number: "10k+", label: "Home Cooks" },
    { number: "100%", label: "Made with Love" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="relative bg-linear-to-br from-brand-green via-[#1e6b3e] to-brand-leaf overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-125 h-125 rounded-full bg-brand-orange blur-[100px]" />
          <div className="absolute bottom-0 -left-20 w-100 h-100 rounded-full bg-brand-leaf blur-[100px]" />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32 text-center z-10">
          <span className="inline-block px-5 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
            Our Story
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-md">
            Cooking is our{" "}
            <span className="text-brand-orange">love language</span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/90 text-lg drop-shadow-sm">
            मेरो Recipe started with a simple idea — that the warmth of a
            home-cooked meal should be shared, not lost. We're building a home
            for recipes that feel like a hug from your grandmother.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <div className="h-1 w-24 bg-linear-to-r from-brand-green to-brand-orange rounded-full mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-6">
              Why we do what we do
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Every family has that one recipe — the one that gets passed down
                through generations, scribbled on the back of an envelope, or
                memorized by heart. Ours was a simple chicken curry, and it
                taught us that food is more than fuel. It's memory. It's love.
              </p>
              <p>
                मेरो Recipe is a place to preserve those memories. To make sure
                the flavors of our childhoods don't disappear. And to help a new
                generation of cooks discover the joy of making something from
                scratch — for someone they love.
              </p>
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/search")}
              >
                Explore Recipes →
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-brand-orange/20 to-brand-leaf/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="aspect-square bg-linear-to-br from-brand-green to-brand-leaf flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🍛</div>
                  <p className="text-white font-bold text-2xl">मेरो Recipe</p>
                  <p className="text-white/80 text-sm mt-2">
                    From our kitchen to yours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-brand-green to-brand-orange bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-sm text-gray-500 mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="h-1 w-24 bg-linear-to-r from-brand-green to-brand-orange rounded-full mb-6 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
            What we stand for
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Three simple values that guide every recipe we publish and every
            story we tell.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-brand-green to-brand-leaf text-white flex items-center justify-center mb-6 group-hover:from-brand-orange group-hover:to-[#d97a1f] transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-green mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-linear-to-r from-brand-orange to-[#f5a623] text-white p-10 md:p-16 text-center shadow-2xl shadow-orange-500/20 relative overflow-hidden max-w-5xl mx-auto">
          <div className="absolute top-0 right-0 opacity-15 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
            <svg
              width="300"
              height="300"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
            Let's cook something together
          </h3>
          <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg relative z-10">
            Dive into hundreds of recipes and find your next signature dish.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white! text-brand-orange! hover:bg-gray-100! border-none! shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative z-10"
            onClick={() => navigate("/search")}
          >
            Browse All Recipes
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
