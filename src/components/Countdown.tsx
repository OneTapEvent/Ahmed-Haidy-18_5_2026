import { useEffect, useState } from "react";

const TARGET = new Date("2026-05-18T19:00:00+02:00").getTime();

const calc = () => {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
};

const Box = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="luxury-card rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 md:px-6 md:py-4 min-w-[52px] sm:min-w-[68px] md:min-w-[88px] text-center">
      <span className="font-display text-xl sm:text-2xl md:text-4xl text-gold tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-1 sm:mt-2 text-[10px] sm:text-xs md:text-sm text-navy/70">{label}</span>
  </div>
);

export const Countdown = () => {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 md:gap-5" dir="ltr">
      <Box value={t.s} label="ثانية" />
      <span className="text-gold text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-7">:</span>
      <Box value={t.m} label="دقيقة" />
      <span className="text-gold text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-7">:</span>
      <Box value={t.h} label="ساعة" />
      <span className="text-gold text-lg sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-7">:</span>
      <Box value={t.d} label="يوم" />
    </div>
  );
};
