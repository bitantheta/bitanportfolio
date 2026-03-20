import{r as i,j as r}from"./index-CKjnmnR8.js";import"./plotly-gSPSn6_v.js";import"./gsap-DDlvirwQ.js";const a=n=>`/${n.replace(/^\//,"")}`;function g(){const n=i.useRef(null),l=i.useRef(null),c=i.useRef(!1),s=240,p=1,t=[{image:{avif:a("leadership/dps-vice-head-boy-600.avif"),webp:a("leadership/dps-vice-head-boy-600.webp")},role:"Vice Head Boy",org:"DPS Ruby Park",year:"Class XI"},{image:{avif:a("leadership/dps-house-captain-600.avif"),webp:a("leadership/dps-house-captain-600.webp")},role:"House Captain",org:"DPS Ruby Park",year:"Class XII"},{image:{avif:a("leadership/jumun-24-oc-finance-600.avif"),webp:a("leadership/jumun-24-oc-finance-600.webp")},role:"OC Finance",org:"JUMUN",year:"2024"},{image:{avif:a("leadership/voxpop-24-director-finance-600.avif"),webp:a("leadership/voxpop-24-director-finance-600.webp")},role:"Director (Finance)",org:"VOXPOP",year:"2024"},{image:{avif:a("leadership/intramun-24-finance-officer-600.avif"),webp:a("leadership/intramun-24-finance-officer-600.webp")},role:"Finance Officer",org:"INTRAMUN",year:"2024"},{image:{avif:a("leadership/jumun-25-charge-affairs-600.avif"),webp:a("leadership/jumun-25-charge-affairs-600.webp")},role:"Chargé d’Affaires",org:"JUMUN",year:"2025"},{image:{avif:a("leadership/voxpop-25-treasurer-600.avif"),webp:a("leadership/voxpop-25-treasurer-600.webp")},role:"Treasurer",org:"VOXPOP",year:"2025"}],h=[...t,...t,...t];i.useEffect(()=>{n.current&&(n.current.scrollLeft=t.length*s)},[]),i.useEffect(()=>{const e=n.current;if(!e)return;const o=()=>{!c.current&&e&&(e.scrollLeft-=p,e.scrollLeft<=0&&(e.scrollLeft=t.length*s)),l.current=requestAnimationFrame(o)};return l.current=requestAnimationFrame(o),()=>cancelAnimationFrame(l.current)},[]);const d=i.useCallback(()=>{c.current=!0},[]),f=i.useCallback(()=>{c.current=!1},[]),u=e=>{n.current&&(n.current.scrollBy({left:e*s,behavior:"smooth"}),setTimeout(()=>{const o=t.length*s*2;n.current.scrollLeft<=s&&(n.current.scrollLeft=t.length*s),n.current.scrollLeft>=o&&(n.current.scrollLeft=t.length*s)},400))};return r.jsxs("div",{className:"relative",children:[r.jsx("button",{onClick:()=>u(-1),className:`
          absolute left-0 md:-left-5 top-1/2 -translate-y-1/2 z-10
          bg-black/70 hover:bg-black/90
          border border-white/10
          p-2 md:p-3 rounded-full backdrop-blur
        `,children:"‹"}),r.jsx("button",{onClick:()=>u(1),className:`
          absolute right-0 md:-right-5 top-1/2 -translate-y-1/2 z-10
          bg-black/70 hover:bg-black/90
          border border-white/10
          p-2 md:p-3 rounded-full backdrop-blur
        `,children:"›"}),r.jsx("div",{ref:n,className:"overflow-x-hidden",onMouseEnter:d,onMouseLeave:f,onTouchStart:d,onTouchEnd:f,children:r.jsx("div",{className:"flex gap-6",children:h.map((e,o)=>r.jsxs("div",{className:`
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
              `,children:[r.jsx("div",{className:"h-24 flex items-center justify-center mb-5 rounded-xl bg-white/[0.04] border border-white/10",children:r.jsxs("picture",{children:[r.jsx("source",{type:"image/avif",srcSet:e.image.avif}),r.jsx("source",{type:"image/webp",srcSet:e.image.webp}),r.jsx("img",{src:e.image.webp,alt:e.role,loading:"lazy",decoding:"async",className:"max-h-[72px] max-w-[120px] object-contain"})]})}),r.jsxs("div",{className:"text-center mt-auto",children:[r.jsx("div",{className:"text-sm font-semibold text-white",children:e.role}),r.jsx("div",{className:"text-xs text-white/60 mt-1",children:e.org}),r.jsx("div",{className:"text-xs text-white/40 mt-1",children:e.year})]})]},o))})})]})}export{g as default};
