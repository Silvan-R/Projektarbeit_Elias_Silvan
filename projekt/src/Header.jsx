export const Header = ({
  setBgColor,
  bgColor,
  zoom,
  setZoom,
  setColor,
  color,
}) => {
  return (
    <header
      style={{
        backgroundColor: bgColor,
        minHeight: "7vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        color: color,
        transform: `scale(${zoom})`,
        transformOrigin: "center",
        transition: "transform 0.2s ease",
      }}
    >
      Miniprojekt Toolbar
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => {
            setBgColor(bgColor === "#282c34" ? "#FFBF00" : "#282c34");
            setColor(color === "white" ? "black" : "white");
          }}
        >
          Farbe ändern
        </button>

        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
      </div>
      <img
        src="https://www.fhnw.ch/plattformen/soziale-arbeit-geschichte/wp-content/uploads/sites/266/fhnw-social-media-sharing-gelb-1920x1440-c-default.webp"
        alt="Logo"
        width="50"
        style={{ height: "auto" }}
      />
    </header>
  );
};
