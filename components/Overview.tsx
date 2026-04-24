export default function Overview() {
  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Left Side Text */}
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 uppercase tracking-wide">
            System Objective
          </h2>

          <div className="space-y-6 text-white/60 text-lg md:text-xl font-light leading-relaxed">
            <p>
              A real-time experimental platform designed to analyze and enhance
              heat exchanger efficiency using nanofluids.
            </p>
            <p>
              This system bridges physical thermodynamics with live digital
              monitoring, enabling precise evaluation of energy transfer,
              efficiency, and system behavior.
            </p>
          </div>
        </div>

        {/* Right Side Placeholder */}
        <div className="w-full aspect-[4/3] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />
          <span className="text-white/20 text-sm tracking-widest uppercase font-semibold z-10 relative">
            System Diagram Placeholder
          </span>
        </div>
      </div>
    </section>
  );
}
