"use client"

import { useState, useEffect } from "react"

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    powerProduction: {},
    powerImport: {},
    powerExport: {},
    powerConsumption: {},
  })

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For this example, we'll use dummy data
    const dummyData = {
      powerProduction: { solar: 30, wind: 40, hydro: 20, thermal: 10 },
      powerImport: { country1: 15, country2: 10 },
      powerExport: { country3: 5, country4: 8 },
      powerConsumption: { residential: 35, commercial: 30, industrial: 35 },
    }
    setMetrics(dummyData)

    // Set up an interval to update the data every 5 seconds
    const interval = setInterval(() => {
      // In a real application, you would fetch new data here
      // For this example, we'll just randomize the existing data
      setMetrics((prevMetrics) => ({
        powerProduction: Object.fromEntries(
          Object.entries(prevMetrics.powerProduction).map(([key, value]) => [key, Math.random() * 50]),
        ),
        powerImport: Object.fromEntries(
          Object.entries(prevMetrics.powerImport).map(([key, value]) => [key, Math.random() * 20]),
        ),
        powerExport: Object.fromEntries(
          Object.entries(prevMetrics.powerExport).map(([key, value]) => [key, Math.random() * 10]),
        ),
        powerConsumption: Object.fromEntries(
          Object.entries(prevMetrics.powerConsumption).map(([key, value]) => [key, Math.random() * 40]),
        ),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const renderMetric = (title, data) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key} className="flex justify-between">
            <span>{key}</span>
            <span>{(value as number).toFixed(2)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Live Metrics</h2>
      {renderMetric("Power Production Breakdown", metrics.powerProduction)}
      {renderMetric("Power Import Breakdown", metrics.powerImport)}
      {renderMetric("Power Export Breakdown", metrics.powerExport)}
      {renderMetric("Power Consumption Breakdown", metrics.powerConsumption)}
    </div>
  )
}

