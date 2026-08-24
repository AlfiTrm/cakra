import { useEffect, useState } from 'react'
import { AnalysisTable, SearchInput } from '../../../shared/components'
import type { AnalysisTableRow } from '../../../shared/components'
import { LoadingContent } from '../../../shared/components/feedback'
import { navigateTo } from '../../../shared/utils/navigation'
import { DashboardStats } from '../../dashboard/components'
import { Navbar } from '../../home/components/Navbar'
import { HistoryFilterBar, HistoryPagination } from '../components'
import { getCachedCategories, getCachedHistory, getCategories, getHistory } from '../services/historyService'
import type { HistoryCategory, HistoryFilters, HistoryViewModel } from '../types/history'

const initialFilters: HistoryFilters = {
  category: '',
  page: 1,
  riskLabel: '',
  search: '',
  sort: 'newest',
}

export function HistoryPage() {
  const [categories, setCategories] = useState<HistoryCategory[]>(() => getCachedCategories())
  const [filters, setFilters] = useState(initialFilters)
  const [history, setHistory] = useState<HistoryViewModel | null>(() => getCachedHistory(initialFilters))
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(() => !getCachedHistory(initialFilters))

  async function loadHistory(nextFilters: HistoryFilters, signal?: AbortSignal) {
    setError('')
    setIsLoading(true)

    try {
      setHistory(await getHistory(nextFilters, signal))
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setError(err instanceof Error ? err.message : 'Riwayat gagal dimuat.')
    } finally {
      if (!signal?.aborted) setIsLoading(false)
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    async function loadCategories() {
      try {
        setCategories(await getCategories(controller.signal))
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
      }
    }

    void loadCategories()

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const cachedHistory = getCachedHistory(filters)
    if (cachedHistory) setHistory(cachedHistory)

    const timeoutId = window.setTimeout(() => {
      void loadHistory(filters, controller.signal)
    }, 300)

    return () => {
      window.clearTimeout(timeoutId)
      controller.abort()
    }
  }, [filters])

  function handleDownload(row: AnalysisTableRow) {
    const csv = [
      ['Nama SKU', 'ID SKU', 'Kategori', 'Status Risiko', 'ROP', 'ROQ', 'Tanggal Analisis'],
      [row.skuName, row.id, row.category, row.status, row.rop, row.roq, row.date],
    ]
      .map((line) => line.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
      .join('\n')

    const url = URL.createObjectURL(new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `analisis-${row.sessionId ?? row.id}.csv`
    document.body.append(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        <section className="app-container py-10 md:py-12">
          <header className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-heading-xl text-[var(--color-text)]">Riwayat Analisis</h1>
              <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">
                Lihat dan kelola hasil analisis SKU yang telah dilakukan.
              </p>
            </div>
            <SearchInput
              aria-label="Cari SKU"
              className="w-full md:w-[260px]"
              isLoading={isLoading && Boolean(history)}
              onChange={(event) => setFilters((current) => ({ ...current, page: 1, search: event.target.value }))}
              placeholder="Cari SKU..."
              value={filters.search}
            />
          </header>

          <div className="mt-8">
            {isLoading && !history ? <HistoryStatsSkeleton /> : <DashboardStats columns={3} stats={history?.stats ?? []} />}
          </div>

          {error ? (
            <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-5 py-4 text-body-sm font-semibold text-[var(--color-danger)]">
              {error}
            </div>
          ) : null}

          <section className="mt-8">
            <HistoryFilterBar
              categories={categories}
              filters={filters}
              totalItems={history?.pagination.totalItems ?? 0}
              onChange={setFilters}
            />

            <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-sm">
              {isLoading && !history ? (
                <div className="p-8">
                  <LoadingContent />
                </div>
              ) : (
                <AnalysisTable
                  maxBodyHeight={384}
                  rows={history?.items ?? []}
                  showActions
                  onDownload={handleDownload}
                  onView={(row) => navigateTo(`/analysis/${row.sessionId ?? row.id}`)}
                />
              )}

              <HistoryPagination
                pagination={history?.pagination}
                onPageChange={(page) => setFilters((current) => ({ ...current, page }))}
              />
            </div>
          </section>
        </section>
      </main>
    </>
  )
}

const historyStatSkeletons = [
  'border-[var(--color-primary-200)] bg-[var(--color-primary-50)]',
  'border-[var(--color-primary-100)] bg-[#f5f2ff]',
  'border-[var(--color-danger-200)] bg-[var(--color-danger-50)]',
]

function HistoryStatsSkeleton() {
  return (
    <section aria-label="Memuat ringkasan riwayat" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3" role="status">
      {historyStatSkeletons.map((toneClass) => (
        <div className={`min-h-[157px] rounded-[var(--radius-lg)] border p-6 shadow-sm ${toneClass}`} key={toneClass}>
          <div className="h-4 w-36 animate-pulse rounded-[var(--radius-lg)] bg-white/70" />
          <div className="mt-4 h-10 w-32 animate-pulse rounded-[var(--radius-lg)] bg-white/70" />
          <div className="mt-2 h-5 w-44 animate-pulse rounded-[var(--radius-lg)] bg-white/70" />
        </div>
      ))}
    </section>
  )
}
