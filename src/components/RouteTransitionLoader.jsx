import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteTransitionLoaderContext = createContext(null);
const chakraSpokes = Array.from({ length: 24 }, (_, index) => index);

export function RouteTransitionLoaderProvider({ children }) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [targetPath, setTargetPath] = useState("");
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !targetPath || location.pathname !== targetPath) {
      return undefined;
    }

    const settleTimer = window.setTimeout(() => {
      setIsVisible(false);
      setTargetPath("");
    }, 220);

    return () => window.clearTimeout(settleTimer);
  }, [isVisible, location.pathname, targetPath]);

  useEffect(() => {
    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      showRouteLoader: (path) => {
        if (fallbackTimerRef.current) {
          window.clearTimeout(fallbackTimerRef.current);
        }

        setTargetPath(path);
        setIsVisible(true);

        fallbackTimerRef.current = window.setTimeout(() => {
          setIsVisible(false);
          setTargetPath("");
        }, 2500);
      },
    }),
    []
  );

  return (
    <RouteTransitionLoaderContext.Provider value={value}>
      {children}
      {isVisible && (
        <>
          <style>{`
            @keyframes chakraRouteSpin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}</style>
          <div className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center bg-white/12 backdrop-blur-[2px]">
            <div className="flex items-center gap-3 rounded-full border border-white/40 bg-white/78 px-4 py-3 shadow-xl backdrop-blur-md">
              <svg
                viewBox="0 0 100 100"
                className="h-8 w-8"
                style={{ animation: "chakraRouteSpin 1.4s linear infinite" }}
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="43" fill="none" stroke="#0f1ea8" strokeWidth="6" />
                {chakraSpokes.map((index) => {
                  const angle = (index * 360) / chakraSpokes.length;

                  return (
                    <line
                      key={index}
                      x1="50"
                      y1="50"
                      x2="50"
                      y2="12"
                      stroke="#0f1ea8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      transform={`rotate(${angle} 50 50)`}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="9" fill="#0f1ea8" />
              </svg>
              <span className="text-sm font-medium text-slate-700">
                Opening...
              </span>
            </div>
          </div>
        </>
      )}
    </RouteTransitionLoaderContext.Provider>
  );
}

export function useRouteTransitionLoader() {
  const context = useContext(RouteTransitionLoaderContext);

  if (!context) {
    throw new Error("useRouteTransitionLoader must be used within RouteTransitionLoaderProvider");
  }

  return context;
}
