import { NextResponse } from "next/server"
import * as tf from "@tensorflow/tfjs-node"

const API_KEY = process.env.ELECTRICITY_MAPS_API_KEY
const REGION = "PT"
const URL = `https://api.electricitymap.org/v3/carbon-intensity/history?zone=${REGION}`

async function fetchData() {
  console.log("Fetching data from Electricity Maps API...")
  console.log("API_KEY:", API_KEY) // Log the API key (be careful with this in production)
  const response = await fetch(URL, {
    headers: { "auth-token": API_KEY },
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const contentType = response.headers.get("content-type")
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON response but received ${contentType}`)
  }
  const data = await response.json()
  console.log("Data fetched successfully")
  return data.history.slice(-24).map((item) => ({
    datetime: new Date(item.datetime),
    LCA: item.carbonIntensity,
  }))
}

async function loadMinMaxScaler() {
  try {
    // In a real scenario, you would read and parse the PKL file here
    // For now, we'll use placeholder values
    const scalerParams = {
      min_: 0,
      scale_: 1,
    }
    console.log("MinMax scaler parameters loaded successfully")
    return scalerParams
  } catch (error) {
    console.error("Error loading MinMax scaler:", error)
    throw new Error("Failed to load MinMax scaler parameters")
  }
}

function normalizeData(data, scalerParams) {
  console.log("Normalizing data using MinMax scaler...")
  return data.map((item) => ({
    ...item,
    LCA: (item.LCA - scalerParams.min_) * scalerParams.scale_,
  }))
}

async function loadModel() {
  console.log("Loading LSTM model...")
  try {
    const model = await tf.node.loadSavedModel("./models/LSTM_LCA_Model")
    console.log("Model loaded successfully")
    return model
  } catch (error) {
    console.error("Error loading model:", error)
    throw new Error("Failed to load LSTM model")
  }
}

function makePrediction(model, data) {
  console.log("Making prediction...")
  const inputData = tf.tensor3d([data.map((item) => [item.LCA])], [1, 24, 1])
  const prediction = model.predict(inputData)
  const result = Array.from(prediction.argMax(1).dataSync())[0]
  console.log("Prediction result:", result)
  return result
}

export async function GET(req) {
  console.log("Received GET request for carbon intensity forecast")
  try {
    const rawData = await fetchData()
    const scalerParams = await loadMinMaxScaler()
    const normalizedData = normalizeData(rawData, scalerParams)
    const model = await loadModel()
    const prediction = makePrediction(model, normalizedData)

    console.log("Sending successful response")
    return NextResponse.json({ prediction })
  } catch (error) {
    console.error("API Error:", error)
    console.error("Error details:", error.message)
    if (error.response) {
      console.error("Response status:", error.response.status)
      console.error("Response headers:", error.response.headers)
      const text = await error.response.text()
      console.error("Response body:", text)
    }
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}