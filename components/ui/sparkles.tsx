"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { motion, useAnimation, useInView } from "framer-motion"

interface SparklesProps {
  id?: string
  className?: string
  background?: string
  minSize?: number
  maxSize?: number
  speed?: number
  particleColor?: string
  particleDensity?: number
}

export const SparklesCore = ({
  id,
  className,
  background,
  minSize = 0.4,
  maxSize = 1,
  speed = 1,
  particleColor = "#FFF",
  particleDensity = 100,
}: SparklesProps) => {
  const [particles, setParticles] = useState<Array<any>>([])
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const animationRef = useRef<number | null>(null)
  const isInView = useInView(canvasContainerRef)
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }

    initCanvas()
    generateParticles()
    animate()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted])

  const initCanvas = () => {
    if (canvasRef.current && canvasContainerRef.current) {
      canvasRef.current.width = canvasContainerRef.current.clientWidth
      canvasRef.current.height = canvasContainerRef.current.clientHeight
    }
  }

  const generateParticles = () => {
    const newParticles = []
    if (canvasRef.current) {
      const { width, height } = canvasRef.current
      for (let i = 0; i < particleDensity; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * (maxSize - minSize) + minSize
        const color = particleColor
        const speedMultiplier = Math.random() * speed
        const directionX = Math.random() - 0.5
        const directionY = Math.random() - 0.5
        newParticles.push({
          x,
          y,
          size,
          color,
          speedMultiplier,
          directionX,
          directionY,
        })
      }
      setParticles(newParticles)
    }
  }

  const animate = () => {
    if (!context.current || !canvasRef.current) return

    context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    if (background) {
      context.current.fillStyle = background
      context.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    particles.forEach((particle, index) => {
      const { x, y, size, color, speedMultiplier, directionX, directionY } = particle

      // Draw particle
      context.current!.beginPath()
      context.current!.arc(x, y, size, 0, Math.PI * 2)
      context.current!.fillStyle = color
      context.current!.fill()

      // Update particle position for next frame
      particles[index].x += directionX * speedMultiplier
      particles[index].y += directionY * speedMultiplier

      // Boundary check
      if (particles[index].x < 0 || particles[index].x > canvasRef.current!.width) {
        particles[index].directionX *= -1
      }
      if (particles[index].y < 0 || particles[index].y > canvasRef.current!.height) {
        particles[index].directionY *= -1
      }
    })

    animationRef.current = requestAnimationFrame(animate)
  }

  const handleResize = () => {
    if (canvasRef.current && canvasContainerRef.current && context.current) {
      canvasRef.current.width = canvasContainerRef.current.clientWidth
      canvasRef.current.height = canvasContainerRef.current.clientHeight
      generateParticles()
    }
  }

  return (
    <motion.div
      ref={canvasContainerRef}
      className={cn("h-full w-full", className)}
      id={id}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </motion.div>
  )
}
