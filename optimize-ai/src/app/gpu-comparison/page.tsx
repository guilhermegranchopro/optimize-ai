"use client"

import { useState } from "react"
import GPUTable from "../../components/GPUTable"
import Slider from "../../components/Slider"
import AddGPUForm from "../../components/AddGPUForm"

export default function GPUComparison() {
  const [carbonWeight, setCarbonWeight] = useState(33)
  const [priceWeight, setPriceWeight] = useState(33)
  const [efficiencyWeight, setEfficiencyWeight] = useState(34)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">GPU Comparison</h1>
      <div className="mb-8">
        <Slider label="Carbon Intensity" value={carbonWeight} onChange={setCarbonWeight} />
        <Slider label="Price" value={priceWeight} onChange={setPriceWeight} />
        <Slider label="W/FLOPS" value={efficiencyWeight} onChange={setEfficiencyWeight} />
      </div>
      <GPUTable carbonWeight={carbonWeight} priceWeight={priceWeight} efficiencyWeight={efficiencyWeight} />
      <AddGPUForm />
    </div>
  )
}

