import ava1 from '../../../assets/img/public-site/ava1.png'
import ava2 from '../../../assets/img/public-site/ava2.png'
import ava3 from '../../../assets/img/public-site/ava3.png'
import ava4 from '../../../assets/img/public-site/ava4.png'
import illustShop2 from '../../../assets/img/public-site/illust-shop2.webp'
import { useStaggerInView } from '../../../shared/hooks/useStaggerInView'

const avatars = [ava1, ava2, ava3, ava4]

export function RetailModernSection() {
  const { ref, isVisible } = useStaggerInView<HTMLElement>()

  return (
    <section
      ref={ref}
      className={`bg-[var(--color-surface)] py-16 md:py-20 ${isVisible ? 'is-stagger-visible' : ''}`}
    >
      <div className="app-container grid min-h-[520px] items-center gap-12 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]">
        <div className="max-w-[560px]">
          <h2 className="animate-stagger-rise text-display-sm text-[var(--color-text)] [--stagger-index:0] md:text-[40px] md:leading-[48px]">
            Dibangun untuk retail modern.
          </h2>

          <p className="animate-stagger-rise mt-6 text-body-md text-[var(--color-text-muted)] [--stagger-index:1]">
            Cakra menggunakan mesin kecerdasan buatan yang menganalisis pola penjualan historis toko Anda secara
            real-time. Sistem kami juga mendeteksi tren musiman lokal, hari raya, dan waktu pengiriman pemasok (lead
            time) sehingga setiap keputusan stok berjalan lebih produktif.
          </p>

          <div className="animate-stagger-rise mt-8 flex flex-col gap-4 [--stagger-index:2] sm:flex-row sm:items-center">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <img
                  alt=""
                  className="h-10 w-10 rounded-full border-4 border-[var(--color-surface)] object-cover"
                  height="40"
                  key={avatar}
                  src={avatar}
                  width="40"
                  style={{ zIndex: avatars.length - index }}
                />
              ))}
            </div>
            <p className="text-label-sm font-bold text-[var(--color-text)]">
              Dipercaya 500+ pemilik toko ritel di Indonesia
            </p>
          </div>
        </div>

        <div className="animate-stagger-scale mx-auto w-full max-w-[420px] [--stagger-index:3] xl:max-w-[480px]">
          <img
            alt="Pemilik toko ritel menggunakan tablet untuk memantau stok"
            className="aspect-[4/3] w-full rounded-[var(--radius-xl)] object-cover"
            height="800"
            src={illustShop2}
            width="960"
          />
        </div>
      </div>
    </section>
  )
}
