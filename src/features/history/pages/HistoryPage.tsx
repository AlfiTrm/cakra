import { AnalysisTable, SearchInput } from '../../../shared/components'
import { DashboardStats } from '../../dashboard/components'
import { Navbar } from '../../home/components/Navbar'
import { historyAnalyses, historyStats } from '../data/historyData'

export function HistoryPage() {
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
            <SearchInput aria-label="Cari SKU" className="w-full md:w-[260px]" placeholder="Cari SKU..." />
          </header>

          <div className="mt-8">
            <DashboardStats columns={3} stats={historyStats} />
          </div>

          <section className="mt-8">
            <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-3">
                <FilterChip>Status: Semua Status</FilterChip>
                <FilterChip>Kategori: Semua Kategori</FilterChip>
              </div>
              <div className="flex items-center justify-between gap-5">
                <FilterChip>Urutkan: Terbaru</FilterChip>
                <span className="text-label-sm font-bold text-[var(--color-primary)]">32 Analisis</span>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-sm">
              <AnalysisTable maxBodyHeight={384} rows={historyAnalyses} showActions />

              <footer className="flex flex-col gap-4 border-t border-[var(--color-border)] px-5 py-4 text-body-sm text-[var(--color-text-muted)] md:flex-row md:items-center md:justify-between">
                <p>Menampilkan 1-8 dari 32 hasil</p>
                <div className="flex items-center gap-2">
                  {['<', '1', '2', '3', '4', '>'].map((page) => (
                    <button
                      className={`grid size-8 place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)] text-label-sm font-bold transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] ${
                        page === '1' ? 'bg-[var(--color-primary)] text-white hover:text-white' : 'bg-white text-[var(--color-text)]'
                      }`}
                      key={page}
                      type="button"
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </footer>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}

function FilterChip({ children }: { children: string }) {
  return (
    <button
      className="h-9 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white px-4 text-label-sm font-bold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-100)]"
      type="button"
    >
      {children}
    </button>
  )
}
