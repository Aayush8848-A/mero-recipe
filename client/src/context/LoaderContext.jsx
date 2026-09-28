import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const counterRef = useRef(0);

  const showLoader = useCallback(() => {
    counterRef.current += 1;
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    counterRef.current = Math.max(0, counterRef.current - 1);
    if (counterRef.current === 0) {
      setIsLoading(false);
    }
  }, []);

  const withLoader = useCallback(
    async (asyncFn) => {
      showLoader();
      try {
        return await asyncFn();
      } finally {
        hideLoader();
      }
    },
    [showLoader, hideLoader],
  );

  return (
    <LoaderContext.Provider
      value={{ isLoading, showLoader, hideLoader, withLoader }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) {
    throw new Error("useLoader must be used inside <LoaderProvider>");
  }
  return ctx;
};
