import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'

const demandBars = [
  ['22/8', 14, 18],
  ['23/8', 17, 22],
  ['24/8', 15, 20],
  ['25/8', 21, 25],
  ['26/8', 24, 31],
  ['27/8', 19, 27],
  ['28/8', 23, 35],
  ['29/8', 22, 32],
  ['30/8', 26, 38],
  ['31/8', 29, 45],
  ['01/9', 28, 42],
  ['02/9', 31, 49],
  ['03/9', 35, 55],
  ['04/9', 41, 62],
] as const

export function AnalysisResultPage() {
  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        <section className="app-container py-8 md:py-10">
          <a className="inline-flex items-center gap-2 text-label-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" href="/dashboard">
            <ChevronLeftIcon />
            Kembali ke Dashboard
          </a>

          <header className="mt-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-heading-xl text-[var(--color-text)]">Indomie Goreng</h1>
                <Badge>Makanan & Minuman</Badge>
                <Badge>SKU: IDM-GR-001</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-body-sm text-[var(--color-text-muted)]">
                <Badge>Regular</Badge>
                <span>
                  Tanggal Analisis: <strong className="text-[var(--color-text)]">22 Agustus 2026</strong>
                </span>
                <span>
                  Data Penjualan: <strong className="text-[var(--color-text)]">180 hari terakhir</strong>
                </span>
              </div>
            </div>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-primary)] px-5 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-50)]" type="button">
              <DownloadIcon />
              Export PDF
            </button>
          </header>

          <section className="mt-8 flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-5 py-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-full)] bg-[var(--color-danger-100)] text-[var(--color-danger)]">
                <AlertIcon />
              </span>
              <div>
                <h2 className="text-label-lg font-bold text-[var(--color-danger)]">Stockout Imminent: Stok Anda diperkirakan habis dalam 2 hari.</h2>
                <p className="mt-1 text-body-sm text-[var(--color-danger-700)]">Prioritas tinggi untuk menjaga ketersediaan produk.</p>
              </div>
            </div>
            <button className="h-11 rounded-[var(--radius-full)] bg-[var(--color-danger)] px-7 text-label-md font-bold text-white transition-colors hover:bg-[var(--color-danger-700)]" type="button">
              Pesan Sekarang
            </button>
          </section>

          <section className="mt-8 grid gap-6 md:grid-cols-2">
            <MetricCard helper="Pesan ulang saat stok mencapai angka ini" label="Reorder Point (ROP)" tone="primary" value="45 unit" />
            <MetricCard helper="Jumlah optimal untuk dipesan" label="Reorder Quantity (ROQ)" tone="success" value="120 unit" />
          </section>

          <section className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-[rgb(15_23_42_/_0.06)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="flex items-center gap-2 text-heading-sm text-[var(--color-text)]">
                <BarsIcon />
                Proyeksi Permintaan 14 Hari
              </h2>
              <div className="flex gap-4 text-label-sm text-[var(--color-text)]">
                <Legend color="bg-[var(--color-primary)]" label="P50 (Median)" />
                <Legend color="bg-[var(--color-success)]" label="P90 (Batas Atas)" />
              </div>
            </div>
            <div className="mt-8 flex h-[260px] items-end justify-between gap-2 px-2">
              {demandBars.map(([date, p50, p90]) => (
                <div className="grid flex-1 gap-2" key={date}>
                  <div className="flex h-[210px] items-end justify-center gap-2">
                    <span className="w-2 rounded-t-[var(--radius-full)] bg-[var(--color-primary)]" style={{ height: `${p50 * 2.2}px` }} />
                    <span className="w-2 rounded-t-[var(--radius-full)] bg-[var(--color-success)]" style={{ height: `${p90 * 2.2}px` }} />
                  </div>
                  <span className="text-center text-body-xs text-[var(--color-text-muted)]">{date}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-[rgb(15_23_42_/_0.06)]">
            <h2 className="flex items-center gap-2 text-heading-sm text-[var(--color-text)]">
              <DocIcon />
              Penjelasan Analisis
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <SmallMetric label="Permintaan Rata-rata" value="15 unit/hari" />
              <SmallMetric label="Lead Time" value="3 hari" />
              <SmallMetric label="Target Ketersediaan" value="95%" />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <MetricStrip label="Reorder Point (ROP)" tone="primary" value="45 unit" />
              <MetricStrip label="Reorder Quantity (ROQ)" tone="success" value="120 unit" />
            </div>
            <p className="mt-6 text-body-md leading-relaxed text-[var(--color-text-muted)]">
              Berdasarkan riwayat penjualan 180 hari terakhir, <strong className="text-[var(--color-text)]">Indomie Goreng</strong> menunjukkan pola permintaan reguler. Dengan lead time pemasok <strong className="text-[var(--color-text)]">3 hari</strong> dan target ketersediaan <strong className="text-[var(--color-text)]">95%</strong>, pemesanan ulang sebaiknya dilakukan saat stok mencapai <strong className="text-[var(--color-primary)]">45 unit</strong>, sejumlah <strong className="text-[var(--color-success)]">120 unit</strong>.
            </p>
          </section>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-8 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)]" onClick={() => navigateTo('/analysis/new')} type="button">
              Analisis SKU Lain
            </button>
            <button className="h-12 rounded-[var(--radius-lg)] border border-[var(--color-text)] px-8 text-label-md font-bold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]" onClick={() => navigateTo('/dashboard')} type="button">
              Kembali ke Dashboard
            </button>
            <button className="h-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] px-8 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary)]" onClick={() => navigateTo('/history')} type="button">
              Lihat Riwayat
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

function Badge({ children }: { children: string }) {
  return <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-50)] px-3 py-1 text-label-sm font-bold text-[var(--color-primary)]">{children}</span>
}

function MetricCard({ helper, label, tone, value }: { helper: string; label: string; tone: 'primary' | 'success'; value: string }) {
  const colorClass = tone === 'primary' ? 'bg-[var(--color-primary-50)]' : 'bg-[var(--color-success-50)]'

  return (
    <article className={`rounded-[var(--radius-xl)] border border-[var(--color-border)] p-7 shadow-lg shadow-[rgb(15_23_42_/_0.06)] ${colorClass}`}>
      <p className="text-label-md font-bold uppercase text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-6 font-mono text-[32px] font-extrabold leading-none text-[var(--color-text)]">{value}</p>
      <p className="mt-3 text-body-sm text-[var(--color-text-muted)]">{helper}</p>
    </article>
  )
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-4">
      <p className="text-label-sm font-bold uppercase text-[var(--color-text-muted)]">{label}</p>
      <p className="mt-1 font-mono text-data-sm font-bold text-[var(--color-text)]">{value}</p>
    </div>
  )
}

function MetricStrip({ label, tone, value }: { label: string; tone: 'primary' | 'success'; value: string }) {
  const colorClass = tone === 'primary' ? 'bg-[var(--color-primary-50)] text-[var(--color-primary)]' : 'bg-[var(--color-success-50)] text-[var(--color-success)]'

  return (
    <div className={`rounded-[var(--radius-lg)] p-4 ${colorClass}`}>
      <p className="text-label-sm font-bold uppercase">{label}</p>
      <p className="mt-1 font-mono text-data-md font-bold">{value}</p>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2 w-5 rounded-[var(--radius-full)] ${color}`} />
      {label}
    </span>
  )
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 8v5m0 4h.01M10.3 4.5 2.7 18a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function BarsIcon() {
  return (
    <svg aria-hidden="true" className="size-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24">
      <path d="M4 20V10m6 10V4m6 16v-7m4 7H2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg aria-hidden="true" className="size-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M14 2v5h5M9 13h6M9 17h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
