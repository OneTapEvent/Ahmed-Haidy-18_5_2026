import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Heart } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalDismissed, setModalDismissed] = useState(false);

  // Animate modal in on mount
  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.88, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.3,
      },
    );
  }, []);

  // After video ends (or 6.5s), signal music and navigate
  useEffect(() => {
    if (!modalDismissed) return;
    const goNext = () => {
      localStorage.setItem("musicEnabled", "1");
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => navigate("/details"),
      });
    };
    const v = videoRef.current;
    const timeout = setTimeout(goNext, 6500);
    v?.addEventListener("ended", goNext);
    return () => {
      clearTimeout(timeout);
      v?.removeEventListener("ended", goNext);
    };
  }, [modalDismissed, navigate]);

  const handleEnter = () => {
    const v = videoRef.current;
    if (!v) return;

    // Dismiss modal with smooth animation
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.92,
      y: -20,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => setModalDismissed(true),
    });

    // Play video with full sound — user gesture makes this work
    v.muted = false;
    v.volume = 1;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  };

  return (
    <div className="fixed inset-0 bg-navy overflow-hidden">
      {/* Video — preloaded, starts paused until modal dismissed */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy/40 pointer-events-none" />

      {/* Page-transition overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-ivory pointer-events-none z-30"
        style={{ opacity: 0 }}
      />

      {/* Welcome Modal */}
      {!modalDismissed && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-navy/70 backdrop-blur-sm px-6">
          <div
            ref={modalRef}
            className="luxury-card relative w-full max-w-sm rounded-3xl px-8 py-12 text-center"
            style={{ opacity: 0 }}
          >
            {/* Inner gold border */}
            <div className="absolute inset-3 rounded-2xl border border-gold/30 pointer-events-none" />

            {/* Floral accent top */}
            <div className="flex justify-center mb-3">
              <Heart className="text-gold" size={32} />
            </div>

            {/* <p className="text-navy/60 text-xs tracking-[0.3em] mb-3">
              بِسْمِ اللَّهِ
            </p> */}

            {/* <h1 className="font-display text-4xl text-navy leading-snug mb-2">
              أهلاً بك
            </h1> */}

            {/* <div className="gold-divider w-24 mx-auto my-5" /> */}

            <p className="text-navy/75 leading-loose text-sm mb-1">شارك</p>
            <p className="font-display text-2xl text-gold mb-1">أحمد & هايدي</p>
            <p className="text-navy/75 leading-loose text-sm mb-6">
              في هذه اللحظة الجميلة
            </p>

            <button
              onClick={handleEnter}
              className="btn-gold w-full py-4 rounded-full font-display text-lg tracking-wide"
            >
              ✦ ابدأ ✦
            </button>
          </div>
        </div>
      )}

      {/* Skip button — only after modal is dismissed */}
      {modalDismissed && (
        <button
          onClick={() => {
            localStorage.setItem("musicEnabled", "1");
            navigate("/details");
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ivory/80 text-sm tracking-widest hover:text-gold transition-colors animate-pulse z-20"
        >
          تخطي ←
        </button>
      )}
    </div>
  );
};

export default Landing;
