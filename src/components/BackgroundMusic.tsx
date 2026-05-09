import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Music, VolumeX } from "lucide-react";
import bgMusic from "../../public/music.mp3";

// Replace with your actual music file once added to /public, e.g. "/music.mp3"
const TRACK = bgMusic;

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const location = useLocation();
  const [playing, setPlaying] = useState(false);

  const isLanding = location.pathname === "/";

  // Start or stop music when route changes
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    if (isLanding) {
      // Silence music during the video intro
      a.pause();
      a.currentTime = 0;
      setPlaying(false);
      return;
    }

    // On Details / Gallery: start music if Landing already set the flag
    const enabled = localStorage.getItem("musicEnabled") === "1";
    if (!enabled) return;

    a.volume = 0.45;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay still blocked — unlock on first tap
        const unlock = () => {
          a.play()
            .then(() => setPlaying(true))
            .catch(() => {});
        };
        document.addEventListener("click", unlock, { once: true });
        document.addEventListener("touchstart", unlock, { once: true });
      });
  }, [isLanding]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={TRACK} loop preload="auto" />

      {/* Music toggle button — visible on all pages except Landing */}
      {!isLanding && (
        <button
          onClick={toggle}
          aria-label="تشغيل / إيقاف الموسيقى"
          className="fixed top-5 left-5 z-50 w-12 h-12 rounded-full luxury-card flex items-center justify-center text-gold hover:scale-110 transition-transform shadow-soft"
        >
          {playing ? <Music size={20} /> : <VolumeX size={20} />}
        </button>
      )}
    </>
  );
};
