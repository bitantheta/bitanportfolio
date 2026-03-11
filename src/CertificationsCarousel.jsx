import { useEffect, useRef, useCallback } from "react";

export default function CertificationsCarousel({ certifications }) {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const pausedRef = useRef(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const CARD_WIDTH = isMobile ? 296 : 520;
  const SPEED = 1.2; // px per frame

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft = certifications.length * CARD_WIDTH;
  }, [certifications.length]);

  // Continuous auto-scroll (moves right → cards slide left)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tick = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft += SPEED;
        // Loop: when past 2x set, reset to 1x set seamlessly
        const resetPoint = certifications.length * CARD_WIDTH * 2;
        if (el.scrollLeft >= resetPoint) {
          el.scrollLeft = certifications.length * CARD_WIDTH;
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [certifications.length]);

  const onEnter = useCallback(() => { pausedRef.current = true; }, []);
  const onLeave = useCallback(() => { pausedRef.current = false; }, []);

  const scroll = (direction) => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: direction * CARD_WIDTH,
      behavior: "smooth",
    });

    setTimeout(() => {
      const max = certifications.length * CARD_WIDTH * 2;

      if (containerRef.current.scrollLeft <= CARD_WIDTH) {
        containerRef.current.scrollLeft = certifications.length * CARD_WIDTH;
      }

      if (containerRef.current.scrollLeft >= max) {
        containerRef.current.scrollLeft = certifications.length * CARD_WIDTH;
      }
    }, 400);
  };

  const items = [
    ...certifications,
    ...certifications,
    ...certifications,
  ];

  return (
    <section className="py-14 md:py-20 bg-[#0b0b0c] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        <p className="font-mono text-xs text-slate-400 mb-2">
          CERTIFICATIONS
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-8 md:mb-10">
          Technical Training & Credentials
        </h2>

        <div className="relative">

          {/* LEFT ARROW */}
          <button
            onClick={() => scroll(-1)}
            className="
              absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10
              bg-black/60 hover:bg-black/80
              border border-white/10
              p-2 md:p-3 rounded-full backdrop-blur
            "
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll(1)}
            className="
              absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10
              bg-black/60 hover:bg-black/80
              border border-white/10
              p-2 md:p-3 rounded-full backdrop-blur
            "
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* SCROLLER */}
          <div
            ref={containerRef}
            className="overflow-x-hidden"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onTouchStart={onEnter}
            onTouchEnd={onLeave}
          >
            <div className="flex gap-4 md:gap-10">

              {items.map((cert, i) => (
                <a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group relative
                    min-w-[280px] h-[200px]
                    md:min-w-[520px] md:h-[360px]
                    rounded-2xl overflow-hidden
                    shadow-[0_40px_80px_rgba(0,0,0,0.6)]
                    transform transition-all duration-500
                    hover:-translate-y-2 hover:rotate-[-0.5deg]
                  "
                >
                  {/* CERTIFICATE IMAGE */}
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="
                      w-full h-full object-contain
                      bg-white
                    "
                  />

                  {/* HOVER OVERLAY */}
                  <div
                    className="
                      absolute inset-0
                      bg-gradient-to-t from-black/80 via-black/30 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      flex flex-col justify-end p-6
                    "
                  >
                    <div className="text-xs uppercase tracking-widest text-white/70 mb-2">
                      Verified Certificate
                    </div>

                    <h3 className="text-xl font-semibold leading-tight">
                      {cert.title}
                    </h3>

                    <p className="text-sm text-white/70 mt-1">
                      {cert.issuer}
                    </p>

                    <p className="text-xs text-white/50 mt-1">
                      Issued {cert.date}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-blue-400">
                      View verification <span>↗</span>
                    </span>
                  </div>
                </a>
              ))}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
