import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Send, Mail, X } from "lucide-react";
import { FloralCorner } from "@/components/FloralCorner";
import { useLenis } from "@/hooks/useLenis";
import envelope from "@/assets/envelope.png";
import g1 from "@/assets/gallery-1.jpeg";
import g2 from "@/assets/gallery-2.jpeg";
import g3 from "@/assets/gallery-3.jpeg";
import g4 from "@/assets/gallery-4.jpeg";

const photos = [
  { src: g1, span: "row-span-2" },
  { src: g2, span: "row-span-2" },
  { src: g3, span: "row-span-2" },
  { src: g4, span: "row-span-2" },
];

// TODO: put real WhatsApp number (E.164 without +)
const WHATSAPP = "201014108539";

const Gallery = () => {
  useLenis();
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const envRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const openEnvelope = () => {
    if (opened) return;
    const tl = gsap.timeline({ onComplete: () => setOpened(true) });
    tl.to(envRef.current, {
      rotateX: -25,
      scale: 1.05,
      duration: 0.5,
      ease: "power2.out",
    }).to(envRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.in",
    });
  };

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (!opened || !gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".photo-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
  }, [opened]);

  const sendWhatsApp = () => {
    if (!message.trim()) return;
    const text = encodeURIComponent(`رسالة من موقع الخطوبة:\n\n${message}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <main className="relative min-h-screen bg-gradient-sky floral-bg">
      <FloralCorner position="tr" />
      <FloralCorner position="bl" />

      <section className="container max-w-6xl py-20">
        <div className="text-center mb-12">
          <p className="text-navy/60 tracking-widest text-sm">ذكرياتنا</p>
          <h1 className="font-display text-5xl md:text-7xl text-navy mt-2">
            فصول من <span className="text-gold">رحلتنا</span>
          </h1>
          <div className="gold-divider w-40 mx-auto mt-6" />
        </div>

        {!opened && (
          <div className="flex flex-col items-center py-16">
            <p className="text-navy/70 mb-8 text-lg">
              انقر على الظرف لفتح ذكرياتنا
            </p>
            <div
              ref={envRef}
              onClick={openEnvelope}
              className="cursor-pointer animate-float relative group"
              style={{ perspective: 1000 }}
            >
              <img
                src={envelope}
                alt="ظرف الذكريات"
                width={420}
                height={315}
                className="w-[280px] md:w-[420px] drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <Mail
                className="absolute inset-0 m-auto text-gold/0 group-hover:text-gold/40 transition-colors"
                size={48}
              />
            </div>
          </div>
        )}

        {opened && (
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4"
          >
            {photos.map((p, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(p.src)}
                className={`photo-item relative overflow-hidden rounded-xl shadow-soft gold-border group cursor-pointer ${p.span}`}
              >
                <img
                  src={p.src}
                  alt={`ذكرى ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Message section */}
      <section className="container max-w-2xl pb-24">
        <div className="luxury-card rounded-2xl p-8 md:p-12 text-center">
          <div className="absolute inset-3 rounded-xl border border-gold/30 pointer-events-none" />
          <h2 className="font-display text-3xl md:text-4xl text-navy">
            اترك لنا <span className="text-gold">كلمة</span>
          </h2>
          <div className="gold-divider w-32 mx-auto my-6" />
          <p className="text-navy/70 mb-6">
            شاركنا فرحتنا برسالة جميلة تصلنا مباشرة.
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب ذكرى أو كلمة جميلة..."
            rows={4}
            className="w-full rounded-xl border border-gold/40 bg-ivory/70 p-4 text-navy placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-gold transition resize-none"
          />
          <button
            onClick={sendWhatsApp}
            className="btn-gold mt-6 px-10 py-4 rounded-full font-display text-lg inline-flex items-center gap-3"
          >
            <Send size={18} />
            إرسال
          </button>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-navy/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-ivory/80 hover:text-gold transition-colors z-[210] luxury-card rounded-full p-2"
          >
            <X size={28} className="text-black" />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] luxury-card rounded-2xl p-3 flex justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-3 rounded-xl border border-gold/40 pointer-events-none" />
            <img
              src={selectedImage}
              alt="ذكرى مكبرة"
              className="w-auto h-auto max-w-full max-h-[calc(90vh-24px)] rounded-xl object-contain relative z-10"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
