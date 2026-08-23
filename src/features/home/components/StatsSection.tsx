import type { CSSProperties } from 'react'
import { useStaggerInView } from '../../../shared/hooks/useStaggerInView'

const stats = [
  {
    value: '50.000+',
    label: 'Analisis Selesai',
  },
  {
    value: '99.2%',
    label: 'Akurasi Prediksi',
  },
  {
    value: '< 3 dtk',
    label: 'Waktu Proses per SKU',
  },
]

export function StatsSection() {
  const { ref, isVisible } = useStaggerInView<HTMLElement>()

  return (
    <section
      ref={ref}
      className={`bg-[var(--color-surface)] pb-3 pt-10 md:pb-4 md:pt-14 ${isVisible ? 'is-stagger-visible' : ''}`}
    >
      <div className="app-container grid gap-8 md:grid-cols-3 md:gap-0">
        {stats.map((stat, index) => (
          <div
            className={`animate-stagger-rise text-center ${index > 0 ? 'md:border-l md:border-[var(--color-border)]' : ''}`}
            key={stat.label}
            style={{ '--stagger-index': index } as CSSProperties}
          >
            <p className="text-data-xl text-[var(--color-primary)] md:text-[52px] md:leading-[60px]">{stat.value}</p>
            <p className="mt-3 text-label-md font-semibold text-[var(--color-text-muted)]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
