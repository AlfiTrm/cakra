import { Icon } from '@iconify/react'
import type { CSSProperties } from 'react'
import { useStaggerInView } from '../../../shared/hooks/useStaggerInView'

const features = [
  {
    icon: 'lucide:bar-chart-3',
    title: 'Prediksi Demand AI',
    description: 'Proyeksikan potensi penjualan per SKU dengan skenario P50 dan P90. Meminimalkan risiko terlalu banyak membeli.',
  },
  {
    icon: 'lucide:triangle-alert',
    title: 'Klasifikasi Risiko Otomatis',
    description: 'Sistem mendeteksi dan menandai SKU mana yang berisiko Stockout, Normal, atau berpotensi menjadi Deadstock.',
  },
  {
    icon: 'lucide:arrow-left-right',
    title: 'Rekomendasi Restock Presisi',
    description: 'Dapatkan saran jumlah order dan waktu restock terbaik. Cukup ikuti instruksi, operasional toko pun aman.',
  },
  {
    icon: 'lucide:layout-grid',
    title: 'Analisis Per-SKU Detail',
    description: 'Pelajari kontribusi keuntungan dari setiap barang dagangan Anda dengan rincian data margin dan turn-rate yang jelas.',
  },
]

export function AllInOneSection() {
  const { ref, isVisible } = useStaggerInView<HTMLElement>()

  return (
    <section
      id="fitur"
      ref={ref}
      className={`bg-[var(--color-surface)] py-16 md:py-24 ${isVisible ? 'is-stagger-visible' : ''}`}
    >
      <div className="app-container">
        <h2 className="animate-stagger-rise mx-auto max-w-[920px] text-center text-display-sm text-[var(--color-text)] [--stagger-index:0] md:text-[40px] md:leading-[48px]">
          Semua yang Anda butuhkan. Tidak ada yang tidak.
        </h2>

        <div className="mx-auto mt-14 grid max-w-[1040px] gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <article
              className="animate-stagger-rise rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#fffdfa] p-7 md:p-8"
              key={feature.title}
              style={{ '--stagger-index': index + 1 } as CSSProperties}
            >
              <div className="flex size-10 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary-50)] text-[var(--color-primary)]">
                <Icon aria-hidden="true" className="size-5" icon={feature.icon} />
              </div>
              <h3 className="mt-6 text-heading-sm text-[var(--color-text)]">{feature.title}</h3>
              <p className="mt-4 text-body-sm text-[var(--color-text-muted)]">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
