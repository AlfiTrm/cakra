import type { LatestAnalysis } from '../types/dashboard'
import { AnalysisTable } from '../../../shared/components/AnalysisTable'
import { SearchInput } from '../../../shared/components/Input'
import { navigateTo } from '../../../shared/utils/navigation'

type LatestAnalysisTableProps = {
  analyses: LatestAnalysis[]
  isSearching?: boolean
  onSearchChange?: (value: string) => void
  search?: string
}

export function LatestAnalysisTable({ analyses, isSearching = false, onSearchChange, search = '' }: LatestAnalysisTableProps) {
  return (
    <section className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-sm">
      <header className="flex flex-col gap-5 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-heading-sm text-[var(--color-text)]">Hasil Analisis SKU Terbaru</h2>
          <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">
            Rekomendasi jumlah pemesanan ulang (ROQ) untuk memaksimalkan omset.
          </p>
        </div>

        <SearchInput
          aria-label="Cari SKU"
          className="w-full md:w-[260px]"
          isLoading={isSearching}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Cari SKU..."
          value={search}
        />
      </header>

      <AnalysisTable maxBodyHeight={360} rows={analyses} showActions onView={(row) => navigateTo(`/analysis/${row.sessionId ?? row.id}`)} />

      <footer className="flex justify-center border-t border-[var(--color-border)] px-6 py-5">
        <button
          className="h-11 rounded-[var(--radius-lg)] border border-[var(--color-primary)] px-6 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)]"
          onClick={() => navigateTo('/history')}
          type="button"
        >
          Lihat Semua Analisis SKU
        </button>
      </footer>
    </section>
  )
}
