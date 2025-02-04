"use client"

import { useEffect, useState, useRef } from "react"
import { Pie, Line } from "react-chartjs-2"
import "chart.js/auto"

let motion
let ArrowDownIcon
let ArrowUpIcon

try {
  motion = require("framer-motion").motion
} catch (error) {
  console.warn("framer-motion not found. Animations will be disabled.")
}

try {
  ;({ ArrowDownIcon, ArrowUpIcon } = require("@heroicons/react/24/solid"))
} catch (error) {
  console.warn("@heroicons/react not found. Icons will be disabled.")
}

const AnimatedDiv = motion ? motion.div : "div"

const Forecast = () => {
  const [data, setData] = useState(null)
  const [selectedIntervals, setSelectedIntervals] = useState({})
  const [selectedCountry, setSelectedCountry] = useState("United Kingdom")
  const [isSynced, setIsSynced] = useState(true)
  const [selectedForecastCountry, setSelectedForecastCountry] = useState("United Kingdom")
  const [hoveredMetric, setHoveredMetric] = useState(null)
  const gradientRef = useRef(null)
  const pageRef = useRef(null)

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
      historicalData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Carbon Intensity",
            data: [65, 59, 80, 81, 56, 55],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
          {
            label: "Renewable Percentage",
            data: [28, 48, 40, 19, 86, 27],
            borderColor: "rgb(255, 99, 132)",
            tension: 0.1,
          },
        ],
      },
    }

    // Initialize dropdown selections for each metric
    const initialIntervals = Object.keys(simulatedData.liveMetrics).reduce(
      (acc, key) => ({ ...acc, [key]: "Last Hour" }),
      {},
    )

    setData(simulatedData)
    setSelectedIntervals(initialIntervals)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (gradientRef.current) {
        const { left, top, width, height } = gradientRef.current.getBoundingClientRect()
        const x = (event.clientX - left) / width
        const y = (event.clientY - top) / height
        gradientRef.current.style.setProperty("--mouse-x", x)
        gradientRef.current.style.setProperty("--mouse-y", y)
      }
      if (pageRef.current) {
        const { width, height } = pageRef.current.getBoundingClientRect()
        const x = event.clientX / width
        const y = event.clientY / height
        pageRef.current.style.setProperty("--mouse-x", x)
        pageRef.current.style.setProperty("--mouse-y", y)
      }
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleIntervalChange = (metric, interval) => {
    setSelectedIntervals((prev) => ({
      ...prev,
      [metric]: interval,
    }))
    console.log(`Selected interval for ${metric}: ${interval}`)
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
    if (isSynced) {
      setSelectedForecastCountry(e.target.value)
    }
    console.log(`Selected country: ${e.target.value}`)
  }

  const handleForecastCountryChange = (e) => {
    setSelectedForecastCountry(e.target.value)
    setIsSynced(false)
  }

  if (!data) return <p>Loading...</p>

  const timeIntervals = ["Last Hour", "Last 3 Hours", "Last 6 Hours", "Last 12 Hours", "Last 24 Hours"]

  const countries = ["United Kingdom", "Portugal", "Spain", "United States of America", "France", "Germany"]

  const getBackgroundColor = (value) => {
    const colors = [
      "from-green-500 to-green-600", // 0
      "from-lime-400 to-lime-500", // 1
      "from-yellow-300 to-yellow-400", // 2
      "from-orange-300 to-orange-400", // 3
      "from-red-400 to-red-500", // 4
      "from-red-600 to-red-700", // 5
    ]
    return colors[value] || "from-gray-200 to-gray-300"
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
      style={{
        "--mouse-x": 0.5,
        "--mouse-y": 0.5,
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(74, 222, 128, 0.4) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%)",
          filter: "blur(100px)",
        }}
      />
      <div className="max-w-[1400px] mx-auto p-8 relative z-10">
        <div
          className="rounded-2xl p-1 bg-white/80 backdrop-blur-sm relative overflow-hidden shadow-2xl"
          style={{
            backgroundImage: "linear-gradient(to right, #4ade80, #3b82f6, #8b5cf6)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
          }}
        >
          <div className="bg-white rounded-xl p-8">
            <div
              ref={gradientRef}
              className="rounded-lg mb-8 overflow-hidden relative"
              style={{
                background: "linear-gradient(120deg, #2EAC4B, #3B82F6)",
                "--mouse-x": 0.5,
                "--mouse-y": 0.5,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)",
                  mixBlendMode: "overlay",
                }}
              />
              <div className="px-8 py-12 relative z-10">
                <h1 className="text-6xl font-extrabold text-white mb-4 text-center">Ecological Impact Forecast</h1>
                <p className="text-xl text-white text-center max-w-3xl mx-auto">
                  Gain insights into real-time energy metrics and their ecological impact. Explore visualizations of
                  production, import, export, and consumption data, along with 24-hour forecasts for carbon intensity
                  and renewable energy usage.
                </p>
              </div>
            </div>
            <main className="space-y-12">
              <AnimatedDiv
                initial={motion ? { opacity: 0, y: 20 } : {}}
                animate={motion ? { opacity: 1, y: 0 } : {}}
                transition={motion ? { duration: 0.8, delay: 0.2 } : {}}
                className="flex flex-col md:flex-row justify-between items-center"
              >
                <h2 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">Live Power Breakdown</h2>
                <div className="relative group">
                  <select
                    className="appearance-none bg-white border-2 border-green-500 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out group-hover:border-green-600 cursor-pointer text-gray-700 shadow-sm"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-500 group-hover:text-green-600">
                    <svg
                      className="fill-current h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-y-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </AnimatedDiv>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {Object.entries(data.liveMetrics).map(([key, values], index) => (
                  <AnimatedDiv
                    key={index}
                    initial={motion ? { opacity: 0, y: 20 } : {}}
                    animate={motion ? { opacity: 1, y: 0 } : {}}
                    transition={motion ? { duration: 0.5, delay: index * 0.1 } : {}}
                    className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition ease-in-out duration-300 hover:shadow-xl ${
                      hoveredMetric === key ? "scale-105" : "hover:scale-102"
                    }`}
                    onMouseEnter={() => setHoveredMetric(key)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace("power", "Power")
                        .trim()}
                    </h2>
                    <div className="w-40 h-40 mb-4">
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
                          animation: {
                            animateRotate: true,
                            animateScale: true,
                          },
                        }}
                      />
                    </div>
                    <div className="relative group">
                      <select
                        className="appearance-none bg-white border-2 border-green-500 rounded-md pl-3 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out group-hover:border-green-600 cursor-pointer text-sm text-gray-700 shadow-sm"
                        value={selectedIntervals[key]}
                        onChange={(e) => handleIntervalChange(key, e.target.value)}
                      >
                        {timeIntervals.map((interval) => (
                          <option key={interval} value={interval}>
                            {interval}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-500 group-hover:text-green-600">
                        <svg
                          className="fill-current h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-y-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </AnimatedDiv>
                ))}
              </div>

              <AnimatedDiv
                initial={motion ? { opacity: 0, y: 20 } : {}}
                animate={motion ? { opacity: 1, y: 0 } : {}}
                transition={motion ? { duration: 0.8, delay: 0.4 } : {}}
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">24H Impact Forecast</h2>
                  <div className="relative group">
                    <select
                      className="appearance-none bg-white border-2 border-green-500 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out group-hover:border-green-600 cursor-pointer text-gray-700 shadow-sm"
                      value={selectedForecastCountry}
                      onChange={handleForecastCountryChange}
                    >
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-500 group-hover:text-green-600">
                      <svg
                        className="fill-current h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-y-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(data.forecasts).map(([key, forecast], index) => (
                    <AnimatedDiv
                      key={index}
                      initial={motion ? { opacity: 0, scale: 0.9 } : {}}
                      animate={motion ? { opacity: 1, scale: 1 } : {}}
                      transition={motion ? { duration: 0.5, delay: index * 0.2 } : {}}
                      className={`rounded-xl shadow-lg p-8 flex flex-col items-center text-center bg-gradient-to-br ${getBackgroundColor(
                        forecast.value,
                      )} transition transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out relative overflow-hidden`}
                      style={{
                        "--mouse-x": 0.5,
                        "--mouse-y": 0.5,
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%)",
                          mixBlendMode: "overlay",
                        }}
                      />
                      <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">{forecast.label}</h3>
                      <p className="text-5xl font-bold text-white mb-2 relative z-10">{forecast.value}</p>
                      {ArrowDownIcon &&
                        ArrowUpIcon &&
                        (index === 0 ? (
                          <ArrowUpIcon className="h-8 w-8 text-white relative z-10" />
                        ) : (
                          <ArrowDownIcon className="h-8 w-8 text-white relative z-10" />
                        ))}
                    </AnimatedDiv>
                  ))}
                </div>
              </AnimatedDiv>

              <AnimatedDiv
                initial={motion ? { opacity: 0, y: 20 } : {}}
                animate={motion ? { opacity: 1, y: 0 } : {}}
                transition={motion ? { duration: 0.8, delay: 0.6 } : {}}
                className="mb-12"
              >
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Historical Trends</h2>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <Line
                    data={data.historicalData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Carbon Intensity and Renewable Percentage Over Time",
                        },
                      },
                    }}
                  />
                </div>
              </AnimatedDiv>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

const keyframes = `
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`

const style = document.createElement("style")
style.appendChild(document.createTextNode(keyframes))
document.head.appendChild(style)

export default Forecast