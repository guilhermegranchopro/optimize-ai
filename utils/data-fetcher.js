import { useState, useEffect } from "react"

const API_TOKEN = "czG7nq1wv9OHi1phrXUn"
const API_URL = "https://api.electricitymap.org/v3/power-breakdown/history?zone=PT"

function aggregateDataForMetric(history, timeHours, metricType) {
  const now = new Date()
  const limit = new Date(now - timeHours * 60 * 60 * 1000)

  const breakdownKey = `power${metricType}Breakdown`
  const totalKey = `power${metricType}Total`

  const breakdown = {}
  let total = 0

  history.forEach((record) => {
    const recordDate = new Date(record.datetime)
    if (recordDate >= limit && recordDate <= now) {
      const currentBreakdown = record[breakdownKey] || {}
      Object.entries(currentBreakdown).forEach(([source, value]) => {
        if (value !== null && value > 0) {
          breakdown[source] = (breakdown[source] || 0) + value
        }
      })
      total += record[totalKey] || 0
    }
  })

  return { breakdown, total }
}

export function useElectricityData() {
  const [data, setData] = useState({
    consumption: { data: {}, total: 0 },
    production: { data: {}, total: 0 },
    import: { data: {}, total: 0 },
    export: { data: {}, total: 0 },
  })
  const [error, setError] = useState(null)
  const [intervals, setIntervals] = useState({
    consumption: 1,
    production: 1,
    import: 1,
    export: 1,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { "auth-token": API_TOKEN },
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const jsonData = await response.json()

        const newData = {
          consumption: aggregateDataForMetric(jsonData.history, intervals.consumption, "Consumption"),
          production: aggregateDataForMetric(jsonData.history, intervals.production, "Production"),
          import: aggregateDataForMetric(jsonData.history, intervals.import, "Import"),
          export: aggregateDataForMetric(jsonData.history, intervals.export, "Export"),
        }

        setData({
          consumption: { data: newData.consumption.breakdown, total: newData.consumption.total },
          production: { data: newData.production.breakdown, total: newData.production.total },
          import: { data: newData.import.breakdown, total: newData.import.total },
          export: { data: newData.export.breakdown, total: newData.export.total },
        })
        setError(null)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to fetch data. Please try again later.")
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 60 * 60 * 1000) // Update every hour

    return () => clearInterval(intervalId)
  }, [intervals])

  const updateInterval = (metric, hours) => {
    setIntervals((prev) => ({
      ...prev,
      [metric]: hours,
    }))
  }

  return { data, error, updateInterval }
}