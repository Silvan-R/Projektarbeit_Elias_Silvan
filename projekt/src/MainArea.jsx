import { VegaLite } from "react-vega";

export function MainArea({
  kinderanteil,
  startDate,
  endDate,
  selectedLocation,
  setSelectedMonth,
}) {
  // Absicherung: Daten noch nicht da
  if (!kinderanteil || !kinderanteil.Werte) {
    return <main className="main-area">Keine Daten</main>;
  }
  // für Text der Fokusfrage
  const istStandardFokusfrage =
    selectedLocation === "Bahnhofstrasse (Mitte)" &&
    startDate === "2022-01" &&
    endDate === "2023-01";

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 500,
    height: 300,

    data: {
      values: kinderanteil.Werte, // Das sind deine Daten
    },
    //Kinderanteil nur bis 5% anzeigen
    transform: [
      {
        calculate:
          "datum.kinderanteil_prozent > 5 ? 5 : datum.kinderanteil_prozent",
        as: "kinderanteil_abgeschnitten",
      },
    ],

    mark: "bar",

    selection: {
      monatAuswahl: {
        type: "single",
        fields: ["month"],
        on: "click",
        clear: "dblclick",
      },
    },

    encoding: {
      x: {
        field: "month",
        type: "ordinal",
        title: "Monat",
        sort: [
          "Jan",
          "Feb",
          "Mär",
          "Apr",
          "Mai",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Okt",
          "Nov",
          "Dez",
        ],
      },
      y: {
        field: "kinderanteil_abgeschnitten",
        type: "quantitative",
        title: "Kinderanteil in %",
        scale: { domain: [0, 5] },
      },
      color: {
        condition: {
          selection: "monatAuswahl",
          value: "#ff7f0e",
        },
        value: "#4c78a8",
      },
      tooltip: [
        { field: "month", type: "ordinal" },
        { field: "kinderanteil_prozent", type: "quantitative" },
      ],
    },
  };
  // Für Abfrage höchster %-Wert
  const maxEintrag = kinderanteil.Werte.reduce((max, curr) => {
    if (
      typeof curr.kinderanteil_prozent !== "number" ||
      isNaN(curr.kinderanteil_prozent)
    ) {
      return max;
    }
    return curr.kinderanteil_prozent > max.kinderanteil_prozent ? curr : max;
  }, kinderanteil.Werte[0]);
  return (
    <main className="main-area">
      {istStandardFokusfrage ? (
        <h3>
          Fokusfrage: In welchem Monat im Jahr 2022 ist der Anteil der Kinder im
          Vergleich zu den Erwachsenen Fussgängern am grössten am Ort
          Bahnhofstrasse Mitte?
        </h3>
      ) : (
        <h3>
          Kinderanteil am Standort {selectedLocation} zwischen {startDate} und{" "}
          {endDate}
        </h3>
      )}

      <VegaLite spec={spec} />
      <p className="chart-info">
        Hinweis: Der Datensatz ist teilweise lückenhaft. In einzelnen Monaten
        wurden unrealistisch hohe Kinderanteile erfasst. Um eine vergleichbare
        Darstellung zu ermöglichen, wurden Kinderanteile in der Visualisierung
        bei maximal 5% begrenzt.
      </p>

      <h3>
        Höchster Kinderanteil im ausgewählten Zeitraum: {maxEintrag.month}(
        {maxEintrag.kinderanteil_prozent} %){" "}
      </h3>
    </main>
  );
}
