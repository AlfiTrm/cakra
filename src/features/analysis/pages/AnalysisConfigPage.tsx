import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ConfirmModal } from '../../../shared/components'
import { Navbar } from '../../home/components/Navbar'
import { navigateTo } from '../../../shared/utils/navigation'
import { AnalysisStepper } from '../components'
import { analysisSteps } from '../data/analysisSteps'
import { createAnalysisSession, getAnalysisCategories } from '../services/analysisService'
import { getStoredDraft, getStoredUpload, setStoredDraft, setStoredSession } from '../services/analysisStorage'
import type { AnalysisCategory } from '../types/analysis'

export function AnalysisConfigPage() {
  const [upload] = useState(() => getStoredUpload())
  const draft = getStoredDraft()
  const [categories, setCategories] = useState<AnalysisCategory[]>([])
  const [categoryName, setCategoryName] = useState(draft?.categoryName ?? 'Makanan & Minuman')
  const [currentStock, setCurrentStock] = useState(draft ? String(draft.currentStock) : '')
  const [leadTime, setLeadTime] = useState(draft ? String(draft.leadTimeDays) : '')
  const [error, setError] = useState('')
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!upload) {
      navigateTo('/analysis/new')
      return
    }

    const controller = new AbortController()
    void getAnalysisCategories(controller.signal)
      .then((nextCategories) => {
        setCategories(nextCategories)
        if (!draft?.categoryName && nextCategories[0]) setCategoryName(nextCategories[0].name)
      })
      .catch(() => undefined)

    return () => controller.abort()
  }, [draft?.categoryName, upload])

  if (!upload) return null

  const categoryOptions = [categoryName, ...categories.map((category) => category.name)].filter((value, index, values) => value && values.indexOf(value) === index)
  const isCurrentStockValid = currentStock !== '' && Number(currentStock) >= 0
  const isLeadTimeValid = Number(leadTime) >= 1
  const isDisabled = !categoryName || !isCurrentStockValid || !isLeadTimeValid || isSubmitting

  function handleRequestSubmit() {
    setHasTriedSubmit(true)
    if (isDisabled) return
    setIsConfirmOpen(true)
  }

  async function handleSubmit() {
    if (!upload || isDisabled) return

    const nextDraft = {
      categoryName,
      currentStock: Number(currentStock),
      leadTimeDays: Number(leadTime),
    }

    setError('')
    setIsSubmitting(true)

    try {
      const session = await createAnalysisSession(upload.uploadId, nextDraft)
      setStoredDraft(nextDraft)
      setStoredSession(session)
      navigateTo('/analysis/new/running')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sesi analisis gagal dibuat.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const summaryText = `SKU: ${upload.skuName} - ${upload.validRowCount} baris valid${
    upload.errorRowCount ? ` - ${upload.errorRowCount} baris error diabaikan` : ''
  }`

  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[#fffdfa]">
        <section className="app-container py-8 md:py-10">
          <a
            className="inline-flex items-center gap-2 text-label-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
            href="/analysis/new/preview"
            onClick={(event) => {
              event.preventDefault()
              navigateTo('/analysis/new/preview')
            }}
          >
            <ChevronLeftIcon />
            Kembali ke Preview
          </a>

          <div className="mx-auto mt-8 max-w-[900px]">
            <header>
              <h1 className="text-heading-xl text-[var(--color-text)]">Konfigurasi Analisis</h1>
              <p className="mt-2 max-w-[720px] text-body-md text-[var(--color-text-muted)]">
                Isi kondisi stok hari ini supaya rekomendasi pesanan sesuai keadaan toko Anda.
              </p>
            </header>

            <div className="mt-8">
              <AnalysisStepper activeStep={3} steps={analysisSteps} />
            </div>

            {error ? (
              <div className="mt-6 rounded-[var(--radius-lg)] border border-[var(--color-danger-200)] bg-[var(--color-danger-50)] px-5 py-4 text-body-sm font-semibold text-[var(--color-danger)]">
                {error}
              </div>
            ) : null}

            <section className="mt-8 rounded-[var(--radius-lg)] bg-[var(--color-primary-50)] px-5 py-4 text-body-sm text-[var(--color-text-muted)]">
              <p className="font-bold text-[var(--color-text)]">Yang perlu disiapkan</p>
              <p className="mt-1">
                Cek stok fisik produk, perkiraan lama barang datang dari pemasok, lalu pilih kategori yang paling mendekati.
              </p>
            </section>

            <section className="mt-5 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white p-6 shadow-lg shadow-[rgb(15_23_42_/_0.06)] sm:p-7">
              <div className="grid gap-6">
                <Field label="Nama SKU">
                  <input
                    className="h-12 w-full rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-4 text-label-md font-semibold text-[var(--color-text-muted)] outline-none"
                    readOnly
                    value={upload.skuName}
                  />
                </Field>

                <Field helper="Pilih jenis barang agar hasil analisis dan riwayat lebih mudah dikelompokkan." label="Kategori Produk">
                  <CustomDropdown
                    onChange={setCategoryName}
                    options={categoryOptions.length ? categoryOptions : ['Makanan & Minuman']}
                    value={categoryName}
                  />
                </Field>

                <div className="grid gap-6 md:grid-cols-2">
                  <Field
                    error={hasTriedSubmit && !isCurrentStockValid ? 'Stok saat ini wajib diisi. Nilai 0 tetap boleh.' : undefined}
                    helper="Jumlah stok fisik yang tersedia sekarang di toko atau gudang."
                    label="Stok Saat Ini"
                    required
                  >
                    <InputWithUnit
                      isInvalid={hasTriedSubmit && !isCurrentStockValid}
                      onChange={setCurrentStock}
                      placeholder="Contoh: 45"
                      unit="unit"
                      value={currentStock}
                    />
                  </Field>

                  <Field
                    error={hasTriedSubmit && !isLeadTimeValid ? 'Lead time minimal 1 hari.' : undefined}
                    helper="Rata-rata waktu dari pesan ke pemasok sampai barang tiba."
                    label="Lead Time Pemasok"
                  >
                    <InputWithUnit isInvalid={hasTriedSubmit && !isLeadTimeValid} onChange={setLeadTime} placeholder="Contoh: 3" unit="hari" value={leadTime} />
                  </Field>
                </div>

                <Field helper="Standar aman untuk menjaga stok tetap tersedia saat permintaan naik." label="Target Ketersediaan Stok">
                  <CustomDropdown disabled options={['95%']} value="95%" />
                </Field>
              </div>
            </section>

            <section className="mt-6 flex flex-col gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 py-4 text-body-sm shadow-sm md:flex-row md:items-center md:justify-between">
              <span className="font-bold text-[var(--color-text)]">Ringkasan Data</span>
              <span className="text-[var(--color-text-muted)]">{summaryText}</span>
            </section>

            <section className="mt-4 flex flex-col gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary-50)] px-4 py-3 text-body-sm sm:flex-row sm:items-center sm:justify-center">
              <span className="rounded-full bg-white px-3 py-1 text-label-sm font-bold text-[var(--color-primary)]">Biaya 1 kredit</span>
              <span className="text-[var(--color-text-muted)]">Kredit dipotong saat sesi analisis dibuat.</span>
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
                className="h-12 flex-1 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-10 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-neutral-300)] disabled:text-[var(--color-neutral-500)] disabled:shadow-none"
                disabled={isDisabled}
                onClick={handleRequestSubmit}
                type="button"
              >
                {isSubmitting ? 'Membuat sesi...' : 'Mulai Analisis'}
              </button>
            </div>
          </div>
        </section>
      </main>
      <ConfirmModal
        confirmLabel="Mulai Analisis"
        description="Analisis akan memakai 1 kredit. Pastikan kategori, stok saat ini, dan lead time sudah sesuai."
        isLoading={isSubmitting}
        isOpen={isConfirmOpen}
        onClose={() => {
          if (!isSubmitting) setIsConfirmOpen(false)
        }}
        onConfirm={handleSubmit}
        title="Mulai analisis SKU?"
      />
    </>
  )
}

function Field({
  children,
  error,
  helper,
  label,
  required = false,
}: {
  children: ReactNode
  error?: string
  helper?: string
  label: string
  required?: boolean
}) {
  return (
    <label className="grid gap-2">
      <span className="text-label-md font-bold text-[var(--color-text)]">
        {label}
        {required ? <span className="text-[var(--color-danger)]"> *</span> : null}
      </span>
      {children}
      {error ? <span className="text-body-xs font-semibold text-[var(--color-danger)]">{error}</span> : null}
      {helper ? <span className="text-body-xs text-[var(--color-text-muted)]">{helper}</span> : null}
    </label>
  )
}

function InputWithUnit({
  isInvalid = false,
  onChange,
  placeholder,
  unit,
  value,
}: {
  isInvalid?: boolean
  onChange: (value: string) => void
  placeholder: string
  unit: string
  value: string
}) {
  return (
    <div className="relative">
      <input
        className={`h-12 w-full rounded-[var(--radius-lg)] border bg-white px-4 pr-16 text-label-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:ring-3 ${
          isInvalid
            ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger-100)]'
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-100)]'
        }`}
        inputMode="numeric"
        onChange={(event) => onChange(event.target.value.replace(/\D/g, ''))}
        placeholder={placeholder}
        value={value}
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-label-sm font-bold text-[var(--color-text-muted)]">
        {unit}
      </span>
    </div>
  )
}

function CustomDropdown({
  disabled = false,
  onChange,
  options,
  value,
}: {
  disabled?: boolean
  onChange?: (value: string) => void
  options: string[]
  value: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
      }}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex h-12 w-full items-center justify-between rounded-[var(--radius-lg)] border px-4 text-left text-label-md outline-none transition-colors focus-visible:ring-3 ${
          disabled
            ? 'cursor-not-allowed border-[var(--color-border)] bg-[var(--color-neutral-50)] text-[var(--color-text-muted)]'
            : 'border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[var(--color-primary)] focus-visible:border-[var(--color-primary)] focus-visible:ring-[var(--color-primary-100)]'
        }`}
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span>{value}</span>
        <ChevronDownIcon />
      </button>

      {isOpen && !disabled ? (
        <div
          className="absolute z-30 mt-2 max-h-56 w-full overflow-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-1 shadow-xl shadow-[rgb(15_23_42_/_0.12)]"
          role="listbox"
        >
          {options.map((option) => (
            <button
              aria-selected={option === value}
              className={`flex h-11 w-full items-center rounded-[var(--radius-md)] px-3 text-left text-label-md transition-colors ${
                option === value
                  ? 'bg-[var(--color-primary-50)] font-bold text-[var(--color-primary)]'
                  : 'text-[var(--color-text)] hover:bg-[var(--color-neutral-50)]'
              }`}
              key={option}
              onClick={() => {
                onChange?.(option)
                setIsOpen(false)
              }}
              role="option"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ChevronLeftIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg aria-hidden="true" className="size-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}
