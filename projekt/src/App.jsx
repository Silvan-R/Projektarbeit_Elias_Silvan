import { useState } from "react";
import "./App.css";
import { StatelessComponent } from "./StatelessComponent";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { MainArea } from "./MainArea";

export function App() {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("#282c34");
  const [zoom, setZoom] = useState(1);
  const [color, setColor] = useState("white");

  return (
    <div className="app">
      <Header
        setBgColor={setBgColor}
        bgColor={bgColor}
        zoom={zoom}
        setZoom={setZoom}
        color={color}
        setColor={setColor}
      />
      <Sidebar setCount={setCount} count={count} />
      <MainArea count={count} />
      <Footer setCount={setCount} />
    </div>
  );
}
