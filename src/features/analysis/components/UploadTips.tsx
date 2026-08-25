const uploadTips = [
  'Pastikan data memiliki kolom tanggal dan jumlah_terjual',
  'Minimal 90 hari data penjualan untuk bisa dianalisis',
  'Maksimal 365 hari data per analisis',
]

export function UploadTips() {
  return (
    <section className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-5 py-5 shadow-sm sm:px-6">
      <h2 className="text-label-lg font-bold text-[var(--color-text)]">Tips Unggah Data Optimal</h2>
      <ul className="mt-3 grid gap-2 text-body-sm text-[var(--color-text-muted)]">
        {uploadTips.map((tip) => (
          <li className="flex gap-3" key={tip}>
            <span className="mt-2 size-1.5 shrink-0 rounded-[var(--radius-full)] bg-[var(--color-primary)]" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
