"use client"

import Link from "next/link"
import {
  ArrowRight,
  Database,
  BrainCircuit,
  LineChart,
  BookOpen,
  Code,
  Server,
  Layers,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { SparklesCore } from "@/components/ui/sparkles"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-black/60 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto flex justify-between items-center py-4 px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-white">
              StockSense AI
            </Link>
            <div className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
                Dashboard
              </Link>
              <Link href="/project" className="text-gray-300 hover:text-white transition">
                Project Info
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/dashboard">
                Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-grid-white/[0.05] bg-[length:50px_50px]" />
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1" />
          <div className="h-32 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="px-4 py-1 rounded-full border border-indigo-500/40 text-sm font-medium text-indigo-300 bg-indigo-900/20 backdrop-blur-sm">
              Academic Project | NITK
            </span>
            <h1 className="mt-6 text-4xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-tight">
              <TextGenerateEffect words="Predict Market Trends with Sentiment-Driven AI" />
            </h1>
            <p className="mt-6 text-xl text-indigo-200 max-w-2xl mx-auto">
              Advanced stock prediction platform combining deep learning with sentiment analysis for more accurate
              forecasting
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/dashboard">
                  Try the Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-indigo-500/50 text-indigo-200 hover:bg-indigo-900/30"
              >
                <Link href="/project">
                  View Project Details <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Background Sparkles */}
        <div className="absolute inset-0 h-full w-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={70}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-gradient-to-b from-black to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-indigo-500/40 text-sm font-medium text-indigo-300 bg-indigo-900/20 backdrop-blur-sm mb-4">
              Technology Stack
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Powered by Cutting-Edge Tech</h2>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
              Our platform leverages modern technologies and advanced algorithms to deliver accurate predictions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Frontend Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-xl border-blue-500/20 h-full overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition duration-300">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-blue-600/30 w-fit mb-4 group-hover:bg-blue-600/50 transition-colors">
                    <Code className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Frontend Stack</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-blue-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      Next.js 14 (React Framework)
                    </li>
                    <li className="flex items-center text-blue-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      TypeScript for Type Safety
                    </li>
                    <li className="flex items-center text-blue-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      Tailwind CSS for Styling
                    </li>
                    <li className="flex items-center text-blue-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      Framer Motion for Animations
                    </li>
                    <li className="flex items-center text-blue-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
                      Recharts for Data Visualization
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Backend & APIs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-xl border-purple-500/20 h-full overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition duration-300">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-purple-600/30 w-fit mb-4 group-hover:bg-purple-600/50 transition-colors">
                    <Server className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Backend & APIs</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-purple-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                      Next.js Server Actions
                    </li>
                    <li className="flex items-center text-purple-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                      Alpha Vantage API for Stock Data
                    </li>
                    <li className="flex items-center text-purple-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                      News API for Financial News
                    </li>
                    <li className="flex items-center text-purple-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                      Serverless Functions
                    </li>
                    <li className="flex items-center text-purple-200">
                      <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                      Edge Runtime for Performance
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Processing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-xl border-green-500/20 h-full overflow-hidden group hover:shadow-lg hover:shadow-green-500/10 transition duration-300">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-green-600/30 w-fit mb-4 group-hover:bg-green-600/50 transition-colors">
                    <Database className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Data Processing</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      Python for Data Analysis
                    </li>
                    <li className="flex items-center text-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      Pandas for Data Manipulation
                    </li>
                    <li className="flex items-center text-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      NumPy for Numerical Operations
                    </li>
                    <li className="flex items-center text-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      Scikit-learn for ML Algorithms
                    </li>
                    <li className="flex items-center text-green-200">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                      NLTK for Text Processing
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Prediction Models */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full border border-indigo-500/40 text-sm font-medium text-indigo-300 bg-indigo-900/20 backdrop-blur-sm mb-4">
              Prediction Models
            </span>
            <h2 className="text-3xl font-bold text-white mb-6">Advanced AI Models</h2>
            <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
              Our platform employs multiple prediction models to provide comprehensive market insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Linear Regression",
                description:
                  "A statistical approach that models the relationship between dependent and independent variables. Effective for short-term predictions in stable markets.",
                icon: <LineChart className="h-8 w-8" />,
                color: "from-blue-900/40 to-blue-800/20",
                borderColor: "border-blue-500/20",
                iconBg: "bg-blue-600/30",
                iconHoverBg: "bg-blue-600/50",
                textColor: "text-blue-200",
              },
              {
                title: "ARIMA",
                description:
                  "AutoRegressive Integrated Moving Average model captures complex patterns in time series data, particularly effective for data with seasonal trends.",
                icon: <Layers className="h-8 w-8" />,
                color: "from-purple-900/40 to-purple-800/20",
                borderColor: "border-purple-500/20",
                iconBg: "bg-purple-600/30",
                iconHoverBg: "bg-purple-600/50",
                textColor: "text-purple-200",
              },
              {
                title: "LSTM Neural Networks",
                description:
                  "Long Short-Term Memory networks excel at learning long-term dependencies in sequential data, making them ideal for complex stock market predictions.",
                icon: <BrainCircuit className="h-8 w-8" />,
                color: "from-green-900/40 to-green-800/20",
                borderColor: "border-green-500/20",
                iconBg: "bg-green-600/30",
                iconHoverBg: "bg-green-600/50",
                textColor: "text-green-200",
              },
            ].map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`bg-gradient-to-br ${model.color} backdrop-blur-xl ${model.borderColor} h-full overflow-hidden group hover:shadow-lg hover:shadow-indigo-500/10 transition duration-300`}
                >
                  <CardContent className="p-6">
                    <div
                      className={`p-3 rounded-lg ${model.iconBg} w-fit mb-4 group-hover:${model.iconHoverBg} transition-colors`}
                    >
                      {model.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
                    <p className={model.textColor}>{model.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sentiment Analysis Section */}
      <section className="py-24 bg-gradient-to-b from-indigo-950 to-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-indigo-500/40 text-sm font-medium text-indigo-300 bg-indigo-900/20 backdrop-blur-sm mb-4">
                Sentiment Analysis
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Harnessing the Power of Market Sentiment
              </h2>
              <p className="text-lg text-indigo-200 mb-6">
                Our platform analyzes financial news and social media to gauge market sentiment, providing valuable
                insights beyond traditional technical analysis.
              </p>

              <ul className="space-y-4">
                {[
                  "Natural Language Processing to analyze financial news",
                  "Sentiment scoring of market-related content",
                  "Integration of sentiment data with price predictions",
                  "Buy/Sell/Hold recommendations based on sentiment trends",
                  "Real-time sentiment tracking for immediate insights",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-indigo-600/30 flex items-center justify-center mr-3 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    </span>
                    <span className="text-indigo-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur-xl"></div>
              <Card className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-xl border-indigo-500/20 overflow-hidden relative z-10">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-indigo-950/50 border border-indigo-500/20">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                        Positive Sentiment
                      </h4>
                      <p className="text-indigo-200">
                        Recent news about AAPL is predominantly positive, with 7 positive articles out of 10. The
                        company appears to be performing well and market sentiment is favorable.
                      </p>
                      <div className="mt-3 flex items-center">
                        <div className="h-2 flex-1 bg-indigo-950 rounded-full overflow-hidden">
                          <div className="h-full w-[70%] bg-green-500 rounded-full"></div>
                        </div>
                        <span className="ml-2 text-green-400 font-medium">70%</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-indigo-950/50 border border-indigo-500/20">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <ThumbsDown className="h-5 w-5 text-red-500 mr-2" />
                        Negative Sentiment
                      </h4>
                      <p className="text-indigo-200">
                        Recent news about TSLA shows concerning trends, with 6 negative articles out of 10. Investors
                        should exercise caution as market sentiment appears unfavorable.
                      </p>
                      <div className="mt-3 flex items-center">
                        <div className="h-2 flex-1 bg-indigo-950 rounded-full overflow-hidden">
                          <div className="h-full w-[60%] bg-red-500 rounded-full"></div>
                        </div>
                        <span className="ml-2 text-red-400 font-medium">60%</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-indigo-950/50 border border-indigo-500/20">
                      <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
                        <span className="h-5 w-5 flex items-center justify-center text-yellow-500 mr-2">•</span>
                        Neutral Sentiment
                      </h4>
                      <p className="text-indigo-200">
                        Recent news about MSFT is mixed, with 5 positive and 5 negative articles out of 10. The market
                        sentiment is currently neutral, suggesting a hold position.
                      </p>
                      <div className="mt-3 flex items-center">
                        <div className="h-2 flex-1 bg-indigo-950 rounded-full overflow-hidden">
                          <div className="h-full w-[50%] bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="ml-2 text-yellow-400 font-medium">50%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black to-indigo-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to predict market trends?</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-10">
            Start making data-driven investment decisions with our advanced stock prediction platform, developed as part
            of our academic research at NITK
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/dashboard">
                Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-indigo-500/50 text-indigo-200 hover:bg-indigo-900/30"
            >
              <Link href="/project">
                Learn About the Project <BookOpen className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-indigo-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white">StockSense AI</h3>
              <p className="text-gray-400 mt-2">National Institute of Technology Karnataka</p>
            </div>

            <div className="flex gap-8">
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
                Dashboard
              </Link>
              <Link href="/project" className="text-gray-400 hover:text-white transition">
                Project Info
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>© 2025 StockSense AI | Academic Project IT350 | NITK</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
