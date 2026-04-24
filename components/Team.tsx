export default function Team() {
  const members = [
    { name: "[ Student Name ]", role: "Project Lead / Mechanical" },
    { name: "[ Student Name ]", role: "IoT & Systems Engineer" },
    { name: "[ Student Name ]", role: "Data Analysis & Thermodynamics" },
    { name: "[ Student Name ]", role: "Hardware Interface Integration" },
  ];

  return (
    <section className="relative w-full py-32 px-6 bg-zinc-950 z-10 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white uppercase mb-4">
            Engineering Team
          </h2>
          <p className="text-zinc-500 font-light max-w-2xl mx-auto">
            The personnel responsible for system architecture, mathematical modeling, and final implementation mapping.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {members.map((member, idx) => (
            <div key={idx} className="p-8 border border-zinc-800 bg-[#050505] flex flex-col items-center text-center group hover:border-zinc-700 transition-colors">
              <div className="w-20 h-20 bg-zinc-900 rounded-full mb-6 border border-zinc-800/50 flex items-center justify-center">
                <span className="text-zinc-700 font-mono text-xs">IMG</span>
              </div>
              <h3 className="text-zinc-200 font-medium mb-2">{member.name}</h3>
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
