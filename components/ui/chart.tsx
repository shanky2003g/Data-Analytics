"use client"

import * as React from "react"

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(({ className, ...props }, ref) => {
  return <div className="h-full w-full" ref={ref} {...props} />
})
Chart.displayName = "Chart"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(({ className, ...props }, ref) => {
  return <div className="relative" ref={ref} {...props} />
})
ChartContainer.displayName = "ChartContainer"

interface ChartTooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode | ((props: { point: any }) => React.ReactNode)
}

const ChartTooltip = ({ children }: ChartTooltipProps) => {
  return <>{children}</>
}
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, ...props }, ref) => {
    return <div className="rounded-md border bg-popover p-4 text-popover-foreground shadow-md" ref={ref} {...props} />
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartLegendProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(({ className, ...props }, ref) => {
  return <div className="flex items-center space-x-2" ref={ref} {...props} />
})
ChartLegend.displayName = "ChartLegend"

interface ChartLegendItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  color: string
}

const ChartLegendItem = ({ name, color }: ChartLegendItemProps) => {
  return (
    <div className="flex items-center space-x-1">
      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm">{name}</span>
    </div>
  )
}
ChartLegendItem.displayName = "ChartLegendItem"

interface ChartLineProps extends React.HTMLAttributes<SVGPathElement> {}

const ChartLine = React.forwardRef<SVGPathElement, ChartLineProps>(({ className, ...props }, ref) => {
  return <path ref={ref} {...props} />
})
ChartLine.displayName = "ChartLine"

interface ChartLineSeriesProps extends React.HTMLAttributes<SVGPathElement> {
  data: { date: string; value: number }[]
  xKey: string
  yKey: string
  stroke: string
  strokeDasharray?: string
}

const ChartLineSeries = ({ data, xKey, yKey, stroke, strokeDasharray }: ChartLineSeriesProps) => {
  if (!data || data.length === 0) {
    return null
  }

  const points = data.map((item) => ({
    x: item[xKey as keyof typeof item],
    y: item[yKey as keyof typeof item],
  }))

  const pathData = points
    .map((point, index) => {
      if (index === 0) {
        return `M${point.x},${point.y}`
      } else {
        return `L${point.x},${point.y}`
      }
    })
    .join(" ")

  return <ChartLine d={pathData} stroke={stroke} strokeWidth="2" fill="none" strokeDasharray={strokeDasharray} />
}
ChartLineSeries.displayName = "ChartLineSeries"

interface ChartAxisProps extends React.HTMLAttributes<HTMLDivElement> {}

const ChartAxis = React.forwardRef<HTMLDivElement, ChartAxisProps>(({ className, ...props }, ref) => {
  return <div className="absolute bottom-0 left-0 w-full border-t" ref={ref} {...props} />
})
ChartAxis.displayName = "ChartAxis"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartLine,
  ChartLineSeries,
  ChartAxis,
}
