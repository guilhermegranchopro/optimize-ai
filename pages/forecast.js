"use client"

import { useEffect, useState, useRef } from "react"
import { Pie } from "react-chartjs-2"
import "chart.js/auto"
import { useElectricityData } from "../utils/data-fetcher"

let motion

try {
  motion = require("framer-motion").motion
} catch (error) {
  console.warn("framer-motion not found. Animations will be disabled.")
}

const AnimatedDiv = motion ? motion.div : "div"

const getBackgroundColor = (value, isRenewable) => {
  const colorScale = [
    "#FF0000", // Vermelho intenso
    "#FF5500", // Laranja avermelhado
    "#FFAA00", // Amarelo-alaranjado
    "#AAFF00", // Amarelo-esverdeado
    "#55FF00", // Verde amarelado
    "#00FF00", // Verde intenso
  ]

  const index = isRenewable ? value : 5 - value
  return colorScale[Math.round(index)]
}

const Forecast = () => {
  const [selectedIntervals, setSelectedIntervals] = useState({
    consumption: "Last Hour",
    production: "Last Hour",
    import: "Last Hour",
    export: "Last Hour",
  })
  const [hoveredMetric, setHoveredMetric] = useState(null)
  const gradientRef = useRef(null)
  const pageRef = useRef(null)

  const { data, error, updateInterval } = useElectricityData()

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
    const hours = {
      "Last Hour": 1,
      "Last 3 Hours": 3,
      "Last 6 Hours": 6,
      "Last 12 Hours": 12,
      "Last 24 Hours": 24,
    }
    updateInterval(metric, hours[interval])
    setSelectedIntervals((prev) => ({
      ...prev,
      [metric]: interval,
    }))
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>
  }

  if (!data) return <p className="text-center p-4">Loading...</p>

  const timeIntervals = ["Last Hour", "Last 3 Hours", "Last 6 Hours", "Last 12 Hours", "Last 24 Hours"]

  const pieChartData = [
    {
      title: "Consumption",
      data: data.consumption.data,
      total: data.consumption.total,
      metric: "consumption",
    },
    {
      title: "Production",
      data: data.production.data,
      total: data.production.total,
      metric: "production",
    },
    {
      title: "Import",
      data: data.import.data,
      total: data.import.total,
      metric: "import",
    },
    {
      title: "Export",
      data: data.export.data,
      total: data.export.total,
      metric: "export",
    },
  ]

  // Array extenso de cores para garantir que não haja repetição
  const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF5C63",
    "#4ECDC4",
    "#45B7D1",
    "#96C93D",
    "#FFA07A",
    "#20B2AA",
    "#DDA0DD",
    "#F0E68C",
    "#87CEEB",
    "#FFA500",
    "#98FB98",
    "#DEB887",
    "#9370DB",
    "#F08080",
    "#7B68EE",
    "#00FA9A",
    "#FFB6C1",
    "#00CED1",
    "#BA55D3",
    "#CD853F",
    "#32CD32",
    "#DB7093",
    "#8FBC8F",
    "#FF69B4",
    "#6495ED",
    "#DC143C",
    "#00FF7F",
    "#D8BFD8",
    "#DAA520",
    "#FF4500",
    "#2E8B57",
    "#9932CC",
    "#8B0000",
    "#E9967A",
  ]

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
                  Gain insights into real-time energy metrics and their ecological impact. Explore dynamic
                  visualisations of energy production, import, export, and consumption data for Portugal, helping you
                  understand the flow of electricity and its environmental footprint.
                </p>
                <p className="text-xl text-white text-center max-w-3xl mx-auto mt-4">
                  Our forecasting model provides 24-hour predictions for carbon intensity Lifecycle (LCA) and the
                  percentage of Renewable Energy in the electricity grid. Carbon intensity is rated on a scale from 0 to
                  5, where higher values indicate a greater environmental impact. Conversely, the percentage of
                  renewable energy is also rated from 0 to 5, with higher values representing a cleaner and more
                  sustainable energy mix. These forecasts, based on historical patterns and real-time data, help users
                  optimise energy-intensive processes for minimal ecological impact.
                </p>
                <p className="text-xl text-white text-center max-w-3xl mx-auto mt-4">
                  More regions and countries will be available on the platform soon. As we expand, our goal is to
                  provide comprehensive insights into the ecological impact of energy consumption across multiple
                  locations, enabling more sustainable decision-making worldwide.
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
              </AnimatedDiv>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
                {pieChartData.map(({ title, data, total, metric }, index) => (
                  <AnimatedDiv
                    key={index}
                    initial={motion ? { opacity: 0, y: 20 } : {}}
                    animate={motion ? { opacity: 1, y: 0 } : {}}
                    transition={motion ? { duration: 0.5, delay: index * 0.1 } : {}}
                    className={`bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition ease-in-out duration-300 hover:shadow-xl ${
                      hoveredMetric === metric ? "scale-105" : "hover:scale-102"
                    }`}
                    onMouseEnter={() => setHoveredMetric(metric)}
                    onMouseLeave={() => setHoveredMetric(null)}
                  >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
                    <div className="w-64 h-64 mb-4">
                      <Pie
                        data={{
                          labels: Object.keys(data),
                          datasets: [
                            {
                              data: Object.values(data),
                              backgroundColor: chartColors.slice(0, Object.keys(data).length),
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: true, position: "bottom" },
                            tooltip: {
                              callbacks: {
                                label: (context) => {
                                  let label = context.label || ""
                                  if (label) {
                                    label += ": "
                                  }
                                  if (context.parsed !== undefined) {
                                    label += `${context.parsed.toFixed(2)} MW (${((context.parsed / total) * 100).toFixed(2)}%)`
                                  }
                                  return label
                                },
                              },
                            },
                          },
                          animation: {
                            animateRotate: true,
                            animateScale: true,
                          },
                        }}
                      />
                    </div>
                    <p className="text-lg font-semibold">Total: {Math.round(total)} MW</p>
                    <div className="relative group mt-4">
                      <select
                        className="appearance-none bg-white border-2 border-green-500 rounded-md pl-3 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ease-in-out group-hover:border-green-600 cursor-pointer text-sm text-gray-700 shadow-sm"
                        value={selectedIntervals[metric]}
                        onChange={(e) => handleIntervalChange(metric, e.target.value)}
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
                initial={motion ? { opacity: 0 } : {}}
                animate={motion ? { opacity: 1 } : {}}
                transition={motion ? { duration: 0.8, delay: 0.4 } : {}}
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4 md:mb-0">Next 24H AI Forecast</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <AnimatedDiv
                    initial={motion ? { opacity: 0, scale: 0.9 } : {}}
                    animate={motion ? { opacity: 1, scale: 1 } : {}}
                    transition={motion ? { duration: 0.5, delay: 0.2 } : {}}
                    className="rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out relative overflow-hidden"
                    style={{
                      "--mouse-x": 0.5,
                      "--mouse-y": 0.5,
                      backgroundColor: getBackgroundColor(3, false),
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
                    <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">Carbon Intensity Lifecycle</h3>
                    <p className="text-5xl font-bold text-white mb-2 relative z-10">3</p>
                  </AnimatedDiv>
                  <AnimatedDiv
                    initial={motion ? { opacity: 0, scale: 0.9 } : {}}
                    animate={motion ? { opacity: 1, scale: 1 } : {}}
                    transition={motion ? { duration: 0.5, delay: 0.4 } : {}}
                    className="rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out relative overflow-hidden"
                    style={{
                      "--mouse-x": 0.5,
                      "--mouse-y": 0.5,
                      backgroundColor: getBackgroundColor(1, true),
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
                    <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">
                      Renewable Energy Percentage
                    </h3>
                    <p className="text-5xl font-bold text-white mb-2 relative z-10">1</p>
                  </AnimatedDiv>
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