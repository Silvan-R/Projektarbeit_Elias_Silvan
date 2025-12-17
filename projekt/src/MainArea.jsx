export const MainArea = ({ kinderanteil }) => {
  if (!kinderanteil) {
    return <main className="main-area">Keine Daten</main>;
  }

  return (
    <main className="main-area">
      <h4>Backend-Daten</h4>

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
