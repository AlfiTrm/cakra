import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { AnalysisStepper, PreviewSummaryBar, PreviewValidationTable } from '../components'
import { analysisSteps } from '../data/analysisSteps'
import { getStoredUpload } from '../services/analysisStorage'

export function AnalysisPreviewPage() {
  const upload = getStoredUpload()

  if (!upload) {
    navigateTo('/analysis/new')
    return null
  }

  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        <section className="app-container py-8 md:py-10">
          <a
            className="inline-flex items-center gap-2 text-label-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            href="/analysis/new"
            onClick={(event) => {
              event.preventDefault()
              navigateTo('/analysis/new')
            }}
          >
            <ChevronLeftIcon />
            Kembali ke Upload
          </a>

          <div className="mx-auto mt-8 max-w-[1200px]">
            <header>
              <h1 className="text-heading-xl text-[var(--color-text)]">Preview & Validasi Data</h1>
              <p className="mt-2 max-w-[720px] text-body-md text-[var(--color-text-muted)]">
                Tinjau data yang diunggah dan perbaiki error sebelum melanjutkan.
              </p>
            </header>

            <div className="mt-8">
              <AnalysisStepper activeStep={2} steps={analysisSteps} />
            </div>

            <section className="mt-8 flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--color-success)] bg-[var(--color-success-50)] px-4 py-3 text-label-sm font-bold text-[var(--color-success)] md:flex-row md:items-center md:justify-between">
              <span className="flex items-center gap-2">
                <CheckCircleIcon />
                File berhasil diunggah
              </span>
              <span className="font-mono text-[var(--color-text)]">
                {upload.fileName} - {upload.validRowCount + upload.errorRowCount} baris - {upload.sizeLabel}
              </span>
            </section>

            <div className="mt-6">
              <PreviewValidationTable
                hiddenRowCount={Math.max(0, upload.validRowCount - upload.validRows.length)}
                rows={upload.validRows}
                title={`Data Valid (${upload.validRowCount} baris)`}
                tone="success"
              />
            </div>

            {upload.errorRowCount ? (
              <div className="mt-6">
                <PreviewValidationTable rows={upload.errors} title={`Data Error (${upload.errorRowCount} baris)`} tone="danger" />
              </div>
            ) : null}

            <div className="mt-6">
              <PreviewSummaryBar errorCount={upload.errorRowCount} validCount={upload.validRowCount} />
            </div>

            <div className="mx-auto mt-8 flex max-w-[520px] flex-col gap-4 sm:flex-row sm:items-center">
              <button
                className="h-12 px-6 text-label-md font-bold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)]"
                onClick={() => navigateTo('/analysis/new')}
                type="button"
              >
                Kembali
              </button>
              <button
                className="h-12 flex-1 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-10 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)]"
                onClick={() => navigateTo('/analysis/new/config')}
                type="button"
              >
                Lanjutkan ke Konfigurasi
              </button>
            </div>

            {upload.errorRowCount ? (
              <p className="mt-3 text-center text-body-sm text-[var(--color-text-muted)]">
                {upload.errorRowCount} baris error akan diabaikan dalam analisis
              </p>
            ) : null}
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

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="M9 12.5 11 14.5 15.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M21 12a9 9 0 1 1-4.2-7.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
