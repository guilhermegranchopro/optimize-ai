// pages/forecast.js
export default function ForecastPage() {
    return (
      <div className="page-container">
        <h1>Ecological Impact Forecast</h1>
        <p>Live metrics and a 24-hour forecast to help you plan your AI training efficiently.</p>
        <div className="forecast-section">
          <div className="live-metrics">
            <h2>Live Metrics</h2>
            <ul>
              <li>Power Production: 60% Renewable</li>
              <li>Power Import: 20% from Grid</li>
              <li>Power Export: 5% Exported</li>
              <li>Power Consumption: 75% by Data Centers</li>
            </ul>
          </div>
          <div className="forecast-table">
            <h2>24-Hour Forecast</h2>
            <table>
              <thead>
                <tr>
                  <th>Hour</th>
                  <th>Carbon Intensity (LCA)</th>
                  <th>Renewable %</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 24 }, (_, i) => (
                  <tr key={i}>
                    <td>{i}:00</td>
                    <td>{(Math.random() * 300).toFixed(1)}</td>
                    <td>{Math.floor(Math.random() * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  