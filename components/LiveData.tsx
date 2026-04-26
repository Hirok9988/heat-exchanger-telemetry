"use client";

import React, { useEffect, useState } from "react";

type SensorData = {
  time: number;
  Th_in: number;
  Th_out: number;
  Tc_in: number;
  Tc_out: number;
  flow: number;
  Q: number;
  gmtd: number;
  h: number;
  ntu: number;
  stability: number;
};

export default function LiveData() {
  const [data, setData] = useState<SensorData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch("https://heat-exchanger-telemetry.onrender.com/data");
        if (!res.ok) throw new Error("API failed");
        
        const jsonData: SensorData = await res.json();
        setData(jsonData);
        setError(false);
      } catch {
        // Handle failure silently to the overall UI layout, gracefully reporting offline
        setError(true);
      }
    };

    fetchData(); // Initial execution
    const interval = setInterval(fetchData, 1000); // 1-second fixed telemetry tick

    return () => clearInterval(interval);
  }, []);

  const noData = data && (data.flow === 0 || data.Q === 0);

  return (
    <section className="px-6 md:px-20 py-12 border-b border-white/10 bg-[#0A0A0C]">
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative mb-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-white">
            Real-Time Sensor Telemetry
          </h2>
          {noData && (
            <p className="absolute -bottom-6 left-0 text-red-500 text-sm mt-2 font-mono">
              No live data (ESP32 not connected)
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <DataCard label="Flow Rate (L/min)" value={data?.flow} unit="L/M" error={error} />
          <DataCard label="Heat Transfer (Q)" value={data?.Q} unit="W" error={error} focus />
          <DataCard 
            label="Hot Cycle Temps" 
            value={data ? `${data.Th_in.toFixed(1)} → ${data.Th_out.toFixed(1)}` : undefined} 
            unit="°C" 
            error={error} 
          />
          <DataCard 
            label="Cold Cycle Temps" 
            value={data ? `${data.Tc_in.toFixed(1)} → ${data.Tc_out.toFixed(1)}` : undefined} 
            unit="°C" 
            error={error} 
          />
        </div>
      </div>
    </section>
  );
}

function DataCard({ label, value, unit, error, focus = false }: { label: string, value: string | number | undefined, unit: string, error: boolean, focus?: boolean }) {
  return (
    <div className={`p-6 rounded-xl border transition-colors ${focus ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/10'}`}>
      <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">{label}</h3>
      {error ? (
        <span className="text-zinc-600 italic text-sm">Offline</span>
      ) : value !== undefined ? (
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-mono ${focus ? 'text-amber-500' : 'text-white'}`}>
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-zinc-500 text-sm">{unit}</span>
        </div>
      ) : (
        <span className="text-zinc-600 text-sm animate-pulse">Waiting...</span>
      )}
    </div>
  );
}
