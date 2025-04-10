"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink, ThumbsUp, ThumbsDown, Calendar, Clock } from "lucide-react"
import type { NewsItem } from "./stock-dashboard"

interface StockNewsProps {
  news: NewsItem[]
}

export default function StockNews({ news }: StockNewsProps) {
  const [visibleCount, setVisibleCount] = useState(3)

  if (!news || news.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-[#8ba3d4]">No news articles available at this time.</p>
      </div>
    )
  }

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, news.length))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center">
        <span className="w-1 h-5 bg-[#4f87ff] rounded-full mr-2"></span>
        Latest News
      </h3>

      <div className="space-y-4">
        {news.slice(0, visibleCount).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-md hover:shadow-blue-900/20 transition-shadow border-[#1e2b4a] bg-[#131f38]">
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-base text-white line-clamp-2 mb-1">{item.title}</h4>
                    <div className="flex items-center text-xs text-[#8ba3d4] mb-2">
                      <span className="font-medium">{item.source}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>
                        {new Date(item.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <span className="mx-2">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                      <span className="ml-2">
                        {item.sentiment === "positive" ? (
                          <ThumbsUp className="h-3 w-3 text-green-500" />
                        ) : item.sentiment === "negative" ? (
                          <ThumbsDown className="h-3 w-3 text-red-500" />
                        ) : null}
                      </span>
                    </div>
                    <p className="text-sm text-[#8ba3d4] line-clamp-2">{item.summary}</p>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4f87ff] hover:text-[#3461ff] bg-[#0f1729] p-2 rounded-full"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {visibleCount < news.length && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={loadMore}
            className="border-[#1e2b4a] text-[#8ba3d4] hover:text-white hover:bg-[#1a2542]"
          >
            Load More News
          </Button>
        </div>
      )}
    </div>
  )
}
