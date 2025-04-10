"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface Product {
  title: string
  description: string
  image: string
}

export const HeroParallax = ({
  products,
}: {
  products: Product[]
}) => {
  const firstRow = products.slice(0, 2)
  const secondRow = products.slice(2, 4)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const translateY = useTransform(scrollYProgress, [0, 1], [0, 400])
  const translateYReverse = useTransform(scrollYProgress, [0, 1], [0, -400])

  return (
    <div
      ref={ref}
      className="h-[120vh] py-20 overflow-hidden bg-background antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div style={{ translateY }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
        {firstRow.map((product) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </motion.div>
      <motion.div style={{ translateY: translateYReverse }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {secondRow.map((product) => (
          <ProductCard product={product} key={product.title} />
        ))}
      </motion.div>
    </div>
  )
}

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mt-10">
      <h1 className="text-3xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/70">
        Key Features
      </h1>
      <p className="mt-4 text-center text-muted-foreground max-w-3xl mx-auto text-base md:text-xl">
        Our platform offers a comprehensive suite of tools to help you make informed investment decisions.
      </p>
    </div>
  )
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-xl border border-primary/20 bg-background group"
    >
      <div className="flex flex-col p-4 h-full">
        <div className="aspect-video relative rounded-xl overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h2 className="font-bold text-xl">{product.title}</h2>
          <p className="text-muted-foreground mt-2">{product.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
