import { useState } from 'react'
import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { AnalysisStepper, UploadPanel, UploadTips } from '../components'
import { analysisSteps, demoUploadFile } from '../data/analysisSteps'
import type { UploadFileState } from '../types/analysis'

export function NewAnalysisPage() {
  const [file, setFile] = useState<UploadFileState | null>(demoUploadFile)

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
              <h1 className="text-heading-xl text-[var(--color-text)]">Analisis SKU Baru</h1>
              <p className="mt-2 max-w-[720px] text-body-md text-[var(--color-text-muted)]">
                Unggah data penjualan historis untuk mendapatkan rekomendasi replenishment yang optimal.
              </p>
            </header>

            <div className="mt-8">
              <AnalysisStepper steps={analysisSteps} />
            </div>

            <div className="mt-8">
              <UploadPanel file={file} onFileChange={setFile} />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="text-left text-label-md font-bold text-[var(--color-primary)] underline hover:text-[var(--color-primary-hover)]"
                onClick={() => navigateTo('/dashboard')}
                type="button"
              >
                Batal
              </button>
              <button
                className="h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-10 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-300)] disabled:text-[var(--color-neutral-500)] disabled:shadow-none sm:min-w-[360px]"
                disabled={!file}
                onClick={() => navigateTo('/analysis/new/preview')}
                type="button"
              >
                Lanjutkan
              </button>
            </div>

            <div className="mt-6">
              <UploadTips />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
