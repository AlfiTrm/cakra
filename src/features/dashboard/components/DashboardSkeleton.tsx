function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-neutral-100)] ${className}`.trim()} />
}

const statSkeletons = [
  'border-[var(--color-primary-200)] bg-[var(--color-primary-50)]',
  'border-[var(--color-success-200)] bg-[var(--color-success-50)]',
  'border-[var(--color-danger-200)] bg-[var(--color-danger-50)]',
  'border-[var(--color-primary-100)] bg-[#f5f2ff]',
]

export function DashboardSkeleton() {
  return (
    <div aria-label="Memuat dashboard" aria-live="polite" className="app-container py-10 md:py-12" role="status">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full max-w-[360px]">
          <SkeletonBlock className="h-9 w-3/4" />
          <SkeletonBlock className="mt-4 h-4 w-44" />
          <SkeletonBlock className="mt-2 h-4 w-36" />
        </div>
        <SkeletonBlock className="h-12 w-full sm:w-44" />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statSkeletons.map((toneClass) => (
          <div className={`min-h-[157px] rounded-[var(--radius-lg)] border p-6 shadow-sm ${toneClass}`} key={toneClass}>
            <SkeletonBlock className="h-4 w-36 bg-white/70" />
            <SkeletonBlock className="mt-4 h-10 w-32 bg-white/70" />
            <SkeletonBlock className="mt-2 h-5 w-40 bg-white/70" />
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-sm">
        <div className="flex flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div className="w-full max-w-[460px]">
            <SkeletonBlock className="h-5 w-56" />
            <SkeletonBlock className="mt-3 h-4 w-full" />
          </div>
          <SkeletonBlock className="h-10 w-full rounded-[var(--radius-full)] md:w-[260px]" />
        </div>
        <div className="border-t border-[var(--color-border)] px-6 py-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-6 border-b border-[var(--color-border)] py-4 last:border-b-0" key={index}>
              <SkeletonBlock className="h-5" />
              <SkeletonBlock className="h-5" />
              <SkeletonBlock className="h-5" />
              <SkeletonBlock className="h-5" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <SkeletonBlock className="h-[280px] rounded-[var(--radius-xl)]" />
        <SkeletonBlock className="h-[280px] rounded-[var(--radius-xl)]" />
      </div>
    </div>
  )
}
