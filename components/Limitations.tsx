const limitations = [
  {
    title: "Viscosity Increase",
    description: "Nanoparticle clustering leads to exponential viscosity spikes, impeding fluid dynamics.",
  },
  {
    title: "Pump Load",
    description: "Higher fluid resistance heavily accelerates mechanical wear on circulating pumps.",
  },
  {
    title: "Fouling Risk",
    description: "Sedimentation and particle deposition create thermal barriers within the tube walls.",
  },
  {
    title: "Flow Maldistribution",
    description: "Uneven fluid dispersal limits overall structural thermodynamic efficiency.",
  },
  {
    title: "Sensor Errors",
    description: "Abrasive interactions and micro-build-up skew long-term telemetry precision.",
  },
];

export default function Limitations() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            System Limitations
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light">
            Identified physical constraints within the current experimental parameters.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {limitations.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
