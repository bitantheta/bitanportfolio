import { Suspense, lazy, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const Project01 = lazy(() => import("./project01").then((module) => ({ default: module.Project01 })));
const Project03 = lazy(() => import("./project03").then((module) => ({ default: module.Project03 })));
const CertificationsCarousel = lazy(() => import("./CertificationsCarousel"));
const LeadershipCarousel = lazy(() => import("./LeadershipCarousel"));

const cdnBase = import.meta.env.VITE_IMAGE_CDN_BASE?.replace(/\/$/, "");
const assetUrl = (relativePath) => {
  const cleanPath = relativePath.replace(/^\//, "");
  return cdnBase ? `${cdnBase}/${cleanPath}` : `${import.meta.env.BASE_URL}${cleanPath}`;
};


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const juLogo = assetUrl("assets/ju-512.webp");
  const abInbevLogo = assetUrl("assets/abinbev-512.webp");
  const izmirLogo = assetUrl("assets/izmir-512.webp");
  const iiscLogo = assetUrl("assets/iisc-512.webp");
  const iimLogo = assetUrl("assets/iim-512.webp");
  const bmLogo = assetUrl("assets/bmlogo-768.webp");
  const myPhoto = {
    avif900: assetUrl("assets/me-900.avif"),
    webp900: assetUrl("assets/me-900.webp"),
    avif1600: assetUrl("assets/me-1600.avif"),
    webp1600: assetUrl("assets/me-1600.webp")
  };

  const nameRef = useRef(null);
  const textRef = useRef(null);

  const [current, setCurrent] = useState(8000);
const [cooling, setCooling] = useState(0.7);

const thermalActive = current > 7000 && cooling < 0.8;
const specificEnergy = thermalActive ? 82.9 : 78.5;

  const [flow, setFlow] = useState(245);
  const [power, setPower] = useState(18);
  const [safety, setSafety] = useState(60);


  const researchTitleRef = useRef(null);
  const cardsRef = useRef([]);

  const projectSectionRef = useRef(null);
  const uValueRef = useRef(null);
  const dpRef = useRef(null);
  const costRef = useRef(null);
  const metricCardsRef = useRef([]);

  const [activeRoute, setActiveRoute] = useState("h2");

  const [year, setYear] = useState(2030);
  const pathwayStrength = {
  ccus: Math.max(0, 1 - (year - 2025) / 20),      // fades after 2040
  hybrid: Math.exp(-Math.pow((year - 2032) / 7, 2)), // peaks ~2032
  h2: Math.min(1, (year - 2030) / 15),            // dominates post-2045
};

  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineItemsRef = useRef([]);

  const publicationRef = useRef(null);

  const heroSectionRef = useRef(null);
  const skillsRef = useRef(null);

  const cursorRef = useRef(null);
  const project04Ref = useRef(null);
  const certsWrapperRef = useRef(null);
  const leadershipRef = useRef(null);
  const mobileHeroRef = useRef(null);
  const projectsTriggerRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [roleIndex, setRoleIndex] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const splashRef = useRef(null);
  const [loadProjectVisuals, setLoadProjectVisuals] = useState(false);
  const [loadCarousels, setLoadCarousels] = useState(false);

  const roles = ["Process Modelling", "System Simulation", "CFD Analysis", "Reactor Modelling", "Feature Engineering", "Flow Simulation"];

  const project2Ref = useRef(null);
  const pipelineCardsRef = useRef([]);
  const selectedDesignRef = useRef(null);
  const skillCardsRef = useRef([]);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [activeSkillIndex, setActiveSkillIndex] = useState(-1);

  const certifications = [
  {
    title: "Machine Learning Specialization",
    issuer: "Stanford Online",
    date: "Mar 2025",
    image: {
      avif: assetUrl("certificates/ml-specialization-1200.avif"),
      webp: assetUrl("certificates/ml-specialization-1200.webp")
    },
    link: "https://coursera.org/verify/F6XLC63PI9XH",
  },
  {
    title: "Unsupervised Learning, Recommenders, RL",
    issuer: "Stanford Online",
    date: "Mar 2025",
    image: {
      avif: assetUrl("certificates/unsupervised-rl-1200.avif"),
      webp: assetUrl("certificates/unsupervised-rl-1200.webp")
    },
    link: "https://coursera.org/verify/M4G9BP49QCPC",
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "Stanford Online",
    date: "Dec 2024",
    image: {
      avif: assetUrl("certificates/advanced-algos-1200.avif"),
      webp: assetUrl("certificates/advanced-algos-1200.webp")
    },
    link: "https://coursera.org/verify/DTZTW27XI5RX",
  },
  {
    title: "Introduction to Graph Algorithms",
    issuer: "IISc Bangalore",
    date: "Oct 2024",
    image: {
      avif: assetUrl("certificates/graph-algos-1200.avif"),
      webp: assetUrl("certificates/graph-algos-1200.webp")
    },
    link: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS70S33920025502651252",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "IIT Kharagpur",
    date: "Oct 2024",
    image: {
      avif: assetUrl("certificates/iit-ml-1200.avif"),
      webp: assetUrl("certificates/iit-ml-1200.webp")
    },
    link: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS81S43920053802651252",
  },
  {
    title: "Python for Data Science",
    issuer: "IIT Madras",
    date: "Oct 2024",
    image: {
      avif: assetUrl("certificates/python-ds-1200.avif"),
      webp: assetUrl("certificates/python-ds-1200.webp")
    },
    link: "https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL24CS68S13920012202651252",
  },
];


  const feasibleWidth = Math.max(120, power * 8);
const feasibleHeight = Math.max(80, safety * 1.2);

const feasiblePath = `
  M80 ${260 - feasibleHeight}
  Q200 ${240 - feasibleHeight} ${80 + feasibleWidth} 160
  L${80 + feasibleWidth} 260
  L80 260 Z
`;

const cx = 80 + ((flow - 180) / 140) * feasibleWidth;
const cy = 260 - feasibleHeight * 0.6;



  const scrollToSection = (id) => {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { y: `#${id}`, offsetY: 40, autoKill: true },
    ease: "power3.inOut",
    overwrite: true,
  });
};

function Slider({ label, unit, min, max, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-2">
        {label}
      </label>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-400"
      />

      <div className="mt-1 text-xs text-white/40">
        {value} {unit}
      </div>
    </div>
  );
}



const experiences = [
  {
    org: "Indian Institute of Management, Ranchi",
    role: "Remote Research Intern",
    period: "Dec 2024 – Feb 2025",
    position: "up",
    points: [
      "LSTM and GNN-based models for cybersecurity risk forecasting",
      "Feature extraction, anomaly scoring, attention pipelines",
    ],
  },
  {
    org: "Izmir Institute of Technology, Türkiye",
    role: "Research Assistant",
    period: "Mar 2025 – Present",
    position: "down",
    points: [
      "Physics-informed neural networks for kinetics and PBEs",
      "ODE constraints, conservation laws, equilibrium enforcement",
    ],
  },
  {
    org: "Indian Institute of Science, Bangalore",
    role: "Summer Research Intern",
    period: "June – July 2025",
    position: "up",
    points: [
      "Top 1% nationwide (fully funded NPTEL internship)",
      "Graph-based optimization (MST) for engineering systems",
    ],
  },
];

// Role rotation interval
useEffect(() => {
  const timer = setInterval(() => {
    setRoleIndex((prev) => (prev + 1) % roles.length);
  }, 2500);
  return () => clearInterval(timer);
}, []);

// Splash screen - wait for logo then fade out with CSS
useEffect(() => {
  if (!logoLoaded || !splashRef.current) return;
  
  // Add CSS fade-out class after brief display
  const timer = setTimeout(() => {
    if (splashRef.current) {
      splashRef.current.classList.add('splash-fade-out');
      // Remove from DOM after animation
      setTimeout(() => setShowSplash(false), 800);
    }
  }, 1200);
  
  return () => clearTimeout(timer);
}, [logoLoaded]);

useEffect(() => {
  const observers = [];

  if (projectsTriggerRef.current) {
    const projectObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadProjectVisuals(true);
          projectObserver.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    projectObserver.observe(projectsTriggerRef.current);
    observers.push(projectObserver);
  }

  if (certsWrapperRef.current) {
    const carouselObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadCarousels(true);
          carouselObserver.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    carouselObserver.observe(certsWrapperRef.current);
    observers.push(carouselObserver);
  }

  return () => {
    observers.forEach((observer) => observer.disconnect());
  };
}, []);


useEffect(() => {
  // ===============================
  // GLOBAL GSAP CONFIG
  // ===============================
  gsap.defaults({
    ease: "power3.out",
    duration: 0.8,
  });

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  // ===============================
  // HERO — ENTRY (desktop)
  // ===============================
  gsap.from(nameRef.current, {
    y: 120,
    opacity: 0,
    duration: 1.2,
  });

  // ===============================
  // HERO — CINEMATIC ENTRY (mobile) sequential timeline
  // ===============================
  if (mobileHeroRef.current) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const els = mobileHeroRef.current.children;

    // Start everything invisible
    gsap.set(els, { opacity: 0, y: 20 });

    tl.to(els[0], { opacity: 1, y: 0, duration: 0.6 })           // "Hi, I am"
      .to(els[1], { opacity: 1, y: 0, duration: 0.8 }, "-=0.2")  // Name
      .to(els[2], { scaleX: 1, opacity: 1, y: 0, duration: 0.5 }, "-=0.3") // Rule
      .to(els[3], { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")  // Role rotation
      .to(els[4], { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")  // Tagline
      .to(els[5], { opacity: 1, y: 0, duration: 0.5 }, "-=0.2"); // Social icons
  }

  // Subtle parallax drift on scroll
  gsap.to(nameRef.current, {
    yPercent: -4,
    ease: "none",
    scrollTrigger: {
      trigger: heroSectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // ===============================
  // HERO — SCROLL OUT
  // ===============================
  gsap.fromTo(
    [nameRef.current, textRef.current],
    { opacity: 1, y: 0 },
    {
      opacity: 0,
      y: -40,
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "bottom top",
        end: "bottom+=200 top",
        scrub: true,
      },
    }
  );

  // ===============================
  // RESEARCH TITLE
  // ===============================
  gsap.from(researchTitleRef.current, {
    opacity: 0,
    y: 30,
    scrollTrigger: {
      trigger: researchTitleRef.current,
      start: "top 85%",
    },
  });

  // ===============================
  // RESEARCH CARDS
  // ===============================
  gsap.from(cardsRef.current, {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    scrollTrigger: {
      trigger: cardsRef.current[0],
      start: "top 80%",
    },
  });

  // ===============================
  // FLAGSHIP METRICS — COUNT UP
  // ===============================
  if (uValueRef.current && dpRef.current && costRef.current) {
    gsap.fromTo(
      [uValueRef.current, dpRef.current, costRef.current],
      { innerText: 0 },
      {
        innerText: (i) => [720, 30, 8500][i],
        duration: 1.6,
        snap: { innerText: 1 },
        stagger: 0.25,
        scrollTrigger: {
          trigger: projectSectionRef.current,
          start: "top 70%",
        },
      }
    );
  }

  // ===============================
  // METRIC CARD HOVER (PHYSICAL)
  // ===============================
  metricCardsRef.current.forEach((card) => {
    const number = card.querySelector(".metric-number");
    if (!number) return;

    const enter = () => {
      gsap.to(card, {
        y: -6,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
        duration: 0.25,
      });
      gsap.to(number, { scale: 1.08, duration: 0.25 });
    };

    const leave = () => {
      gsap.to(card, { y: 0, boxShadow: "none", duration: 0.25 });
      gsap.to(number, { scale: 1, duration: 0.25 });
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  });

  // ===============================
  // EXPERIENCE TIMELINE — LINE
  // ===============================
  gsap.fromTo(
    timelineLineRef.current,
    { scaleY: 0 },
    {
      scaleY: 1,
      transformOrigin: "top",
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 70%",
      },
    }
  );

  // ===============================
  // EXPERIENCE ITEMS (DIRECTIONAL)
  // ===============================
  gsap.from(timelineItemsRef.current, {
    opacity: 0,
    y: (i) => (i % 2 === 0 ? 30 : -30),
    stagger: 0.2,
    scrollTrigger: {
      trigger: timelineRef.current,
      start: "top 65%",
    },
  });

  // ===============================
  // PUBLICATION PANEL
  // ===============================
  gsap.from(publicationRef.current, {
    opacity: 0,
    y: 24,
    scrollTrigger: {
      trigger: publicationRef.current,
      start: "top 80%",
    },
  });

  // ===============================
  // SKILLS — CSS-only (no GSAP to avoid visibility bugs)
  // ===============================
  // Cards and chips use CSS transitions only — always visible, glow on hover/scroll

  // ===============================
  // MOBILE SCROLL GLOW — Skills Cards
  // ===============================
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    const skillCards = document.querySelectorAll("[data-skill-card]");
    skillCards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => card.classList.add("mobile-glow-active"),
        onLeave: () => card.classList.remove("mobile-glow-active"),
        onEnterBack: () => card.classList.add("mobile-glow-active"),
        onLeaveBack: () => card.classList.remove("mobile-glow-active"),
      });
    });

    // Pipeline cards (Project 2)
    pipelineCardsRef.current.forEach((card, idx) => {
      if (!card) return;
      ScrollTrigger.create({
        trigger: card,
        start: "top 65%",
        end: "bottom 35%",
        onEnter: () => card.classList.add("pipeline-glow-active"),
        onLeave: () => card.classList.remove("pipeline-glow-active"),
        onEnterBack: () => card.classList.add("pipeline-glow-active"),
        onLeaveBack: () => card.classList.remove("pipeline-glow-active"),
      });
    });

    // Experience cards
    const experienceCards = document.querySelectorAll("[data-experience-card]");
    experienceCards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => card.classList.add("mobile-glow-active"),
        onLeave: () => card.classList.remove("mobile-glow-active"),
        onEnterBack: () => card.classList.add("mobile-glow-active"),
        onLeaveBack: () => card.classList.remove("mobile-glow-active"),
      });
    });
  }

  // ===============================
  // PROJECT 04 — FADE UP
  // ===============================
  if (project04Ref.current) {
    gsap.from(project04Ref.current, {
      opacity: 0,
      y: 40,
      scrollTrigger: {
        trigger: project04Ref.current,
        start: "top 82%",
      },
    });
  }

  // ===============================
  // CERTIFICATIONS — SLIDE IN
  // ===============================
  if (certsWrapperRef.current) {
    gsap.from(certsWrapperRef.current, {
      opacity: 0,
      y: 30,
      scrollTrigger: {
        trigger: certsWrapperRef.current,
        start: "top 85%",
      },
    });
  }

  // ===============================
  // LEADERSHIP — FADE UP
  // ===============================
  if (leadershipRef.current) {
    gsap.from(leadershipRef.current, {
      opacity: 0,
      y: 30,
      scrollTrigger: {
        trigger: leadershipRef.current,
        start: "top 85%",
      },
    });
  }

  // ===============================
  // CUSTOM CURSOR (UNCHANGED, SAFE)
  // ===============================
  const cursor = cursorRef.current;
  if (!cursor) return;

  let mouseX = 0;
  let mouseY = 0;

  const moveCursor = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  window.addEventListener("mousemove", moveCursor);

  const tick = () => {
    gsap.to(cursor, {
      x: mouseX - 8,
      y: mouseY - 8,
      duration: 0.15,
      ease: "power3.out",
    });
  };

  gsap.ticker.add(tick);

  // ===============================
  // CLEANUP
  // ===============================
  return () => {
    window.removeEventListener("mousemove", moveCursor);
    gsap.ticker.remove(tick);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);

// ===============================
// SCROLL PROGRESS + ACTIVE SECTION
// ===============================
useEffect(() => {
  const sections = ["hero", "about", "skills", "experience", "projects", "publications"];

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

    // Determine active section
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]) ||
        (sections[i] === "hero" ? heroSectionRef.current : null);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.4) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);


  

   return (
    <div className="bg-[#f6f7f9]">

    {/* ========== SPLASH SCREEN ========== */}
    {showSplash && (
      <div
        ref={splashRef}
        className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
      >
        <img
          src={bmLogo}
          alt="Logo"
          onLoad={() => setLogoLoaded(true)}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className={`splash-logo w-64 h-64 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain transition-opacity duration-300 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    )}

    {/* ========== SCROLL PROGRESS BAR ========== */}
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9998]">
      <div
        className="scroll-progress h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>

    {/* Section nav dots removed */}

    {/* Custom cursor — hidden on touch devices */}
<div
  ref={cursorRef}
  className="
    fixed
    top-0 left-0
    w-4 h-4
    rounded-full
    bg-white
    pointer-events-none
    z-[9999]
    mix-blend-difference
    hidden md:block
  "
/>

      {/* ================= HERO ================= */}
<section
  id="hero"
  ref={heroSectionRef}
  className="h-screen relative overflow-hidden bg-[#0b0b0c] text-white"
>
  {/* Grain texture overlay */}
  <div className="grain-overlay" />

  {/* ================= MOBILE HERO ================= */}
  <div className="md:hidden relative flex flex-col justify-center h-full px-6">

    <div ref={mobileHeroRef} className="relative z-10">

      {/* Greeting */}
      <p className="text-base text-white/60 mb-3 font-light">
        Hi, I am
      </p>

      {/* Name */}
      <h1 className="font-bold tracking-[-0.04em] leading-[0.88] text-[15vw] text-white mb-6">
        Bitan<br />Mukherjee
      </h1>

      {/* Accent rule */}
      <div className="w-10 h-[1px] bg-white/20 mb-4 origin-left" />

      {/* Rotating role label */}
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-blue-400 mb-3 h-5 overflow-hidden">
        <span key={roleIndex} className="inline-block animate-[fadeSlideUp_0.1s_ease-out]">
          {roles[roleIndex]}
        </span>
      </p>

      {/* Brief one-liner */}
      <p className="text-sm text-white/40 font-light leading-relaxed max-w-[280px]">
      Undergraduate student exploring computational approaches to process and fluid engineering.
      </p>

      {/* Social icons */}
      <div className="flex items-center gap-4 mt-6">
        <a
          href="https://www.linkedin.com/in/bitanmukherjee"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="mailto:bitanmukherjee3741@gmail.com"
          className="text-white/40 hover:text-white transition-colors duration-300"
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </a>
      </div>
    </div>

    {/* Floating hamburger button — top right */}
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="absolute top-8 right-6 z-30 w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer"
      aria-label="Menu"
    >
      <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
      <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
      <span className={`block w-5 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
    </button>

    {/* Mobile menu overlay */}
    {menuOpen && (
      <div className="absolute inset-0 z-20 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6">
        {[
          { label: "Skills", id: "skills" },
          { label: "Experience", id: "experience" },
          { label: "Projects", id: "projects" },
          { label: "Publications", id: "publications" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => { setMenuOpen(false); scrollToSection(item.id); }}
            className="text-2xl font-light text-white/70 hover:text-white transition tracking-wide bg-transparent border-none cursor-pointer"
          >
            {item.label}
          </button>
        ))}
        <a
          href="https://drive.google.com/file/d/1fbpHl7BmBZwMsXZTrt-OsS7mq2xjgQA1/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-light text-white/70 hover:text-white transition tracking-wide"
          onClick={() => setMenuOpen(false)}
        >
          CV ↗
        </a>
      </div>
    )}

    {/* Scroll indicator — bottom center */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <div className="w-[1px] h-8 bg-gradient-to-b from-white/25 to-transparent animate-pulse" />
    </div>
  </div>

  {/* ================= DESKTOP HERO (unchanged) ================= */}

{/* DESKTOP NAV — hidden on mobile */}
<nav className="absolute top-10 right-10 hidden md:flex gap-10 text-lg md:text-xl font-light text-white/50">

  {/* Internal sections */}
  {[
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Publications", id: "publications" },
  ].map((item) => (
    <button
      key={item.label}
      onClick={() => scrollToSection(item.id)}
      className="group flex items-center gap-2 tracking-wide
                 hover:text-white transition
                 bg-transparent border-none cursor-pointer"
    >
      {item.label}
      <span className="inline-block text-[1.1em] transform group-hover:translate-x-1 transition">
        ↗
      </span>
    </button>
  ))}

  {/* CV — external */}
  <a
    href="https://drive.google.com/file/d/1fbpHl7BmBZwMsXZTrt-OsS7mq2xjgQA1/view?usp=sharing"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 tracking-wide
               hover:text-white transition"
  >
    CV
    <span className="inline-block text-[1.1em] transform group-hover:translate-x-1 transition">
      ↗
    </span>
  </a>

</nav>


  {/* ================= MASSIVE NAME (desktop only) ================= */}
  <div className="absolute bottom-[6vh] left-0 w-full px-6 md:px-10 hidden md:block">

    {/* Mono label */}
    <p className="font-mono text-sm md:text-base tracking-[0.4em] text-white/80 mb-4">
      Hi, I am
    </p>

    <h1
      ref={nameRef}
      className="
        font-bold
        tracking-[-0.03em]
        leading-[0.88]
        text-[16vw] lg:text-[18vw]
        w-full
        select-none
        text-white
      "
    >
      Bitan
      <br />
      Mukherjee
    </h1>
  </div>

  
</section>


{/* ================= ABOUT ME (right after hero) ================= */}
<section id="about" className="py-12 md:py-20 bg-[#f6f7f9]">
  <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">

    {/* LEFT — TEXT + CARDS (VERTICALLY CENTERED) */}
    <div className="lg:col-span-8 flex items-center">
      <div className="w-full">

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2 md:mb-3">
          About Me
        </h2>
        <p className="text-sm md:text-base text-gray-400 font-light mb-6 md:mb-8">
          A bit about who I am and what I do.
        </p>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-8 md:mb-12 max-w-3xl font-light">
          Hi! I am a third-year Chemical Engineering undergraduate.
I like working with processes, models, and systems that make sense in the real world.
Most of my time goes into projects, simulations, and research that sit somewhere between theory and practice.
I am still learning and trying to create social impact.
        </p>

        {/* ========== MOBILE CARDS (no flip, compact) ========== */}
        <div className="flex flex-col gap-4 sm:hidden">

          {/* AGE */}
          <div className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-5xl font-bold text-gray-900 leading-none">21</div>
            <div>
              <div className="text-xs tracking-widest text-gray-400 mb-1">AGE</div>
              <p className="text-sm text-gray-600">Born and brought up in Kolkata, India.</p>
            </div>
          </div>

          {/* CURRENT */}
          <div className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm">
            <img src={juLogo} alt="Jadavpur University" loading="lazy" decoding="async" className="w-12 h-14 object-contain flex-shrink-0" />
            <div>
              <div className="text-xs tracking-widest text-gray-400 mb-1">CURRENT</div>
              <div className="text-base font-semibold text-gray-900">Chemical Engineering</div>
              <p className="text-xs text-gray-500 mt-1">Fluid Mechanics, Heat Transfer, Transport Phenomena, Reaction Engineering, Thermodynamics</p>
            </div>
          </div>

          {/* UPCOMING */}
          <div className="flex items-center gap-5 bg-white rounded-2xl p-5 shadow-sm">
            <img src={abInbevLogo} alt="AB InBev" loading="lazy" decoding="async" className="w-20 h-10 object-contain flex-shrink-0" />
            <div>
              <div className="text-xs tracking-widest text-gray-400 mb-1">UPCOMING</div>
              <div className="text-base font-semibold text-gray-900">Summer Internship, AB InBev India</div>
              <p className="text-xs text-gray-500 mt-1">Supply Chain Excellence Trainee in Summer 2026</p>
            </div>
          </div>
        </div>

        {/* ========== DESKTOP FLIP CARDS (hover works) ========== */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-8">

          {/* AGE */}
          <div className="flip-card h-[260px]">
            <div className="flip-card-inner">

              {/* FRONT */}
              <div className="flip-card-face bg-white p-10 flex flex-col justify-between text-center shadow-sm">
                <div className="text-sm tracking-widest text-gray-400">
                  AGE
                </div>

                <div className="flex-grow flex items-center justify-center">
                  <div className="text-7xl font-bold text-gray-900">
                    21
                  </div>
                </div>

                <div className="h-6" />
              </div>

              {/* BACK */}
              <div className="flip-card-face flip-card-back bg-gray-900 p-10 flex items-center justify-center text-center text-white">
                <p className="text-sm leading-relaxed text-white/80">
                  Born and brought up in Kolkata, India.
                </p>
              </div>

            </div>
          </div>

          {/* CURRENT INSTITUTION */}
          <div className="flip-card h-[260px]">
            <div className="flip-card-inner">

              {/* FRONT */}
              <div className="flip-card-face bg-white p-10 flex flex-col justify-between text-center shadow-sm">
                <div className="text-sm tracking-widest text-gray-400">
                  CURRENT 
                </div>

                <div className="flex-grow flex flex-col items-center justify-center">
                  <img
                    src={juLogo}
                    alt="Jadavpur University"
                    loading="lazy"
                    decoding="async"
                    className="w-16 h-20 object-contain mb-4"
                  />
                  <div className="text-xl font-semibold text-gray-900">
                    Chemical Engineering
                  </div>
                </div>

                <div className="h-6" />
              </div>

              {/* BACK */}
              <div className="flip-card-face flip-card-back bg-gray-900 p-8 flex items-center justify-center text-center text-white">
                <p className="text-sm text-white/80 leading-relaxed">
                  Courses taken: Fluid Mechanics, Heat Transfer, Transport Phenomena, Reaction Engineering, Chemical Engineering Thermodynamics</p>
              </div>

            </div>
          </div>

          {/* UPCOMING */}
          <div className="flip-card h-[260px]">
            <div className="flip-card-inner">

              {/* FRONT */}
              <div className="flip-card-face bg-white p-10 flex flex-col justify-between text-center shadow-sm">
                <div className="text-sm tracking-widest text-gray-400">
                  UPCOMING
                </div>

                <div className="flex-grow flex flex-col items-center justify-center">
                  <img
                    src={abInbevLogo}
                    alt="AB InBev"
                    loading="lazy"
                    decoding="async"
                    className="w-32 h-16 object-contain mb-4"
                  />
                  <div className="text-xl font-semibold text-gray-900 leading-snug">
                    Summer Internship,
                    <br />
                    AB InBev India
                  </div>
                </div>

                <div className="h-6" />
              </div>

              {/* BACK */}
              <div className="flip-card-face flip-card-back bg-gray-900 p-8 flex items-center justify-center text-center text-white">
                <p className="text-sm text-white/80 leading-relaxed">
                  Will be working as a Supply Chain Excellence Trainee at ABInBEV India in Summer 2026 as a part of their Internship Programme.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>

    {/* RIGHT — PHOTO (UNCHANGED) */}
    <div className="lg:col-span-4 flex justify-center lg:justify-end">
      <div className="w-full max-w-[320px] h-[400px] sm:max-w-[400px] sm:h-[500px] lg:max-w-[500px] lg:h-[600px] rounded-[2rem] bg-gray-200 overflow-hidden">
        <picture>
          <source
            type="image/avif"
            srcSet={`${myPhoto.avif900} 900w, ${myPhoto.avif1600} 1600w`}
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px"
          />
          <source
            type="image/webp"
            srcSet={`${myPhoto.webp900} 900w, ${myPhoto.webp1600} 1600w`}
            sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px"
          />
          <img
            src={myPhoto.webp1600}
            alt="Bitan Mukherjee"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
    </div>

  </div>
</section>


{/* ================= SKILLS ================= */}
<section id="skills" className="relative py-20 md:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1117 40%, #101820 100%)' }}>

  {/* Subtle grid pattern overlay */}
  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

  <div className="relative max-w-[90%] xl:max-w-7xl mx-auto px-5 md:px-8">

    <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-blue-400/60 mb-4">
      What I work with
    </p>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
      Skills &amp; Tools
    </h2>
    <p className="text-sm md:text-base text-white/35 font-light mb-12 md:mb-16 max-w-lg">
      From physics-based modeling to machine learning, the tools I use to solve real-world problems.
    </p>

    <div
      ref={skillsRef}
      className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
    >
      {/* MODELING & SIMULATION */}
      <div data-skill-card data-skill-color="blue" className="group relative rounded-2xl border border-white/10 bg-[#12141a] p-7 md:p-8 hover:border-blue-500/60 hover:bg-[#161a24] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] [&.mobile-glow-active]:border-blue-500/60 [&.mobile-glow-active]:bg-[#161a24] [&.mobile-glow-active]:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-5 group-hover:bg-blue-500/30 group-hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Modeling &amp; Simulation</h3>
          <p className="text-sm text-white/50 mb-5 leading-relaxed">
            System modeling across fluid, thermal, and reactive domains.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Fluid Flow", "Heat Transfer", "Reaction Kinetics", "Transport Phenomena", "CFD"].map(s => (
              <span key={s} className="px-3 py-1.5 text-[11px] rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200 cursor-default">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* MACHINE LEARNING */}
      <div data-skill-card data-skill-color="purple" className="group relative rounded-2xl border border-white/10 bg-[#12141a] p-7 md:p-8 hover:border-purple-500/60 hover:bg-[#161a24] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(147,51,234,0.2)] [&.mobile-glow-active]:border-purple-500/60 [&.mobile-glow-active]:bg-[#161a24] [&.mobile-glow-active]:shadow-[0_0_40px_rgba(147,51,234,0.2)]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-5 group-hover:bg-purple-500/30 group-hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Machine Learning</h3>
          <p className="text-sm text-white/50 mb-5 leading-relaxed">
            Physics-constrained neural networks, forecasting, and optimization.
          </p>
          <div className="flex flex-wrap gap-2">
            {["PINNs", "LSTM", "Constrained Learning", "GNNs", "Optimization"].map(s => (
              <span key={s} className="px-3 py-1.5 text-[11px] rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/25 hover:bg-purple-500/30 hover:border-purple-400/50 transition-all duration-200 cursor-default">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* TOOLS & LANGUAGES */}
      <div data-skill-card data-skill-color="emerald" className="group relative rounded-2xl border border-white/10 bg-[#12141a] p-7 md:p-8 hover:border-emerald-500/60 hover:bg-[#161a24] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] [&.mobile-glow-active]:border-emerald-500/60 [&.mobile-glow-active]:bg-[#161a24] [&.mobile-glow-active]:shadow-[0_0_40px_rgba(16,185,129,0.2)]">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5 group-hover:bg-emerald-500/30 group-hover:scale-105 transition-all duration-300">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">Tools &amp; Languages</h3>
          <p className="text-sm text-white/50 mb-5 leading-relaxed">
            End-to-end implementation from prototyping to deployment.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Python", "MATLAB", "OpenFOAM", "C/C++", "Git", "Linux"].map(s => (
              <span key={s} className="px-3 py-1.5 text-[11px] rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200 cursor-default">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


{/* ================= EXPERIENCE ================= */}
<section
  id="experience"
  className="relative isolate bg-black text-white"
>
  <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-16 md:pb-24">

    {/* SECTION TITLE */}
    <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-white/25 mb-3">
      Where I’ve worked
    </p>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2 md:mb-4">
      Experience
    </h2>
    <p className="text-sm md:text-base text-white/30 font-light mb-10 md:mb-16 max-w-xl">
      Research, internships, and industry exposure across multiple domains.
    </p>

    {/* EXPERIENCE LIST */}
    <div className="flex flex-col space-y-10 md:space-y-16">

      {/* ================= IZTECH ================= */}
      <div data-experience-card className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8 transition-all duration-500 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:shadow-[0_0_80px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)] [&.mobile-glow-active]:border-cyan-400/50 [&.mobile-glow-active]:bg-white/[0.08] [&.mobile-glow-active]:shadow-[0_0_80px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">

          {/* DATE */}
          <div className="md:col-span-3">
            <div className="text-3xl md:text-5xl font-bold leading-none">2025-26</div>
            <div className="mt-1 md:mt-2 text-sm md:text-base text-white/50 uppercase tracking-[0.2em] font-light">
              March - January
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-9">

            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <img
                  src={izmirLogo}
                  alt="Izmir Institute of Technology logo"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 md:w-20 md:h-20 object-contain"
                />
              </div>

              <div>
                <h3 className="text-2xl md:text-4xl font-semibold leading-tight">
                   Research Assistant
                </h3>
                <p className="text-base md:text-lg text-white/80 mt-1">
                  Izmir Institute of Technology, Türkiye
                </p>
              </div>
            </div>

            <p className="text-base text-white/70 mb-6">
              Supervisor: Prof. Abhishek Dutta ·{" "}
              <a
                href="https://drive.google.com/file/d/1Sxrx6Ayejsuv0TSRfixfyZazqnUuyvA0/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-white/50 hover:decoration-white transition"
              >
                Letter of Recommendation ↗
              </a>
            </p>

            <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
              <li>
                Designed and trained models for chemical kinetics and population
                balance systems, enforcing ODE constraints, conservation laws, and
                equilibrium conditions.
              </li>
              <li>
                Applied MATLAB-based heat transfer and fluid-flow simulations to
                enable surrogate modeling and process optimization.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= IISc ================= */}
      <div data-experience-card className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8 transition-all duration-500 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:shadow-[0_0_80px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)] [&.mobile-glow-active]:border-cyan-400/50 [&.mobile-glow-active]:bg-white/[0.08] [&.mobile-glow-active]:shadow-[0_0_80px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        <div className="md:col-span-3">
          <div className="text-3xl md:text-5xl font-bold leading-none">2025</div>
          <div className="mt-1 md:mt-2 text-xs md:text-sm text-white/30 uppercase tracking-[0.2em] font-light">
            Jun — Jul
          </div>
        </div>

        <div className="md:col-span-9">

          <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
              <img
                src={iiscLogo}
                alt="Indian Institute of Science logo"
                loading="lazy"
                decoding="async"
                className="w-12 h-12 md:w-20 md:h-20 object-contain"
              />
            </div>

            <div>
              <h3 className="text-2xl md:text-4xl font-semibold leading-tight">
                Summer Research Intern (NPTEL)
              </h3>
              <p className="text-sm md:text-lg text-white/70 mt-1">
                Indian Institute of Science, Bengaluru
              </p>
            </div>
          </div>

          <p className="text-sm text-white/60 mb-6">
            Supervisor: Prof. C. Pandu Rangan ·{" "}
            <a
  href="https://drive.google.com/file/d/1jKLCkEDBttQU3uVbAkSx3qRydgdhLjOm/view?usp=sharing"
  target="_blank"
  rel="noopener noreferrer"
  className="underline underline-offset-4 decoration-white/30 hover:decoration-white transition"
>
  Letter of Recommendation ↗
</a>

          </p>
<ul className="space-y-3 md:space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
              <li>
                Selected for the prestigious NPTEL Summer Internship 2025, I conducted research at IISc Bengaluru on “Minimum Spanning Tree Algorithms”.Implemented Minimum Spanning Tree (MST) algorithms for scalable
              engineering system optimization and network analysis. 
              </li>
              <li>
                This experience deepened my understanding of graph algorithms and strengthened my ability to integrate theoretical insight with practical problem-solving.
              </li>
            </ul>

        </div>
      </div>
      </div>

      {/* ================= IIM RANCHI ================= */}
      <div data-experience-card className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 md:p-8 transition-all duration-500 hover:border-cyan-400/50 hover:bg-white/[0.08] hover:shadow-[0_0_80px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)] [&.mobile-glow-active]:border-cyan-400/50 [&.mobile-glow-active]:bg-white/[0.08] [&.mobile-glow-active]:shadow-[0_0_80px_rgba(34,211,238,0.25),0_0_30px_rgba(34,211,238,0.15)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">

          <div className="md:col-span-3">
            <div className="text-3xl md:text-5xl font-bold leading-none">2024</div>
            <div className="mt-1 md:mt-2 text-sm md:text-base text-white/50 uppercase tracking-[0.2em] font-light">
              Dec — Feb 2025
            </div>
          </div>

          <div className="md:col-span-9">

            <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                <img
                  src={iimLogo}
                  alt="Indian Institute of Management Ranchi logo"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 md:w-20 md:h-20 object-contain"
                />
              </div>

              <div>
                <h3 className="text-2xl md:text-4xl font-semibold leading-tight">
                  Associate Researcher (Remote)
                </h3>
                <p className="text-base md:text-lg text-white/80 mt-1">
                  Indian Institute of Management, Ranchi
                </p>
              </div>
            </div>

            <p className="text-base text-white/70 mb-6">
              Supervisor: Prof. Sobhan Sarkar ·{" "}
              <a
                href="https://drive.google.com/file/d/107bVc-lJF9rjRSGXB6CvfbegI76zWUhb/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 decoration-white/50 hover:decoration-white transition"
              >
                Project Completion Certificate ↗
              </a>
            </p>

            <ul className="space-y-4 text-base md:text-lg text-white/80 leading-relaxed">
              <li>
                Built LSTM and GNN-based models for cybersecurity risk forecasting using large historical datasets.
              </li>
              <li>
                Engineered anomaly scoring, feature extraction, and attention-based pipelines to improve interpretability and predictive accuracy.
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>




{/* ================= PROJECTS ================= */}
<div ref={projectsTriggerRef} className="h-px w-full" />
<section id="projects" className="bg-neutral-950 text-white">


  {/* ================= PROJECT 01 — REIMAGINED: HYDROGEN SYSTEM ================= */}
  {loadProjectVisuals ? (
    <Suspense fallback={<div className="h-[520px] bg-white/5 animate-pulse" />}>
      <Project01 />
    </Suspense>
  ) : (
    <div className="h-[520px] bg-white/5 animate-pulse" />
  )}

{/* ================= PROJECT 02 — ITERATIVE THERMO-MECHANICAL DESIGN ================= */}
<section
  ref={project2Ref}
  className="py-16 md:py-24 bg-[#0b0b0c] text-white overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-5 md:px-8">

  {/* ================= HEADER ================= */}
<div className="mb-10 border-b border-white/10 pb-8">

  {/* TITLE + BUTTON ROW */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
    <div>
      <p className="font-mono text-xs text-green-400/70 mb-2">
        PROJECT 02 
      </p>

      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        Smart Heat Exchanger Designer
      </h2>
    </div>

    <a
      href="https://github.com/Glitched404/Heat_Exchanger_Designer"
      className="px-5 py-2.5 md:px-6 md:py-3 border border-white/20 rounded-full
                 hover:bg-white hover:text-black transition-colors
                 text-sm font-medium shrink-0 w-fit"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Source Code ↗
    </a>
  </div>

  {/* FULL-WIDTH DESCRIPTION */}
  <div className="w-full bg-gradient-to-r from-green-500/10 to-transparent rounded-2xl p-6 md:p-8 border-l-4 border-green-500">
    <div className="text-white/80 leading-relaxed space-y-4 text-base md:text-lg">
      <p>
        An end-to-end MATLAB framework for the design and optimization of
        shell-and-tube heat exchangers under realistic thermal, hydraulic,
        and economic constraints.
      </p>

      <p>
        The workflow combines energy balance and LMTD-based sizing with
        mechanical design using TEMA standards, pressure-drop estimation,
        and heat transfer correlations to iteratively refine the overall
        heat transfer coefficient until convergence.
      </p>

      <p>
        Multiple geometric configurations are evaluated in parallel, with
        the final design selected based on feasibility, convergence behavior,
        pressure-drop limits, and capital cost.
      </p>
    </div>
  </div>
</div>


    {/* ================= PIPELINE ================= */}
    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

      {/* Connecting Line */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -z-10" />

      {[
  {
    step: "01",
    title: "Initialize",
    desc: "Define process conditions, fouling factors, fluid properties, and design constraints."
  },
  {
    step: "02",
    title: "Thermal Foundation",
    desc: "Establish heat duty and LMTD for a 1–2 pass exchanger, applying the Ft correction and a starting U value."
  },
  {
    step: "03",
    title: "Hydraulics & Heat Transfer",
    desc: "Evaluate tube- and shell-side heat transfer and pressure drops using Sieder–Tate and Kern correlations."
  },
  {
    step: "04",
    title: "Iterative Optimization",
    desc: "Update geometry and U iteratively until convergence is reached, then select the lowest-cost feasible design."
  }
]

      .map((item, i) => (
        <div
  key={i}
  ref={(el) => (pipelineCardsRef.current[i] = el)}
  className="group relative bg-[#161618] p-6 rounded-xl text-center
             border border-white/10 hover:border-green-500/50
             transition-all duration-300
             [&.pipeline-glow-active]:border-green-500/50 [&.pipeline-glow-active]:bg-[#1a1f1a] [&.pipeline-glow-active]:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
>

          <div
  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0b0b0c] px-2
             text-xs font-mono text-white/60
             group-hover:text-green-400 transition-colors
             group-[.pipeline-glow-active]:text-green-400"
>

            STEP {item.step}
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-2 group-hover:text-green-400 transition-colors group-[.pipeline-glow-active]:text-green-400">
            {item.title}
          </h3>

          <p className="text-sm text-white/80 leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* ================= TERMINAL OUTPUT ================= */}
    <div className="mt-14 bg-black rounded-lg border border-white/10
                    p-6 font-mono text-sm shadow-2xl">

      <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-auto text-xs text-white/50">
          bash — sample output (example case)
        </span>
      </div>

      <div className="space-y-1 text-white/90">
        <p>Initializing design parameters...</p>
        <p>
          Iteration 1: U_calc = 460 W/m²K{" "}
          <span className="text-red-400">(ΔU &gt; 5%)</span>
        </p>
        <p>
          Iteration 2: U_calc = 690 W/m²K{" "}
          <span className="text-yellow-400">(converging)</span>
        </p>
        <p>Iteration 3: |ΔU| = 0.8% &lt; tolerance</p>
        <p className="text-green-400">
          Convergence achieved. Optimal configuration selected.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div>
            <span className="block text-xs text-white/60">OVERALL U</span>
            <span className="text-lg text-white">~720 W/m²K</span>
          </div>
          <div>
            <span className="block text-xs text-white/60">PRESSURE DROP</span>
            <span className="text-lg text-white">&lt; 35 kPa</span>
          </div>
          <div>
            <span className="block text-xs text-white/60">CAPITAL COST</span>
            <span className="text-lg text-white">Within constraint</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


{loadProjectVisuals ? (
  <Suspense fallback={<div className="h-[520px] bg-white/5 animate-pulse" />}>
    <Project03 />
  </Suspense>
) : (
  <div className="h-[520px] bg-white/5 animate-pulse" />
)}

{/* ================= PROJECT 04 — SYSTEMS PHASE MAP ================= */}
<section ref={project04Ref} className="py-16 md:py-24 bg-[#0b1220] text-white relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-5 md:px-8">

    {/* ================= HEADER ================= */}
    <div className="mb-10 border-b border-white/10 pb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
        <div>
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-cyan-400 mb-3">
            PROJECT 04 
          </p>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Decarbonizing the Steel Industry
          </h2>
        </div>
      </div>

      {/* STYLED DESCRIPTION BOX */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-transparent rounded-2xl p-6 md:p-8 border-l-4 border-cyan-500">
        <div className="text-white/80 leading-relaxed space-y-4 text-base md:text-lg">
          <p>
            A system-level comparison of hydrogen-based reduction, electrified
            furnaces, carbon capture, and process optimization under real-world
            energy availability, infrastructure readiness, and retrofit constraints.
          </p>
          <p>
            This analysis maps dominant production pathways against infrastructure
            readiness and CO₂ intensity reduction potential, revealing which routes
            offer the lowest system resistance under current constraints.
          </p>
        </div>
      </div>
    </div>

    {/* ================= TOP CARDS ================= */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
      {[
        {
          title: "Global impact",
          text:
            "Steel production contributes ~11% of global CO₂ emissions, dominated by blast furnace basic oxygen furnace (BF–BOF) routes."
        },
        {
          title: "Core challenge",
          text:
            "Deep decarbonization is constrained by green hydrogen availability, grid carbon intensity, and retrofit feasibility of existing assets."
        },
        {
          title: "Design question",
          text:
            "Which production routes minimize total system resistance under current energy, infrastructure, and capital constraints?"
        }
      ].map((card, i) => (
        <div
          key={i}
          className="p-6 rounded-xl bg-[#0f172a] border border-white/10"
        >
          <h4 className="text-sm text-white/70 mb-2 uppercase tracking-wide">
            {card.title}
          </h4>
          <p className="text-base text-white/90 leading-relaxed">
            {card.text}
          </p>
        </div>
      ))}
    </div>

    {/* ================= MAIN CONTENT ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

      {/* ================= PHASE MAP ================= */}
      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] rounded-2xl bg-[#0f172a] border border-white/10 p-6">

          {/* Axis labels (FIXED POSITIONING) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/60">
            Infrastructure & Energy Availability →
          </div>
          <div className="absolute top-4 left-4 text-xs text-white/60">
            ↑ Process CO₂ Intensity Reduction
          </div>

          {/* SVG MAP */}
          <svg
            viewBox="0 0 500 360"
            className="w-full h-full"
          >
            {/* BF–BOF + CCUS */}
            <path
              d="M20 260 Q180 250 280 270 L280 360 L20 360 Z"
              fill="rgba(239,68,68,0.18)"
            />
            <text x="30" y="305" fontSize="12" fill="rgba(255,255,255,0.55)">
              BF–BOF + CCUS (Retrofit)
            </text>

            {/* Gas-DRI / Scrap-EAF */}
            <path
              d="M20 210 Q250 130 440 210 L440 290 Q250 260 20 245 Z"
              fill="rgba(245,158,11,0.32)"
            />
            <text x="145" y="215" fontSize="13" fill="rgba(255,255,255,0.9)">
              Gas-DRI / Scrap-EAF Hybrids
            </text>

            {/* H₂-DRI + EAF */}
            <path
              d="M260 80 Q420 70 480 150 L480 220 Q350 185 260 195 Z"
              fill="rgba(34,197,94,0.35)"
            />
            <text x="295" y="140" fontSize="12" fill="rgba(255,255,255,0.85)">
              H₂-DRI + EAF (Green Hydrogen)
            </text>
          </svg>

          {/* Legend */}
          <div className="absolute top-4 right-4 text-xs text-white/60 text-right max-w-[150px]">
            Dominance ≠ adoption<br />
            Lowest system-level resistance
          </div>
        </div>
      </div>

      {/* ================= INTERPRETATION ================= */}
      <div className="lg:col-span-5 space-y-8">

        <div className="p-8 rounded-2xl bg-[#0f172a] border border-white/10">
          <h3 className="text-2xl font-semibold mb-4">
            System Interpretation - Present Conditions
          </h3>

          <p className="text-white/80 leading-relaxed mb-6">
            Under current grid carbon intensity, limited green hydrogen supply,
            and capital-heavy legacy steel infrastructure, hybrid Gas-DRI and
            Scrap-EAF routes offer the lowest resistance pathway to near-term
            emissions reduction.
          </p>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="block text-white/60">Dominant pathway</span>
              <span className="text-white font-medium">
                Gas-DRI / Scrap-EAF
              </span>
            </div>
            <div>
              <span className="block text-white/60">CO₂ intensity</span>
              <span className="text-white font-medium">
                ~0.7–1.1 tCO₂ / t steel
              </span>
            </div>
            <div>
              <span className="block text-white/60">Primary constraint</span>
              <span className="text-white font-medium">
                Green hydrogen availability
              </span>
            </div>
            <div>
              <span className="block text-white/60">Role of CCUS</span>
              <span className="text-white font-medium">
                Transitional retrofit option
              </span>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/60 leading-relaxed">
          Assumptions:<br />
          Carbon price &gt; $80 / tCO₂ · Grid intensity &lt; 450 gCO₂ / kWh ·
          Limited green hydrogen availability
        </div>
      </div>
    </div>
  </div>
</section>
</section>


{/* ================= PUBLICATIONS ================= */}
<section id="publications" className="py-16 md:py-24 bg-[#f9fafb] text-black">
  <div className="max-w-7xl mx-auto px-5 md:px-8">

    <div className="mb-12 md:mb-20">
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
        Publications
      </h2>
      <p className="mt-2 text-base md:text-lg text-slate-600 max-w-lg">
        Peer-reviewed research in physics-informed machine learning.
      </p>
    </div>

    {/* ================= PUBLICATION PANEL ================= */}
    <div className="relative rounded-3xl bg-white shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)] overflow-hidden">

      {/* LEFT ACCENT */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600" />

      {/* ========== MOBILE LAYOUT ========== */}
      <div className="lg:hidden p-5 sm:p-8">

        {/* TITLE FIRST */}
        <h3 className="text-xl sm:text-2xl font-semibold leading-tight mb-3">
          A Physics-Informed Neural Network (PINN) Approach to Over-Equilibrium
          Dynamics in Conservatively Perturbed Linear Equilibrium Systems
        </h3>

        {/* AUTHORS */}
        <p className="text-sm text-slate-500 mb-4">
          Dutta, A.; Mukherjee, B.; Hosen, S. A.; Turan, M.; Constales, D.;
          Yablonsky, G.
        </p>

        {/* COMPACT META ROW */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            Entropy
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            2026
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
            Open Access
          </span>
        </div>

        {/* ABSTRACT */}
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed mb-5">
          <p>
            This work introduces a physics-informed neural network framework
            for modeling over-equilibrium dynamics in conservatively perturbed
            linear equilibrium systems.
          </p>
          <p>
            By embedding governing differential equations and conservation
            laws directly into the training process, the approach preserves
            physical consistency while accurately capturing transient
            deviations from equilibrium.
          </p>
        </div>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            "Physics-Informed ML",
            "Dynamical Systems",
            "Non-equilibrium Dynamics",
            "PINNs",
            "Conservation Laws"
          ].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] rounded-full bg-slate-100 text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
<a
  href="https://www.mdpi.com/3645648"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 text-sm font-medium
             text-blue-600 hover:text-blue-800 transition"
>
  View journal article →
</a>
      </div>

      {/* ========== DESKTOP LAYOUT (unchanged) ========== */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-12 p-12">

        {/* ================= META ================= */}
        <div className="lg:col-span-3 space-y-6 text-sm">

          <div>
            <span className="block text-slate-400 text-xs mb-1">Type</span>
            <span className="font-medium">Journal Article</span>
          </div>

          <div>
            <span className="block text-slate-400 text-xs mb-1">Journal</span>
            <span className="font-medium">Entropy</span>
          </div>

          <div>
            <span className="block text-slate-400 text-xs mb-1">Year</span>
            <span className="font-medium">2026</span>
          </div>

          <div>
            <span className="block text-slate-400 text-xs mb-1">Access</span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              Open Access
            </span>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-2">
            <a
              href="https://www.mdpi.com/3645648"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium
                         text-blue-600 hover:text-blue-800 transition"
            >
              View journal article →
            </a>
            <p className="text-xs text-slate-400">
              DOI available
            </p>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="lg:col-span-9">

          <h3 className="text-3xl font-semibold leading-tight mb-6">
            A Physics-Informed Neural Network (PINN) Approach to Over-Equilibrium
            Dynamics in Conservatively Perturbed Linear Equilibrium Systems
          </h3>

          <p className="text-sm text-slate-500 mb-6">
            Dutta, A.; Mukherjee, B.; Hosen, S. A.; Turan, M.; Constales, D.;
            Yablonsky, G.
          </p>

          <div className="max-w-3xl space-y-4 text-slate-700 leading-relaxed">
            <p>
              This work introduces a physics-informed neural network framework
              for modeling over-equilibrium dynamics in conservatively perturbed
              linear equilibrium systems.
            </p>

            <p>
              By embedding governing differential equations and conservation
              laws directly into the training process, the approach preserves
              physical consistency while accurately capturing transient
              deviations from equilibrium.
            </p>
          </div>

          {/* ================= TAGS ================= */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "Physics-Informed ML",
              "Dynamical Systems",
              "Non-equilibrium Dynamics",
              "PINNs",
              "Conservation Laws"
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


{/* ================= CERTIFICATIONS ================= */}
<div ref={certsWrapperRef}>
  {loadCarousels ? (
    <Suspense fallback={<div className="h-[380px] bg-black/60 animate-pulse" />}>
      <CertificationsCarousel certifications={certifications} />
    </Suspense>
  ) : (
    <div className="h-[380px] bg-black/60 animate-pulse" />
  )}
</div>


{/* ================= POSITIONS OF RESPONSIBILITY ================= */}
<section ref={leadershipRef} className="py-14 md:py-20 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-5 md:px-8">

    <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-slate-400 mb-2">
      Leadership
    </p>

    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
      Positions of Responsibility
    </h2>
    <p className="text-sm text-slate-400 font-light mb-8">
      Campus and community leadership roles.
    </p>

    {loadCarousels ? (
      <Suspense fallback={<div className="h-[300px] bg-slate-200 animate-pulse rounded-2xl" />}>
        <LeadershipCarousel />
      </Suspense>
    ) : (
      <div className="h-[300px] bg-slate-200 animate-pulse rounded-2xl" />
    )}

  </div>
</section>



{/* ================= FOOTER ================= */}
<footer className="py-16 md:py-20 bg-[#0a0a0a] text-center">
  <p className="text-xs tracking-[0.25em] uppercase text-white/20 mb-3">
    © {new Date().getFullYear()}
  </p>
  <p className="text-lg md:text-xl font-light text-white/50 tracking-wide">
    Bitan Mukherjee
  </p>

  <div className="mt-6 flex justify-center gap-8">
    <a
      href="https://www.linkedin.com/in/bitanmukherjee/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-white/30 hover:text-white/60 transition tracking-wide"
    >
      LinkedIn
    </a>
    <a
      href="mailto:bitanm.chem.ug@jadavpuruniversity.in"
      className="text-sm text-white/30 hover:text-white/60 transition tracking-wide"
    >
      Email
    </a>
  </div>
</footer>




    </div>
  );
}

