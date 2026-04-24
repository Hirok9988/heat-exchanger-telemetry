export default function LiveAnalytics() {
  const placeholders = Array.from({ length: 6 });

  return (
    <section className="min-h-screen px-6 md:px-20 py-24 border-b border-white/10 flex flex-col justify-center items-center">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wide mb-12 text-center md:text-left">
          Live System Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />
              <span className="text-white/30 text-sm tracking-widest uppercase font-semibold z-10">
                Graph Placeholder
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
