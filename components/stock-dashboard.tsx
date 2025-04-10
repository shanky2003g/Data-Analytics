"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Loader2,
  AlertCircle,
  Search,
  TrendingUp,
  Newspaper,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Clock,
  CandlestickChart,
  LineChart,
  BarChart,
  PieChart,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import PredictionResults from "@/components/prediction-results"
import StockNews from "@/components/stock-news"
import { fetchStockData, predictStockPrice, fetchStockNews, analyzeSentiment } from "@/lib/stock-actions"
import { ThemeToggle } from "@/components/theme-toggle"
import { MarketTicker } from "@/components/market-ticker"
import { StockMetrics } from "@/components/stock-metrics"
import { TradingViewWidget } from "@/components/trading-view-widget"

export type StockData = {
  date: string[]
  open: number[]
  close: number[]
  high: number[]
  low: number[]
  volume: number[]
}

export type PredictionResult = {
  predictedPrices: number[]
  predictedDates: string[]
  rmse: number
}

export type NewsItem = {
  title: string
  url: string
  source: string
  publishedAt: string
  summary: string
  sentiment: "positive" | "negative" | "neutral"
}

export type SentimentAnalysis = {
  overallSentiment: "positive" | "negative" | "neutral"
  score: number
  recommendation: "buy" | "sell" | "hold"
  summary: string
}

export default function StockDashboard() {
  const [ticker, setTicker] = useState<string>("")
  const [stockData, setStockData] = useState<StockData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [predictionModel, setPredictionModel] = useState<string>("linear")
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  const [predictionLoading, setPredictionLoading] = useState<boolean>(false)
  const [newsData, setNewsData] = useState<NewsItem[]>([])
  const [newsLoading, setNewsLoading] = useState<boolean>(false)
  const [sentimentAnalysis, setSentimentAnalysis] = useState<SentimentAnalysis | null>(null)
  const [activeTab, setActiveTab] = useState<string>("dashboard")
  const [currentTime, setCurrentTime] = useState<string>("")

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleFetchData = async () => {
    if (!ticker) {
      setError("Please enter a stock ticker")
      return
    }

    setLoading(true)
    setError(null)
    setPredictionResult(null)
    setNewsData([])
    setSentimentAnalysis(null)

    try {
      const data = await fetchStockData(ticker)
      setStockData(data)

      // Fetch news in parallel
      setNewsLoading(true)
      try {
        const news = await fetchStockNews(ticker)
        setNewsData(news)

        // Analyze sentiment
        const sentiment = await analyzeSentiment(ticker, news)
        setSentimentAnalysis(sentiment)
      } catch (newsErr) {
        console.error("Failed to fetch news:", newsErr)
      } finally {
        setNewsLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stock data")
      setStockData(null)
    } finally {
      setLoading(false)
    }
  }

  const handlePredict = async () => {
    if (!stockData) {
      setError("Please fetch stock data first")
      return
    }

    setPredictionLoading(true)
    setError(null)

    try {
      const result = await predictStockPrice(ticker, predictionModel)
      setPredictionResult(result)
      setActiveTab("predictions")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to predict stock price")
      setPredictionResult(null)
    } finally {
      setPredictionLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFetchData()
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0a0e17]">
      {/* Market Ticker Tape */}
      <MarketTicker />

      {/* Navigation Bar */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-[#0f1729]/90 backdrop-blur-md border-b border-[#1e2b4a]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-[#4f87ff]">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold hidden md:block text-white">StockSense AI Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-[#8ba3d4] bg-[#1a2542] px-3 py-1 rounded-md">
              <Clock className="h-4 w-4 mr-2" />
              <span className="text-sm font-mono">{currentTime}</span>
            </div>
            <Link href="/project" className="text-sm text-[#8ba3d4] hover:text-white">
              Project Info
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="container mx-auto space-y-6 py-8 pt-20 relative z-10 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-[#1e2b4a] overflow-hidden bg-[#0f1729] shadow-lg shadow-blue-900/10" id="dashboard">
            <CardHeader className="bg-[#131f38] border-b border-[#1e2b4a]">
              <CardTitle className="text-2xl md:text-3xl text-white flex items-center">
                <CandlestickChart className="mr-2 h-6 w-6 text-[#4f87ff]" />
                Stock Analysis Dashboard
              </CardTitle>
              <CardDescription className="text-base text-[#8ba3d4]">
                Enter a stock ticker to view real-time data, predictions, and news sentiment
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative sm:max-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8ba3d4]" />
                  <Input
                    placeholder="Enter ticker (e.g., AAPL)"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    className="pl-9 border-[#1e2b4a] bg-[#131f38] focus-visible:ring-[#4f87ff] text-white"
                  />
                </div>
                <Button
                  onClick={handleFetchData}
                  disabled={loading}
                  className="relative overflow-hidden group bg-gradient-to-r from-[#3461ff] to-[#4f87ff] hover:from-[#2d56e3] hover:to-[#4678e6]"
                >
                  <span className="relative z-10 flex items-center">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>Fetch Stock Data</>
                    )}
                  </span>
                </Button>
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4 bg-red-900/20 border-red-800 text-red-300">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center p-12">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-md bg-[#4f87ff]/30"></div>
              <Loader2 className="h-12 w-12 animate-spin text-[#4f87ff] relative z-10" />
            </div>
          </div>
        )}

        <AnimatePresence>
          {stockData && !loading && (
            <>
              {/* Stock Metrics Overview */}
              <StockMetrics stockData={stockData} ticker={ticker} sentimentAnalysis={sentimentAnalysis} />

              {/* TradingView Chart Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-[#1e2b4a] overflow-hidden bg-[#0f1729] shadow-lg shadow-blue-900/10">
                  <CardHeader className="bg-[#131f38] border-b border-[#1e2b4a] flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="text-xl text-white flex items-center">
                        <LineChart className="h-5 w-5 mr-2 text-[#4f87ff]" />
                        {ticker} Price Chart
                      </CardTitle>
                      <CardDescription className="text-[#8ba3d4]">
                        Technical analysis chart with indicators
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1e2b4a] text-[#8ba3d4] hover:text-white hover:bg-[#1a2542]"
                      >
                        <BarChart className="h-4 w-4 mr-1" /> OHLC
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1e2b4a] text-[#8ba3d4] hover:text-white hover:bg-[#1a2542]"
                      >
                        <LineChart className="h-4 w-4 mr-1" /> Line
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#1e2b4a] text-[#8ba3d4] hover:text-white hover:bg-[#1a2542]"
                      >
                        <PieChart className="h-4 w-4 mr-1" /> Volume
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 p-0 h-[500px]">
                    <TradingViewWidget symbol={ticker} stockData={stockData} predictionResult={predictionResult} />
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                id="predictions"
              >
                <Card className="border-[#1e2b4a] overflow-hidden bg-[#0f1729] shadow-lg shadow-blue-900/10">
                  <CardHeader className="bg-[#131f38] border-b border-[#1e2b4a]">
                    <CardTitle className="text-xl text-white flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-[#4f87ff]" />
                      AI Price Prediction
                    </CardTitle>
                    <CardDescription className="text-[#8ba3d4]">
                      Select a model to predict future stock prices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs
                      defaultValue="linear"
                      value={predictionModel}
                      onValueChange={setPredictionModel}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-3 mb-4 bg-[#131f38] p-1">
                        <TabsTrigger
                          value="linear"
                          className="data-[state=active]:bg-[#3461ff] data-[state=active]:text-white"
                        >
                          Linear Regression
                        </TabsTrigger>
                        <TabsTrigger
                          value="arima"
                          className="data-[state=active]:bg-[#3461ff] data-[state=active]:text-white"
                        >
                          ARIMA
                        </TabsTrigger>
                        <TabsTrigger
                          value="lstm"
                          className="data-[state=active]:bg-[#3461ff] data-[state=active]:text-white"
                        >
                          LSTM
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="linear">
                        <p className="mb-4 text-[#8ba3d4] bg-[#131f38]/50 p-3 rounded-md border border-[#1e2b4a]">
                          Linear Regression uses a linear approach to modeling the relationship between the dependent
                          variable (stock price) and independent variables (time). Best for short-term predictions in
                          stable markets.
                        </p>
                      </TabsContent>
                      <TabsContent value="arima">
                        <p className="mb-4 text-[#8ba3d4] bg-[#131f38]/50 p-3 rounded-md border border-[#1e2b4a]">
                          ARIMA (AutoRegressive Integrated Moving Average) is a statistical model that uses time series
                          data to predict future values. Excellent for capturing seasonal patterns and trends.
                        </p>
                      </TabsContent>
                      <TabsContent value="lstm">
                        <p className="mb-4 text-[#8ba3d4] bg-[#131f38]/50 p-3 rounded-md border border-[#1e2b4a]">
                          LSTM (Long Short-Term Memory) is a type of recurrent neural network capable of learning
                          long-term dependencies in sequence prediction problems. Superior for complex market
                          conditions.
                        </p>
                      </TabsContent>

                      <div className="flex justify-center mt-4">
                        <Button
                          onClick={handlePredict}
                          disabled={predictionLoading}
                          className="bg-gradient-to-r from-[#3461ff] to-[#4f87ff] hover:from-[#2d56e3] hover:to-[#4678e6] relative overflow-hidden group"
                        >
                          <span className="relative z-10 flex items-center">
                            {predictionLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Predicting...
                              </>
                            ) : (
                              <>Predict Future Prices</>
                            )}
                          </span>
                        </Button>
                      </div>
                    </Tabs>

                    {predictionLoading && (
                      <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#4f87ff]" />
                      </div>
                    )}

                    {predictionResult && !predictionLoading && (
                      <PredictionResults result={predictionResult} model={predictionModel} ticker={ticker} />
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                id="news"
              >
                <Card className="border-[#1e2b4a] overflow-hidden bg-[#0f1729] shadow-lg shadow-blue-900/10">
                  <CardHeader className="bg-[#131f38] border-b border-[#1e2b4a]">
                    <CardTitle className="text-xl text-white flex items-center">
                      <Newspaper className="mr-2 h-5 w-5 text-[#4f87ff]" />
                      News & Sentiment Analysis
                    </CardTitle>
                    <CardDescription className="text-[#8ba3d4]">
                      Latest news and sentiment-based recommendation for {ticker}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {newsLoading ? (
                      <div className="flex justify-center items-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-[#4f87ff]" />
                      </div>
                    ) : (
                      <>
                        {sentimentAnalysis && (
                          <div className="mb-6 p-4 rounded-lg bg-[#131f38] border border-[#1e2b4a]">
                            <h3 className="text-lg font-semibold mb-2 flex items-center text-white">
                              Sentiment Analysis
                              {sentimentAnalysis.overallSentiment === "positive" ? (
                                <ThumbsUp className="ml-2 h-5 w-5 text-green-500" />
                              ) : sentimentAnalysis.overallSentiment === "negative" ? (
                                <ThumbsDown className="ml-2 h-5 w-5 text-red-500" />
                              ) : (
                                <span className="ml-2 h-5 w-5 text-yellow-500">•</span>
                              )}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="p-3 rounded-md bg-[#0f1729] border border-[#1e2b4a]">
                                <p className="text-sm text-[#8ba3d4]">Sentiment</p>
                                <p
                                  className={`text-lg font-semibold ${
                                    sentimentAnalysis.overallSentiment === "positive"
                                      ? "text-green-500"
                                      : sentimentAnalysis.overallSentiment === "negative"
                                        ? "text-red-500"
                                        : "text-yellow-500"
                                  }`}
                                >
                                  {sentimentAnalysis.overallSentiment.charAt(0).toUpperCase() +
                                    sentimentAnalysis.overallSentiment.slice(1)}
                                </p>
                              </div>
                              <div className="p-3 rounded-md bg-[#0f1729] border border-[#1e2b4a]">
                                <p className="text-sm text-[#8ba3d4]">Score</p>
                                <p className="text-lg font-semibold text-white">{sentimentAnalysis.score.toFixed(2)}</p>
                              </div>
                              <div className="p-3 rounded-md bg-[#0f1729] border border-[#1e2b4a]">
                                <p className="text-sm text-[#8ba3d4]">Recommendation</p>
                                <p
                                  className={`text-lg font-semibold ${
                                    sentimentAnalysis.recommendation === "buy"
                                      ? "text-green-500"
                                      : sentimentAnalysis.recommendation === "sell"
                                        ? "text-red-500"
                                        : "text-yellow-500"
                                  }`}
                                >
                                  {sentimentAnalysis.recommendation.toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm text-[#8ba3d4] bg-[#0f1729] p-3 rounded-md border border-[#1e2b4a]">
                              {sentimentAnalysis.summary}
                            </p>
                          </div>
                        )}

                        <StockNews news={newsData} />
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
