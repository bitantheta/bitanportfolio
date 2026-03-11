// ================================
// SYSTEM EXPLORER — PRIMARY PLOT
// ================================

// Grab sliders
const solar = document.getElementById("solar");
const capacity = document.getElementById("capacity");
const stack = document.getElementById("stack");
const cooling = document.getElementById("cooling");

// Display spans
const solarVal = document.getElementById("solarVal");
const capVal = document.getElementById("capVal");
const stackVal = document.getElementById("stackVal");
const coolVal = document.getElementById("coolVal");

// KPI outputs
const h2Out = document.getElementById("h2");
const effOut = document.getElementById("eff");
const lossOut = document.getElementById("loss");
const limiterOut = document.getElementById("limiter");

// -------------------------------
// PHYSICAL MODEL (simple but honest)
// -------------------------------
function physicalEnvelope(x) {
  // Saturating production envelope (physics-inspired)
  return 320 * (1 - Math.exp(-1.4 * (x - 0.4)));
}

function constrainedProduction(x, cap, stackScale, coolingEff) {
  const ideal = physicalEnvelope(x);

  // Capacity constraint
  const capLimit = cap * 24 * 0.045; // MW → kg/day scaling

  // Thermal derating
  const thermalLimit = ideal * Math.min(1, coolingEff);

  return Math.min(ideal, capLimit, thermalLimit);
}

// -------------------------------
// UPDATE FUNCTION
// -------------------------------
function updatePlot() {
  const s = parseFloat(solar.value);
  const cap = parseFloat(capacity.value);
  const stk = parseFloat(stack.value);
  const cool = parseFloat(cooling.value);

  // Update labels
  solarVal.textContent = s.toFixed(2);
  capVal.textContent = cap;
  stackVal.textContent = stk.toFixed(2);
  coolVal.textContent = cool.toFixed(2);

  // Envelope curve
  const xs = [];
  const ys = [];
  for (let x = 0.5; x <= 2.0; x += 0.02) {
    xs.push(x);
    ys.push(physicalEnvelope(x) * stk);
  }

  // Operating point
  const yOp = constrainedProduction(s, cap, stk, cool);

  // Determine limiter
  let limiter = "Physical envelope";
  if (yOp < physicalEnvelope(s) * stk) limiter = "Thermal / capacity constraint";
  if (cool < 0.8) limiter = "Thermal limit";

  // KPIs
  h2Out.textContent = yOp.toFixed(1);
  effOut.textContent = (55 + 30 / (cool * stk)).toFixed(1);
  lossOut.textContent = ((1 - yOp / (physicalEnvelope(s) * stk)) * 100).toFixed(1) + "%";
  limiterOut.textContent = limiter;

  // Plotly traces
  const envelopeTrace = {
    x: xs,
    y: ys,
    mode: "lines",
    name: "Physical production envelope",
    line: {
      color: "#22c55e",
      dash: "dash",
      width: 3
    }
  };

  const operatingPoint = {
    x: [s],
    y: [yOp],
    mode: "markers",
    name: "Operating point",
    marker: {
      color: "#ef4444",
      size: 10
    }
  };

  Plotly.newPlot(
    "plot",
    [envelopeTrace, operatingPoint],
    {
      margin: { t: 30, r: 20, l: 60, b: 50 },
      paper_bgcolor: "white",
      plot_bgcolor: "white",
      xaxis: {
        title: "Solar oversizing ratio",
        range: [0.5, 2.0]
      },
      yaxis: {
        title: "Hydrogen production (kg/day)"
      },
      legend: {
        orientation: "h",
        y: -0.25
      }
    },
    { displayModeBar: false }
  );
}

// -------------------------------
// HOOK SLIDERS
// -------------------------------
[solar, capacity, stack, cooling].forEach((el) =>
  el.addEventListener("input", updatePlot)
);

// Initial render
updatePlot();
