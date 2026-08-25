import { useEffect, useState } from 'react'
import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { AnalysisStepper } from '../components'
import { analysisSteps } from '../data/analysisSteps'
import { getAnalysisSessionResult } from '../services/analysisService'
import { ensureAnalysisRunningStartedAt, getStoredSession, getStoredUpload } from '../services/analysisStorage'

const progressItems = [
  {
    description: 'Memastikan data yang valid dipakai untuk analisis.',
    icon: 'file',
    label: 'Membaca data penjualan',
  },
  {
    description: 'Mengukur stok aman agar toko tidak cepat kosong.',
    icon: 'shield',
    label: 'Menghitung stok aman',
  },
  {
    description: 'Menentukan batas stok kapan harus pesan ulang.',
    icon: 'target',
    label: 'Menentukan batas pesan ulang',
  },
  {
    description: 'Menghitung jumlah barang yang ideal untuk dipesan.',
    icon: 'package',
    label: 'Menghitung jumlah pesanan',
  },
  {
    description: 'Menyusun hasil akhir dan proyeksi permintaan.',
    icon: 'chart',
    label: 'Menyiapkan rekomendasi',
  },
] as const

export function AnalysisRunningPage() {
  const [session] = useState(() => getStoredSession())
  const [upload] = useState(() => getStoredUpload())
  const [startedAt] = useState(() => (session ? ensureAnalysisRunningStartedAt(session.sessionId) : Date.now()))
  const [progressPercent, setProgressPercent] = useState(() => calculateProgress(Date.now() - startedAt))
  const [elapsedSeconds, setElapsedSeconds] = useState(() => Math.floor((Date.now() - startedAt) / 1000))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!session) {
      navigateTo('/analysis/new/config')
      return
    }

    const currentSession = session
    let isMounted = true
    const controller = new AbortController()

    async function pollResult() {
      try {
        const result = await getAnalysisSessionResult(currentSession.sessionId, controller.signal)
        if (!isMounted) return
        if (result.status === 'COMPLETED') {
          navigateTo(`/analysis/${currentSession.sessionId}`)
          return
        }
        if (!isPendingStatus(result.status)) {
          setError(result.failureMessage ?? 'Analisis belum bisa diproses. Coba periksa data dan jalankan ulang.')
          setProgressPercent(100)
          return
        }

        window.setTimeout(pollResult, 2500)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        window.setTimeout(pollResult, 3500)
      }
    }

    void pollResult()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [session])

  useEffect(() => {
    const interval = window.setInterval(() => {
      const elapsedMs = Date.now() - startedAt
      setElapsedSeconds(Math.floor(elapsedMs / 1000))
      setProgressPercent((current) => (error ? current : calculateProgress(elapsedMs)))
    }, 250)

    return () => window.clearInterval(interval)
  }, [error, startedAt])

  if (!session) return null

  const activeIndex = Math.min(progressItems.length - 1, Math.floor(progressPercent / 20))

  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        <section className="app-container py-8 md:py-10">
          <a
            className="inline-flex items-center gap-2 text-label-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            href="/dashboard"
          >
            <ChevronLeftIcon />
            Kembali ke Dashboard
          </a>

          <div className="mx-auto mt-8 max-w-[740px]">
            <header>
              <h1 className="text-heading-xl text-[var(--color-text)]">Analisis sedang berjalan</h1>
              <p className="mt-2 text-body-md text-[var(--color-text-muted)]">
                Cakra sedang membaca pola penjualan dan menyiapkan rekomendasi restock untuk SKU Anda.
              </p>
            </header>

            <div className="mt-8">
              <AnalysisStepper activeStep={4} steps={analysisSteps} />
            </div>

            {error ? (
              <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-5 py-4 text-body-sm font-semibold text-[var(--color-danger)]">
                {error}
              </div>
            ) : null}

            <section className="mt-8 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white shadow-lg shadow-[rgb(15_23_42_/_0.08)]">
              <div className="flex flex-col gap-3 border-b border-[var(--color-border)] bg-[var(--color-primary-50)] px-6 py-4 text-body-sm md:flex-row md:items-center md:justify-between">
                <span className="font-bold text-[var(--color-primary)]">{upload?.skuName ?? 'SKU'}</span>
                <span className="text-[var(--color-text-muted)]">
                  {upload?.validRowCount ?? 0} data penjualan diproses - berjalan {elapsedSeconds} detik
                </span>
              </div>

              <div className="grid gap-8 px-6 py-8 md:grid-cols-[260px_1fr] md:p-8">
                <div className="grid content-center justify-items-center text-center">
                  <ProgressRing percent={progressPercent} />

                  <p className="mt-5 text-label-lg font-bold text-[var(--color-text)]">Langkah {activeIndex + 1} dari {progressItems.length}</p>
                  <p className="mt-1 max-w-[240px] text-body-sm text-[var(--color-text-muted)]">Halaman akan berpindah otomatis saat hasil selesai.</p>
                </div>

                <div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <p className="text-label-md font-bold text-[var(--color-text)]">Progres analisis</p>
                    <span
                      className={`rounded-full px-3 py-1 text-label-sm font-bold ${
                        error ? 'bg-[var(--color-danger-50)] text-[var(--color-danger)]' : 'bg-[var(--color-success-50)] text-[var(--color-success)]'
                      }`}
                    >
                      {error ? 'Perlu diperbaiki' : 'Sedang diproses'}
                    </span>
                  </div>

                  <ul className="grid gap-3">
                    {progressItems.map((item, index) => (
                      <ProgressStep activeIndex={activeIndex} index={index} item={item} key={item.label} />
                    ))}
                  </ul>

                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-[var(--color-neutral-100)]">
                    <div className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-300 ease-out" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>
            </section>

            <button
              className="mx-auto mt-8 block text-label-md font-bold text-[var(--color-danger)] hover:text-[var(--color-danger-700)]"
              onClick={() => navigateTo('/analysis/new/config')}
              type="button"
            >
              {error ? 'Kembali ke Konfigurasi' : 'Batal Analisis'}
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

function calculateProgress(elapsedMs: number) {
  const elapsedSeconds = elapsedMs / 1000
  return Math.min(90, Math.round(8 + elapsedSeconds * 4))
}

function isPendingStatus(status: string) {
  return ['PENDING', 'PENDING_AI', 'PROCESSING', 'RUNNING'].includes(status)
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative grid size-36 place-items-center rounded-[var(--radius-full)] bg-white shadow-sm shadow-[rgb(15_23_42_/_0.08)]">
      <svg aria-hidden="true" className="absolute inset-0 size-full -rotate-90" viewBox="0 0 120 120">
        <circle className="stroke-[var(--color-primary-100)]" cx="60" cy="60" fill="none" r={radius} strokeWidth="10" />
        <circle
          className="stroke-[var(--color-primary)] transition-[stroke-dashoffset] duration-500 ease-out"
          cx="60"
          cy="60"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
      <div className="grid place-items-center">
        <div className="grid size-11 place-items-center rounded-[var(--radius-full)] bg-[var(--color-primary-50)] text-[var(--color-primary)] [animation:pulse_1.8s_ease-in-out_infinite]">
          <CpuIcon />
        </div>
        <p className="mt-2 font-mono text-data-md font-bold text-[var(--color-primary)]">{percent}%</p>
      </div>
    </div>
  )
}

function ProgressStep({ activeIndex, index, item }: { activeIndex: number; index: number; item: (typeof progressItems)[number] }) {
  const status = index < activeIndex ? 'done' : index === activeIndex ? 'active' : 'pending'

  return (
    <li
      className={`flex gap-3 rounded-[var(--radius-lg)] px-3 py-3 transition-[background-color,box-shadow,transform] duration-500 ease-out ${
        status === 'active' ? 'bg-[var(--color-primary-50)] shadow-sm shadow-[rgb(45_82_221_/_0.08)]' : ''
      }`}
    >
      <StatusIcon icon={item.icon} status={status} />
      <div>
        <p className={`text-label-md ${status === 'pending' ? 'text-[var(--color-text-muted)]' : 'font-bold text-[var(--color-text)]'}`}>{item.label}</p>
        <p className="mt-0.5 text-body-xs text-[var(--color-text-muted)]">{item.description}</p>
      </div>
    </li>
  )
}

function StatusIcon({ icon, status }: { icon: (typeof progressItems)[number]['icon']; status: 'active' | 'done' | 'pending' }) {
  if (status === 'done') {
    return (
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-[var(--color-success-50)] text-[var(--color-success)]">
        <CheckIcon />
      </span>
    )
  }

  if (status === 'active') {
    return (
      <span className="relative mt-0.5 grid size-9 shrink-0 place-items-center rounded-[var(--radius-lg)] bg-[var(--color-primary)] text-white shadow-md shadow-[rgb(45_82_221_/_0.24)]">
        <span className="absolute inset-0 rounded-[var(--radius-lg)] bg-[var(--color-primary)] opacity-25 [animation:ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite]" />
        <span className="relative [animation:pulse_1.8s_ease-in-out_infinite]">
          <StepIcon icon={icon} />
        </span>
      </span>
    )
  }

  return (
    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-muted)]">
      <StepIcon icon={icon} />
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

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" fill="none" viewBox="0 0 24 24">
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24">
      <path d="M9 9h6v6H9zM4 9h2m-2 6h2m12-6h2m-2 6h2M9 4v2m6-2v2M9 18v2m6-2v2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function StepIcon({ icon }: { icon: (typeof progressItems)[number]['icon'] }) {
  if (icon === 'shield') return <ShieldIcon />
  if (icon === 'target') return <TargetIcon />
  if (icon === 'package') return <PackageIcon />
  if (icon === 'chart') return <ChartIcon />
  return <FileIcon />
}

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" fill="none" viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7zM14 3v5h4M9 13h6M9 17h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" fill="none" viewBox="0 0 24 24">
      <path d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" fill="none" viewBox="0 0 24 24">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 12h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function PackageIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" fill="none" viewBox="0 0 24 24">
      <path d="m4 7 8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ChartIcon() {
  return (
    <svg aria-hidden="true" className="size-4.5" fill="none" viewBox="0 0 24 24">
      <path d="M4 19V5M4 19h16M8 15v-4M12 15V8M16 15v-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
