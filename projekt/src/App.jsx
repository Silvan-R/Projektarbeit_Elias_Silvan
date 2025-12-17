import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { MainArea } from "./MainArea";
//import { useEffect } from "react";

export function App() {
  const [bgColor, setBgColor] = useState("#282c34");
  const [color, setColor] = useState("white");
  const [startDate, setStartDate] = useState("2022-01"); //Standarteinstellung Datum für Fokusfrage
  const [endDate, setEndDate] = useState("2022-12"); //Standarteinstellung Datum für Fokusfrage
  const [selectedLocation, setSelectedLocation] = useState(
    "Bahnhofstrasse (Mitte)"
  ); //Standarteinstellung Datum für Fokusfrage => 329 = ID Mitte
  const [darstellung, setDarstellung] = useState("");
  //const [standorte, setStandorte] = useState([]);
  const [kinderanteil, setKinderanteil] = useState(null);

  /*useEffect(() => {
    fetch("http://localhost:8000/standorte")
      .then((res) => res.json())
      .then((data) => {
        setStandorte(data);
      })
      .catch((err) => console.error("Fehler beim Laden der Standorte:", err));
  }, []); */

  const anwenden = () => {
    const url =
      `http://localhost:8000/fokusfrage` +
      `?location=${encodeURIComponent(selectedLocation)}` +
      `&start_date=${startDate}` +
      `&end_date=${endDate}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setKinderanteil(data);
      })
      .catch((err) => console.error("Fehler beim Laden der Daten:", err));
  };

  // Zurücksetzen Knopf
  const zurücksetzen = () => {
    setSelectedLocation(""),
      setStartDate(""),
      setEndDate(""),
      setDarstellung("");
  };

  // Anwenden-Knopf
  //const anwenden = () => {
  //  console.log("Filter angewendet:");
  // console.log("Standort:", selectedLocation);
  //  console.log("Start:", startDate);
  //  console.log("Ende:", endDate);
  //    console.log("Darstellung:", darstellung);
  //};

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
        //standorte={standorte}
        anwenden={anwenden}
      />
      <Sidebar
        selectedLocation={selectedLocation}
        //standorte={standorte}
        startDate={startDate}
        endDate={endDate}
        darstellung={darstellung}
        setDarstellung={setDarstellung}
      />
      <MainArea darstellung={darstellung} childShareData={kinderanteil} />
      <Footer zurücksetzen={zurücksetzen} />
    </div>
  );
}
