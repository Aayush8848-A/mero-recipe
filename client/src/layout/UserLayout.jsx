import { Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import RouteLoader from "../components/common/RouteLoader";
import { useRouteChangeLoader } from "../hooks/useRouteChangeLoader";

const UserLayout = () => {
  useRouteChangeLoader(4000);
  return (
    <div className="min-h-screen flex flex-col bg-cream-100">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <RouteLoader />
    </div>
  );
};

export default UserLayout;
