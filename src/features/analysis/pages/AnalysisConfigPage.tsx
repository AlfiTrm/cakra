import { useState } from 'react'
import type { ReactNode } from 'react'
import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { AnalysisStepper } from '../components'
import { analysisSteps } from '../data/analysisSteps'

export function AnalysisConfigPage() {
  const [currentStock, setCurrentStock] = useState('')
  const [leadTime, setLeadTime] = useState('')

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

          <div className="mx-auto mt-8 max-w-[900px]">
            <header>
              <h1 className="text-heading-xl text-[var(--color-text)]">Konfigurasi Analisis</h1>
              <p className="mt-2 max-w-[720px] text-body-md text-[var(--color-text-muted)]">
                Lengkapi parameter berikut untuk hasil analisis yang akurat.
              </p>
            </header>

            <div className="mt-8">
              <AnalysisStepper activeStep={3} steps={analysisSteps} />
            </div>

            <section className="mt-8 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-[rgb(15_23_42_/_0.06)] sm:p-7">
              <div className="grid gap-6">
                <Field label="Nama SKU">
                  <input
                    className="h-12 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-4 text-label-md font-semibold text-[var(--color-text-muted)] outline-none"
                    readOnly
                    value="Indomie Goreng"
                  />
                </Field>

                <Field label="Kategori Produk">
                  <select className="h-12 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 text-label-md text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]">
                    <option>Makanan & Minuman</option>
                    <option>Makanan Instan</option>
                    <option>Kebutuhan Pokok</option>
                  </select>
                </Field>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Stok Saat Ini" required>
                    <div className="relative">
                      <input
                        className="h-12 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 pr-16 text-label-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
                        inputMode="numeric"
                        onChange={(event) => setCurrentStock(event.target.value)}
                        placeholder="Contoh: 45"
                        value={currentStock}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-label-sm font-bold text-[var(--color-text-muted)]">
                        unit
                      </span>
                    </div>
                  </Field>

                  <Field helper="Waktu kirim rata-rata dari pemasok" label="Lead Time Pemasok">
                    <div className="relative">
                      <input
                        className="h-12 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 pr-14 text-label-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
                        inputMode="numeric"
                        onChange={(event) => setLeadTime(event.target.value)}
                        placeholder="Contoh: 3"
                        value={leadTime}
                      />
                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-label-sm font-bold text-[var(--color-text-muted)]">
                        hari
                      </span>
                    </div>
                  </Field>
                </div>

                <Field helper="Tingkat ketersediaan stok yang diinginkan" label="Target Service Level">
                  <select className="h-12 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 text-label-md text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]">
                    <option>95%</option>
                    <option>90%</option>
                    <option>99%</option>
                  </select>
                </Field>
              </div>
            </section>

            <section className="mt-6 flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 py-4 text-body-sm shadow-sm md:flex-row md:items-center md:justify-between">
              <span className="font-bold text-[var(--color-text)]">Ringkasan Data</span>
              <span className="text-[var(--color-text-muted)]">SKU: Indomie Goreng · 175 baris valid · Periode: Feb 2026 - Sep 2026</span>
            </section>

            <div className="mx-auto mt-7 flex max-w-[620px] flex-col gap-4 sm:flex-row sm:items-center">
              <button
                className="h-12 px-6 text-label-md font-bold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
                onClick={() => navigateTo('/analysis/new/preview')}
                type="button"
              >
                Kembali
              </button>
              <button
                className="h-12 flex-1 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-10 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)]"
                onClick={() => navigateTo('/analysis/new/running')}
                type="button"
              >
                Mulai Analisis
              </button>
            </div>

            <p className="mt-3 flex items-center justify-center gap-2 text-center text-body-sm text-[var(--color-text-muted)]">
              <span className="rounded-[var(--radius-full)] bg-[var(--color-primary-50)] px-2 py-0.5 text-label-sm font-bold text-[var(--color-primary)]">
                1 kredit
              </span>
              Sisa kredit Anda: 18
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

function Field({ children, helper, label, required = false }: { children: ReactNode; helper?: string; label: string; required?: boolean }) {
  return (
    <label className="grid gap-2">
      <span className="text-label-md font-bold text-[var(--color-text)]">
        {label}
        {required ? <span className="text-[var(--color-danger)]"> *</span> : null}
      </span>
      {children}
      {helper ? <span className="text-body-xs text-[var(--color-text-muted)]">{helper}</span> : null}
    </label>
  )
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
