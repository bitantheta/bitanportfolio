import { useEffect, useMemo, useRef, useState } from "react";
import Plotly from "plotly.js-basic-dist-min";

/* ===================== CONSTANTS ===================== */
const g = 9.81;
const rho = 998;
const mu = 1.002e-3;
const D = 0.15;
const L = 100;
const eps = 0.046e-3;
const etaPump = 0.71;
const NPSH_available = 6;

/* ===================== PHYSICS ===================== */
function reynolds(Q) {
  const A = Math.PI * D * D / 4;
  return (rho * Q * D) / (A * mu);
}

function frictionFactor(Re) {
  if (Re < 2300) return 64 / Re;
  let f = 0.02;
  for (let i = 0; i < 20; i++) {
    f =
      1 /
      Math.pow(
        -2 *
          Math.log10(
            eps / (3.7 * D) + 2.51 / (Re * Math.sqrt(f))
          ),
        2
      );
  }
  return f;
}

function headLoss(Q) {
  const A = Math.PI * D * D / 4;
  const V = Q / A;
  const Re = reynolds(Q);
  const f = frictionFactor(Re);
  return f * (L / D) * (V * V) / (2 * g);
}

function shaftPower(Q, H) {
  return (rho * g * Q * H) / etaPump / 1000;
}

/* ===================== SLIDER ===================== */
function Slider({ label, unit, min, max, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200 text-xs md:text-sm">{label}</span>
        <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-500 bg-slate-200 dark:bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

/* ===================== MAIN ===================== */
export function Project03({ isDark = true }) {
  const plotRef = useRef(null);
  const [flow_m3h, setFlow] = useState(245);
  const [powerLimit, setPowerLimit] = useState(25);
  const [safety, setSafety] = useState(60);

  const Q = flow_m3h / 3600;
  const H = headLoss(Q);
  const P = shaftPower(Q, H);
  const Re = reynolds(Q);
  const cavitationOK = NPSH_available > (safety / 100) * 4;

  /* ===== Generate curves ===== */
  const plotData = useMemo(() => {
    const Qs = [];
    const Hsys = [];
    const Hlim = [];

    for (let q = 0.04; q <= 0.09; q += 0.002) {
      Qs.push(q * 3600);
      Hsys.push(headLoss(q));
      Hlim.push((powerLimit * 1000 * etaPump) / (rho * g * q));
    }

    return { Qs, Hsys, Hlim };
  }, [powerLimit]);

  useEffect(() => {
    const node = plotRef.current;
    return () => {
      if (node) {
        Plotly.purge(node);
      }
    };
  }, []);

  useEffect(() => {
    const plotNode = plotRef.current;
    if (!plotNode) return;

    Plotly.react(
      plotNode,
      [
        {
          x: plotData.Qs,
          y: plotData.Hsys,
          mode: "lines",
          name: "System head curve",
          line: { color: "#06b6d4", width: 3 }
        },
        {
          x: plotData.Qs,
          y: plotData.Hlim,
          mode: "lines",
          name: "Power constraint",
          line: { color: "#f43f5e", dash: "dash", width: 2 }
        },
        {
          x: [flow_m3h],
          y: [H],
          mode: "markers",
          name: "Operating point",
          marker: { size: 13, color: isDark ? "#ffffff" : "#0284c7", line: { color: "#06b6d4", width: 2 } }
        }
      ],
      {
        autosize: true,
        height: 400,
        margin: { t: 10, r: 10, l: 50, b: 60 },
        xaxis: {
          title: {
            text: "Flow Rate, Q (m³/h)",
            standoff: 12,
            font: { color: isDark ? "#94a3b8" : "#475569", size: 12 }
          },
          showline: true,
          linecolor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
          ticks: "outside",
          tickcolor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
          gridcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
          tickfont: { color: isDark ? "#94a3b8" : "#475569" },
          zeroline: false
        },
        yaxis: {
          title: {
            text: "Head, H (m)",
            standoff: 10,
            font: { color: isDark ? "#94a3b8" : "#475569", size: 12 }
          },
          showline: true,
          linecolor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
          ticks: "outside",
          tickcolor: isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
          gridcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)",
          tickfont: { color: isDark ? "#94a3b8" : "#475569" },
          zeroline: false
        },
        legend: {
          orientation: "h",
          y: -0.25,
          x: 0.5,
          xanchor: "center",
          font: { color: isDark ? "#cbd5e1" : "#334155", size: 11 }
        },
        plot_bgcolor: "transparent",
        paper_bgcolor: "transparent"
      },
      { displayModeBar: false, responsive: true }
    );
  }, [flow_m3h, H, plotData, isDark]);

  return (
    <section className="py-20 md:py-28 bg-[#f8fafc] dark:bg-[#0b1020] text-slate-900 dark:text-slate-50 border-t border-slate-200 dark:border-[#202b42] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

        {/* ================= HEADER ================= */}
        <div className="mb-12 border-b border-slate-200 dark:border-[#26324A] pb-8">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <div>
              <p className="font-mono text-xs text-cyan-600 dark:text-cyan-400 mb-2 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                PROJECT 03
              </p>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Constraint-Based Pump & Pipe Design
              </h2>
            </div>

            <a
              href="https://github.com/Glitched404/PipeFlow_Analyzer_and_Pump_Selection_Tool"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 md:px-6 md:py-3 border border-slate-300 dark:border-[#334155] rounded-full
                         text-sm font-medium hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black
                         transition-colors shrink-0 w-fit text-slate-800 dark:text-slate-50"
            >
              Explore the code ↗
            </a>
          </div>

          <div className="bg-white dark:bg-[#151b2e] border border-slate-200 dark:border-[#26324A] rounded-2xl p-6 md:p-8 border-l-4 border-l-cyan-500 shadow-sm dark:shadow-none backdrop-blur-sm">
            <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 text-base md:text-lg font-light">
              <p>
                This project explores pump and pipe system behavior by treating
                flow rate, shaft power, and cavitation margin as governing
                constraints rather than fixed outcomes.
              </p>

              <p>
                For a given pipe geometry and roughness, the model evaluates
                friction losses using Darcy–Weisbach with Colebrook–White
                friction, constructs the system head curve, and compares it
                against pump power limits to determine feasible operating points.
              </p>

              <p>
                The resulting visualization highlights how hydraulic losses,
                power availability, and safety margins interact to limit system
                performance, making design trade-offs explicit rather than implicit.
              </p>
            </div>
          </div>
        </div>

        {/* ===================== LAYOUT ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* LEFT */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-[#151b2e] border border-slate-200 dark:border-[#26324A] rounded-2xl p-5 md:p-6 shadow-sm dark:shadow-none backdrop-blur-sm space-y-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">Scenario Presets</p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => { setFlow(245); setPowerLimit(25); setSafety(60); }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-[#26324A] transition cursor-pointer"
                  >
                    Nominal Design
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFlow(310); setPowerLimit(38); setSafety(35); }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 border border-slate-200 dark:border-[#26324A] transition cursor-pointer"
                  >
                    High Demand Flow
                  </button>
                  <button
                    type="button"
                    onClick={() => { setFlow(290); setPowerLimit(20); setSafety(85); }}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-rose-500/20 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 border border-slate-200 dark:border-[#26324A] transition cursor-pointer"
                  >
                    Cavitation Warning
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <Slider
                  label="Target Flow Rate"
                  unit="m³/h"
                  min={180}
                  max={320}
                  value={flow_m3h}
                  onChange={setFlow}
                />
                <Slider
                  label="Maximum Shaft Power"
                  unit="kW"
                  min={10}
                  max={40}
                  value={powerLimit}
                  onChange={setPowerLimit}
                />
                <Slider
                  label="Cavitation Safety Margin"
                  unit="%"
                  min={0}
                  max={100}
                  value={safety}
                  onChange={setSafety}
                />
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-[#151b2e] border border-slate-200 dark:border-[#26324A] rounded-2xl shadow-sm dark:shadow-none backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center justify-between">
                <span>Operating Point Assessment</span>
                <span className={`w-2 h-2 rounded-full ${cavitationOK ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-[#202b42]">
                  <span className="text-slate-500 dark:text-slate-400 text-xs block">Reynolds Number</span>
                  <span className="font-mono text-slate-900 dark:text-slate-50 text-sm font-semibold">{Re.toExponential(2)}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-[#202b42]">
                  <span className="text-slate-500 dark:text-slate-400 text-xs block">System Head</span>
                  <span className="font-mono text-slate-900 dark:text-slate-50 text-sm font-semibold">{H.toFixed(2)} m</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-[#202b42]">
                  <span className="text-slate-500 dark:text-slate-400 text-xs block">Shaft Power</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 text-sm font-semibold">{P.toFixed(1)} kW</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-[#202b42]">
                  <span className="text-slate-500 dark:text-slate-400 text-xs block">Cavitation Status</span>
                  <span className={`font-mono text-xs font-semibold ${cavitationOK ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
                    {cavitationOK ? "✓ Safe Margin" : "✕ Risk Alert"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 w-full rounded-2xl p-2 md:p-4 bg-white dark:bg-[#151b2e] border border-slate-200 dark:border-[#26324A] shadow-sm dark:shadow-none backdrop-blur-sm overflow-hidden">
            <div ref={plotRef} className="w-full h-[400px]" />
          </div>

        </div>
      </div>
    </section>
  );
}
