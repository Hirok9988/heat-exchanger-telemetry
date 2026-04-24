export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black/40">
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950/80 to-zinc-950/90 z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-700/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-[120px] z-0" />
      
      <div className="z-10 text-center max-w-5xl px-6 flex flex-col items-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] uppercase border border-zinc-700/50 rounded-full text-zinc-400 bg-zinc-900/40 backdrop-blur-sm">
          System Initialization Active
        </div>
        
        <p className="text-xs tracking-widest text-white/40 uppercase mb-4">
          REAL-TIME THERMODYNAMIC ANALYSIS PLATFORM
        </p>
        
        <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-600 mb-6 drop-shadow-sm leading-[0.9]">
          Thermal
          <br />
          <span className="text-zinc-500/80 bg-none drop-shadow-none relative">
            Dynamics
            {/* Outline text effect overlay */}
            <span className="absolute inset-0 text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.8)] filter opacity-40">
              Dynamics
            </span>
          </span>
        </h1>
        
        <p className="mt-12 text-lg sm:text-xl text-zinc-400 max-w-2xl font-light tracking-wide leading-relaxed">
          Advanced monitoring and analytical evaluation of shell and tube heat exchanger performance through real-time telemetry.
        </p>
      </div>

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
      <div className="absolute left-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-800/30 to-transparent hidden md:block" />
      <div className="absolute right-10 top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-800/30 to-transparent hidden md:block" />
    </section>
  );
}
