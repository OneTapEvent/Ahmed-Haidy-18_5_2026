import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Calendar, Clock, MapPin, Heart, ChevronDown } from "lucide-react";
import { FloralCorner } from "@/components/FloralCorner";
import { Countdown } from "@/components/Countdown";
import { useLenis } from "@/hooks/useLenis";
import { useCurtain } from "@/components/CurtainTransition";

const Details = () => {
  useLenis();
  const navigate = useNavigate();
  const { navigateWithCurtain } = useCurtain();
  const heroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-mono", { opacity: 0, scale: 0.6, duration: 1.4 })
        .from(".hero-tag", { opacity: 0, y: 30, duration: 0.9 }, "-=0.6")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".scroll-ind", { opacity: 0, y: -10, duration: 0.6 }, "-=0.3");

      gsap.to(ctaRef.current, {
        scale: 1.04,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const goToGallery = () => navigateWithCurtain("/gallery");

  return (
    <main
      ref={heroRef}
      className="relative min-h-screen bg-gradient-sky floral-bg overflow-hidden"
    >
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6">
        <FloralCorner position="tl" />
        <FloralCorner position="br" />

        <div className="hero-mono relative">
          <h1 className="font-display text-[7rem] md:text-[10rem] leading-none text-gold drop-shadow-sm">
            أ{" "}
            <span className="text-navy text-5xl md:text-7xl align-middle">
              &
            </span>{" "}
            هـ
          </h1>
        </div>

        <div className="gold-divider w-40 my-6 hero-tag" />
        <p className="hero-tag font-display text-2xl md:text-4xl text-navy">
          بداية فصلٍ جديد من رحلتنا
        </p>
        <p className="hero-sub mt-4 text-navy/70 max-w-md">
          في رحلة حبٍ كتبها القدر، نلتقي اليوم لنبدأ أول فصول رحلتنا التي لا
          تنتهي.
        </p>

        <div className="scroll-ind absolute bottom-10 flex flex-col items-center text-gold">
          <span className="text-xs tracking-widest mb-2">اكتشف</span>
          <ChevronDown className="animate-bounce" size={22} />
        </div>
      </section>

      {/* DETAILS CARD */}
      <section className="relative px-6 py-20 md:py-28 flex justify-center">
        <div className="luxury-card relative w-full max-w-3xl rounded-2xl px-6 md:px-12 py-12 md:py-16">
          <div className="absolute inset-3 rounded-xl border border-gold/30 pointer-events-none" />

          <div className="text-center">
            <Heart className="mx-auto text-gold" size={28} />
            <p className="mt-3 text-navy/60 text-sm tracking-widest">
              يسعدنا حضوركم
            </p>

            <h2 className="font-display text-6xl md:text-8xl text-navy mt-6 leading-tight">
              أحمد
            </h2>
            <p className="font-display text-3xl md:text-4xl text-gold my-2">
              و
            </p>
            <h2 className="font-display text-6xl md:text-8xl text-navy leading-tight">
              هايدي
            </h2>

            <div className="gold-divider w-48 mx-auto my-8" />

            <p className="text-navy/80 leading-loose max-w-xl mx-auto">
              في رحلة حبٍ كتبها القدر قبل أن نلتقي، جمعنا الطريق دون موعد، حتى
              أصبحنا وجهة لبعضنا البعض. واليوم نبدأ أول فصول رحلتنا التي لا
              تنتهي.
            </p>

            <div className="mt-10 mb-6">
              <p className="text-navy/60 text-sm mb-4 tracking-widest">
                العد التنازلي
              </p>
              <Countdown />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <DetailItem
                icon={<Calendar />}
                label="التاريخ"
                value="١٨ / ٥ / ٢٠٢٦"
              />
              <DetailItem icon={<Clock />} label="الساعة" value="٧:٠٠ مساءً" />
              <DetailItem
                icon={<MapPin />}
                label="المكان"
                value="فندق صن رايز ازور سابقاً — سيدي جابر"
              />
            </div>

            <button
              ref={ctaRef}
              onClick={goToGallery}
              className="btn-gold mt-12 px-10 py-4 rounded-full font-display text-lg md:text-xl"
            >
              استكشف ذكرياتنا ✦
            </button>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative px-6 pb-24 flex justify-center">
        <div className="luxury-card relative w-full max-w-4xl rounded-2xl p-4 md:p-6">
          <div className="absolute inset-3 rounded-xl border border-gold/30 pointer-events-none" />
          <div className="text-center mb-5 mt-2">
            <p className="text-navy/60 tracking-widest text-sm">الموقع</p>
            <h3 className="font-display text-3xl md:text-4xl text-navy mt-2">
              فندق <span className="text-gold">صن رايز الأسكندرية</span>
            </h3>
            <div className="gold-divider w-32 mx-auto mt-4" />
          </div>
          <div className="relative rounded-xl overflow-hidden gold-border shadow-soft">
            <iframe
              title="موقع الحفل"
              src="https://www.google.com/maps?q=Sunrise+Alex+Avenue+Hotel+Sidi+Gaber+Alexandria&output=embed"
              width="100%"
              height="380"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[320px] md:h-[420px] border-0"
            />
          </div>
          <div className="text-center mt-5">
            <a
              href="https://maps.app.goo.gl/nTsMTJ8VqrYGnd288"
              target="_blank"
              rel="noreferrer"
              className="btn-gold inline-block px-8 py-3 rounded-full font-display"
            >
              افتح في خرائط جوجل
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex flex-col items-center text-center px-2">
    <div className="text-gold mb-2">{icon}</div>
    <span className="text-xs tracking-widest text-navy/60 mb-1">{label}</span>
    <span className="text-navy font-medium text-sm md:text-base leading-snug">
      {value}
    </span>
  </div>
);

export default Details;
