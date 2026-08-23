import { Button } from '../../../shared/components'
import type { CreditUsage } from '../types/dashboard'

type CreditUsageCardProps = {
  usage: CreditUsage
}

export function CreditUsageCard({ usage }: CreditUsageCardProps) {
  const totalCredits = Math.max(usage.balance, usage.availableCredits + usage.reservedCredits, 1)
  const remainingPercent = Math.round((usage.availableCredits / totalCredits) * 100)

  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <h2 className="text-heading-sm text-[var(--color-text)]">Kuota Kredit & Penggunaan</h2>

      <div className="mt-7 flex items-end justify-between gap-4">
        <p className="text-body-md font-semibold text-[var(--color-text-muted)]">
          <span className="font-mono text-[40px] font-extrabold leading-none text-[var(--color-primary)]">{usage.availableCredits}</span>
          <span className="ml-2">/ {totalCredits} Kredit sisa</span>
        </p>
        <p className="text-body-sm text-[var(--color-text-muted)]">Reset otomatis: 01 Apr</p>
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-neutral-200)]">
          <div className="h-full rounded-[var(--radius-full)] bg-[var(--color-primary)]" style={{ width: `${remainingPercent}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between gap-4 text-body-sm">
          <p className="text-[var(--color-text-muted)]">Penggunaan bulan ini: {usage.usedThisMonth} SKU</p>
          <p className="font-bold text-[var(--color-primary)]">{remainingPercent}% Tersisa</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 rounded-[var(--radius-xl)] bg-[var(--color-primary-50)] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-label-md font-bold text-[var(--color-primary)]">Butuh kredit ekstra?</p>
          <p className="mt-1 text-body-sm text-[var(--color-text-muted)]">Mulai dari Rp 2.980 per analisis SKU.</p>
        </div>
        <Button className="w-full sm:w-auto">Beli Kredit</Button>
      </div>
    </section>
  )
}
