"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function ForecastCharts() {
  const [forecastData, setForecastData] = useState({
    labels: [],
    carbonIntensity: [],
    renewablePercentage: [],
  })

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For this example, we'll generate dummy data
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`)
    const carbonIntensity = Array.from({ length: 24 }, () => Math.random() * 100)
    const renewablePercentage = Array.from({ length: 24 }, () => Math.random() * 100)

    setForecastData({
      labels: hours,
      carbonIntensity,
      renewablePercentage,
    })
  }, [])

  const carbonIntensityData = {
    labels: forecastData.labels,
    datasets: [
      {
        label: "Carbon Intensity (LCA)",
        data: forecastData.carbonIntensity,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const renewablePercentageData = {
    labels: forecastData.labels,
    datasets: [
      {
        label: "Renewable Percentage",
        data: forecastData.renewablePercentage,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Forecast for Next 24 Hours",
      },
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">24-Hour Forecast</h2>
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Carbon Intensity (LCA)</h3>
        <Line options={options} data={carbonIntensityData} />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Renewable Percentage</h3>
        <Line options={options} data={renewablePercentageData} />
      </div>
    </div>
  )
}

