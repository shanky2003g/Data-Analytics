"use server"

import type { StockData, PredictionResult, NewsItem, SentimentAnalysis } from "@/components/stock-dashboard"

// Function to fetch stock data from Alpha Vantage API
export async function fetchStockData(ticker: string): Promise<StockData> {
  try {
    const apiKey ="KGU2OXKCPPK3B9KH"
    if (!apiKey) {
      throw new Error("Alpha Vantage API key is not configured")
    }

    // Fetch daily time series data from Alpha Vantage
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=KGU2OXKCPPK3B9KH`
    )
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Check if we got an error message from Alpha Vantage
    if (data["Error Message"]) {
      throw new Error(data["Error Message"])
    }

    // Check if we have the time series data
    if (!data["Time Series (Daily)"]) {
      throw new Error("No data available for this ticker symbol")
    }

    const timeSeriesData = data["Time Series (Daily)"]
    const dates: string[] = []
    const open: number[] = []
    const high: number[] = []
    const low: number[] = []
    const close: number[] = []
    const volume: number[] = []

    // Process the data (most recent 30 days)
    const sortedDates = Object.keys(timeSeriesData).sort().reverse()
    const last30Days = sortedDates.slice(0, 30)

    for (const date of last30Days) {
      const dailyData = timeSeriesData[date]
      dates.push(date)
      open.push(Number.parseFloat(dailyData["1. open"]))
      high.push(Number.parseFloat(dailyData["2. high"]))
      low.push(Number.parseFloat(dailyData["3. low"]))
      close.push(Number.parseFloat(dailyData["4. close"]))
      volume.push(Number.parseInt(dailyData["5. volume"]))
    }

    return { date: dates, open, close, high, low, volume }
  } catch (error) {
    console.error("Error fetching stock data:", error)
    throw new Error(`Failed to fetch data for ${ticker}: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Function to predict stock prices using different models
export async function predictStockPrice(ticker: string, model: string): Promise<PredictionResult> {
  try {
    // Get historical data first
    const stockData = await fetchStockData(ticker)
    const closePrices = stockData.close
    const lastPrice = closePrices[closePrices.length - 1]

    // Generate future dates
    const lastDate = new Date(stockData.date[stockData.date.length - 1])
    const futureDates: string[] = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date(lastDate)
      date.setDate(date.getDate() + i)
      futureDates.push(date.toISOString().split("T")[0])
    }

    // Generate predictions based on model
    let predictedPrices: number[] = []
    let rmse: number

    switch (model) {
      case "linear":
        // Simple linear regression model
        predictedPrices = linearRegressionPredict(closePrices, futureDates.length)
        rmse = calculateRMSE(closePrices.slice(-7), linearRegressionPredict(closePrices.slice(0, -7), 7))
        break

      case "arima":
        // ARIMA-like pattern (simplified)
        predictedPrices = arimaPredict(closePrices, futureDates.length)
        rmse = calculateRMSE(closePrices.slice(-7), arimaPredict(closePrices.slice(0, -7), 7))
        break

      case "lstm":
        // LSTM-like pattern (simplified)
        predictedPrices = lstmPredict(closePrices, futureDates.length)
        rmse = calculateRMSE(closePrices.slice(-7), lstmPredict(closePrices.slice(0, -7), 7))
        break

      default:
        throw new Error(`Unknown prediction model: ${model}`)
    }

    return {
      predictedPrices,
      predictedDates: futureDates,
      rmse,
    }
  } catch (error) {
    console.error("Error predicting stock prices:", error)
    throw new Error(`Failed to predict prices for ${ticker} using ${model} model`)
  }
}

// Function to fetch news for a stock
export async function fetchStockNews(ticker: string): Promise<NewsItem[]> {
  // In a real implementation, this would call a news API
  // For demo purposes, we'll generate mock news data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const currentDate = new Date()
  const mockNews: NewsItem[] = [
    {
      title: `${ticker} Reports Strong Quarterly Earnings, Exceeding Analyst Expectations`,
      url: "#",
      source: "Financial Times",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 1)).toISOString(),
      summary: `${ticker} announced quarterly earnings that surpassed Wall Street expectations, with revenue growing 15% year-over-year. The company also raised its full-year guidance.`,
      sentiment: "positive",
    },
    {
      title: `${ticker} Announces New Product Line, Targeting Emerging Markets`,
      url: "#",
      source: "Bloomberg",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 2)).toISOString(),
      summary: `${ticker} unveiled a new product line designed specifically for emerging markets, which analysts believe could open significant growth opportunities.`,
      sentiment: "positive",
    },
    {
      title: `${ticker} Faces Supply Chain Challenges Amid Global Shortages`,
      url: "#",
      source: "Reuters",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 3)).toISOString(),
      summary: `${ticker} acknowledged ongoing supply chain disruptions that could impact production targets for the upcoming quarter, though the company maintains its long-term outlook.`,
      sentiment: "negative",
    },
    {
      title: `Analyst Downgrades ${ticker} Citing Valuation Concerns`,
      url: "#",
      source: "CNBC",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 4)).toISOString(),
      summary: `A prominent Wall Street analyst downgraded ${ticker} from "Buy" to "Hold," citing concerns about the stock's current valuation relative to peers.`,
      sentiment: "negative",
    },
    {
      title: `${ticker} Expands Partnership with Tech Giant for Cloud Services`,
      url: "#",
      source: "Wall Street Journal",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 5)).toISOString(),
      summary: `${ticker} announced an expanded partnership with a major cloud provider, which is expected to reduce operational costs and improve service delivery.`,
      sentiment: "positive",
    },
    {
      title: `${ticker} CEO Discusses Future Growth Strategy in Industry Conference`,
      url: "#",
      source: "Investor's Business Daily",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 6)).toISOString(),
      summary: `The CEO of ${ticker} outlined the company's five-year growth strategy at an industry conference, highlighting investments in AI and sustainable technologies.`,
      sentiment: "neutral",
    },
    {
      title: `${ticker} Completes Acquisition of Startup to Enhance Digital Capabilities`,
      url: "#",
      source: "TechCrunch",
      publishedAt: new Date(currentDate.setDate(currentDate.getDate() - 7)).toISOString(),
      summary: `${ticker} has completed its acquisition of a promising tech startup, which is expected to enhance the company's digital transformation initiatives.`,
      sentiment: "positive",
    },
  ]

  return mockNews
}

// Function to analyze sentiment based on news
export async function analyzeSentiment(ticker: string, news: NewsItem[]): Promise<SentimentAnalysis> {
  // In a real implementation, this would use NLP or a sentiment analysis API
  // For demo purposes, we'll generate a mock sentiment analysis

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Count positive, negative, and neutral sentiments
  const sentimentCounts = news.reduce(
    (counts, item) => {
      counts[item.sentiment]++
      return counts
    },
    { positive: 0, negative: 0, neutral: 0 },
  )

  // Calculate overall sentiment
  const totalArticles = news.length
  const positiveRatio = sentimentCounts.positive / totalArticles
  const negativeRatio = sentimentCounts.negative / totalArticles

  let overallSentiment: "positive" | "negative" | "neutral"
  let recommendation: "buy" | "sell" | "hold"
  let score: number

  if (positiveRatio > 0.6) {
    overallSentiment = "positive"
    recommendation = "buy"
    score = 0.7 + Math.random() * 0.3 // Score between 0.7 and 1.0
  } else if (negativeRatio > 0.6) {
    overallSentiment = "negative"
    recommendation = "sell"
    score = Math.random() * 0.3 // Score between 0.0 and 0.3
  } else {
    overallSentiment = "neutral"
    recommendation = "hold"
    score = 0.3 + Math.random() * 0.4 // Score between 0.3 and 0.7
  }

  // Generate summary based on sentiment
  let summary = ""
  if (overallSentiment === "positive") {
    summary = `Recent news about ${ticker} is predominantly positive, with ${sentimentCounts.positive} positive articles out of ${totalArticles}. The company appears to be performing well and market sentiment is favorable.`
  } else if (overallSentiment === "negative") {
    summary = `Recent news about ${ticker} shows concerning trends, with ${sentimentCounts.negative} negative articles out of ${totalArticles}. Investors should exercise caution as market sentiment appears unfavorable.`
  } else {
    summary = `Recent news about ${ticker} is mixed, with ${sentimentCounts.positive} positive and ${sentimentCounts.negative} negative articles out of ${totalArticles}. The market sentiment is currently neutral, suggesting a hold position.`
  }

  return {
    overallSentiment,
    score,
    recommendation,
    summary,
  }
}

// Linear Regression prediction function
function linearRegressionPredict(prices: number[], daysToPredict: number): number[] {
  const n = prices.length
  const x = Array.from({ length: n }, (_, i) => i)
  const y = prices

  // Calculate slope and intercept
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0
  for (let i = 0; i < n; i++) {
    sumX += x[i]
    sumY += y[i]
    sumXY += x[i] * y[i]
    sumX2 += x[i] * x[i]
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  // Generate predictions
  const predictions: number[] = []
  for (let i = 1; i <= daysToPredict; i++) {
    const predictedValue = slope * (n + i - 1) + intercept
    predictions.push(Number(predictedValue.toFixed(2)))
  }

  return predictions
}

// ARIMA prediction function (simplified)
function arimaPredict(prices: number[], daysToPredict: number): number[] {
  const predictions: number[] = []
  const lastPrice = prices[prices.length - 1]

  // Calculate average price change over the last 5 days
  let avgChange = 0
  for (let i = prices.length - 5; i < prices.length; i++) {
    if (i > 0) {
      avgChange += prices[i] - prices[i - 1]
    }
  }
  avgChange /= 5

  // Generate predictions with some randomness
  for (let i = 1; i <= daysToPredict; i++) {
    const volatility = lastPrice * 0.01 // 1% volatility
    const randomFactor = (Math.random() - 0.5) * volatility
    const predictedValue = lastPrice + avgChange * i + randomFactor
    predictions.push(Number(predictedValue.toFixed(2)))
  }

  return predictions
}

// LSTM prediction function (simplified)
function lstmPredict(prices: number[], daysToPredict: number): number[] {
  const predictions: number[] = []
  const lastPrice = prices[prices.length - 1]

  // Calculate weighted average of recent prices
  const weights = [0.4, 0.3, 0.2, 0.1] // More recent prices have higher weights
  let weightedSum = 0
  let weightSum = 0

  for (let i = 0; i < weights.length; i++) {
    if (prices.length - 1 - i >= 0) {
      weightedSum += weights[i] * prices[prices.length - 1 - i]
      weightSum += weights[i]
    }
  }

  const weightedAvg = weightedSum / weightSum
  const trend = weightedAvg - prices[prices.length - weights.length - 1]

  // Generate predictions
  for (let i = 1; i <= daysToPredict; i++) {
    const volatility = lastPrice * 0.005 // 0.5% volatility (lower than ARIMA)
    const randomFactor = (Math.random() - 0.5) * volatility
    const predictedValue = lastPrice + trend * i + randomFactor
    predictions.push(Number(predictedValue.toFixed(2)))
  }

  return predictions
}

// Calculate Root Mean Squared Error
function calculateRMSE(actual: number[], predicted: number[]): number {
  if (actual.length !== predicted.length) {
    throw new Error("Arrays must have the same length")
  }

  let sumSquaredError = 0
  for (let i = 0; i < actual.length; i++) {
    sumSquaredError += Math.pow(actual[i] - predicted[i], 2)
  }

  return Math.sqrt(sumSquaredError / actual.length)
}
