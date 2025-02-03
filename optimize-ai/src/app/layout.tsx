import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Workflow Optimizer",
  description: "Optimize your AI workflow for cost, carbon, and energy efficiency",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              AI Workflow Optimizer
            </Link>
            <div className="space-x-4">
              <Link href="/gpu-comparison" className="hover:text-gray-300">
                GPU Comparison
              </Link>
              <Link href="/ecological-forecast" className="hover:text-gray-300">
                Ecological Forecast
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-8">{children}</main>
      </body>
    </html>
  )
}

