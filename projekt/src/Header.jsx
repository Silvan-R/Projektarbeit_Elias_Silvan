export const Header = ({
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
    <header className="header">
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
            <option value="Bahnhofstrasse (Mitte)">
              Bahnhofstrasse (Mitte)
            </option>
            <option value="Bahnhofstrasse (Nord)">Bahnhofstrasse (Nord)</option>
            <option value="Bahnhofstrasse (Süd)"> Bahnhofstrasse (Süd) </option>
            <option value="Lintheschergasse"> Lintheschergasse </option>
          </select>
        </div>

        {/* Datumsbereich */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <label>Von:</label>
          <input
            type="month"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>Bis:</label>
          <input
            type="month"
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
