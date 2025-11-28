export const Header = ({
  setBgColor,
  bgColor,
  zoom,
  setZoom,
  setColor,
  color,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <header
      className="header"
      style={{
        backgroundColor: bgColor,
        color: color,
        transform: `scale(${zoom})`,
      }}
    >
      Miniprojekt Toolbar
      <div className="header-controls">
        {/* Standortauswahl */}
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <label htmlFor="standort">Standort:</label>
          <select
            id="standort"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Bitte wählen</option>
            <option value="S1">Standort 1</option>
            <option value="S2">Standort 2</option>
            <option value="S3">Standort 3</option>
          </select>
        </div>

        {/* Datumsbereich */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label>Von:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>Bis:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Farbe ändern */}
        <button
          onClick={() => {
            setBgColor(bgColor === "#282c34" ? "#FFBF00" : "#282c34");
            setColor(color === "white" ? "black" : "white");
          }}
        >
          Farbe ändern
        </button>

        {/* Zoom */}
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
