import { useEffect, useState } from 'react'
import { Navbar } from '../../home/components/Navbar'
import { AttentionSkuCard, CreditUsageCard, DashboardHeader, DashboardSkeleton, DashboardStats, LatestAnalysisTable } from '../components'
import { getCachedDashboard, getDashboard } from '../services/dashboardService'
import type { DashboardViewModel } from '../types/dashboard'

export function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardViewModel | null>(() => getCachedDashboard())
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(() => !getCachedDashboard())
  const [search, setSearch] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    const cachedDashboard = getCachedDashboard(search)
    if (cachedDashboard) setDashboard(cachedDashboard)

    const timeoutId = window.setTimeout(() => {
      void loadDashboard(search, controller.signal)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [search])

  async function loadDashboard(nextSearch = '', signal?: AbortSignal) {
    setError('')
    setIsLoading(true)

    try {
      setDashboard(await getDashboard(nextSearch, signal))
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Dashboard gagal dimuat.')
    } finally {
      if (!signal?.aborted) setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar
        availableCredits={dashboard?.creditUsage.availableCredits}
        totalCredits={
          dashboard ? Math.max(dashboard.creditUsage.availableCredits + dashboard.creditUsage.usedThisMonth, dashboard.creditUsage.availableCredits + dashboard.creditUsage.reservedCredits) : undefined
        }
        userName={dashboard?.userName}
        variant="app"
      />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        {isLoading && !dashboard ? (
          <DashboardSkeleton />
        ) : (
          <div className="app-container py-10 md:py-12">
            {error ? (
              <div className="mb-6 rounded-[var(--radius-lg)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-5 py-4 text-body-sm font-semibold text-[var(--color-danger)]">
                {error}
              </div>
            ) : null}

            {dashboard ? (
              <>
                <DashboardHeader userName={dashboard.userName} />
                <div className="mt-10">
                  <DashboardStats stats={dashboard.stats} />
                </div>
                <div className="mt-8">
                  <LatestAnalysisTable
                    analyses={dashboard.analyses}
                    isSearching={isLoading}
                    search={search}
                    onSearchChange={setSearch}
                  />
                </div>
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                  <AttentionSkuCard items={dashboard.attentionSkus} />
                  <CreditUsageCard usage={dashboard.creditUsage} />
                </div>
              </>
            ) : null}
          </div>
        )}
      </main>
    </>
  )
}
