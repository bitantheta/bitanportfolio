import{r as l,j as e}from"./index-CKjnmnR8.js";import"./plotly-gSPSn6_v.js";import"./gsap-DDlvirwQ.js";function j({certifications:n}){const r=l.useRef(null),a=l.useRef(null),c=l.useRef(!1),s=typeof window<"u"&&window.innerWidth<768?296:520,x=1.2;l.useEffect(()=>{r.current&&(r.current.scrollLeft=n.length*s)},[n.length]),l.useEffect(()=>{const t=r.current;if(!t)return;const o=()=>{if(!c.current&&t){t.scrollLeft+=x;const i=n.length*s*2;t.scrollLeft>=i&&(t.scrollLeft=n.length*s)}a.current=requestAnimationFrame(o)};return a.current=requestAnimationFrame(o),()=>cancelAnimationFrame(a.current)},[n.length]);const d=l.useCallback(()=>{c.current=!0},[]),u=l.useCallback(()=>{c.current=!1},[]),m=t=>{r.current&&(r.current.scrollBy({left:t*s,behavior:"smooth"}),setTimeout(()=>{const o=n.length*s*2;r.current.scrollLeft<=s&&(r.current.scrollLeft=n.length*s),r.current.scrollLeft>=o&&(r.current.scrollLeft=n.length*s)},400))},h=[...n,...n,...n];return e.jsx("section",{className:"py-14 md:py-20 bg-[#0b0b0c] text-white relative overflow-hidden",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-5 md:px-8",children:[e.jsx("p",{className:"font-mono text-xs text-slate-400 mb-2",children:"CERTIFICATIONS"}),e.jsx("h2",{className:"text-3xl md:text-5xl font-bold tracking-tight mb-8 md:mb-10",children:"Technical Training & Credentials"}),e.jsxs("div",{className:"relative",children:[e.jsx("button",{onClick:()=>m(-1),className:`
              absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10
              bg-black/60 hover:bg-black/80
              border border-white/10
              p-2 md:p-3 rounded-full backdrop-blur
            `,children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"15 18 9 12 15 6"})})}),e.jsx("button",{onClick:()=>m(1),className:`
              absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10
              bg-black/60 hover:bg-black/80
              border border-white/10
              p-2 md:p-3 rounded-full backdrop-blur
            `,children:e.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})}),e.jsx("div",{ref:r,className:"overflow-x-hidden",onMouseEnter:d,onMouseLeave:u,onTouchStart:d,onTouchEnd:u,children:e.jsx("div",{className:"flex gap-4 md:gap-10",children:h.map((t,o)=>{const i=typeof t.image=="string"?{webp:t.image}:t.image;return e.jsxs("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:`
                      group relative
                      min-w-[280px] h-[200px]
                      md:min-w-[520px] md:h-[360px]
                      rounded-2xl overflow-hidden
                      shadow-[0_40px_80px_rgba(0,0,0,0.6)]
                      transform transition-all duration-500
                      hover:-translate-y-2 hover:rotate-[-0.5deg]
                    `,children:[e.jsxs("picture",{children:[i.avif&&e.jsx("source",{type:"image/avif",srcSet:i.avif}),e.jsx("source",{type:"image/webp",srcSet:i.webp}),e.jsx("img",{src:i.webp,alt:t.title,loading:"lazy",decoding:"async",className:`
                          w-full h-full object-contain
                          bg-white
                        `})]}),e.jsxs("div",{className:`
                        absolute inset-0
                        bg-gradient-to-t from-black/80 via-black/30 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition-opacity duration-300
                        flex flex-col justify-end p-6
                      `,children:[e.jsx("div",{className:"text-xs uppercase tracking-widest text-white/70 mb-2",children:"Verified Certificate"}),e.jsx("h3",{className:"text-xl font-semibold leading-tight",children:t.title}),e.jsx("p",{className:"text-sm text-white/70 mt-1",children:t.issuer}),e.jsxs("p",{className:"text-xs text-white/50 mt-1",children:["Issued ",t.date]}),e.jsxs("span",{className:"mt-4 inline-flex items-center gap-2 text-sm text-blue-400",children:["View verification ",e.jsx("span",{children:"↗"})]})]})]},o)})})})]})]})})}export{j as default};
