"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { StockData, PredictionResult } from "./stock-dashboard"

interface TradingViewWidgetProps {
  symbol: string
  stockData: StockData
  predictionResult: PredictionResult | null
}

export function TradingViewWidget({ symbol, stockData, predictionResult }: TradingViewWidgetProps) {
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
        open: stockData.open[index],
        close: stockData.close[index],
        high: stockData.high[index],
        low: stockData.low[index],
        volume: stockData.volume[index],
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
        open: null,
        close: null,
        high: null,
        low: null,
        volume: null,
      })
    })
  }

  return (
    <div className="h-full w-full p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
            dataKey="close"
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
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
