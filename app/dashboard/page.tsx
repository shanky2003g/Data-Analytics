import StockDashboard from "@/components/stock-dashboard"
import { ThemeProvider } from "@/components/theme-provider"

export default function DashboardPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <StockDashboard />
      </div>
    </ThemeProvider>
  )
}
