"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export default function MacBookScrollEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Transform values for the MacBook
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1.1])
  const translateY = useTransform(scrollYProgress, [0, 0.5, 1], [100, -50, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.3, 0.8, 1, 1])

  // Transform values for screen content (makes it appear to come out of the screen)
  const contentScale = useTransform(scrollYProgress, [0.2, 0.8], [0.8, 1.2])
  const contentTranslateY = useTransform(scrollYProgress, [0.2, 0.8], [50, -30])
  const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 1])

  return (
    <div ref={containerRef} className="h-[200vh] relative flex flex-col justify-start items-center">
      <div className="sticky top-[20vh] w-full flex justify-center items-center overflow-hidden">
        <motion.div
          className="relative w-full max-w-4xl mx-auto"
          style={{
            scale,
            y: translateY,
            opacity,
          }}
        >
          {/* MacBook Frame */}
          <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-[#454545] to-[#191919] rounded-t-xl p-[3%] shadow-2xl border border-gray-700/60">
            <div className="absolute inset-0 bg-black rounded-t-lg m-[3%]">
              {/* Screen Content */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-lg"
                style={{
                  scale: contentScale,
                  y: contentTranslateY,
                  opacity: contentOpacity,
                }}
              >
                <Image
                  src="/dashboard-preview.png"
                  alt="Stock Dashboard Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* MacBook Base */}
          <div className="w-full h-4 bg-gradient-to-b from-[#252525] to-[#191919] rounded-b-xl border-t border-gray-800" />
        </motion.div>
      </div>
    </div>
  )
}
