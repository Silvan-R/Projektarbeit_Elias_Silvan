import { VegaLite } from "react-vega";

export const MainArea = () => {
  const spec = {
    data: {
      values: [
        { a: "Jan", b: 10 },
        { a: "Feb", b: 20 },
        { a: "Mär", b: 15 },
      ],
    },
    mark: "bar",
    encoding: {
      x: { field: "a", type: "ordinal" },
      y: { field: "b", type: "quantitative" },
    },
  };

  return (
    <div style={{ width: "600px", padding: "20px" }}>
      <h3>VegaLite Test</h3>
      <VegaLite spec={spec} />
    </div>
  );
};
