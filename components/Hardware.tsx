const hardwareItems = [
  {
    title: "ESP32 Controller",
    description: "Core processing unit handling real-time data acquisition and telemetry transmission to the local server.",
  },
  {
    title: "Temperature Sensors (4x)",
    description: "High-precision thermistors stationed at inlets and outlets recording continuous differential thermal states.",
  },
  {
    title: "Flow Sensor",
    description: "Hall-effect flow meter measuring precise fluid mass flow rates through the hot/cold cycle loops.",
  },
  {
    title: "Pumps (0.1HP / 0.5HP)",
    description: "Dual mechanical pumps regulating velocity and continuous pressure levels across the testing rig.",
  },
  {
    title: "Plate Heat Exchanger",
    description: "The primary physical vessel where thermal transfer and nanofluid experimentation occur.",
  },
];

export default function Hardware() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex flex-col justify-center items-center">
      <div className="w-full max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-4">
            System Hardware
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-light">
            The physical architecture driving the analytical engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardwareItems.map((item, index) => (
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
