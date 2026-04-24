import CinematicScrollytelling from "../components/CinematicScrollytelling";
import About from "../components/About";
import IoTSystem from "../components/IoTSystem";
import LiveData from "../components/LiveData";
import Graphs from "../components/Graphs";
import Thermodynamics from "../components/Thermodynamics";
import ThermoAnalysis from "../components/ThermoAnalysis";
import Team from "../components/Team";
import EngineeringTeam from "../components/EngineeringTeam";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white w-full">
      <CinematicScrollytelling />
      <About />
      <Thermodynamics />
      <IoTSystem />
      <LiveData />
      <Graphs />
      <ThermoAnalysis />
      <EngineeringTeam />
      {/* <Team /> */}
      <Footer />
    </main>
  );
}
