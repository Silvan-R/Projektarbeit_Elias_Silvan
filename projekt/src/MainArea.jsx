import { Vega } from "react-vega";

export function MainArea({
  kinderanteil,
  startDate,
  endDate,
  selectedLocation,
  selectedMonth,
  setSelectedMonth,
}) {
  if (!kinderanteil || !kinderanteil.Werte) {
    return <main className="main-area">Keine Daten</main>;
  }

  const istStandardFokusfrage =
    selectedLocation === "Bahnhofstrasse (Mitte)" &&
    startDate === "2022-01" &&
    endDate === "2023-01";

  const vegaSpec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    width: 500,
    height: 300,
    padding: 5,

    data: [
      {
        name: "table",
        values: kinderanteil.Werte,
        transform: [
          {
            type: "formula",
            as: "kinderanteil_abgeschnitten",
            expr: "datum.kinderanteil_prozent > 5 ? 5 : datum.kinderanteil_prozent",
          },
          {
            type: "formula",
            as: "month_num",
            expr: "{'Jan':1,'Feb':2,'Mär':3,'Apr':4,'Mai':5,'Jun':6,'Jul':7,'Aug':8,'Sep':9,'Okt':10,'Nov':11,'Dez':12}[datum.month]",
          },
        ],
      },
    ],

    //  Klick auf Balken setzt Monat
    signals: [
      {
        name: "selectedMonth",
        value: null,
        on: [
          {
            events: "@bars:click",
            update: "datum.month",
          },
        ],
      },
    ],

    scales: [
      {
        name: "x",
        type: "band",
        domain: {
          data: "table",
          field: "month",
          sort: { field: "month_num", order: "ascending" },
        },
        range: "width",
        padding: 0.1,
      },
      {
        name: "y",
        domain: [0, 5],
        range: "height",
        nice: true,
      },
    ],

    axes: [
      { orient: "bottom", scale: "x", title: "Monat" },
      { orient: "left", scale: "y", title: "Kinderanteil in %" },
    ],

    marks: [
      {
        name: "bars",
        type: "rect",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "month" },
            width: { scale: "x", band: 1 },
            y: { scale: "y", field: "kinderanteil_abgeschnitten" },
            y2: { scale: "y", value: 0 },
            cursor: { value: "pointer" },
          },
          update: {
            fill: [
              {
                test: "datum.month === selectedMonth",
                value: "#ff7f0e", // ausgewählter Monat
              },
              { value: "#4c78a8" },
            ],
          },
        },
      },
    ],
  };

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

      <Vega
        spec={vegaSpec}
        signalListeners={{
          selectedMonth: (_name, value) => {
            setSelectedMonth(value);
          },
        }}
      />

      <p className="chart-info">
        Hinweis: Der Datensatz ist teilweise lückenhaft. In einzelnen Monaten
        wurden unrealistisch hohe Kinderanteile erfasst. Um eine vergleichbare
        Darstellung zu ermöglichen, wurden Kinderanteile in der Visualisierung
        bei maximal 5% begrenzt.
      </p>

      <h3>
        Höchster Kinderanteil im ausgewählten Zeitraum: {maxEintrag.month} (
        {maxEintrag.kinderanteil_prozent} %)
      </h3>
    </main>
  );
}
