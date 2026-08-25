import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import logoSecondary from '../../../assets/brand/logo-secondary-default.svg'
import { LoadingContent } from '../../../shared/components/feedback/LoadingContent'
import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { getAnalysisSessionResult } from '../services/analysisService'
import { clearAnalysisFlow } from '../services/analysisStorage'
import type { AnalysisResultViewModel } from '../types/analysis'

type AnalysisResultPageProps = {
  sessionId: string
}

export function AnalysisResultPage({ sessionId }: AnalysisResultPageProps) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<AnalysisResultViewModel | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadResult() {
      setError('')
      setIsLoading(true)

      try {
        const nextResult = await getAnalysisSessionResult(sessionId, controller.signal)
        setResult(nextResult)
        if (nextResult.status === 'COMPLETED') clearAnalysisFlow()
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Hasil analisis gagal dimuat.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadResult()

    return () => controller.abort()
  }, [sessionId])

  return (
    <>
      <div className="print:hidden">
        <Navbar availableCredits={result?.availableCredits} variant="app" />
      </div>
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa] print:min-h-0 print:bg-white">
        <section className="analysis-report-page app-container py-8 md:py-10 print:max-w-none print:px-0 print:py-0">
          <a className="inline-flex items-center gap-2 text-label-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] print:hidden" href="/dashboard">
            <ChevronLeftIcon />
            Kembali ke Dashboard
          </a>

          {isLoading ? (
            <div className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-[rgb(15_23_42_/_0.06)]">
              <LoadingContent />
            </div>
          ) : error ? (
            <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-5 py-4 text-body-sm font-semibold text-[var(--color-danger)]">
              {error}
            </div>
          ) : result?.status !== 'COMPLETED' ? (
            <div className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 text-center shadow-lg shadow-[rgb(15_23_42_/_0.06)]">
              <h1 className="text-heading-md text-[var(--color-text)]">Analisis belum tersedia</h1>
              <p className="mt-2 text-body-md text-[var(--color-text-muted)]">
                {result?.failureMessage ?? 'Tunggu sebentar, lalu buka kembali hasil analisis ini.'}
              </p>
              <button
                className="mt-6 h-11 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-label-md font-bold text-white"
                onClick={() => navigateTo('/dashboard')}
                type="button"
              >
                Kembali ke Dashboard
              </button>
            </div>
          ) : result ? (
            <AnalysisResultContent result={result} />
          ) : null}
        </section>
      </main>
    </>
  )
}

function AnalysisResultContent({ result }: { result: AnalysisResultViewModel }) {
  const riskTone = result.riskLabel === 'NORMAL' ? 'success' : 'danger'
  const isStockLow = result.currentStock <= result.reorderPoint

  return (
    <>
      <style>{'@media print { @page { size: A4 portrait; margin: 0; } .analysis-report-page { padding: 10mm !important; } }'}</style>

      <header className="mt-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between print:mt-0 print:gap-2">
        <div>
          <div className="mb-3 hidden items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2 text-[11px] print:flex">
            <img alt="Cakra" className="size-7" src={logoSecondary} />
            <span className="text-[var(--color-text-muted)]">Laporan Analisis SKU · {formatLongDate(result.analysisDate)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-heading-lg text-[var(--color-text)] md:text-heading-xl print:text-heading-md">{result.skuName}</h1>
            <Badge>{formatDemandCategory(result.demandCategory)}</Badge>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-body-sm text-[var(--color-text-muted)] print:text-[11px]">
            <span>{formatLongDate(result.analysisDate)}</span>
            <span>{result.historicalDays} hari data penjualan</span>
            <span>SKU {result.skuId.slice(0, 8)}</span>
          </div>
        </div>
        <button
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-primary)] px-5 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-50)] print:hidden"
          onClick={() => window.print()}
          type="button"
        >
          <DownloadIcon />
          Unduh PDF
        </button>
      </header>

      <article className="mt-5 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-lg shadow-[rgb(15_23_42_/_0.06)] print:mt-3 print:rounded-none print:shadow-none">
        <section className="grid border-b border-[var(--color-border)] lg:grid-cols-[1.25fr_1fr]">
          <div className={`flex gap-3 px-5 py-4 ${riskTone === 'success' ? 'bg-[var(--color-success-50)]' : 'bg-[var(--color-danger-50)]'} print:px-4 print:py-3`}>
            <span className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full ${riskTone === 'success' ? 'bg-[var(--color-success-100)] text-[var(--color-success)]' : 'bg-[var(--color-danger-100)] text-[var(--color-danger)]'}`}>
              <AlertIcon />
            </span>
            <div>
              <p className={`text-label-md font-bold ${riskTone === 'success' ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]'}`}>{formatRiskLabel(result.riskLabel)}</p>
              <p className="mt-1 max-w-[70ch] text-body-sm text-[var(--color-text-muted)] print:text-[11px]">{result.riskReason}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 divide-x divide-[var(--color-border)] border-t border-[var(--color-border)] lg:border-l lg:border-t-0">
            <DecisionMetric label="Pesan saat stok" value={`${result.reorderPoint} unit`} />
            <DecisionMetric emphasized label="Jumlah pemesanan" value={`${result.reorderQuantity} unit`} />
          </div>
        </section>

        <section className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,1fr)] print:grid-cols-1">
          <div className="min-w-0 border-b border-[var(--color-border)] p-5 lg:border-b-0 lg:border-r print:p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-heading-sm text-[var(--color-text)]">Proyeksi permintaan {result.forecast.length} hari</h2>
                <p className="mt-1 text-body-sm text-[var(--color-text-muted)] print:text-[11px]">Perkiraan kebutuhan harian untuk membantu menentukan waktu pemesanan.</p>
              </div>
              <div className="flex shrink-0 gap-4 text-label-sm text-[var(--color-text)]">
                <Legend color="bg-[var(--color-primary)]" label="Kebutuhan umum" />
                <Legend color="bg-[var(--color-success)]" label="Batas aman" />
              </div>
            </div>
            <ForecastChart forecast={result.forecast} />
          </div>

          <aside className="p-5 print:grid print:grid-cols-[1.15fr_0.85fr] print:gap-5 print:p-4">
            <div>
              <h2 className="text-heading-sm text-[var(--color-text)]">Apa artinya untuk toko Anda?</h2>
              <p className="mt-3 text-body-sm leading-relaxed text-[var(--color-text-muted)] print:mt-2 print:text-[11px] print:leading-relaxed">{result.explanationText}</p>
              <p className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-neutral-50)] px-3 py-2 text-body-xs text-[var(--color-text-muted)] print:mt-3 print:text-[10px]">
                Rekomendasi dihitung dari pola penjualan historis dan kondisi stok saat analisis dilakukan.
              </p>
            </div>

            <dl className="mt-5 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] print:mt-0">
              <FactRow label="Stok sekarang" tone={isStockLow ? 'danger' : undefined} value={`${result.currentStock} unit`} />
              <FactRow label="Rata-rata terjual" value={`${formatNumber(result.averageDailyDemand)} unit/hari`} />
              <FactRow label="Waktu tunggu pemasok" value={`${result.leadTimeDays} hari`} />
              <FactRow label="Data dianalisis" value={`${result.historicalRowCount} transaksi`} />
            </dl>

            {riskTone === 'danger' ? (
              <button
                className="mt-4 h-11 w-full rounded-[var(--radius-lg)] bg-[var(--color-danger)] px-5 text-label-md font-bold text-white transition-colors hover:bg-[var(--color-danger-700)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-danger-200)] print:hidden"
                type="button"
              >
                Pesan Sekarang
              </button>
            ) : null}
          </aside>
        </section>
      </article>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row print:hidden">
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
    </>
  )
}

function ForecastChart({ forecast }: { forecast: AnalysisResultViewModel['forecast'] }) {
  const width = Math.max(560, forecast.length * 76 + 50)
  const height = 205
  const padding = { bottom: 30, left: 38, right: 12, top: 14 }
  const plotWidth = width - padding.left - padding.right
  const plotHeight = height - padding.top - padding.bottom

  if (!forecast.length) {
    return <div className="mt-5 rounded-[var(--radius-lg)] bg-[var(--color-neutral-50)] px-4 py-10 text-center text-body-sm text-[var(--color-text-muted)]">Belum ada data proyeksi.</div>
  }

  const maxValue = Math.max(...forecast.map((point) => point.p90), 1)
  const scaleY = (value: number) => padding.top + plotHeight - (value / maxValue) * plotHeight
  const ticks = [0.25, 0.5, 0.75, 1].map((ratio) => Math.round(maxValue * ratio))
  const groupWidth = plotWidth / forecast.length
  const barWidth = Math.min(18, Math.max(8, groupWidth * 0.22))
  const baseline = padding.top + plotHeight

  return (
    <div className="mt-3 max-w-[560px] overflow-x-auto pb-2 print:max-w-none print:overflow-visible print:pb-0">
      <svg aria-label="Grafik proyeksi permintaan" className="h-[205px] max-w-none print:!h-[170px] print:!w-full" role="img" style={{ width }} viewBox={`0 0 ${width} ${height}`}>
        {ticks.map((tick, index) => {
          const y = scaleY(tick)
          return (
            <g key={`${tick}-${index}`}>
              <line stroke="var(--color-neutral-200)" strokeDasharray="4 6" x1={padding.left} x2={padding.left + plotWidth} y1={y} y2={y} />
              <text fill="var(--color-text-muted)" fontSize="11" textAnchor="end" x={padding.left - 10} y={y + 4}>
                {tick}
              </text>
            </g>
          )
        })}

        <line stroke="var(--color-neutral-300)" x1={padding.left} x2={padding.left + plotWidth} y1={baseline} y2={baseline} />

        {forecast.map((point, index) => {
          const center = padding.left + groupWidth * index + groupWidth / 2
          const p50Y = scaleY(point.p50)
          const p90Y = scaleY(point.p90)

          return (
            <g key={`${point.date}-${index}`}>
              <rect fill="var(--color-primary)" height={baseline - p50Y} width={barWidth} x={center - barWidth - 4} y={p50Y} />
              <rect fill="var(--color-success)" height={baseline - p90Y} width={barWidth} x={center + 4} y={p90Y} />
              <text fill="var(--color-text-muted)" fontSize="11" textAnchor="middle" x={center} y={height - 8}>
              {formatShortDate(point.date)}
            </text>
            </g>
          )
        })}
      </svg>

      <div className="sticky left-0 mt-2 grid max-w-[560px] gap-2 border-t border-[var(--color-border)] pt-3 text-body-sm text-[var(--color-text-muted)] sm:grid-cols-3 print:max-w-none print:text-[11px]">
        <span>
          P50 rata-rata: <strong className="text-[var(--color-text)]">{formatNumber(average(forecast.map((point) => point.p50)))} unit</strong>
        </span>
        <span>
          P90 tertinggi: <strong className="text-[var(--color-text)]">{Math.max(...forecast.map((point) => point.p90))} unit</strong>
        </span>
        <span>
          Horizon: <strong className="text-[var(--color-text)]">{forecast.length} hari</strong>
        </span>
      </div>
    </div>
  )
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-50)] px-3 py-1 text-label-sm font-bold text-[var(--color-primary)]">{children}</span>
}

function DecisionMetric({ emphasized = false, label, value }: { emphasized?: boolean; label: string; value: string }) {
  return (
    <div className={`px-5 py-4 print:px-4 print:py-3 ${emphasized ? 'bg-[var(--color-primary-50)]' : ''}`}>
      <p className="text-label-sm font-bold text-[var(--color-text-muted)]">{label}</p>
      <p className={`mt-1 font-mono text-data-md font-extrabold ${emphasized ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'}`}>{value}</p>
    </div>
  )
}

function FactRow({ label, tone, value }: { label: string; tone?: 'danger'; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 print:py-2">
      <dt className="text-body-sm text-[var(--color-text-muted)] print:text-[11px]">{label}</dt>
      <dd className={`text-right font-mono text-data-sm font-bold ${tone === 'danger' ? 'text-[var(--color-danger)]' : 'text-[var(--color-text)]'}`}>{value}</dd>
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

function formatRiskLabel(label: string) {
  if (label === 'NORMAL') return 'Stok masih aman'
  if (label === 'DEADSTOCK') return 'Stok berisiko menumpuk'
  return 'Stok perlu segera dipesan'
}

function formatDemandCategory(category: string) {
  const labels: Record<string, string> = {
    ERRATIC: 'Permintaan tidak stabil',
    INTERMITTENT: 'Permintaan berkala',
    LUMPY: 'Permintaan tidak menentu',
    SMOOTH: 'Permintaan stabil',
  }

  return labels[category] ?? category
}

function formatLongDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 'Tanggal tidak tersedia' : new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(date)
}

function formatShortDate(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: '2-digit' }).format(date)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(value)
}

function average(values: number[]) {
  return values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0
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
