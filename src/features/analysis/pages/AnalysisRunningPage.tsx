import { useEffect } from 'react'
import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { AnalysisStepper } from '../components'
import { analysisSteps } from '../data/analysisSteps'

const progressItems = [
  { label: 'Memvalidasi data input', status: 'done' },
  { label: 'Menghitung Safety Buffer (SBC)', status: 'done' },
  { label: 'Menghitung Reorder Point (ROP)', status: 'active' },
  { label: 'Menghitung Reorder Quantity (ROQ)', status: 'pending' },
  { label: 'Forecast & proyeksi 14 hari', status: 'pending' },
] as const

export function AnalysisRunningPage() {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => navigateTo('/analysis/indomie-goreng'), 5000)

    return () => window.clearTimeout(timeoutId)
  }, [])

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
              <h1 className="text-heading-xl text-[var(--color-text)]">Menganalisis Data...</h1>
              <p className="mt-2 text-body-md text-[var(--color-text-muted)]">
                Proses analisis sedang berjalan, mohon tunggu beberapa saat.
              </p>
            </header>

            <div className="mt-8">
              <AnalysisStepper activeStep={4} steps={analysisSteps} />
            </div>

            <section className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-8 py-10 shadow-lg shadow-[rgb(15_23_42_/_0.08)]">
              <div className="mx-auto grid max-w-[360px] place-items-center text-center">
                <div className="grid size-24 place-items-center rounded-[var(--radius-full)] border-8 border-[var(--color-primary-100)] border-t-[var(--color-primary)] text-[var(--color-primary)] [animation:spin_1.2s_linear_infinite]">
                  <CpuIcon />
                </div>
                <h2 className="mt-7 text-heading-sm text-[var(--color-text)]">
                  Sedang menganalisis
                  <br />
                  175 data penjualan
                  <br />
                  Indomie Goreng
                </h2>
                <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">Estimasi waktu: 10-15 detik</p>
              </div>

              <div className="mt-8 border-t border-[var(--color-border)] pt-6">
                <ul className="grid gap-4">
                  {progressItems.map((item) => (
                    <li className={`flex items-center gap-3 text-label-md ${item.status === 'pending' ? 'text-[var(--color-text-muted)]' : 'font-bold text-[var(--color-text)]'}`} key={item.label}>
                      <StatusIcon status={item.status} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <button
              className="mx-auto mt-8 block text-label-md font-bold text-[var(--color-danger)] hover:text-[var(--color-danger-700)]"
              onClick={() => navigateTo('/analysis/new/config')}
              type="button"
            >
              Batal Analisis
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

function StatusIcon({ status }: { status: (typeof progressItems)[number]['status'] }) {
  if (status === 'done') {
    return (
      <span className="grid size-5 place-items-center rounded-[var(--radius-full)] bg-[var(--color-success)] text-white">
        <CheckIcon />
      </span>
    )
  }

  if (status === 'active') {
    return <span className="grid size-5 place-items-center rounded-[var(--radius-full)] bg-[var(--color-primary-50)] text-[var(--color-primary)] animate-pulse">+</span>
  }

  return <span className="size-5 rounded-[var(--radius-full)] border-2 border-[var(--color-border)]" />
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
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 24 24">
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
