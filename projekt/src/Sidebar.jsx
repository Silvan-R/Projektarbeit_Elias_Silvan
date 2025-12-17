export const Sidebar = ({
  selectedLocation,
  startDate,
  endDate,
  darstellung,
  setDarstellung,
}) => {
  return (
    <aside className="sidebar">
      <div style={{ display: "flex", gap: "5px" }}>
        {/* Standort und Zeitfenster auf gleicher Höhe */}
        <div style={{ flex: 1 }}>
          <h3>Standort</h3>
          <p>
            <strong>Aktueller Standort:</strong>
            <br />
            {selectedLocation || "Kein Standort ausgewählt"}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <h3>Zeitfenster</h3>
          <p>
            <strong>Von:</strong> {startDate || "—"}
            <br />
            <strong>Bis:</strong> {endDate || "—"}
          </p>
        </div>
      </div>

      <h3>Auswahl Darstellung</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <label htmlFor="standort">Auswahl:</label>
        <select
          id="standort"
          value={darstellung}
          onChange={(e) => setDarstellung(e.target.value)}
        >
          <option value="">Bitte wählen</option>
          <option value="kinderanteil">Anteil Kinder</option>
          <option value="laufrichtung">Laufrichtung</option>
        </select>
      </div>
    </aside>
  );
};
