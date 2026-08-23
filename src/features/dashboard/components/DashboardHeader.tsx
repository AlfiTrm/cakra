import { Button } from '../../../shared/components'
import { navigateTo } from '../../../shared/utils/navigation'

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-heading-xl text-[var(--color-text)]">Selamat pagi, Ratna</h1>
        <div className="mt-2 grid gap-1 text-body-sm text-[var(--color-text-muted)]">
          <p>Kamis, 12 Maret 2026</p>
          <p>Sinkron 5 menit lalu</p>
        </div>
      </div>

      <Button className="w-full sm:w-auto" onClick={() => navigateTo('/analysis/new')}>
        Analisis SKU Baru
      </Button>
    </header>
  )
}
