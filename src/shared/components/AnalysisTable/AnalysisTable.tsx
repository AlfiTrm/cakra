import { Icon } from '@iconify/react'

export type AnalysisRiskStatus = 'Hampir Habis' | 'Normal' | 'Stok Mati'

export type AnalysisTableRow = {
  category: string
  date: string
  id: string
  rop: number
  roq: number
  sessionId?: string
  skuName: string
  status: AnalysisRiskStatus
}

type AnalysisTableProps = {
  emptyMessage?: string
  maxBodyHeight?: number
  onDownload?: (row: AnalysisTableRow) => void
  onView?: (row: AnalysisTableRow) => void
  rows: AnalysisTableRow[]
  showActions?: boolean
}

const statusClass: Record<AnalysisRiskStatus, string> = {
  'Hampir Habis': 'bg-[var(--color-danger-100)] text-[var(--color-danger)]',
  Normal: 'bg-[var(--color-success-50)] text-[var(--color-success)]',
  'Stok Mati': 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-600)]',
}

export function AnalysisTable({
  emptyMessage = 'Belum ada hasil analisis.',
  maxBodyHeight,
  onDownload,
  onView,
  rows,
  showActions = false,
}: AnalysisTableProps) {
  const columnCount = showActions ? 7 : 6

  return (
    <div className="overflow-auto" style={maxBodyHeight ? { maxHeight: maxBodyHeight } : undefined}>
      <table className="w-full min-w-[980px] border-collapse text-left">
        <thead className="sticky top-0 z-10 bg-[var(--color-neutral-50)]">
          <tr className="border-b border-[var(--color-border)] text-label-sm font-bold uppercase tracking-[0.04em] text-[var(--color-text-muted)]">
            <th className="px-6 py-4">Nama SKU</th>
            <th className="px-6 py-4">Kategori</th>
            <th className="px-6 py-4">Status Risiko</th>
            <th className="px-6 py-4">ROP (Batas)</th>
            <th className="px-6 py-4">Saran ROQ</th>
            <th className="px-6 py-4 text-right">Tanggal Analisis</th>
            {showActions ? <th className="sticky right-0 bg-[var(--color-neutral-50)] px-6 py-4 text-right">Aksi</th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-6 py-12 text-center text-body-md text-[var(--color-text-muted)]" colSpan={columnCount}>
                {emptyMessage}
              </td>
            </tr>
          ) : null}
          {rows.map((analysis, index) => {
            const rowBg = index % 2 === 1 ? 'bg-[var(--color-neutral-50)]' : 'bg-white'

            return (
              <tr className={`border-b border-[var(--color-border)] last:border-b-0 ${rowBg}`} key={analysis.id}>
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
                {showActions ? (
                  <td className={`sticky right-0 px-6 py-4 ${rowBg}`}>
                    <div className="flex justify-end gap-2">
                      <button
                        aria-label={`Lihat analisis ${analysis.skuName}`}
                        className="grid size-8 place-items-center rounded-[var(--radius-md)] bg-[var(--color-primary-50)] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-100)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-100)] disabled:pointer-events-none disabled:opacity-45"
                        disabled={!onView}
                        onClick={() => onView?.(analysis)}
                        type="button"
                      >
                        <Icon className="size-4" icon="lucide:eye" />
                      </button>
                      <button
                        aria-label={`Unduh analisis ${analysis.skuName}`}
                        className="grid size-8 place-items-center rounded-[var(--radius-md)] bg-[var(--color-success-50)] text-[var(--color-success)] transition-colors hover:bg-[var(--color-success-100)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-success-100)] disabled:pointer-events-none disabled:opacity-45"
                        disabled={!onDownload}
                        onClick={() => onDownload?.(analysis)}
                        type="button"
                      >
                        <Icon className="size-4" icon="lucide:download" />
                      </button>
                    </div>
                  </td>
                ) : null}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
