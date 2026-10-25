import{r as l,j as r}from"./index-BODke4nP.js";import"./plotly-gSPSn6_v.js";import"./gsap-DDlvirwQ.js";const a=t=>`/${t.replace(/^\//,"")}`;function g(){const t=l.useRef(null),i=l.useRef(null),c=l.useRef(!1),n=240,p=1,s=[{image:{avif:a("leadership/dps-vice-head-boy-600.avif"),webp:a("leadership/dps-vice-head-boy-600.webp")},role:"Vice Head Boy",org:"DPS Ruby Park",year:"Class XI"},{image:{avif:a("leadership/dps-house-captain-600.avif"),webp:a("leadership/dps-house-captain-600.webp")},role:"House Captain",org:"DPS Ruby Park",year:"Class XII"},{image:{avif:a("leadership/jumun-24-oc-finance-600.avif"),webp:a("leadership/jumun-24-oc-finance-600.webp")},role:"OC Finance",org:"JUMUN",year:"2024"},{image:{avif:a("leadership/voxpop-24-director-finance-600.avif"),webp:a("leadership/voxpop-24-director-finance-600.webp")},role:"Director (Finance)",org:"VOXPOP",year:"2024"},{image:{avif:a("leadership/intramun-24-finance-officer-600.avif"),webp:a("leadership/intramun-24-finance-officer-600.webp")},role:"Finance Officer",org:"INTRAMUN",year:"2024"},{image:{avif:a("leadership/jumun-25-charge-affairs-600.avif"),webp:a("leadership/jumun-25-charge-affairs-600.webp")},role:"Chargé d’Affaires",org:"JUMUN",year:"2025"},{image:{avif:a("leadership/voxpop-25-treasurer-600.avif"),webp:a("leadership/voxpop-25-treasurer-600.webp")},role:"Treasurer",org:"VOXPOP",year:"2025"}],h=[...s,...s,...s];l.useEffect(()=>{t.current&&(t.current.scrollLeft=s.length*n)},[s.length,n]),l.useEffect(()=>{const e=t.current;if(!e)return;const o=()=>{!c.current&&e&&(e.scrollLeft-=p,e.scrollLeft<=0&&(e.scrollLeft=s.length*n)),i.current=requestAnimationFrame(o)};return i.current=requestAnimationFrame(o),()=>cancelAnimationFrame(i.current)},[s.length,n]);const d=l.useCallback(()=>{c.current=!0},[]),u=l.useCallback(()=>{c.current=!1},[]),f=e=>{t.current&&(t.current.scrollBy({left:e*n,behavior:"smooth"}),setTimeout(()=>{const o=s.length*n*2;t.current.scrollLeft<=n&&(t.current.scrollLeft=s.length*n),t.current.scrollLeft>=o&&(t.current.scrollLeft=s.length*n)},400))};return r.jsxs("div",{className:"relative",children:[r.jsx("button",{onClick:()=>f(-1),className:`
          absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10
          bg-black/70 hover:bg-black/90
          border border-white/10
          p-2 md:p-3 rounded-full backdrop-blur
        `,children:"‹"}),r.jsx("button",{onClick:()=>f(1),className:`
          absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10
          bg-black/70 hover:bg-black/90
          border border-white/10
          p-2 md:p-3 rounded-full backdrop-blur
        `,children:"›"}),r.jsx("div",{ref:t,className:"overflow-x-hidden",onMouseEnter:d,onMouseLeave:u,onTouchStart:d,onTouchEnd:u,children:r.jsx("div",{className:"flex gap-6",children:h.map((e,o)=>r.jsxs("div",{className:`
                w-[220px] h-[250px]
                flex-shrink-0
                rounded-2xl
                bg-white dark:bg-[#151515]
                border border-slate-200 dark:border-[#303030]
                shadow-sm dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)]
                p-5
                flex flex-col
                hover:-translate-y-1 hover:border-slate-300 dark:hover:border-white/30
                transition-all duration-300
              `,children:[r.jsx("div",{className:"h-24 flex items-center justify-center mb-5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-[#303030]",children:r.jsxs("picture",{children:[r.jsx("source",{type:"image/avif",srcSet:e.image.avif}),r.jsx("source",{type:"image/webp",srcSet:e.image.webp}),r.jsx("img",{src:e.image.webp,alt:e.role,loading:"lazy",decoding:"async",className:"max-h-[72px] max-w-[120px] object-contain"})]})}),r.jsxs("div",{className:"text-center mt-auto",children:[r.jsx("div",{className:"text-sm font-semibold text-slate-900 dark:text-slate-50",children:e.role}),r.jsx("div",{className:"text-xs text-slate-600 dark:text-slate-300 mt-1",children:e.org}),r.jsx("div",{className:"text-xs text-slate-400 dark:text-slate-400 mt-1",children:e.year})]})]},o))})})]})}export{g as default};
