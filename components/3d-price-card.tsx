"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThreeDPriceCardProps {
  title: string
  value: string | number
  change?: number
  color?: "primary" | "secondary" | "accent" | "green" | "red"
  icon?: React.ReactNode
  className?: string
}

export function ThreeDPriceCard({ title, value, change, color = "primary", icon, className }: ThreeDPriceCardProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = (y - centerY) / 20
    const rotateYValue = (centerX - x) / 20

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const getGradient = () => {
    switch (color) {
      case "primary":
        return "from-primary/20 via-primary/10 to-primary/5"
      case "secondary":
        return "from-secondary/20 via-secondary/10 to-secondary/5"
      case "accent":
        return "from-accent/20 via-accent/10 to-accent/5"
      case "green":
        return "from-green-500/20 via-green-500/10 to-green-500/5"
      case "red":
        return "from-red-500/20 via-red-500/10 to-red-500/5"
      default:
        return "from-primary/20 via-primary/10 to-primary/5"
    }
  }

  const getTextColor = () => {
    switch (color) {
      case "primary":
        return "text-primary"
      case "secondary":
        return "text-secondary"
      case "accent":
        return "text-accent"
      case "green":
        return "text-green-500"
      case "red":
        return "text-red-500"
      default:
        return "text-primary"
    }
  }

  const getBorderColor = () => {
    switch (color) {
      case "primary":
        return "border-primary/20"
      case "secondary":
        return "border-secondary/20"
      case "accent":
        return "border-accent/20"
      case "green":
        return "border-green-500/20"
      case "red":
        return "border-red-500/20"
      default:
        return "border-primary/20"
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative h-full rounded-xl bg-gradient-to-br border p-6 shadow-lg transition-shadow duration-200 hover:shadow-xl",
        getGradient(),
        getBorderColor(),
        className,
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <div className="flex items-baseline">
            <h3 className={`text-2xl font-bold ${getTextColor()}`}>{value}</h3>
            {change !== undefined && (
              <span className={`ml-2 text-sm ${change >= 0 ? "text-green-500" : "text-red-500"} flex items-center`}>
                {change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(change).toFixed(2)}%
              </span>
            )}
          </div>
        </div>
        {icon && <div className={`p-2 rounded-lg ${getTextColor()} bg-background/80 backdrop-blur-sm`}>{icon}</div>}
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      />
    </motion.div>
  )
}
