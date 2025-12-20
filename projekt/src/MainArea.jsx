import { VegaLite } from "react-vega";

export function MainArea({
  kinderanteil,
  startDate,
  endDate,
  selectedLocation,
}) {
  // Absicherung: Daten noch nicht da
  if (!kinderanteil || !kinderanteil.Werte) {
    return <main className="main-area">Keine Daten</main>;
  }

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    width: 500,
    height: 300,

    data: {
      values: kinderanteil.Werte, // DAS sind deine Daten
    },

    mark: "bar",

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
        field: "kinderanteil_prozent",
        type: "quantitative",
        title: "Kinderanteil in %",
        scale: { domain: [0, 5] },
      },
      tooltip: [
        { field: "month", type: "ordinal" },
        { field: "kinderanteil_prozent", type: "quantitative" },
      ],
    },
  };

  return (
    <main className="main-area">
      <h3>
        Kinderanteil am Standort {selectedLocation} zwischen {startDate} und{" "}
        {endDate}
      </h3>

      <VegaLite spec={spec} />
    </main>
  );
}
