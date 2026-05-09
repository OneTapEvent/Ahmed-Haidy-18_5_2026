import {
  createContext,
  useContext,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

interface CurtainContextType {
  navigateWithCurtain: (path: string) => void;
}

const CurtainContext = createContext<CurtainContextType>({
  navigateWithCurtain: () => {},
});

export const useCurtain = () => useContext(CurtainContext);

export const CurtainProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const ornamentRef = useRef<HTMLDivElement>(null);

  // Open curtains when a new page mounts (reveal animation)
  useEffect(() => {
    const tl = gsap.timeline();
    // Curtains start closed (scaleX: 1), open outward
    gsap.set(leftRef.current, { scaleX: 1 });
    gsap.set(rightRef.current, { scaleX: 1 });
    gsap.set(ornamentRef.current, { opacity: 1 });

    tl.to(ornamentRef.current, { opacity: 0, duration: 0.15 })
      .to(
        [leftRef.current, rightRef.current],
        {
          scaleX: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<"
      );
  }, [location.pathname]);

  const navigateWithCurtain = (path: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });

    const tl = gsap.timeline({
      onComplete: () => navigate(path),
    });

    // Close curtains inward — fast
    tl.set(ornamentRef.current, { opacity: 0 })
      .to(
        [leftRef.current, rightRef.current],
        {
          scaleX: 1,
          duration: 0.4,
          ease: "power3.inOut",
        }
      )
      .to(ornamentRef.current, { opacity: 1, duration: 0.15 }, "-=0.1");
  };

  return (
    <CurtainContext.Provider value={{ navigateWithCurtain }}>
      {children}

      {/* Left curtain panel */}
      <div
        ref={leftRef}
        className="fixed top-0 left-0 w-1/2 h-full z-[200] pointer-events-none"
        style={{
          transformOrigin: "left center",
          transform: "scaleX(0)",
          background: "linear-gradient(to right, #0a1628 80%, #1a2a4a)",
        }}
      >
        {/* Inner gold edge */}
        <div
          className="absolute top-0 right-0 w-[2px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)",
          }}
        />
      </div>

      {/* Right curtain panel */}
      <div
        ref={rightRef}
        className="fixed top-0 right-0 w-1/2 h-full z-[200] pointer-events-none"
        style={{
          transformOrigin: "right center",
          transform: "scaleX(0)",
          background: "linear-gradient(to left, #0a1628 80%, #1a2a4a)",
        }}
      >
        {/* Inner gold edge */}
        <div
          className="absolute top-0 left-0 w-[2px] h-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #c9a84c 30%, #c9a84c 70%, transparent)",
          }}
        />
      </div>

      {/* Center ornament — shown briefly when curtains are fully closed */}
      <div
        ref={ornamentRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] pointer-events-none"
        style={{ opacity: 0 }}
      >
        <span
          className="font-display text-3xl select-none"
          style={{ color: "#c9a84c", textShadow: "0 0 20px rgba(201,168,76,0.6)" }}
        >
          ✦
        </span>
      </div>
    </CurtainContext.Provider>
  );
};
