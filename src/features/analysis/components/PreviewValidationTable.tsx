import type { PreviewErrorRow, PreviewValidRow } from '../types/analysis'

type PreviewValidationTableProps =
  | {
      rows: PreviewValidRow[]
      title: string
      tone: 'success'
    }
  | {
      rows: PreviewErrorRow[]
      title: string
      tone: 'danger'
    }

export function PreviewValidationTable(props: PreviewValidationTableProps) {
  const isDanger = props.tone === 'danger'

  return (
    <section
      className={`rounded-[var(--radius-xl)] border bg-white p-5 shadow-lg shadow-[rgb(15_23_42_/_0.06)] ${
        isDanger ? 'border-[var(--color-danger)]' : 'border-[var(--color-border)]'
      }`}
    >
      <h2 className={`text-label-lg font-bold ${isDanger ? 'text-[var(--color-danger)]' : 'text-[var(--color-text)]'}`}>
        {props.title}
      </h2>
      <div className="mt-4 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
        <div className="overflow-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="bg-[var(--color-neutral-50)]">
              <tr className="border-b border-[var(--color-border)] text-label-sm font-bold uppercase tracking-[0.04em] text-[var(--color-text-muted)]">
                <th className="px-5 py-3 text-center">No</th>
                <th className="px-5 py-3">Tanggal</th>
                <th className="px-5 py-3">Jumlah Terjual</th>
                <th className="px-5 py-3">Nama SKU</th>
                <th className="px-5 py-3 text-right">Harga Satuan</th>
                <th className="px-5 py-3">{isDanger ? 'Keterangan Error' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {props.rows.map((row) => (
                <tr
                  className={`border-b border-[var(--color-border)] last:border-b-0 ${
                    isDanger ? 'bg-[var(--color-danger-50)]' : 'odd:bg-white even:bg-[var(--color-neutral-50)]'
                  }`}
                  key={`${row.no}-${row.date}`}
                >
                  <td className="px-5 py-3 text-center text-label-md text-[var(--color-text-muted)]">{row.no}</td>
                  <td className="px-5 py-3 font-mono text-label-sm text-[var(--color-text)]">{row.date}</td>
                  <td className="px-5 py-3 text-label-md text-[var(--color-text)]">{row.quantity}</td>
                  <td className="px-5 py-3 text-label-md text-[var(--color-text)]">{row.name}</td>
                  <td className="px-5 py-3 text-right font-mono text-label-sm text-[var(--color-text)]">{row.price}</td>
                  <td className="px-5 py-3">
                    {isDanger ? (
                      <span className="flex max-w-[360px] items-start gap-2 text-label-sm font-bold text-[var(--color-danger)]">
                        <WarningIcon />
                        {(row as PreviewErrorRow).error}
                      </span>
                    ) : (
                      <span className="rounded-[var(--radius-md)] bg-[var(--color-success-50)] px-2.5 py-1 text-label-sm font-bold text-[var(--color-success)]">
                        Valid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!isDanger ? (
          <p className="border-t border-[var(--color-border)] bg-[var(--color-neutral-50)] py-3 text-center text-body-xs text-[var(--color-text-muted)]">
            ... dan 170 baris lainnya
          </p>
        ) : null}
      </div>
    </section>
  )
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" className="mt-0.5 size-4 shrink-0" fill="none" viewBox="0 0 24 24">
      <path d="M12 9v4m0 4h.01M10.3 4.7 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
