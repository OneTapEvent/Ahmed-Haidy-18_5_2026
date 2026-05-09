import floral from "@/assets/floral-corner.png";

type Position = "tl" | "tr" | "bl" | "br";

const transforms: Record<Position, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0 scale-x-[-1]",
  bl: "bottom-0 left-0 scale-y-[-1]",
  br: "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
};

export const FloralCorner = ({ position, className = "" }: { position: Position; className?: string }) => (
  <img
    src={floral}
    alt=""
    aria-hidden
    loading="lazy"
    className={`pointer-events-none absolute w-40 md:w-64 lg:w-80 opacity-90 select-none ${transforms[position]} ${className}`}
  />
);
