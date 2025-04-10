"use client"

import { useState } from "react"
import type { StockData } from "./stock-dashboard"
import type { PredictionResult } from "./stock-dashboard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, BarChart, CandlestickChart } from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"

interface StockChartProps {
  stockData: StockData
  predictionResult: PredictionResult | null
}

export default function StockChart({ stockData, predictionResult }: StockChartProps) {
  const [chartType, setChartType] = useState<"line" | "candlestick" | "bar">("line")

  // Format dates for display
  const formattedDates = stockData.date.map((date) => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  })

  // Prepare data for chart
  const chartData = stockData.date
    .map((date, index) => {
      const dateObj = new Date(date)
      const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      return {
        date: formattedDate,
        price: stockData.close[index],
        open: stockData.open[index],
        high: stockData.high[index],
        low: stockData.low[index],
        volume: stockData.volume[index] / 1000000, // Convert to millions for better display
      }
    })
    .reverse() // Reverse to show oldest to newest

  // Add prediction data if available
  const combinedData = [...chartData]

  if (predictionResult) {
    predictionResult.predictedDates.forEach((date, index) => {
      const dateObj = new Date(date)
      const formattedDate = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      combinedData.push({
        date: formattedDate,
        predicted: predictionResult.predictedPrices[index],
        // Set other values to null for prediction dates
        price: null,
        open: null,
        high: null,
        low: null,
        volume: null,
      })
    })
  }

  return (
    <Card className="p-4 border border-[#1e2b4a] bg-[#0f1729]">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-[#4f87ff] mr-2"></div>
              <span className="text-sm text-[#8ba3d4]">Actual Price</span>
            </div>
            {predictionResult && (
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-[#10b981] mr-2"></div>
                <span className="text-sm text-[#8ba3d4]">Predicted Price</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`border-[#1e2b4a] ${
              chartType === "line" ? "bg-[#1a2542] text-white" : "text-[#8ba3d4] hover:text-white"
            }`}
            onClick={() => setChartType("line")}
          >
            <LineChart className="h-4 w-4 mr-1" /> Line
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`border-[#1e2b4a] ${
              chartType === "candlestick" ? "bg-[#1a2542] text-white" : "text-[#8ba3d4] hover:text-white"
            }`}
            onClick={() => setChartType("candlestick")}
          >
            <CandlestickChart className="h-4 w-4 mr-1" /> OHLC
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`border-[#1e2b4a] ${
              chartType === "bar" ? "bg-[#1a2542] text-white" : "text-[#8ba3d4] hover:text-white"
            }`}
            onClick={() => setChartType("bar")}
          >
            <BarChart className="h-4 w-4 mr-1" /> Volume
          </Button>
        </div>
      </div>

      <div className="w-full h-[400px] bg-[#0f1729]">
        {chartType === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={combinedData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2b4a" />
              <XAxis dataKey="date" stroke="#8ba3d4" tick={{ fill: "#8ba3d4" }} />
              <YAxis
                stroke="#8ba3d4"
                tick={{ fill: "#8ba3d4" }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131f38",
                  borderColor: "#1e2b4a",
                  color: "#ffffff",
                }}
                labelStyle={{ color: "#ffffff" }}
                formatter={(value: any) => [`$${value.toFixed(2)}`, ""]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4f87ff"
                name="Price"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              {predictionResult && (
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#10b981"
                  name="Predicted"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
        )}

        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2b4a" />
              <XAxis dataKey="date" stroke="#8ba3d4" tick={{ fill: "#8ba3d4" }} />
              <YAxis stroke="#8ba3d4" tick={{ fill: "#8ba3d4" }} tickFormatter={(value) => `${value.toFixed(0)}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131f38",
                  borderColor: "#1e2b4a",
                  color: "#ffffff",
                }}
                labelStyle={{ color: "#ffffff" }}
                formatter={(value: any) => [`${value.toFixed(2)}M`, "Volume"]}
              />
              <Legend />
              <Bar dataKey="volume" fill="#4f87ff" name="Volume (M)" />
            </RechartsBarChart>
          </ResponsiveContainer>
        )}

        {chartType === "candlestick" && (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2b4a" />
              <XAxis dataKey="date" stroke="#8ba3d4" tick={{ fill: "#8ba3d4" }} />
              <YAxis
                stroke="#8ba3d4"
                tick={{ fill: "#8ba3d4" }}
                domain={["auto", "auto"]}
                tickFormatter={(value) => `$${value.toFixed(0)}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131f38",
                  borderColor: "#1e2b4a",
                  color: "#ffffff",
                }}
                labelStyle={{ color: "#ffffff" }}
                formatter={(value: any) => [`$${value.toFixed(2)}`, ""]}
              />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#10b981" name="High" dot={false} />
              <Line type="monotone" dataKey="low" stroke="#ef4444" name="Low" dot={false} />
              <Line type="monotone" dataKey="open" stroke="#8ba3d4" name="Open" dot={false} />
              <Line type="monotone" dataKey="price" stroke="#4f87ff" name="Close" dot={false} />
            </RechartsLineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  )
}
