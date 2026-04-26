"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type ThermoPoint = {
  time: number;
  stability: number;
  h: number;
  ntu: number;
  gmtd: number;
};

export default function ThermoAnalysis() {
  const [dataHistory, setDataHistory] = useState<ThermoPoint[]>([]);

  useEffect(() => {

    const fetchGraphData = async () => {
      try {
        const res = await fetch("https://YOUR_REAL_BACKEND_URL/data");
        if (!res.ok) return;
        
        const jsonData = await res.json();
        
        setDataHistory((prev) => {
          const newData = [...prev, { 
            time: jsonData.time, 
            stability: jsonData.stability, 
            h: jsonData.h,
            ntu: jsonData.ntu,
            gmtd: jsonData.gmtd
          }];
          
          if (newData.length > 50) return newData.slice(-50);
          return newData;
        });
      } catch {
        // Silently catch server unavailability
      }
    };

    fetchGraphData();
    const interval = setInterval(fetchGraphData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 md:px-20 py-12 border-b border-white/10 bg-[#0A0A0C]">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8 text-white">
          Advanced Thermodynamic Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Transient Stability Profile */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">
              Transient Stability Profile
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} stroke="#666" tick={{fill: '#666', fontSize: 12}} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0C', border: '1px solid #333' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stability" 
                    stroke="#ef4444" // red-500
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 2: Heat Transfer Coefficient (h) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">
              Heat Transfer Coefficient (h)
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} stroke="#666" tick={{fill: '#666', fontSize: 12}} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0C', border: '1px solid #333' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="h" 
                    stroke="#10b981" // emerald-500
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 3: NTU Curve */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">
              NTU Curve
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} stroke="#666" tick={{fill: '#666', fontSize: 12}} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0C', border: '1px solid #333' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ntu" 
                    stroke="#8b5cf6" // violet-500
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 4: GMTD Verification */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">
              GMTD Verification
            </h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} stroke="#666" tick={{fill: '#666', fontSize: 12}} width={40} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0C', border: '1px solid #333' }}
                    itemStyle={{ color: '#fff' }}
                    labelStyle={{ display: 'none' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gmtd" 
                    stroke="#0ea5e9" // sky-500
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
