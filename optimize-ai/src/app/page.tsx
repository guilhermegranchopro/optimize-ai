import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Optimize Your AI Workflow</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Optimize your AI workflow choices for cost, carbon, and energy efficiency. Compare GPUs and forecast ecological
        impact to make informed decisions.
      </p>
      <div className="flex space-x-4">
        <Link href="/gpu-comparison" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          GPU Comparison
        </Link>
        <Link
          href="/ecological-forecast"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Ecological Forecast
        </Link>
      </div>
    </div>
  )
}

