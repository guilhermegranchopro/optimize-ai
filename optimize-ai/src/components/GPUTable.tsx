"use client"

import { useState, useEffect } from "react"

interface GPU {
  provider: string
  region: string
  type: string
  price: number
  carbonIntensity: number
  efficiency: number
}

export default function GPUTable({ carbonWeight, priceWeight, efficiencyWeight }) {
  const [gpus, setGpus] = useState<GPU[]>([])

  useEffect(() => {
    // Fetch GPU data from an API or load from a local file
    // For now, we'll use dummy data
    const dummyData: GPU[] = [
      { provider: "AWS", region: "us-east-1", type: "P3", price: 3.06, carbonIntensity: 0.379, efficiency: 0.1 },
      { provider: "GCP", region: "us-central1", type: "V100", price: 2.48, carbonIntensity: 0.475, efficiency: 0.12 },
      { provider: "Azure", region: "eastus", type: "NC24", price: 2.07, carbonIntensity: 0.338, efficiency: 0.11 },
      { provider: "AWS", region: "eu-west-1", type: "G4", price: 0.526, carbonIntensity: 0.316, efficiency: 0.09 },
      { provider: "GCP", region: "europe-west4", type: "T4", price: 0.35, carbonIntensity: 0.39, efficiency: 0.08 },
    ]
    setGpus(dummyData)
  }, [])

  const sortedGPUs = [...gpus].sort((a, b) => {
    const scoreA = a.carbonIntensity * carbonWeight + a.price * priceWeight + a.efficiency * efficiencyWeight
    const scoreB = b.carbonIntensity * carbonWeight + b.price * priceWeight + b.efficiency * efficiencyWeight
    return scoreA - scoreB
  })

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Provider</th>
          <th className="px-4 py-2 border-b">Region</th>
          <th className="px-4 py-2 border-b">GPU Type</th>
          <th className="px-4 py-2 border-b">Price</th>
          <th className="px-4 py-2 border-b">Carbon Intensity</th>
          <th className="px-4 py-2 border-b">W/FLOPS</th>
        </tr>
      </thead>
      <tbody>
        {sortedGPUs.slice(0, 10).map((gpu, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="px-4 py-2 border-b">{gpu.provider}</td>
            <td className="px-4 py-2 border-b">{gpu.region}</td>
            <td className="px-4 py-2 border-b">{gpu.type}</td>
            <td className="px-4 py-2 border-b">${gpu.price.toFixed(2)}</td>
            <td className="px-4 py-2 border-b">{gpu.carbonIntensity.toFixed(3)}</td>
            <td className="px-4 py-2 border-b">{gpu.efficiency.toFixed(3)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

