type PreviewSummaryBarProps = {
  errorCount: number
  validCount: number
}

export function PreviewSummaryBar({ errorCount, validCount }: PreviewSummaryBarProps) {
  const totalCount = validCount + errorCount
  const validPercent = totalCount ? Math.round((validCount / totalCount) * 100) : 0

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-5 text-label-sm font-bold">
          <span className="flex items-center gap-2 text-[var(--color-success)]">
            <CheckIcon />
            {validCount} baris valid
          </span>
          <span className="flex items-center gap-2 text-[var(--color-danger)]">
            <WarningIcon />
            {errorCount > 0 ? `${errorCount} baris error` : 'Tidak ada error'}
          </span>
        </div>
        <div className="flex items-center gap-4 md:min-w-[320px]">
          <div className="h-2 flex-1 overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-neutral-100)]">
            <div className="h-full rounded-[var(--radius-full)] bg-[var(--color-success)]" style={{ width: `${validPercent}%` }} />
          </div>
          <span className="text-label-sm text-[var(--color-text-muted)]">{validPercent}% valid</span>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="M9 12.5 11 14.5 15.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M21 12a9 9 0 1 1-4.2-7.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 9v4m0 4h.01M10.3 4.7 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
