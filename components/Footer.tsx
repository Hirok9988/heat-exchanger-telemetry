export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-zinc-900 bg-[#030303]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-xs font-mono">
        <div>
          <span>&copy; {new Date().getFullYear()} HEAT EXCHANGER TELEMETRY</span>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-6 uppercase tracking-widest">
        </div>
      </div>
    </footer>
  );
}
