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
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">
          {value} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </div>
  );
}

/* ===================== MAIN ===================== */
export function Project03() {
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
          line: { color: "#2563eb", width: 3 }
        },
        {
          x: plotData.Qs,
          y: plotData.Hlim,
          mode: "lines",
          name: "Power constraint",
          line: { color: "#dc2626", dash: "dash" }
        },
        {
          x: [flow_m3h],
          y: [H],
          mode: "markers",
          name: "Operating point",
          marker: { size: 12, color: "black" }
        }
      ],
      {
        autosize: true,
        height: 400,
        margin: { t: 10, r: 10, l: 50, b: 60 },
        xaxis: {
          title: {
            text: "Flow Rate, Q (m³/h)",
            standoff: 12
          },
          showline: true,
          linecolor: "#9ca3af",
          ticks: "outside",
          tickcolor: "#9ca3af",
          gridcolor: "#e5e7eb",
          zeroline: false
        },
        yaxis: {
          title: {
            text: "Head, H (m)",
            standoff: 10
          },
          showline: true,
          linecolor: "#9ca3af",
          ticks: "outside",
          tickcolor: "#9ca3af",
          gridcolor: "#e5e7eb",
          zeroline: false
        },
        legend: {
          orientation: "h",
          y: -0.25,
          x: 0.5,
          xanchor: "center",
          font: { size: 11 }
        },
        plot_bgcolor: "white",
        paper_bgcolor: "white"
      },
      { displayModeBar: false, responsive: true }
    );

    return () => {
      Plotly.purge(plotNode);
    };
  }, [flow_m3h, H, plotData]);

  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-10 border-b border-black/10 pb-8">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <div>
              <p className="font-mono text-xs text-blue-600 mb-2">
                PROJECT 03
              </p>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Constraint-Based Pump & Pipe Design
              </h2>
            </div>

            <a
              href="https://github.com/Glitched404/PipeFlow_Analyzer_and_Pump_Selection_Tool"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 md:px-6 md:py-3 border border-black/20 rounded-full
                         text-sm font-medium hover:bg-black hover:text-white
                         transition-colors shrink-0 w-fit"
            >
              Explore the code ↗
            </a>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-transparent rounded-2xl p-6 md:p-8 border-l-4 border-blue-500">
            <div className="text-gray-700 leading-relaxed space-y-4 text-base md:text-lg">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-8">
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

            <div className="p-6 bg-gray-50 border rounded-2xl">
              <p className="font-medium text-green-600 mb-3">
                Operating Point Assessment
              </p>
              <ul className="text-sm space-y-1">
                <li>Re = {Re.toExponential(2)}</li>
                <li>Head = {H.toFixed(2)} m</li>
                <li>Power = {P.toFixed(1)} kW</li>
                <li>{cavitationOK ? "✓ Cavitation safe" : "✕ Cavitation risk"}</li>
              </ul>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-8 w-full overflow-hidden">
            <div ref={plotRef} className="w-full h-[400px]" />
          </div>

        </div>
      </div>
    </section>
  );
}
