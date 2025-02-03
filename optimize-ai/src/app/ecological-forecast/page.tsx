import LiveMetrics from "../../components/LiveMetrics"
import ForecastCharts from "../../components/ForecastCharts"

export default function EcologicalForecast() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ecological Forecast</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LiveMetrics />
        <ForecastCharts />
      </div>
    </div>
  )
}

