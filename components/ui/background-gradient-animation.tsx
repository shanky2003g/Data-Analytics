"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function BackgroundGradientAnimation({
  children,
  className,
  containerClassName,
  gradientBackgroundStart = "rgb(var(--background))",
  gradientBackgroundEnd = "rgb(var(--background))",
  firstColor = "hsl(var(--primary))",
  secondColor = "hsl(var(--secondary))",
  thirdColor = "hsl(var(--accent))",
  fourthColor = "hsl(var(--primary) / 0.5)",
  fifthColor = "hsl(var(--secondary) / 0.5)",
  pointerColor = "hsl(var(--primary))",
  size = "80%",
  blendingValue = "hard-light",
  opacity = "0.5",
  interactive = true,
  containerRef,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  gradientBackgroundStart?: string
  gradientBackgroundEnd?: string
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  opacity?: string
  interactive?: boolean
  containerRef?: React.RefObject<HTMLDivElement>
}) {
  const interactiveRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorMoving, setCursorMoving] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const colors = [firstColor, secondColor, thirdColor, fourthColor, fifthColor]

  const handleMouseMove = (e: MouseEvent) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setCursorPosition({ x, y })
      setCursorMoving(true)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % colors.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [colors.length])

  useEffect(() => {
    if (interactive && interactiveRef.current) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [interactive])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-background",
        containerClassName,
      )}
      style={{
        background: `linear-gradient(to bottom right, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
      }}
    >
      <div ref={interactiveRef} className="absolute inset-0 z-10" />
      <div className={cn("relative z-10 flex h-full w-full items-center justify-center", className)}>{children}</div>

      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            </filter>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              {colors.map((color, index) => (
                <stop
                  key={index}
                  offset={`${(index / (colors.length - 1)) * 100}%`}
                  stopColor={color}
                  stopOpacity={index === activeIndex ? "1" : "0.5"}
                >
                  <animate
                    attributeName="stop-opacity"
                    values={index === activeIndex ? "1;0.5;1" : "0.5;1;0.5"}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
              ))}
            </linearGradient>
          </defs>
          <g filter="url(#blurMe)">
            <motion.circle
              cx="50%"
              cy="50%"
              r={size}
              fill="url(#gradient)"
              style={{
                mixBlendMode: blendingValue as any,
                opacity,
              }}
              animate={{
                x: cursorMoving ? cursorPosition.x - window.innerWidth / 2 : 0,
                y: cursorMoving ? cursorPosition.y - window.innerHeight / 2 : 0,
              }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.3,
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
