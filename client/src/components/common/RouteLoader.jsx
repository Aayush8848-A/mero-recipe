import { useEffect, useState } from "react";
import { useLoader } from "../../context/LoaderContext";

const ROUTE_MESSAGES = [
  "Preheating the kitchen...",
  "Gathering ingredients...",
  "Chopping fresh veggies...",
  "Simmering the flavors...",
  "Plating your page...",
];

const RouteLoader = () => {
  const { isLoading } = useLoader();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    setMessageIndex(0);
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % ROUTE_MESSAGES.length);
    }, 900);
    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div
      className={`
        fixed inset-0 z-100
        bg-linear-to-br from-brand-green/95 via-[#1e6b3e]/95 to-brand-leaf/95
        backdrop-blur-md
        flex items-center justify-center
        transition-all duration-500 ease-out
        ${
          isLoading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-orange/20 blur-[80px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-brand-leaf/20 blur-[80px] animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-8 px-6">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-brand-orange/10 blur-2xl animate-pulse" />

          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ animation: "plateDrop 2.4s ease-out infinite" }}
          >
            <div className="relative w-24 h-24 rounded-full bg-white shadow-2xl">
              <div className="absolute inset-2 rounded-full border-2 border-brand-green/15" />
              <div className="absolute inset-5 rounded-full border border-brand-orange/30" />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-orange"
                style={{ animation: "foodPulse 2.4s ease-in-out infinite" }}
              />
            </div>
          </div>

          <div
            className="absolute"
            style={{
              top: "10%",
              right: "15%",
              transformOrigin: "top right",
              animation:
                "forkSwing 2.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite",
            }}
          >
            <svg
              width="20"
              height="46"
              viewBox="0 0 22 42"
              fill="white"
              className="drop-shadow-lg"
            >
              <rect x="2" y="0" width="2.5" height="12" rx="1" />
              <rect x="7" y="0" width="2.5" height="12" rx="1" />
              <rect x="12" y="0" width="2.5" height="12" rx="1" />
              <rect x="17" y="0" width="2.5" height="12" rx="1" />
              <path
                d="M1 12 Q11 20 20 12 L20 16 Q11 24 1 16 Z"
                fill="#F28E2B"
              />
              <rect
                x="9.5"
                y="18"
                width="3"
                height="24"
                rx="1.5"
                fill="white"
              />
            </svg>
          </div>

          {[
            { top: "22%", left: "18%", delay: "0.9s" },
            { top: "30%", left: "82%", delay: "1.0s" },
            { top: "75%", left: "22%", delay: "0.95s" },
            { top: "80%", left: "78%", delay: "1.05s" },
            { top: "15%", left: "50%", delay: "1.0s" },
            { top: "85%", left: "50%", delay: "1.1s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(242,142,43,0.9)]"
              style={{
                top: p.top,
                left: p.left,
                animation: `sparkle 2.4s ease-out infinite`,
                animationDelay: p.delay,
                opacity: 0,
              }}
            />
          ))}

          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/70"
                style={{
                  animation: `steam 2.4s ease-out infinite`,
                  animationDelay: `${1.2 + i * 0.15}s`,
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{ animation: "platePulse 2.4s ease-in-out infinite" }}
            >
              <div
                className="w-8 h-full bg-linear-to-r from-transparent via-white/60 to-transparent -skew-x-12"
                style={{ animation: "shimmer 2.4s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-white font-bold text-lg tracking-wide min-h-7">
            {ROUTE_MESSAGES[messageIndex]}
          </p>

          <div className="flex items-center justify-center gap-1.5 pt-2">
            {ROUTE_MESSAGES.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === messageIndex
                    ? "w-6 h-1.5 bg-brand-orange"
                    : "w-1.5 h-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-56 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full w-1/2 rounded-full bg-linear-to-r from-transparent via-brand-orange to-transparent"
            style={{ animation: "slide 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        /* Plate drops in, settles with a bounce, then pulses */
        @keyframes plateDrop {
          0%   { transform: translateY(-40px) scale(0.7); opacity: 0; }
          15%  { transform: translateY(0) scale(1.05);   opacity: 1; }
          25%  { transform: translateY(-4px) scale(1); }
          35%  { transform: translateY(0) scale(1); }
          50%  { transform: translateY(0) scale(1.02); }
          80%  { transform: translateY(0) scale(1); }
          100% { transform: translateY(0) scale(1); }
        }

        /* Fork swings in from top-right, dips toward plate, then retracts */
        @keyframes forkSwing {
          0%   { transform: rotate(-60deg) translateY(-20px); opacity: 0; }
          15%  { transform: rotate(-60deg) translateY(-20px); opacity: 0; }
          30%  { transform: rotate(0deg) translateY(0);       opacity: 1; }
          45%  { transform: rotate(25deg) translateY(28px); }
          55%  { transform: rotate(35deg) translateY(34px); }
          70%  { transform: rotate(-10deg) translateY(-10px); }
          90%  { transform: rotate(-60deg) translateY(-20px); opacity: 0; }
          100% { transform: rotate(-60deg) translateY(-20px); opacity: 0; }
        }

        /* Food dot in center pulses when "scooped" */
        @keyframes foodPulse {
          0%, 40%   { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          55%       { transform: translate(-50%, -50%) scale(1.6); opacity: 1; }
          70%       { transform: translate(-50%, -50%) scale(1); }
          100%      { transform: translate(-50%, -50%) scale(1); }
        }

        /* Sparkle particles burst outward from center */
        @keyframes sparkle {
          0%, 40%  { transform: translate(0, 0) scale(0.3); opacity: 0; }
          50%      { transform: translate(0, 0) scale(1.2);  opacity: 1; }
          70%      { transform: translate(var(--tx, 0px), var(--ty, -20px)) scale(0.6); opacity: 0.6; }
          100%     { transform: translate(var(--tx, 0px), var(--ty, -40px)) scale(0);   opacity: 0; }
        }

        /* Steam rises gently after plating */
        @keyframes steam {
          0%, 45%  { transform: translateY(0) scale(1);    opacity: 0; }
          55%      { transform: translateY(-4px) scale(1.2); opacity: 0.8; }
          80%      { transform: translateY(-16px) scale(1.5); opacity: 0.4; }
          100%     { transform: translateY(-28px) scale(0.6); opacity: 0; }
        }

        /* Plate subtle pulse */
        @keyframes platePulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.02); }
        }

        /* Shimmer sweep across the plate */
        @keyframes shimmer {
          0%, 40%  { transform: translateX(-200%) skewX(-12deg); opacity: 0; }
          50%      { transform: translateX(-100%) skewX(-12deg); opacity: 1; }
          70%      { transform: translateX(300%)  skewX(-12deg); opacity: 0; }
          100%     { transform: translateX(300%)  skewX(-12deg); opacity: 0; }
        }

        /* Bottom progress bar slide */
        @keyframes slide {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default RouteLoader;
