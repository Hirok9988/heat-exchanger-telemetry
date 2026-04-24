import React from "react";

export default function EngineeringTeam() {
  const members = [
    { name: "Abhishek Chetia", role: "222310002002" },
    { name: "Akash Jyoti Das", role: "222310002005" },
    { name: "Gauranga Kishor Borah", role: "222310002022" },
    { name: "Idkarul Islam", role: "222310002026" },
    { name: "Kunjal Gogoi", role: "222310002028" },
    { name: "Prayash Bora", role: "222310002035" },
  ];

  return (
    <section className="px-6 md:px-20 py-12 border-b border-white/10 bg-[#050505]">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-white">
          Engineering Team
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-xl p-6 transition-colors hover:bg-white/10"
            >
              <h3 className="text-lg font-bold uppercase tracking-wide text-white mb-2">
                {member.name}
              </h3>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
