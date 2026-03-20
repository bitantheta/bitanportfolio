import { useEffect, useRef, useCallback } from "react";

const cdnBase = import.meta.env.VITE_IMAGE_CDN_BASE?.replace(/\/$/, "");
const assetUrl = (relativePath) => {
  const cleanPath = relativePath.replace(/^\//, "");
  return cdnBase ? `${cdnBase}/${cleanPath}` : `${import.meta.env.BASE_URL}${cleanPath}`;
};

export default function LeadershipCarousel() {
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const pausedRef = useRef(false);
  const CARD_WIDTH = 240;
  const SPEED = 1.0; // px per frame — moves left (cards slide right)

  const data = [
    {
      image: {
        avif: assetUrl("leadership/dps-vice-head-boy-600.avif"),
        webp: assetUrl("leadership/dps-vice-head-boy-600.webp")
      },
      role: "Vice Head Boy",
      org: "DPS Ruby Park",
      year: "Class XI",
    },
    {
      image: {
        avif: assetUrl("leadership/dps-house-captain-600.avif"),
        webp: assetUrl("leadership/dps-house-captain-600.webp")
      },
      role: "House Captain",
      org: "DPS Ruby Park",
      year: "Class XII",
    },
    {
      image: {
        avif: assetUrl("leadership/jumun-24-oc-finance-600.avif"),
        webp: assetUrl("leadership/jumun-24-oc-finance-600.webp")
      },
      role: "OC Finance",
      org: "JUMUN",
      year: "2024",
    },
    {
      image: {
        avif: assetUrl("leadership/voxpop-24-director-finance-600.avif"),
        webp: assetUrl("leadership/voxpop-24-director-finance-600.webp")
      },
      role: "Director (Finance)",
      org: "VOXPOP",
      year: "2024",
    },
    {
      image: {
        avif: assetUrl("leadership/intramun-24-finance-officer-600.avif"),
        webp: assetUrl("leadership/intramun-24-finance-officer-600.webp")
      },
      role: "Finance Officer",
      org: "INTRAMUN",
      year: "2024",
    },
    {
      image: {
        avif: assetUrl("leadership/jumun-25-charge-affairs-600.avif"),
        webp: assetUrl("leadership/jumun-25-charge-affairs-600.webp")
      },
      role: "Chargé d’Affaires",
      org: "JUMUN",
      year: "2025",
    },
    {
      image: {
        avif: assetUrl("leadership/voxpop-25-treasurer-600.avif"),
        webp: assetUrl("leadership/voxpop-25-treasurer-600.webp")
      },
      role: "Treasurer",
      org: "VOXPOP",
      year: "2025",
    },
  ];

  const items = [...data, ...data, ...data];

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollLeft = data.length * CARD_WIDTH;
  }, []);

  // Continuous auto-scroll (moves left → cards slide right-to-left visually)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tick = () => {
      if (!pausedRef.current && el) {
        el.scrollLeft -= SPEED;
        // Loop: when scrolled past the beginning, jump to 2nd copy
        if (el.scrollLeft <= 0) {
          el.scrollLeft = data.length * CARD_WIDTH;
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const onEnter = useCallback(() => { pausedRef.current = true; }, []);
  const onLeave = useCallback(() => { pausedRef.current = false; }, []);

  const scroll = (dir) => {
    if (!containerRef.current) return;

    containerRef.current.scrollBy({
      left: dir * CARD_WIDTH,
      behavior: "smooth",
    });

    setTimeout(() => {
      const max = data.length * CARD_WIDTH * 2;
      if (containerRef.current.scrollLeft <= CARD_WIDTH) {
        containerRef.current.scrollLeft = data.length * CARD_WIDTH;
      }
      if (containerRef.current.scrollLeft >= max) {
        containerRef.current.scrollLeft = data.length * CARD_WIDTH;
      }
    }, 400);
  };

  return (
    <div className="relative">

      {/* LEFT ARROW */}
      <button
        onClick={() => scroll(-1)}
        className="
          absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10
          bg-black/70 hover:bg-black/90
          border border-white/10
          p-2 md:p-3 rounded-full backdrop-blur
        "
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => scroll(1)}
        className="
          absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10
          bg-black/70 hover:bg-black/90
          border border-white/10
          p-2 md:p-3 rounded-full backdrop-blur
        "
      >
        ›
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
        <div className="flex gap-6">

          {items.map((item, i) => (
            <div
              key={i}
              className="
                w-[220px] h-[250px]
                flex-shrink-0
                rounded-2xl
                bg-gradient-to-br from-[#0f1b34] to-[#0b1220]
                border border-white/10
                shadow-[0_20px_40px_rgba(0,0,0,0.5)]
                p-5
                flex flex-col
                hover:-translate-y-1 hover:border-white/30
                transition-all duration-300
              "
            >
              {/* IMAGE */}
              <div className="h-24 flex items-center justify-center mb-5 rounded-xl bg-white/[0.04] border border-white/10">
                <picture>
                  <source type="image/avif" srcSet={item.image.avif} />
                  <source type="image/webp" srcSet={item.image.webp} />
                  <img
                    src={item.image.webp}
                    alt={item.role}
                    loading="lazy"
                    decoding="async"
                    className="max-h-[72px] max-w-[120px] object-contain"
                  />
                </picture>
              </div>

              {/* TEXT */}
              <div className="text-center mt-auto">
                <div className="text-sm font-semibold text-white">
                  {item.role}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {item.org}
                </div>
                <div className="text-xs text-white/40 mt-1">
                  {item.year}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
