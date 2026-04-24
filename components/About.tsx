export default function About() {
  return (
    <section className="relative w-full py-32 px-6 bg-gradient-to-b from-zinc-950 to-black z-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="w-full mb-16 flex flex-col items-start border-l-2 border-zinc-700 pl-6 space-y-4">
          <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-zinc-100 uppercase">
            System Objective
          </h2>
          <p className="text-zinc-500 tracking-[0.1em] text-sm font-semibold uppercase">
            Protocol 01 / Context & Overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
            <p>
              The primary objective of this engineering project is to construct, monitor, and analyze a high-efficiency shell-and-tube heat exchanger. By integrating a sophisticated IoT telemetry array, we bridge the gap between physical thermodynamics and real-time digital intelligence.
            </p>
            <p>
              Traditional heat exchangers operate as black boxes. Our system fundamentally changes this paradigm by constantly sampling inlet and outlet temperatures alongside fluid mass flow rates, translating raw analog signals into deterministic operational insights.
            </p>
          </div>
          <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-sm backdrop-blur-md relative overflow-hidden group hover:border-zinc-700 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-700/10 blur-[50px] -z-10 group-hover:bg-zinc-600/20 transition-all duration-700" />
            <h3 className="text-zinc-200 text-xl font-medium mb-4 uppercase tracking-widest font-display">Core Competencies</h3>
            <ul className="space-y-4">
              {[
                { label: "Data Acq", value: "High-frequency precision sampling" },
                { label: "Telemetry", value: "ESP32-driven architecture" },
                { label: "Analysis", value: "Live NTU & LMTD Computation" },
                { label: "Design", value: "Industrial-grade hardware interface" },
              ].map((item, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm border-b border-zinc-800/50 pb-2">
                  <span className="text-zinc-500 uppercase tracking-wider text-xs font-semibold">{item.label}</span>
                  <span className="text-zinc-300">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
