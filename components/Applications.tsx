const applications = [
  {
    title: "Waste Heat Recovery",
    description: "Capturing and reusing diffuse thermal energy from industrial exhaust to power secondary processes.",
  },
  {
    title: "Co-generation Systems",
    description: "Integrating simultaneous power and heat generation to maximize total absolute energy yield.",
  },
  {
    title: "Industrial Thermal Optimization",
    description: "Deploying nanofluid-enhanced exchange networks to aggressively shrink the physical footprint of cooling infrastructures.",
  },
];

export default function Applications() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            Scaling To Industry
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light">
            Real-world deployments and macromolecular thermal extraction targets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {applications.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 tracking-wide">
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
