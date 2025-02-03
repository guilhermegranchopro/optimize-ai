"use client";

import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Forecast = () => {
  const [data, setData] = useState(null);
  const [selectedIntervals, setSelectedIntervals] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom");
  const [isSynced, setIsSynced] = useState(true);
  const [selectedForecastCountry, setSelectedForecastCountry] = useState("United Kingdom");

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
        model1: { label: "Future Carbon Intensity (LCA)", value: 3 },
        model2: { label: "Renewable Percentage Forecast", value: 1 },
      },
    };

    // Initialize dropdown selections for each metric
    const initialIntervals = Object.keys(simulatedData.liveMetrics).reduce(
      (acc, key) => ({ ...acc, [key]: "Last Hour" }),
      {}
    );

    setData(simulatedData);
    setSelectedIntervals(initialIntervals);
  }, []);

  const handleIntervalChange = (metric, interval) => {
    setSelectedIntervals((prev) => ({
      ...prev,
      [metric]: interval,
    }));
    console.log(`Selected interval for ${metric}: ${interval}`);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    if (isSynced) {
      setSelectedForecastCountry(e.target.value);
    }
    console.log(`Selected country: ${e.target.value}`);
  };

  const handleForecastCountryChange = (e) => {
    setSelectedForecastCountry(e.target.value);
    setIsSynced(false);
  };

  if (!data) return <p>Loading...</p>;

  const timeIntervals = [
    "Last Hour",
    "Last 3 Hours",
    "Last 6 Hours",
    "Last 12 Hours",
    "Last 24 Hours",
  ];

  const countries = [
    "United Kingdom",
    "Portugal",
    "Spain",
    "United States of America",
    "France",
    "Germany",
  ];

  const getBackgroundColor = (value) => {
    const colors = [
      "bg-green-500", // 0
      "bg-lime-400",  // 1
      "bg-yellow-300",// 2
      "bg-orange-300",// 3
      "bg-red-400",   // 4
      "bg-red-600",   // 5
    ];
    return colors[value] || "bg-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header com gradiente e padding ajustado */}
      <header className="bg-gradient-to-r from-green-600 to-blue-800 py-8 shadow-lg">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Ecological Impact Forecast
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Welcome to the Ecological Impact Forecast. Here you can find insights into real-time energy metrics and their ecological impact. The "Live Power Breakdown" section presents visualizations of production, import, export, and consumption data. The "24H Impact Forecast" predicts carbon intensity and the use of renewable energies over the next 24 hours, using a color scale to indicate the impact.
          </p>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {/* Seção de Live Power Breakdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Live Power Breakdown
          </h2>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Cards de Live Metrics organizados em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(data.liveMetrics).map(([key, values], index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:-translate-y-2 transition ease-in-out duration-200 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace("power", "Power")
                  .trim()}
              </h2>
              <div className="w-32 h-32">
                <Pie
                  data={{
                    labels: ["A", "B", "C"],
                    datasets: [
                      {
                        data: values,
                        backgroundColor: ["#4ade80", "#60a5fa", "#facc15"],
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

        {/* Seção de Forecast */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              24H Impact Forecast
            </h2>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
              value={selectedForecastCountry}
              onChange={handleForecastCountryChange}
            >
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data.forecasts).map(([key, forecast], index) => (
              <div
                key={index}
                className={`rounded-xl shadow-lg p-6 flex flex-col items-center text-center ${getBackgroundColor(
                  forecast.value
                )} transition transform hover:scale-105 hover:shadow-xl`}
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {forecast.label}
                </h3>
                <p className="text-4xl font-bold text-white">
                  {forecast.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forecast;