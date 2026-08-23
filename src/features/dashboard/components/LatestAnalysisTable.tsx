import type { LatestAnalysis, RiskStatus } from '../types/dashboard'
import { SearchInput } from '../../../shared/components'
import { navigateTo } from '../../../shared/utils/navigation'

type LatestAnalysisTableProps = {
  analyses: LatestAnalysis[]
}

const statusClass: Record<RiskStatus, string> = {
  'Hampir Habis': 'bg-[var(--color-danger-100)] text-[var(--color-danger)]',
  Normal: 'bg-[var(--color-success-50)] text-[var(--color-success)]',
  'Stok Mati': 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]',
}

export function LatestAnalysisTable({ analyses }: LatestAnalysisTableProps) {
  return (
    <section className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-sm">
      <header className="flex flex-col gap-5 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-heading-sm text-[var(--color-text)]">Hasil Analisis SKU Terbaru</h2>
          <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">
            Rekomendasi jumlah pemesanan ulang (ROQ) untuk memaksimalkan omset.
          </p>
        </div>

        <SearchInput aria-label="Cari SKU" className="w-full md:w-[260px]" placeholder="Cari SKU..." />
      </header>

      <div className="max-h-[360px] overflow-auto">
        <table className="min-w-[920px] w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-[var(--color-neutral-50)]">
            <tr className="border-b border-[var(--color-border)] text-label-sm font-bold uppercase tracking-[0.04em] text-[var(--color-text-muted)]">
              <th className="px-6 py-4">Nama SKU</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Status Risiko</th>
              <th className="px-6 py-4">ROP (Batas)</th>
              <th className="px-6 py-4">Saran ROQ</th>
              <th className="px-6 py-4 text-right">Tanggal Analisis</th>
            </tr>
          </thead>
          <tbody>
            {analyses.map((analysis) => (
              <tr className="border-b border-[var(--color-border)] last:border-b-0" key={analysis.id}>
                <td className="px-6 py-4">
                  <p className="text-label-md font-bold text-[var(--color-text)]">{analysis.skuName}</p>
                  <p className="mt-1 text-body-xs text-[var(--color-text-muted)]">ID: {analysis.id}</p>
                </td>
                <td className="px-6 py-4 text-label-md text-[var(--color-text)]">{analysis.category}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-[var(--radius-full)] px-3 py-1 text-label-sm font-bold ${statusClass[analysis.status]}`}>
                    {analysis.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-label-md font-bold text-[var(--color-text)]">{analysis.rop}</span>
                  <span className="ml-2 text-body-xs text-[var(--color-text-muted)]">Unit</span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-label-md font-bold text-[var(--color-primary)]">{analysis.roq}</span>
                  <span className="ml-2 text-body-xs text-[var(--color-text-muted)]">Unit</span>
                </td>
                <td className="px-6 py-4 text-right text-label-md text-[var(--color-text-muted)]">{analysis.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
