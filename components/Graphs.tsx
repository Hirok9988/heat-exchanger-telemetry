import LiveGraphs from "./LiveGraphs";

export default function Graphs() {
  return (
    <section className="relative w-full py-32 px-6 bg-black z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight text-white uppercase">
              Live Telemetry
            </h2>
            <p className="text-zinc-500 font-mono mt-2 text-sm"></p>
          </div>
          <></>
        </div>

        <LiveGraphs />
      </div>
    </section>
  );
}
