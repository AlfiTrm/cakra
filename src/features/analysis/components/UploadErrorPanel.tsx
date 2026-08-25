import type { UploadErrorState } from '../types/analysis'

type UploadErrorPanelProps = {
  error: UploadErrorState
  onRetry: () => void
}

export function UploadErrorPanel({ error, onRetry }: UploadErrorPanelProps) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--color-danger-200)] bg-white p-6 shadow-lg shadow-[rgb(239_68_68_/_0.08)] sm:p-8">
      <header className="flex items-start gap-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-full)] border-2 border-[var(--color-danger)] text-[var(--color-danger)]">
          <AlertIcon />
        </span>
        <div>
          <h2 className="text-heading-md text-[var(--color-danger)]">Validasi Berkas Gagal</h2>
          <p className="mt-1 text-body-md text-[var(--color-text-muted)]">
            Ditemukan masalah pada berkas yang diunggah. Perbaiki dan coba lagi.
          </p>
        </div>
      </header>

      <div className="mt-6 border-t border-[var(--color-border)] pt-6">
        <p className="text-label-md font-bold text-[var(--color-text)]">Rincian Masalah yang Ditemukan:</p>
        <div className="mt-4 grid gap-4">
          {error.problems.map((problem) => (
            <div className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-4 py-4 text-body-sm font-semibold text-[var(--color-text)]" key={problem}>
              <span className="mt-0.5 shrink-0 text-[var(--color-danger)]">
                <WarningIcon />
              </span>
              <span>{problem}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[#fffdfa] p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="size-8 rounded-[var(--radius-md)] bg-[var(--color-danger-50)]" />
            <p className="text-label-md font-bold text-[var(--color-text)]">
              {error.fileName}
              <span className="mx-2 text-[var(--color-text-muted)]">·</span>
              <span className="font-medium text-[var(--color-text-muted)]">{error.sizeLabel}</span>
            </p>
          </div>
          <span className="w-fit rounded-[var(--radius-full)] bg-[var(--color-danger-50)] px-3 py-1 text-label-sm font-bold text-[var(--color-danger)]">
            Ditolak
          </span>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a
          className="inline-flex h-12 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-primary)] px-6 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-50)]"
          download
          href="/template-analysis.csv"
        >
          Unduh Template CSV
        </a>
        <button
          className="h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)]"
          onClick={onRetry}
          type="button"
        >
          Unggah Ulang
        </button>
      </div>

      <p className="mt-6 text-center text-body-sm text-[var(--color-text-muted)]">
        Pastikan berkas menggunakan format template yang disediakan dengan kolom:{' '}
        <strong>tanggal</strong>, <strong>jumlah_terjual</strong>, <strong>nama_sku</strong> (opsional),{' '}
        <strong>harga_satuan</strong> (opsional)
      </p>
    </section>
  )
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="M12 8v5M12 17h.01" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 9v4m0 4h.01M10.3 4.7 2.8 18a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.7a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
