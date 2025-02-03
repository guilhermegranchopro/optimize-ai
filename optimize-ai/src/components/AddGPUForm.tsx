"use client"

import { useState } from "react"

export default function AddGPUForm() {
  const [formData, setFormData] = useState({
    provider: "",
    region: "",
    type: "",
    price: "",
    carbonIntensity: "",
    efficiency: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend or update your state
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      provider: "",
      region: "",
      type: "",
      price: "",
      carbonIntensity: "",
      efficiency: "",
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold">Add Your GPU</h2>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label htmlFor={key} className="block text-sm font-medium text-gray-700">
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type={key === "price" || key === "carbonIntensity" || key === "efficiency" ? "number" : "text"}
            name={key}
            id={key}
            value={formData[key]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add GPU
      </button>
    </form>
  )
}

