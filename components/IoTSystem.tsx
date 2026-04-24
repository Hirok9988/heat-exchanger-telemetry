import { Cpu, Activity, Thermometer, Database } from "lucide-react";

export default function IoTSystem() {
  const components = [
    {
      icon: <Thermometer className="w-6 h-6 text-zinc-300" />,
      title: "DS18B20 Sensors",
      desc: "Waterproof digital temperature sensors placed at the inlet and outlet interfaces. Required for high-precision thermal delta measurement across the exchanger unit.",
    },
    {
      icon: <Activity className="w-6 h-6 text-zinc-300" />,
      title: "Hall-Effect Flow Meters",
      desc: "In-line turbine flow sensors capturing mass flow rates of the hot and cold working fluids. Critical for determining the overall heat transfer capacity (Q).",
    },
    {
      icon: <Cpu className="w-6 h-6 text-zinc-300" />,
      title: "ESP32 Microcontroller",
      desc: "The system's central nervous system. Aggregates data via OneWire & hardware interrupts, performs local filtering, and dispatches payloads over WebSockets.",
    },
    {
      icon: <Database className="w-6 h-6 text-zinc-300" />,
      title: "Next.js Edge Dashboard",
      desc: "Client-side aggregation and visualization engine. Runs real-time evaluation of thermal parameters using hardware data to display instantaneous efficiency.",
    },
  ];

  return (
    <section className="relative w-full py-32 px-6 bg-[#030303] z-10 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="w-full flex flex-col items-center mb-24 text-center">
          <p className="text-zinc-600 tracking-[0.2em] text-xs font-semibold uppercase mb-4 border border-zinc-800 px-4 py-1 rounded-full">
            Hardware Stack
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-zinc-100 uppercase">
            Telemetry Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800/40 p-px rounded-sm shadow-2xl">
          {components.map((comp, idx) => (
            <div key={idx} className="bg-[#050505] p-10 flex flex-col hover:bg-[length:200%_200%] hover:bg-gradient-to-br from-zinc-900 via-transparent to-transparent transition-all duration-700">
              <div className="p-3 bg-zinc-900 inline-flex rounded-sm self-start mb-6 border border-zinc-800/80">
                {comp.icon}
              </div>
              <h3 className="font-sans text-xl font-medium text-zinc-200 mb-3 hover:text-white transition-colors">
                {comp.title}
              </h3>
              <p className="text-zinc-500 font-light leading-relaxed text-sm">
                {comp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
