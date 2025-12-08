export const Header = ({
  bgColor,
  color,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedLocation,
  setSelectedLocation,
  standorte,
  anwenden,
}) => {
  return (
    <header
      className="header"
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
    >
      WID Projektarbeit
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
            {standorte.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
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
          <button onClick={anwenden}>Anwenden</button>
        </div>
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
