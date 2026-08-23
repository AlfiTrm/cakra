import illustShop from '../../../assets/img/public-site/illust-shop.webp'
import { Button } from '../../../shared/components'

const marketplaceLogos = ['Tokopedia', 'Shopee', 'Grab', 'Bukalapak', 'Alfamart']

export function HeroSection() {
  return (
    <section className="is-stagger-visible bg-[var(--color-surface)]">
      <div className="app-container flex min-h-[560px] flex-col items-center justify-center py-16 text-center md:min-h-[620px] md:py-20">
        <h1 className="animate-stagger-rise max-w-[780px] text-display-sm text-[var(--color-text)] [--stagger-index:0] md:text-[56px] md:leading-[64px]">
          Restock lebih pasti untuk
          <span className="block text-[var(--color-primary)]">bisnis yang bergerak cepat</span>
        </h1>

        <p className="animate-stagger-rise mt-6 max-w-[640px] text-body-lg text-[var(--color-text-muted)] [--stagger-index:1]">
          Cakra membaca pola penjualan per SKU, lalu memberi rekomendasi kapan harus restock dan berapa banyak yang
          perlu dipesan.
        </p>

        <div className="animate-stagger-rise mt-9 flex flex-col items-center gap-3 [--stagger-index:2] sm:flex-row">
          <Button icon="lucide:arrow-right">Mulai Sekarang</Button>
          <Button variant="outline">Konsultasi Ahli</Button>
        </div>

        <div className="animate-stagger-rise mt-14 [--stagger-index:3]">
          <p className="text-label-sm font-semibold text-[var(--color-text-muted)]">
            Terhubung dengan marketplace yang dipakai toko Indonesia
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {marketplaceLogos.map((logo) => (
              <span className="text-label-md font-semibold text-[var(--color-neutral-400)]" key={logo}>
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="app-container pb-2 md:pb-4">
        <img
          alt="Ilustrasi toko ritel modern dengan rak persediaan"
          className="mx-auto aspect-[16/7] w-full max-w-[1120px] rounded-[var(--radius-2xl)] object-cover"
          decoding="async"
          fetchPriority="high"
          height="768"
          loading="eager"
          src={illustShop}
          width="1440"
        />
      </div>
    </section>
  )
}
