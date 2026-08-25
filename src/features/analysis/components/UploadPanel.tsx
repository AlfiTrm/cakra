import { useRef, useState } from 'react'
import type { DragEvent } from 'react'
import type { UploadFileState } from '../types/analysis'

type UploadPanelProps = {
  file: UploadFileState | null
  isUploading?: boolean
  onFileChange: (file: UploadFileState | null) => void
  onFileSelect?: (file: File) => void
}

const maxFileSize = 2 * 1024 * 1024
const allowedExtension = 'xlsx'

export function UploadPanel({ file, isUploading = false, onFileChange, onFileSelect }: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [inlineError, setInlineError] = useState<{ fileName: string; message: string } | null>(null)

  function handleFile(nextFile?: File) {
    if (!nextFile) return

    const extension = nextFile.name.split('.').pop()?.toLowerCase() ?? ''
    if (extension !== allowedExtension) {
      setInlineError({
        fileName: nextFile.name,
        message: 'Hanya file .xlsx yang diterima',
      })
      onFileChange(null)
      return
    }

    if (nextFile.size > maxFileSize) {
      setInlineError({
        fileName: nextFile.name,
        message: 'Ukuran file maksimal 2 MB',
      })
      onFileChange(null)
      return
    }

    setInlineError(null)
    onFileChange({
      name: nextFile.name,
      rows: 0,
      sizeLabel: formatFileSize(nextFile.size),
    })
    onFileSelect?.(nextFile)
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsDragging(false)
    handleFile(event.dataTransfer.files[0])
  }

  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-5 shadow-lg shadow-[rgb(15_23_42_/_0.06)] sm:p-6">
      <button
        className={`flex min-h-[176px] w-full flex-col items-center justify-center rounded-[var(--radius-xl)] border-2 border-dashed px-6 py-10 text-center transition-all ${
          inlineError
            ? 'border-[var(--color-danger)] bg-[var(--color-danger-50)]'
            : isDragging
            ? 'scale-[1.01] border-[var(--color-primary)] bg-[var(--color-primary-100)] shadow-lg shadow-[rgb(45_82_221_/_0.18)]'
            : 'border-[var(--color-primary)] bg-[var(--color-primary-50)] hover:bg-[var(--color-primary-100)]'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDrop={handleDrop}
        type="button"
      >
        <span
          className={`grid size-14 place-items-center rounded-[var(--radius-full)] ${
            inlineError
              ? 'bg-[var(--color-danger-100)] text-[var(--color-danger)]'
              : isDragging
              ? 'bg-[var(--color-primary)] text-white'
              : 'bg-white text-[var(--color-primary)] shadow-lg shadow-[rgb(15_23_42_/_0.08)]'
          }`}
        >
          {isUploading ? <SpinnerIcon /> : inlineError ? <AlertIcon /> : <UploadIcon />}
        </span>
        <span
          className={`mt-6 text-label-lg font-bold ${
            inlineError ? 'text-[var(--color-danger)]' : isDragging ? 'text-[var(--color-primary)]' : 'text-[var(--color-text)]'
          }`}
        >
          {isUploading ? 'Mengunggah dan memvalidasi file...' : inlineError ? 'Format file tidak didukung' : isDragging ? 'Lepaskan file untuk mengunggah' : 'Seret file XLSX ke sini atau klik untuk memilih'}
        </span>
        <span className={`mt-2 text-body-sm ${inlineError ? 'text-[var(--color-danger-700)]' : 'text-[var(--color-text-muted)]'}`}>
          {isUploading ? (
            'Tunggu sebentar, sistem sedang membaca data penjualan.'
          ) : inlineError ? (
            <>
              File yang diunggah: <span className="font-bold">{inlineError.fileName}</span>. {inlineError.message}
            </>
          ) : isDragging ? (
            'Sistem akan memvalidasi data Anda secara instan'
          ) : (
            'Format: XLSX - Maks 2MB - Minimal 90 hari data penjualan'
          )}
        </span>
        {isDragging && !inlineError && !isUploading ? (
          <span className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-[var(--radius-full)] bg-white px-3 py-1 text-label-sm font-bold text-[var(--color-primary)] shadow-sm">
              XLSX
            </span>
            <span className="rounded-[var(--radius-full)] bg-white/70 px-3 py-1 text-label-sm font-bold text-[var(--color-text-muted)]">
              maks 2MB
            </span>
          </span>
        ) : null}
      </button>

      <input
        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="sr-only"
        onChange={(event) => {
          handleFile(event.target.files?.[0])
          event.currentTarget.value = ''
        }}
        ref={inputRef}
        type="file"
      />

      {file && !inlineError ? <UploadedFileCard file={file} isUploading={isUploading} /> : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          className="flex w-fit items-center gap-2 text-label-md font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          download
          href="/template/template_file.xlsx"
        >
          <DownloadIcon />
          Unduh template XLSX
        </a>
        {inlineError ? (
          <button
            className="h-10 rounded-[var(--radius-lg)] border border-[var(--color-primary)] px-6 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:border-[var(--color-primary-hover)] hover:text-[var(--color-primary-hover)]"
            onClick={() => {
              setInlineError(null)
              inputRef.current?.click()
            }}
            type="button"
          >
            Pilih File Lain
          </button>
        ) : null}
      </div>
    </section>
  )
}

function UploadedFileCard({ file, isUploading }: { file: UploadFileState; isUploading: boolean }) {
  return (
    <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)] bg-[var(--color-primary-50)] text-[var(--color-primary)]">
            <FileIcon />
          </span>
          <div>
            <p className="text-label-md font-bold text-[var(--color-text)]">{file.name}</p>
            <p className="mt-1 text-body-xs text-[var(--color-text-muted)]">{file.sizeLabel}</p>
          </div>
        </div>
        <p className={`flex items-center gap-2 text-label-sm font-bold ${isUploading ? 'text-[var(--color-primary)]' : 'text-[var(--color-success)]'}`}>
          {isUploading ? <SpinnerIcon /> : <CheckCircleIcon />}
          {isUploading ? 'Memvalidasi' : 'File valid'}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-body-sm text-[var(--color-text-muted)]">
        <ValidationItem label="Format file valid" />
        <ValidationItem label="Kolom wajib ditemukan" />
        {file.rows > 0 ? <ValidationItem label={`${file.rows} baris terdeteksi`} /> : null}
      </div>
    </div>
  )
}

function ValidationItem({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="font-bold text-[var(--color-success)]">OK</span>
      {label}
    </span>
  )
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`

  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

function UploadIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="M12 15V4m0 0 4 4m-4-4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 16.5a4 4 0 0 1-3.9 3.5H8a5 5 0 1 1 1.1-9.9A6 6 0 0 1 20 13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function AlertIcon() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24">
      <path d="M12 8v5m0 4h.01M10.3 4.5 2.7 18a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 4.5a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg aria-hidden="true" className="size-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <path d="M12 3a9 9 0 1 1-8.5 6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}

function FileIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M14 2v5h5M9 13h6M9 17h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24">
      <path d="M9 12.5 11 14.5 15.5 9.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M21 12a9 9 0 1 1-4.2-7.6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
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
