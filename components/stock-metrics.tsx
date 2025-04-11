"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  DollarSign,
  TrendingUp,
  Activity,
  BarChart4,
  ArrowDown,
  ArrowUp,
  Calendar,
  Percent,
  AlertTriangle,
  Award,
  BarChart,
} from "lucide-react"
import type { StockData, SentimentAnalysis } from "./stock-dashboard"

interface StockMetricsProps {
  stockData: StockData
  ticker: string
  sentimentAnalysis: SentimentAnalysis | null
}

export function StockMetrics({ stockData, ticker, sentimentAnalysis }: StockMetricsProps) {
  // Check if data is available
  if (!stockData || stockData.date.length === 0) {
    return null
  }

  // Get the latest data point
  const latestIndex = 0
  const previousIndex = 1

  // Calculate price change
  const priceChange = stockData.close[latestIndex] - stockData.close[previousIndex]
  const percentChange = (priceChange / stockData.close[previousIndex]) * 100
  const isPositive = priceChange >= 0

  // Calculate 52-week high and low (simulated)
  const high52Week = Math.max(...stockData.high) * 1.1
  const low52Week = Math.min(...stockData.low) * 0.9

  // Calculate market cap (simulated)
  const outstandingShares = 5_000_000_000 // Simulated value
  const marketCap = stockData.close[latestIndex] * outstandingShares

  // Format market cap
  const formatMarketCap = (value: number) => {
    if (value >= 1_000_000_000_000) {
      return `$${(value / 1_000_000_000_000).toFixed(2)}T`
    } else if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(2)}M`
    } else {
      return `$${value.toFixed(2)}`
    }
  }

  // Calculate volume change
  const volumeChange =
    ((stockData.volume[latestIndex] - stockData.volume[previousIndex]) / stockData.volume[previousIndex]) * 100

  // Calculate volatility (simulated)
  const volatility = ((stockData.high[latestIndex] - stockData.low[latestIndex]) / stockData.close[latestIndex]) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="grid grid-cols-1 gap-4">
        {/* Main Metrics */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Price Card */}
          <Card className="flex-1 border-[#1e2b4a] bg-[#0f1729] shadow-lg shadow-blue-900/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-[#3461ff]/20 flex items-center justify-center mr-3">
                        <DollarSign className="h-5 w-5 text-[#4f87ff]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{ticker}</h3>
                        <p className="text-[#8ba3d4] text-sm">Last updated:  2025-04-11</p>
                      </div>
                    </div>
                    {sentimentAnalysis && (
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          sentimentAnalysis.recommendation === "buy"
                            ? "bg-green-900/30 text-green-400 border border-green-500/30"
                            : sentimentAnalysis.recommendation === "sell"
                              ? "bg-red-900/30 text-red-400 border border-red-500/30"
                              : "bg-yellow-900/30 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        {sentimentAnalysis.recommendation.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline mb-1">
                    <span className="text-4xl font-bold text-white">${stockData.close[latestIndex].toFixed(2)}</span>
                    <span
                      className={`ml-3 text-lg font-medium flex items-center ${
                        isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                      {Math.abs(priceChange).toFixed(2)} ({Math.abs(percentChange).toFixed(2)}%)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-[#131f38] p-3 rounded-md border border-[#1e2b4a]">
                      <div className="flex items-center text-[#8ba3d4] text-sm mb-1">
                        <Activity className="h-3 w-3 mr-1" /> Open
                      </div>
                      <div className="text-white font-medium">${stockData.open[latestIndex].toFixed(2)}</div>
                    </div>
                    <div className="bg-[#131f38] p-3 rounded-md border border-[#1e2b4a]">
                      <div className="flex items-center text-[#8ba3d4] text-sm mb-1">
                        <TrendingUp className="h-3 w-3 mr-1" /> High
                      </div>
                      <div className="text-white font-medium">${stockData.high[latestIndex].toFixed(2)}</div>
                    </div>
                    <div className="bg-[#131f38] p-3 rounded-md border border-[#1e2b4a]">
                      <div className="flex items-center text-[#8ba3d4] text-sm mb-1">
                        <ArrowDown className="h-3 w-3 mr-1" /> Low
                      </div>
                      <div className="text-white font-medium">${stockData.low[latestIndex].toFixed(2)}</div>
                    </div>
                    <div className="bg-[#131f38] p-3 rounded-md border border-[#1e2b4a]">
                      <div className="flex items-center text-[#8ba3d4] text-sm mb-1">
                        <BarChart4 className="h-3 w-3 mr-1" /> Volume
                      </div>
                      <div className="text-white font-medium">
                        {new Intl.NumberFormat().format(stockData.volume[latestIndex])}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="bg-[#131f38] p-6 md:w-64 border-t md:border-t-0 md:border-l border-[#1e2b4a]">
                  <h4 className="text-[#8ba3d4] text-sm font-medium mb-4">Key Metrics</h4>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8ba3d4]">Market Cap</span>
                        <span className="text-white font-medium">{formatMarketCap(marketCap)}</span>
                      </div>
                      <div className="mt-1 h-1 w-full bg-[#0f1729] rounded-full overflow-hidden">
                        <div className="h-full bg-[#4f87ff] rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8ba3d4]">52W High</span>
                        <span className="text-white font-medium">${high52Week.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8ba3d4]">52W Low</span>
                        <span className="text-white font-medium">${low52Week.toFixed(2)}</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8ba3d4]">Volume Change</span>
                        <span
                          className={`text-white font-medium ${volumeChange >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {volumeChange >= 0 ? "+" : ""}
                          {volumeChange.toFixed(2)}%
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#8ba3d4]">Volatility</span>
                        <span className="text-white font-medium">{volatility.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-[#1e2b4a] bg-[#0f1729] shadow-lg shadow-blue-900/10">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-[#3461ff]/20 flex items-center justify-center mr-3">
                  <Calendar className="h-5 w-5 text-[#4f87ff]" />
                </div>
                <div>
                  <p className="text-[#8ba3d4] text-sm">Trading Date</p>
                  <p className="text-white font-medium">
                    {new Date(stockData.date[0]).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#1e2b4a] bg-[#0f1729] shadow-lg shadow-blue-900/10">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-[#3461ff]/20 flex items-center justify-center mr-3">
                  <Percent className="h-5 w-5 text-[#4f87ff]" />
                </div>
                <div>
                  <p className="text-[#8ba3d4] text-sm">Day Range</p>
                  <p className="text-white font-medium">
                    ${stockData.low[latestIndex].toFixed(2)} - ${stockData.high[latestIndex].toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#1e2b4a] bg-[#0f1729] shadow-lg shadow-blue-900/10">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-md ${isPositive ? "bg-green-500/20" : "bg-red-500/20"} flex items-center justify-center mr-3`}
                >
                  {isPositive ? (
                    <Award className={`h-5 w-5 text-green-500`} />
                  ) : (
                    <AlertTriangle className={`h-5 w-5 text-red-500`} />
                  )}
                </div>
                <div>
                  <p className="text-[#8ba3d4] text-sm">Performance</p>
                  <p className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                    {isPositive ? "Outperforming" : "Underperforming"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#1e2b4a] bg-[#0f1729] shadow-lg shadow-blue-900/10">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-md bg-[#3461ff]/20 flex items-center justify-center mr-3">
                  <BarChart className="h-5 w-5 text-[#4f87ff]" />
                </div>
                <div>
                  <p className="text-[#8ba3d4] text-sm">Avg. Volume</p>
                  <p className="text-white font-medium">
                    {new Intl.NumberFormat().format(
                      Math.round(stockData.volume.reduce((sum, vol) => sum + vol, 0) / stockData.volume.length),
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
