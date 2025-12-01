export const Sidebar = ({
  selectedLocation,
  standorte,
  startDate,
  endDate,
}) => {
  const ausgewaehlterStandort = standorte.find(
    (s) => s.id === Number(selectedLocation)
  );
  return (
    <aside className="sidebar">
      <h3>Standort</h3>
      <p>
        <strong>Aktueller Standort:</strong>
        <br />
        {ausgewaehlterStandort
          ? ausgewaehlterStandort.name
          : "Kein Standort ausgewählt"}
      </p>

      <h3>Zeitfenster</h3>
      <p>
        <strong>Von:</strong> {startDate || "—"}
        <br />
        <strong>Bis:</strong> {endDate || "—"}
      </p>
    </aside>
  );
};
