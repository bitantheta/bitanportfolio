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

export function Project01() {
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
          line: { dash: "dash", color: "#22c55e", width: 3 },
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
          marker: { size: 14, color: "#22c55e" },
          name: "Operating point"
        }
      ],
      {
        paper_bgcolor: "white",
        plot_bgcolor: "white",
        font: { color: "black" },
        margin: { t: 20, l: 60, r: 20, b: 60 },
        xaxis: {
          title: { text: "Solar oversizing ratio", standoff: 12 },
          showgrid: false,
          zeroline: false,
          showline: true
        },
        yaxis: {
          title: { text: "Hydrogen production (kg/day)", standoff: 12 },
          showgrid: false,
          zeroline: false,
          showline: true
        },
        legend: {
          orientation: "h",
          y: -0.28,
          x: 0.5,
          xanchor: "center"
        }
      },
      { displayModeBar: false, responsive: true }
    );
  }, [solar, capacity, stack, cooling]);

  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        <p className="font-mono text-xs tracking-widest text-emerald-600 mb-4 uppercase">
          PROJECT 01 
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          Solar-to-Hydrogen System Optimization
        </h2>

        {/* FULL-WIDTH DESCRIPTION */}
        <div className="max-w-6xl bg-gradient-to-r from-emerald-50 to-transparent rounded-2xl p-6 md:p-8 mb-16 border-l-4 border-emerald-500">
          <div className="text-gray-700 space-y-4 text-base md:text-lg leading-relaxed">
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


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* CONTROLS */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:h-[420px] lg:justify-between">
            {[
              ["Solar oversizing", solar, setSolar, 0.5, 2.0, 0.01],
              ["Electrolyzer capacity (MW)", capacity, setCapacity, 5, 30, 1],
              ["Stack scaling", stack, setStack, 0.5, 2.0, 0.05],
              ["Cooling effectiveness", cooling, setCooling, 0.5, 1.5, 0.05]
            ].map(([label, v, set, min, max, step]) => (
              <div key={label}>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>{label}</span>
                  <span className="text-black/60">{v.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={v}
                  onChange={e => set(+e.target.value)}
                  className="w-full accent-green-500"
                />
              </div>
            ))}
          </div>

          {/* PLOT */}
          <div className="lg:col-span-6 h-[320px] md:h-[420px] rounded-xl p-2 md:p-6">
            <div ref={plotRef} className="w-full h-full" />
          </div>

          {/* KPIs */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:h-[420px] lg:justify-between">
            <div>
              <div className="text-xs tracking-widest text-black/50">
                OPTIMIZED RESULT
              </div>
              <div className="text-6xl font-bold mt-2">
                {eff.toFixed(1)}
                <span className="text-2xl ml-2">kWh/kg H₂</span>
              </div>
            </div>

            <div className="text-sm text-black/70">
              Hydrogen output: <strong>{h2.toFixed(2)} kg/day</strong>
            </div>

            <div className="text-sm">
              Limiting constraint:
              <div className="font-semibold text-green-600">
                {regime}
              </div>
            </div>

            <a
              href="https://bitantheta.github.io/renewable-hydrogen-system/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-b border-black/40 hover:border-black"
            >
              Inspect full interactive model ↗
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
