"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LineChart, BrainCircuit, Layers, AlertTriangle, CheckCircle, Info } from "lucide-react"
import type { PredictionResult } from "./stock-dashboard"

interface PredictionResultsProps {
  result: PredictionResult
  model: string
  ticker: string
}

export default function PredictionResults({ result, model, ticker }: PredictionResultsProps) {
  // Get the latest prediction
  const latestPrediction = result.predictedPrices[0]
  const latestDate = new Date(result.predictedDates[0]).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Format model name for display
  const modelName = model === "linear" ? "Linear Regression" : model === "arima" ? "ARIMA" : "LSTM"

  // Determine model icon
  const ModelIcon = model === "linear" ? LineChart : model === "arima" ? Layers : BrainCircuit

  // Determine accuracy rating based on RMSE
  const getAccuracyRating = (rmse: number) => {
    if (rmse < 1) return { text: "High", color: "text-green-500", icon: CheckCircle }
    if (rmse < 3) return { text: "Medium", color: "text-yellow-500", icon: Info }
    return { text: "Low", color: "text-red-500", icon: AlertTriangle }
  }

  const accuracyRating = getAccuracyRating(result.rmse)
  const AccuracyIcon = accuracyRating.icon

  return (
    <div className="mt-6 space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-[#131f38] border-[#1e2b4a]">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#3461ff]/20 flex items-center justify-center mb-3">
                  <ModelIcon className="h-6 w-6 text-[#4f87ff]" />
                </div>
                <h3 className="text-lg font-medium text-[#8ba3d4]">Prediction Model</h3>
                <p className="text-2xl font-bold text-white">{modelName}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#3461ff]/20 flex items-center justify-center mb-3">
                  <LineChart className="h-6 w-6 text-[#4f87ff]" />
                </div>
                <h3 className="text-lg font-medium text-[#8ba3d4]">Predicted Price</h3>
                <p className="text-2xl font-bold text-white">${latestPrediction.toFixed(2)}</p>
                <p className="text-sm text-[#8ba3d4]">for {latestDate}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#3461ff]/20 flex items-center justify-center mb-3">
                  <AccuracyIcon className={`h-6 w-6 ${accuracyRating.color}`} />
                </div>
                <h3 className="text-lg font-medium text-[#8ba3d4]">Model Accuracy</h3>
                <p className="text-2xl font-bold text-white">
                  <span className={accuracyRating.color}>{accuracyRating.text}</span>
                </p>
                <p className="text-sm text-[#8ba3d4]">RMSE: {result.rmse.toFixed(4)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-4 rounded-lg bg-[#0f1729] border border-[#1e2b4a]">
          <h3 className="font-medium mb-2 text-white flex items-center">
            <ModelIcon className="h-5 w-5 mr-2 text-[#4f87ff]" />
            About {modelName}
          </h3>
          {model === "linear" && (
            <p className="text-[#8ba3d4]">
              Linear Regression predicts future values based on a linear relationship with past data. It's simple but
              can be effective for short-term predictions in stable markets with clear trends. This model assumes a
              constant rate of change over time.
            </p>
          )}
          {model === "arima" && (
            <p className="text-[#8ba3d4]">
              ARIMA combines autoregressive features with moving averages to capture complex patterns in time series
              data. It works well for data with clear seasonal patterns and can account for trends, cycles, and random
              fluctuations in stock prices.
            </p>
          )}
          {model === "lstm" && (
            <p className="text-[#8ba3d4]">
              LSTM neural networks can remember patterns over long periods, making them ideal for stock prediction where
              long-term dependencies matter. They typically outperform traditional methods but require more data and
              computational resources. LSTMs excel at capturing non-linear relationships in market data.
            </p>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="p-4 rounded-lg bg-[#0f1729] border border-[#1e2b4a]">
          <h3 className="font-medium mb-3 text-white">Prediction Timeline</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-[#8ba3d4] text-sm">
                  <th className="text-left pb-2">Date</th>
                  <th className="text-right pb-2">Predicted Price</th>
                </tr>
              </thead>
              <tbody>
                {result.predictedDates.map((date, index) => (
                  <tr key={index} className="border-t border-[#1e2b4a]">
                    <td className="py-2 text-white">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-2 text-right text-white font-medium">
                      ${result.predictedPrices[index].toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
