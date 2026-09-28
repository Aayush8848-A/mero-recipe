import { useEffect, useState } from "react";

export const useMinimumLoading = (isLoading, minimumMs = 600) => {
  const [showLoader, setShowLoader] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, minimumMs);
      return () => clearTimeout(timer);
    }
  }, [isLoading, minimumMs]);

  return showLoader;
};
