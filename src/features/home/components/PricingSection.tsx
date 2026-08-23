import { Icon } from '@iconify/react'
import type { CSSProperties } from 'react'
import { useStaggerInView } from '../../../shared/hooks/useStaggerInView'
import { navigateTo } from '../../../shared/utils/navigation'

const plans = [
  {
    name: 'Starter',
    price: 'Gratis',
    credits: '10 Kredit',
    description: 'Cocok untuk mencoba kemampuan AI Cakra sebelum melakukan pembelian pertama.',
    features: ['Akses Semua Fitur AI', 'Analisis SKU Historis', 'Bantuan Komunitas'],
    cta: 'Mulai Gratis',
  },
  {
    name: 'Pro',
    price: 'Rp 149.000',
    credits: '50 Kredit',
    description: 'Terbaik untuk warung atau toko ritel kecil dengan jumlah SKU yang terfokus.',
    features: ['Akses Semua Fitur AI', 'Prioritas Pemrosesan', 'Ekspor Excel / PDF', 'Dukungan Email'],
    cta: 'Pilih Pro',
    featured: true,
  },
  {
    name: 'Business',
    price: 'Rp 499.000',
    credits: '200 Kredit',
    description: 'Dirancang untuk jaringan toko ritel atau grosir dengan varian barang yang luas.',
    features: ['Akses Semua Fitur AI', 'Dedicated Cloud Engine', 'Ekspor Semua Format', 'Dukungan Prioritas 24/7'],
    cta: 'Pilih Business',
  },
]

export function PricingSection() {
  const { ref, isVisible } = useStaggerInView<HTMLElement>()

  return (
    <section
      id="harga"
      ref={ref}
      className={`bg-[var(--color-neutral-900)] py-20 md:py-24 ${isVisible ? 'is-stagger-visible' : ''}`}
    >
      <div className="app-container">
        <div className="animate-stagger-rise mx-auto max-w-[620px] text-center [--stagger-index:0]">
          <h2 className="text-heading-xl text-white md:text-[40px] md:leading-[48px]">
            Satu Kredit = Satu Analisis SKU
          </h2>
          <p className="mt-4 text-body-sm text-[var(--color-neutral-400)]">
            Pilih paket kuota kredit sesuai kebutuhan toko Anda. Tidak ada biaya langganan bulanan yang mengikat.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <article
              className={`animate-stagger-rise group flex min-h-[434px] flex-col rounded-[var(--radius-lg)] p-8 transition duration-300 hover:-translate-y-2 focus-within:-translate-y-2 ${
                plan.featured
                  ? 'bg-[var(--color-primary)] text-white shadow-xl shadow-[rgb(45_82_221_/_0.28)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm hover:shadow-xl'
              }`}
              key={plan.name}
              style={{ '--stagger-index': index + 1 } as CSSProperties}
            >
              <p
                className={`text-label-md font-bold uppercase tracking-[0.08em] ${
                  plan.featured ? 'text-white' : 'text-[var(--color-primary)]'
                }`}
              >
                {plan.name}
              </p>
              <p className="mt-4 font-mono text-[32px] font-bold leading-10">{plan.price}</p>
              <p
                className={`mt-3 text-heading-sm ${
                  plan.featured ? 'text-[var(--color-primary-100)]' : 'text-[var(--color-text-muted)]'
                }`}
              >
                {plan.credits}
              </p>
              <p
                className={`mt-8 text-body-sm ${
                  plan.featured ? 'text-[var(--color-primary-100)]' : 'text-[var(--color-text-muted)]'
                }`}
              >
                {plan.description}
              </p>

              <div className={`my-7 h-px ${plan.featured ? 'bg-white/20' : 'bg-[var(--color-border)]'}`} />

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li className="flex items-start gap-3 text-label-md" key={feature}>
                    <Icon
                      aria-hidden="true"
                      className={`mt-0.5 size-4 shrink-0 ${plan.featured ? 'text-white' : 'text-[var(--color-primary)]'}`}
                      icon="lucide:check"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <button
                  className={`h-12 w-full rounded-[var(--radius-lg)] px-5 text-label-md font-bold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)] ${
                    plan.featured
                      ? 'bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-50)]'
                      : 'bg-[var(--color-neutral-900)] text-white hover:bg-[var(--color-primary)]'
                  }`}
                  onClick={() => navigateTo('/auth/register')}
                  type="button"
                >
                  {plan.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
