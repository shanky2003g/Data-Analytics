"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThreeDCardProps {
  title: string
  description: string
  icon: string
  className?: string
}

export function ThreeDCardDemo({ title, description, icon, className }: ThreeDCardProps) {
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

    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative h-80 w-full rounded-xl bg-gradient-to-br from-primary/20 via-primary/5 to-primary/20 p-8 shadow-xl transition-all duration-200",
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
      <div className="flex h-full flex-col justify-between">
        <div className="text-6xl">{icon}</div>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(20px)",
        }}
      />
    </motion.div>
  )
}
