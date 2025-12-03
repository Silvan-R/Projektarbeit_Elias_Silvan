import teildatensatz from "./Teildatensatz.json";
import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { MainArea } from "./MainArea";

export function App() {
  const [bgColor, setBgColor] = useState("#282c34");
  const [color, setColor] = useState("white");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [darstellung, setDarstellung] = useState("");

  // Zurücksetzen Knopf
  const zurücksetzen = () => {
    setSelectedLocation(""),
      setStartDate(""),
      setEndDate(""),
      setDarstellung("");
  };

  // AUTOMATISCH: Liste aller Standorte bauen

  const standorte = Array.from(
    new Map(
      teildatensatz.map((item) => [item.location_id, item.location_name])
    ).entries()
  ).map(([id, name]) => ({ id, name }));

  return (
    <div className="app">
      <Header
        setBgColor={setBgColor}
        bgColor={bgColor}
        color={color}
        setColor={setColor}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        standorte={standorte}
      />

      <Sidebar
        selectedLocation={selectedLocation}
        standorte={standorte}
        startDate={startDate}
        endDate={endDate}
        darstellung={darstellung}
        setDarstellung={setDarstellung}
      />

      <MainArea />

      <Footer zurücksetzen={zurücksetzen} />
    </div>
  );
}
