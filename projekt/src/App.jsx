import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { MainArea } from "./MainArea";

export function App() {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("#282c34");
  const [zoom, setZoom] = useState(1);
  const [color, setColor] = useState("white");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Standort
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <div className="app">
      <Header
        setBgColor={setBgColor}
        bgColor={bgColor}
        zoom={zoom}
        setZoom={setZoom}
        color={color}
        setColor={setColor}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <Sidebar
        setCount={setCount}
        count={count}
        selectedLocation={selectedLocation}
      />

      <MainArea count={count} />

      <Footer setCount={setCount} />
    </div>
  );
}
