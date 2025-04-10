"use client"

import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { motion } from "framer-motion"

type MarketData = {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export function MarketTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>([
    { symbol: "S&P 500", price: 5021.84, change: 15.29, changePercent: 0.31 },
    { symbol: "NASDAQ", price: 15990.66, change: 54.11, changePercent: 0.34 },
    { symbol: "DOW", price: 38671.69, change: -46.43, changePercent: -0.12 },
    { symbol: "AAPL", price: 182.52, change: 1.23, changePercent: 0.68 },
    { symbol: "MSFT", price: 404.87, change: 2.54, changePercent: 0.63 },
    { symbol: "GOOGL", price: 142.17, change: -0.87, changePercent: -0.61 },
    { symbol: "AMZN", price: 168.59, change: 0.91, changePercent: 0.54 },
    { symbol: "TSLA", price: 193.57, change: -2.34, changePercent: -1.19 },
    { symbol: "META", price: 464.38, change: 3.27, changePercent: 0.71 },
    { symbol: "NVDA", price: 726.13, change: 12.45, changePercent: 1.74 },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) =>
        prevData.map((item) => {
          const randomChange = (Math.random() - 0.5) * 2
          const newPrice = Number.parseFloat((item.price + randomChange).toFixed(2))
          const newChange = Number.parseFloat((newPrice - item.price + item.change).toFixed(2))
          const newChangePercent = Number.parseFloat(((newChange / (item.price - item.change)) * 100).toFixed(2))
          return {
            ...item,
            price: newPrice,
            change: newChange,
            changePercent: newChangePercent,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-[#0a0e17] border-b border-[#1e2b4a] py-1 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 30, repeat: Number.POSITIVE_INFINITY }}
          className="flex gap-8 items-center"
        >
          {marketData.concat(marketData).map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="font-medium text-white">{item.symbol}</span>
              <span className="text-white">${item.price.toFixed(2)}</span>
              <span className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {item.change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(item.change).toFixed(2)} ({Math.abs(item.changePercent).toFixed(2)}%)
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
