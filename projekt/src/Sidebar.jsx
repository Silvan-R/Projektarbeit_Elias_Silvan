export const Sidebar = ({
  selectedLocation,
  startDate,
  endDate,
  selectedMonth,
  kinderanteil,
}) => {
  // Noch kein Monat ausgewählt oder keine Daten
  if (!selectedMonth || !kinderanteil) {
    return (
      <aside className="sidebar">
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <h3>Standort</h3>
            <p>
              <strong>Aktueller Standort:</strong>
              <br />
              {selectedLocation}
            </p>
          </div>

          <div style={{ flex: 1 }}>
            <h3>Zeitfenster</h3>
            <p>
              <strong>Von:</strong> {startDate}
              <br />
              <strong>Bis:</strong> {endDate}
            </p>
          </div>
        </div>

        <hr />

        <p style={{ opacity: 0.7 }}>Bitte einen Monat im Diagramm auswählen</p>
      </aside>
    );
  }

  // Daten zum ausgewählten Monat finden
  const daten = kinderanteil.Werte.find((d) => d.month === selectedMonth);

  if (!daten) return null;

  return (
    <aside className="sidebar">
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <h3>Standort</h3>
          <p>
            <strong>Aktueller Standort:</strong>
            <br />
            {selectedLocation}
          </p>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Zeitfenster</h3>
          <p>
            <strong>Von:</strong> {startDate}
            <br />
            <strong>Bis:</strong> {endDate}
          </p>
        </div>
      </div>

      <hr />

      <h3>Ausgewählter Monat: {daten.month}</h3>

      <p>
        <strong>Kinderanteil:</strong> {daten.kinderanteil_prozent} %
      </p>
      <p>
        <strong>Kinder:</strong> {daten.children}
      </p>
      <p>
        <strong>Erwachsene:</strong> {daten.adults}
      </p>
      <p>
        <strong>Total Personen:</strong> {daten.total_personen}
      </p>
      <p>
        <strong>Wetter:</strong> {daten.weather_condition}
      </p>
    </aside>
  );
};
