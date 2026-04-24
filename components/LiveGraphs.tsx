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

type GraphPoint = {
  time: number;
  Q: number;
  flow: number;
};

export default function LiveGraphs() {
  const [dataHistory, setDataHistory] = useState<GraphPoint[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchGraphData = async () => {
      try {
        const res = await fetch("http://localhost:5000/data");
        if (!res.ok) return;
        
        const jsonData = await res.json();
        
        setDataHistory((prev) => {
          const newData = [...prev, { time: jsonData.time, Q: jsonData.Q, flow: jsonData.flow }];
          
          // STRICT RULE: Maintain memory-safe rolling window of exactly 50 points
          if (newData.length > 50) return newData.slice(-50);
          return newData;
        });
      } catch (err) {
        // Silently catch server unavailability
      }
    };

    fetchGraphData();
    interval = setInterval(fetchGraphData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-6 md:px-20 py-12 border-b border-white/10 bg-[#050505]">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Graph 1: Heat Transfer Q */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">
            Heat Transfer (Q) vs Time
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
                  dataKey="Q" 
                  stroke="#f59e0b" // amber-500
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false} // Disable recharts heavy CSS transitions to prevent flooding delays
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Graph 2: Flow Rate */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-6">
            Flow Rate vs Time
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
                  dataKey="flow" 
                  stroke="#3b82f6" // blue-500
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
