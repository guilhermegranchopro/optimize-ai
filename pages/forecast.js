"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Forecast = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulated data for real-time charts
    const simulatedData = {
      liveMetrics: {
        powerProduction: [40, 30, 30],
        powerImport: [50, 20, 30],
        powerExport: [60, 25, 15],
        powerConsumption: [70, 20, 10],
      },
      forecasts: {
        model1: { label: "Future Carbon Intensity (LCA)", value: "78 gCO2/kWh" },
        model2: { label: "Renewable Percentage Forecast", value: "65%" },
      },
    };

    setData(simulatedData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Ecological Impact Forecast</h1>

      {/* Live Metrics Section – arranged in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(data.liveMetrics).map(([key, values], index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <h2 className="text-lg font-semibold mb-4">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </h2>
            <div className="w-24 h-24">
              <Pie
                data={{
                  labels: ["Category A", "Category B", "Category C"],
                  datasets: [
                    {
                      data: values,
                      backgroundColor: ["#ff6384", "#36a2eb", "#ffce56"],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Forecast Section – arranged in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100 p-6 rounded-lg shadow-md">
        {Object.entries(data.forecasts).map(([key, forecast], index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-semibold mb-4">{forecast.label}</h3>
            <p
              className={`text-3xl font-bold ${
                index === 0 ? "text-blue-600" : "text-green-600"
              }`}
            >
              {forecast.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
