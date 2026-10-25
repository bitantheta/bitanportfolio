import{r as l,j as e}from"./index-BODke4nP.js";import"./plotly-gSPSn6_v.js";import"./gsap-DDlvirwQ.js";function k({certifications:r}){const n=l.useRef(null),i=l.useRef(null),d=l.useRef(!1),s=typeof window<"u"&&window.innerWidth<768?296:520,h=1.2;l.useEffect(()=>{n.current&&(n.current.scrollLeft=r.length*s)},[r.length,s]),l.useEffect(()=>{const t=n.current;if(!t)return;const a=()=>{if(!d.current&&t){t.scrollLeft+=h;const o=r.length*s*2;t.scrollLeft>=o&&(t.scrollLeft=r.length*s)}i.current=requestAnimationFrame(a)};return i.current=requestAnimationFrame(a),()=>cancelAnimationFrame(i.current)},[r.length,s]);const c=l.useCallback(()=>{d.current=!0},[]),u=l.useCallback(()=>{d.current=!1},[]),x=t=>{n.current&&(n.current.scrollBy({left:t*s,behavior:"smooth"}),setTimeout(()=>{const a=r.length*s*2;n.current.scrollLeft<=s&&(n.current.scrollLeft=r.length*s),n.current.scrollLeft>=a&&(n.current.scrollLeft=r.length*s)},400))},m=[...r,...r,...r];return e.jsx("section",{className:"py-14 md:py-20 bg-white dark:bg-[#080808] text-slate-900 dark:text-slate-50 border-t border-slate-200 dark:border-[#242424] relative overflow-hidden transition-colors duration-300",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-5 md:px-8",children:[e.jsx("p",{className:"font-mono text-xs text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider",children:"CERTIFICATIONS"}),e.jsx("h2",{className:"text-3xl md:text-5xl font-bold tracking-tight mb-8 md:mb-10 text-slate-900 dark:text-slate-50",children:"Technical Training & Credentials"}),e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:()=>x(-1),"aria-label":"Previous certification",className:`
              absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10
              bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80
              text-slate-800 dark:text-slate-50
              border border-slate-200 dark:border-[#303030]
              p-2 md:p-3 rounded-full backdrop-blur shadow-md transition-all
            `,children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})})}),e.jsx("button",{onClick:()=>x(1),"aria-label":"Next certification",className:`
              absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10
              bg-white/90 dark:bg-black/60 hover:bg-white dark:hover:bg-black/80
              text-slate-800 dark:text-slate-50
              border border-slate-200 dark:border-[#303030]
              p-2 md:p-3 rounded-full backdrop-blur shadow-md transition-all
            `,children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),e.jsx("div",{ref:n,className:"overflow-x-hidden",onMouseEnter:c,onMouseLeave:u,onTouchStart:c,onTouchEnd:u,children:e.jsx("div",{className:"flex gap-4 md:gap-10",children:m.map((t,a)=>{const o=typeof t.image=="string"?{webp:t.image}:t.image;return e.jsxs("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:`
                      group relative
                      min-w-[280px] h-[200px]
                      md:min-w-[520px] md:h-[360px]
                      rounded-2xl overflow-hidden
                      shadow-[0_40px_80px_rgba(0,0,0,0.6)]
                      transform transition-all duration-500
                      hover:-translate-y-2 hover:rotate-[-0.5deg]
                    `,children:[e.jsxs("picture",{children:[o.avif&&e.jsx("source",{type:"image/avif",srcSet:o.avif}),e.jsx("source",{type:"image/webp",srcSet:o.webp}),e.jsx("img",{src:o.webp,alt:t.title,loading:"lazy",decoding:"async",className:`
                          w-full h-full object-contain
                          bg-white
                        `})]}),e.jsxs("div",{className:`
                        absolute inset-0
                        bg-gradient-to-t from-black/80 via-black/30 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        flex flex-col justify-end p-6
                      `,children:[e.jsx("div",{className:"text-xs uppercase tracking-widest text-white/70 mb-2",children:"Verified Certificate"}),e.jsx("h3",{className:"text-xl font-semibold leading-tight",children:t.title}),e.jsx("p",{className:"text-sm text-white/70 mt-1",children:t.issuer}),e.jsxs("p",{className:"text-xs text-white/50 mt-1",children:["Issued ",t.date]}),e.jsxs("span",{className:"mt-4 inline-flex items-center gap-2 text-sm text-blue-400",children:["View verification ",e.jsx("span",{children:"↗"})]})]})]},a)})})})]})]})})}export{k as default};
