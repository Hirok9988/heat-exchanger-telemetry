const metrics = [
  { name: "Heat Transfer (Q)", water: "-- W", nanofluid: "-- W" },
  { name: "Efficiency (ε)", water: "-- %", nanofluid: "-- %" },
  { name: "U Value", water: "-- W/m²K", nanofluid: "-- W/m²K" },
];

export default function Experiment() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex flex-col justify-center items-center">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-12 text-center">
          Experimental Analysis
        </h2>

        <div className="w-full border border-white/10 rounded-xl overflow-hidden bg-white/5">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-black/40 p-6 border-b border-white/10 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-zinc-500">
            <div>Metric</div>
            <div>Water</div>
            <div>Nanofluid</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/5">
            {metrics.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 p-6 text-white/80 hover:bg-white/5 transition-colors duration-300 items-center"
              >
                <div className="font-medium text-white/90">
                  {row.name}
                </div>
                <div className="font-mono text-zinc-400">
                  {row.water}
                </div>
                <div className="font-mono text-amber-500">
                  {row.nanofluid}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
