import { Navbar } from '../../home/components/Navbar'
import { AttentionSkuCard, CreditUsageCard, DashboardHeader, DashboardStats, LatestAnalysisTable } from '../components'
import { attentionSkus, dashboardStats, latestAnalyses } from '../data/dashboardStats'

export function DashboardPage() {
  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        <div className="app-container py-10 md:py-12">
          <DashboardHeader />
          <div className="mt-10">
            <DashboardStats stats={dashboardStats} />
          </div>
          <div className="mt-8">
            <LatestAnalysisTable analyses={latestAnalyses} />
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <AttentionSkuCard items={attentionSkus} />
            <CreditUsageCard />
          </div>
        </div>
      </main>
    </>
  )
}
