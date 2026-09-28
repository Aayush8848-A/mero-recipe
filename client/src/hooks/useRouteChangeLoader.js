import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

export const useRouteChangeLoader = (minimumMs = 400) => {
  const { pathname } = useLocation();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, minimumMs);

    return () => {
      clearTimeout(timer);
      hideLoader();
    };
  }, [pathname, showLoader, hideLoader, minimumMs]);
};
