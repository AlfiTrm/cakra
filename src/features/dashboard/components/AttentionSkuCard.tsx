import type { AttentionSku, AttentionSkuTone } from '../types/dashboard'

type AttentionSkuCardProps = {
  items: AttentionSku[]
}

const toneClass: Record<AttentionSkuTone, string> = {
  danger: 'bg-[var(--color-danger-100)] text-[var(--color-danger)]',
  warning: 'bg-[var(--color-warning-100)] text-[var(--color-warning-600)]',
}

export function AttentionSkuCard({ items }: AttentionSkuCardProps) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <h2 className="text-heading-sm text-[var(--color-text)]">SKU Perlu Perhatian Segera</h2>

      <div className="mt-5 grid gap-4">
        {items.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] bg-[var(--color-success-50)] px-8 py-5 text-body-sm font-semibold text-[var(--color-success)]">
            Tidak ada SKU kritis saat ini.
          </div>
        ) : null}
        {items.map((item) => (
          <article className={`rounded-[var(--radius-lg)] px-8 py-4 ${toneClass[item.tone]}`} key={item.skuName}>
            <h3 className="text-label-md font-bold text-[var(--color-text)]">{item.skuName}</h3>
            <p className="mt-1 text-body-sm">{item.message}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
