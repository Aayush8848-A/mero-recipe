import { useNavigate } from "react-router-dom";
import Button from "../common/button";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 pb-20">
      <div className="rounded-3xl bg-linear-to-r from-brand-orange to-[#f5a623] text-white p-10 md:p-16 text-center shadow-2xl shadow-orange-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-15 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">
          Hungry for more?
        </h3>
        <p className="text-white/90 mb-8 max-w-xl mx-auto text-lg relative z-10">
          Dive into our full collection and find your next favorite dish.
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
  );
};

export default CallToAction;
