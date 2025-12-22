export const Sidebar = ({
  selectedLocation,
  startDate,
  endDate,
  selectedMonth,
  kinderanteil,
}) => {
  if (!kinderanteil || !kinderanteil.Werte) {
    return (
      <aside className="sidebar">
        <p>Keine Daten geladen</p>
      </aside>
    );
  }

  if (!selectedMonth) {
    return (
      <aside className="sidebar">
        <div className="sidebar-grid">
          <div className="sidebar-block">
            <h3>Standort</h3>
            <p>
              <strong>Aktueller Standort:</strong>
              <br />
              {selectedLocation}
            </p>
          </div>

          <div className="sidebar-block">
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

  const daten = kinderanteil.Werte.find((d) => d.month === selectedMonth);

  if (!daten) {
    return (
      <aside className="sidebar">
        <p>Keine Daten für den ausgewählten Monat verfügbar.</p>
      </aside>
    );
  }

  const totalPersonen =
    typeof daten.total_personen === "number"
      ? daten.total_personen
      : daten.children + daten.adults;

  return (
    <aside className="sidebar">
      <div className="sidebar-grid">
        <div className="sidebar-block">
          <h3>Standort</h3>
          <p>
            <strong>Aktueller Standort:</strong>
            <br />
            {selectedLocation}
          </p>
        </div>

        <div className="sidebar-block">
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
        <strong>Total Personen:</strong> {totalPersonen}
      </p>
      <p>
        <strong>Häufigste Wetterkondition:</strong>{" "}
        {daten.weather_condition ?? "keine Angabe"}
      </p>
    </aside>
  );
};
