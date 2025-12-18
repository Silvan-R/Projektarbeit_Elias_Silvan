export const MainArea = ({
  kinderanteil,
  startDate,
  endDate,
  selectedLocation,
}) => {
  if (!kinderanteil) {
    return <main className="main-area">Keine Daten</main>;
  }

  const istStandardFokusfrage =
    selectedLocation === "Bahnhofstrasse (Mitte)" &&
    startDate === "2022-01" &&
    endDate === "2023-01";

  return (
    <main className="main-area">
      {istStandardFokusfrage ? (
        <h3>
          In welchem Monat im Jahr 2022 ist der Anteil der Kinder im Vergleich
          zu den erwachsenen Fussgängern am grössten am Ort Bahnhofstrasse
          Mitte?
        </h3>
      ) : (
        <h3>
          {" "}
          Kinderanteil am Standort {selectedLocation} gegenüber Erwachsenen
          zwischen {startDate} und {endDate}
        </h3>
      )}

      <ul>
        {kinderanteil.Werte.map((eintrag) => (
          <li key={eintrag.month}>
            Monat {eintrag.month}: {eintrag.kinderanteil_prozent} %
          </li>
        ))}
      </ul>
    </main>
  );
};
