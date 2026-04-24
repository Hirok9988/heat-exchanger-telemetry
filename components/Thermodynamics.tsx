const formulas = [
  {
    title: "Heat Transfer",
    formula: "Q = ṁ · Cp · ΔT",
    description: "Calculates the total thermal energy transferred between the working fluids.",
  },
  {
    title: "LMTD (Log Mean Temp Difference)",
    formula: "ΔTtrue = F · ΔTlm",
    description: "Determines the true logarithmic temperature difference driving the exchange.",
  },
  {
    title: "Overall Heat Transfer",
    formula: "U = Q / (A · ΔT)",
    description: "Measures the global thermal conductivity and physical efficiency of the unit.",
  },
  {
    title: "Effectiveness (ε-NTU)",
    formula: "ε = Q_actual / Q_max",
    description: "Evaluates the performance relative to the maximum theoretically possible heat transfer.",
  },
];

export default function Thermodynamics() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-16 md:gap-24 items-center md:items-start">
        {/* Left Header */}
        <div className="w-full md:w-1/3">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-6">
            Thermodynamics
          </h2>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            The core physical principles and governing equations driving our live analytical modeling.
          </p>
        </div>

        {/* Right Formula Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {formulas.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-sm font-semibold tracking-widest text-zinc-400 uppercase mb-4">
                {item.title}
              </h3>
              <div className="font-mono text-xl md:text-2xl text-amber-500 mb-6 tracking-tight bg-black/40 py-3 px-4 rounded-lg inline-block w-full border border-amber-500/20 shadow-inner">
                {item.formula}
              </div>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
