import { useState } from "react";
import "./App.css";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { MainArea } from "./MainArea";
import { useEffect } from "react";

export function App() {
  const [startDate, setStartDate] = useState("2022-01");
  const [endDate, setEndDate] = useState("2023-01");
  const [selectedLocation, setSelectedLocation] = useState(
    "Bahnhofstrasse (Mitte)"
  );

  // angwendete Filter (für Text und Visalisierung):
  const [angewendetesStartDate, setAngewendetesStartDate] = useState(startDate);
  const [angewendetesEndDate, setAngewendetesEndDate] = useState(endDate);
  const [angewendeterLocation, setAngewendeterLocation] =
    useState(selectedLocation);
  //Standarteinstellung Standort für Fokusfrage
  const [kinderanteil, setKinderanteil] = useState(null);
  const [reset, setReset] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(null); //ineraktives Grafik

  const anwenden = () => {
    setAngewendetesStartDate(startDate);
    setAngewendetesEndDate(endDate);
    setAngewendeterLocation(selectedLocation);

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
  useEffect(() => {
    anwenden();
  }, []);

  useEffect(() => {
    //reagiert auf Reset (damit zurücksetzen knopf nur einmal gedrückt werden muss)
    anwenden();
  }, [reset]);

  const zurücksetzen = () => {
    setSelectedLocation("Bahnhofstrasse (Mitte)");
    setStartDate("2022-01");
    setEndDate("2023-01");

    setReset((wert) => wert + 1);
  };

  return (
    <div className="app">
      <Header
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        anwenden={anwenden}
      />
      <Sidebar
        selectedLocation={selectedLocation}
        startDate={startDate}
        endDate={endDate}
        selectedMonth={selectedMonth}
        kinderanteil={kinderanteil}
      />
      <MainArea
        kinderanteil={kinderanteil}
        startDate={angewendetesStartDate}
        endDate={angewendetesEndDate}
        selectedLocation={angewendeterLocation}
        setSelectedMonth={setSelectedMonth}
        selectedMonth={selectedMonth}
      />
      <Footer zurücksetzen={zurücksetzen} />
    </div>
  );
}
