const metrics = [
  { label: 'Saran Order', value: '320 Pcs', tone: 'text-[var(--color-primary)]' },
  { label: 'Akurasi Prediksi', value: '99.4%', tone: 'text-[var(--color-success)]' },
  { label: 'Lead Time', value: '3 Hari', tone: 'text-[var(--color-text)]' },
]

export function AuthDecorPanel() {
  return (
    <aside className="hidden h-full p-6 lg:block">
      <div className="flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-[var(--radius-2xl)] bg-[linear-gradient(135deg,var(--color-primary-500),var(--color-primary-800)_48%,var(--color-neutral-950))] p-12 text-white">
        <div>
          <h2 className="max-w-[480px] text-display-sm md:text-[44px] md:leading-[54px]">
            Prediksi stok yang langsung bisa dipakai.
          </h2>
          <p className="mt-6 max-w-[460px] text-body-md text-[var(--color-primary-100)]">
            Ubah data penjualan menjadi keputusan restock yang jelas, dari saran order sampai risiko stok mati.
          </p>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-white p-6 text-[var(--color-text)] shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-label-sm font-bold text-[var(--color-text-muted)]">Analisis rekomendasi SKU</p>
              <h3 className="mt-2 text-heading-sm">Minyak Goreng Sawit 2L</h3>
            </div>
            <span className="rounded-[var(--radius-md)] bg-[var(--color-danger-50)] px-3 py-2 text-label-sm font-bold text-[var(--color-danger)]">
              Restock Segera
            </span>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-5">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-body-xs text-[var(--color-text-muted)]">{metric.label}</p>
                <p className={`mt-2 font-mono text-data-lg ${metric.tone}`}>{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="max-w-[460px] text-body-sm text-[var(--color-primary-100)]">
          "Kami bisa tahu barang mana yang harus dipesan minggu ini tanpa menebak dari laporan manual."
        </p>
      </div>
    </aside>
  )
}
