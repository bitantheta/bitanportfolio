import Plotly from "plotly.js-basic-dist-min";
import { useEffect, useRef, useState } from "react";

const ENVELOPE = [
  { oversize: 0.5, h2: 1.41, kwh: 54.08 },
  { oversize: 0.8, h2: 2.06, kwh: 59.22 },
  { oversize: 1.0, h2: 2.45, kwh: 62.16 },
  { oversize: 1.2, h2: 2.68, kwh: 63.45 },
  { oversize: 1.5, h2: 2.87, kwh: 64.32 },
  { oversize: 2.0, h2: 3.04, kwh: 64.99 }
];

export function Project01({ isDark = true }) {
  const plotRef = useRef(null);

  const [solar, setSolar] = useState(1.0);
  const [capacity, setCapacity] = useState(10);
  const [stack, setStack] = useState(1.0);
  const [cooling, setCooling] = useState(1.0);

  const REF_CAP = 10;

  function interp(x) {
    for (let i = 0; i < ENVELOPE.length - 1; i++) {
      const a = ENVELOPE[i];
      const b = ENVELOPE[i + 1];
      if (x >= a.oversize && x <= b.oversize) {
        const w = (x - a.oversize) / (b.oversize - a.oversize);
        return {
          h2: a.h2 + w * (b.h2 - a.h2),
          kwh: a.kwh + w * (b.kwh - a.kwh)
        };
      }
    }
    return ENVELOPE.at(-1);
  }

  const env = interp(solar);
  const thermalFactor = Math.min(1, cooling);
  const stackFactor = Math.min(1, 1 / stack);
  const feasible = thermalFactor * stackFactor;

  const h2Solar = env.h2 * feasible;
  const h2Cap = env.h2 * (capacity / REF_CAP);
  const h2 = Math.min(h2Solar, h2Cap);

  let regime = "Renewable availability";
  if (h2Cap < h2Solar) regime = "Electrolyzer capacity";
  if (feasible < 0.98) regime = "Thermal constraint";

  const utilization = h2 / env.h2;
  const eff = env.kwh / Math.max(utilization, 0.4);

  useEffect(() => {
    if (!plotRef.current) return;

    Plotly.react(
      plotRef.current,
      [
        {
          x: ENVELOPE.map(d => d.oversize),
          y: ENVELOPE.map(d => d.h2),
          mode: "lines",
          line: { dash: "dash", color: "#10b981", width: 3 },
          name: "Physical envelope"
        },
        {
          x: [0.5, 2.0],
          y: [h2Cap, h2Cap],
          mode: "lines",
          line: { dash: "dot", color: "#f97316", width: 2 },
          name: "Capacity limit"
        },
        {
          x: [solar],
          y: [h2],
          mode: "markers",
          marker: { size: 14, color: "#10b981" },
          name: "Operating point"
        }
      ],
      {
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: { color: isDark ? "#94a3b8" : "#475569", family: "inherit" },
        margin: { t: 20, l: 60, r: 20, b: 60 },
        xaxis: {
          title: { text: "Solar oversizing ratio", standoff: 12, font: { color: isDark ? "#94a3b8" : "#475569", size: 12 } },
          showgrid: true,
          gridcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
          zeroline: false,
          showline: true,
          linecolor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
          tickfont: { color: isDark ? "#94a3b8" : "#475569" }
        },
        yaxis: {
          title: { text: "Hydrogen production (kg/day)", standoff: 12, font: { color: isDark ? "#94a3b8" : "#475569", size: 12 } },
          showgrid: true,
          gridcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
          zeroline: false,
          showline: true,
          linecolor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
          tickfont: { color: isDark ? "#94a3b8" : "#475569" }
        },
        legend: {
          orientation: "h",
          y: -0.28,
          x: 0.5,
          xanchor: "center",
          font: { color: isDark ? "#cbd5e1" : "#454545", size: 11 }
        }
      },
      { displayModeBar: false, responsive: true }
    );
  }, [solar, capacity, stack, cooling, h2, h2Cap, isDark]);

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] dark:bg-[#080808] text-slate-900 dark:text-slate-50 border-t border-slate-200 dark:border-[#242424] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

        <p className="font-mono text-xs tracking-widest text-emerald-600 dark:text-emerald-400 mb-3 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          PROJECT 01
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-slate-50">
          Solar-to-Hydrogen System Optimization
        </h2>

        {/* FULL-WIDTH DESCRIPTION */}
        <div className="max-w-6xl bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 md:p-8 mb-14 border-l-4 border-l-emerald-500 shadow-sm dark:shadow-none backdrop-blur-sm">
          <div className="text-slate-600 dark:text-slate-300 space-y-4 text-base md:text-lg leading-relaxed font-light">
            <p>
              This project models and optimizes a solar-powered PEM electrolyzer system by
              coupling electrochemical performance, thermal behavior, and renewable energy
              availability into a single physically constrained framework.
            </p>

            <p>
              Instead of assuming fixed efficiencies, the model computes hydrogen production
              directly from Faraday's law, voltage losses, stack scaling, and
              temperature-dependent resistance, while enforcing hard limits imposed by
              electrolyzer capacity and intermittent solar power.
            </p>

            <p>
              An interactive interface shown below allows exploration of how solar oversizing,
              electrolyzer capacity, stack scaling, and cooling effectiveness influence
              hydrogen output and specific energy consumption.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* CONTROLS */}
          <div className="lg:col-span-3 flex flex-col gap-5 lg:h-[420px] lg:justify-between bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#303030] rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-none backdrop-blur-sm">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">Scenario Presets</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <button
                  type="button"
                  onClick={() => { setSolar(1.0); setCapacity(10); setStack(1.0); setCooling(1.0); }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-emerald-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 border border-slate-200 dark:border-[#303030] transition cursor-pointer"
                >
                  Baseline
                </button>
                <button
                  type="button"
                  onClick={() => { setSolar(1.8); setCapacity(25); setStack(1.2); setCooling(1.2); }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-emerald-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-300 border border-slate-200 dark:border-[#303030] transition cursor-pointer"
                >
                  Solar Peak
                </button>
                <button
                  type="button"
                  onClick={() => { setSolar(1.5); setCapacity(8); setStack(1.5); setCooling(0.6); }}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 border border-slate-200 dark:border-[#303030] transition cursor-pointer"
                >
                  Thermal Limit
                </button>
              </div>
            </div>

            {[
              ["Solar oversizing", solar, setSolar, 0.5, 2.0, 0.01],
              ["Electrolyzer capacity (MW)", capacity, setCapacity, 5, 30, 1],
              ["Stack scaling", stack, setStack, 0.5, 2.0, 0.05],
              ["Cooling effectiveness", cooling, setCooling, 0.5, 1.5, 0.05]
            ].map(([label, v, set, min, max, step]) => (
              <div key={label}>
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <span className="text-slate-700 dark:text-slate-300 text-xs md:text-sm">{label}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-xs">{v.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  aria-label={label}
                  min={min}
                  max={max}
                  step={step}
                  value={v}
                  onChange={e => set(+e.target.value)}
                  className="w-full accent-emerald-500 bg-slate-200 dark:bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* PLOT */}
          <div className="lg:col-span-6 h-[340px] md:h-[420px] rounded-2xl p-2 md:p-4 bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#303030] shadow-sm dark:shadow-none backdrop-blur-sm">
            <div ref={plotRef} className="w-full h-full" />
          </div>

          {/* KPIs */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:h-[420px] lg:justify-between bg-white dark:bg-[#151515] border border-slate-200 dark:border-[#303030] rounded-2xl p-6 shadow-sm dark:shadow-none backdrop-blur-sm">
            <div>
              <div className="text-xs font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                Optimized Result
              </div>
              <div className="text-5xl md:text-6xl font-bold mt-3 text-slate-900 dark:text-slate-50 tracking-tight">
                {eff.toFixed(1)}
                <span className="text-xl md:text-2xl ml-2 font-normal text-emerald-600 dark:text-emerald-400">kWh/kg H₂</span>
              </div>
            </div>

            <div className="text-sm text-slate-600 dark:text-slate-300">
              Hydrogen output: <strong className="text-slate-900 dark:text-slate-50 font-mono">{h2.toFixed(2)} kg/day</strong>
            </div>

            <div className="text-sm">
              <span className="text-slate-500 dark:text-slate-400">Limiting constraint:</span>
              <div className="font-semibold text-emerald-600 dark:text-emerald-400 text-base mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                {regime}
              </div>
            </div>

            <a
              href="https://bitantheta.github.io/renewable-hydrogen-system/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition group border-b border-emerald-500/30 hover:border-emerald-500 pb-0.5 w-fit"
            >
              <span>Inspect full interactive model</span>
              <span className="group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
