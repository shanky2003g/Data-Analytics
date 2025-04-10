"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp, DollarSign, TrendingUp, BarChart4, Activity } from "lucide-react"
import { motion } from "framer-motion"
import type { StockData, SentimentAnalysis } from "./stock-dashboard"

interface StockInfoProps {
  stockData: StockData
  ticker: string
  sentimentAnalysis: SentimentAnalysis | null
}

export default function StockInfo({ stockData, ticker, sentimentAnalysis }: StockInfoProps) {
  const [forceRender, setForceRender] = useState(false)

  useEffect(() => {
    setForceRender((prev) => !prev)
  }, [stockData])

  // Check if data is available
  if (!stockData || stockData.date.length === 0) {
    return <div>No data available for {ticker}.</div>
  }

  // Sort the data by date (ascending order)
  const sortedIndices = stockData.date
    .map((date, index) => ({ date, index }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => item.index)

  const sortedData = {
    date: sortedIndices.map((index) => stockData.date[index]),
    open: sortedIndices.map((index) => stockData.open[index]),
    close: sortedIndices.map((index) => stockData.close[index]),
    high: sortedIndices.map((index) => stockData.high[index]),
    low: sortedIndices.map((index) => stockData.low[index]),
    volume: sortedIndices.map((index) => stockData.volume[index]),
  }

  // Get the latest data point
  const latestIndex = sortedData.date.length - 1
  const previousIndex = latestIndex - 1

  // Check if there are at least two data points
  if (latestIndex < 1) {
    return <div>Insufficient data to calculate price change for {ticker}.</div>
  }

  // Calculate price change
  const priceChange = sortedData.close[latestIndex] - sortedData.close[previousIndex]
  const percentChange = (priceChange / sortedData.close[previousIndex]) * 100
  const isPositive = priceChange >= 0

  // Force re-render to ensure data is displayed correctly

  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl text-primary flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {ticker} Stock Information
          <span
            className={`text-sm px-2 py-1 rounded-full ${
              isPositive
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {isPositive ? (
              <ArrowUp className="h-3 w-3 inline mr-1" aria-label="Price increase" />
            ) : (
              <ArrowDown className="h-3 w-3 inline mr-1" aria-label="Price decrease" />
            )}
            {Math.abs(priceChange).toFixed(2)} ({Math.abs(percentChange).toFixed(2)}%)
          </span>
          {sentimentAnalysis && (
            <span
              className={`ml-auto text-sm px-2 py-1 rounded-full ${
                sentimentAnalysis.recommendation === "buy"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : sentimentAnalysis.recommendation === "sell"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              }`}
            >
              {sentimentAnalysis.recommendation.toUpperCase()}
            </span>
          )}
        </CardTitle>
        <CardDescription>Latest trading data as of {sortedData.date[latestIndex]}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <motion.div
            className="flex flex-col p-3 rounded-lg bg-primary/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" /> Open
            </span>
            <span className="text-2xl font-bold text-primary">${sortedData.open[latestIndex].toFixed(2)}</span>
          </motion.div>
          <motion.div
            className="flex flex-col p-3 rounded-lg bg-primary/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-sm text-muted-foreground flex items-center">
              <Activity className="h-3 w-3 mr-1" /> Close
            </span>
            <span className="text-2xl font-bold text-primary">${sortedData.close[latestIndex].toFixed(2)}</span>
          </motion.div>
          <motion.div
            className="flex flex-col p-3 rounded-lg bg-primary/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-sm text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" /> High
            </span>
            <span className="text-2xl font-bold text-primary">${sortedData.high[latestIndex].toFixed(2)}</span>
          </motion.div>
          <motion.div
            className="flex flex-col p-3 rounded-lg bg-primary/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className="text-sm text-muted-foreground flex items-center">
              <ArrowDown className="h-3 w-3 mr-1" /> Low
            </span>
            <span className="text-2xl font-bold text-primary">${sortedData.low[latestIndex].toFixed(2)}</span>
          </motion.div>
          <motion.div
            className="flex flex-col p-3 rounded-lg bg-primary/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <span className="text-sm text-muted-foreground flex items-center">
              <BarChart4 className="h-3 w-3 mr-1" /> Volume
            </span>
            <span className="text-2xl font-bold text-primary">
              {new Intl.NumberFormat().format(sortedData.volume[latestIndex])}
            </span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
