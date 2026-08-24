import type { CSSProperties, ReactNode } from 'react'

type ProfileDropdownProps = {
  availableCredits: number
  creditPercent: number
  displayName: string
  onClose: () => void
  onLogout: () => void
  totalCredits: number
}

export function ProfileDropdown({
  availableCredits,
  creditPercent,
  displayName,
  onClose,
  onLogout,
  totalCredits,
}: ProfileDropdownProps) {
  return (
    <div className="fixed inset-0 z-[55] bg-white/70 backdrop-blur-[2px]" onClick={onClose}>
      <aside
        className="is-stagger-visible fixed right-[max(1.25rem,calc((100vw-1200px)/2+1.25rem))] top-[92px] flex w-[340px] max-w-[calc(100vw-2rem)] flex-col rounded-[var(--radius-lg)] bg-white p-4 shadow-2xl shadow-[rgb(15_23_42_/_0.14)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="animate-stagger-rise flex items-center gap-3 pb-4 [--stagger-index:0]">
          <div className="grid size-12 place-items-center rounded-full bg-[var(--color-primary-100)] text-label-lg font-bold text-[var(--color-primary)]">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-label-lg font-bold text-[var(--color-text)]">{displayName}</p>
            <p className="text-body-sm text-[var(--color-text-muted)]">Akun Cakra</p>
            <span className="mt-2 inline-flex rounded-[var(--radius-full)] border border-[var(--color-primary-200)] bg-[var(--color-primary-50)] px-3 py-1 text-label-sm font-bold text-[var(--color-primary)]">
              Premium Member
            </span>
          </div>
        </div>

        <ProfileGroup index={1} title="Akun">
          <ProfileButton>Profil Saya</ProfileButton>
          <ProfileButton>Keamanan</ProfileButton>
        </ProfileGroup>

        <ProfileGroup index={2} title="Kredit & Tagihan">
          <div className="px-2 pb-3 pt-1">
            <div className="flex items-end justify-between gap-3">
              <p>
                <span className="font-mono text-heading-md font-extrabold text-[var(--color-primary)]">{availableCredits}</span>
                <span className="ml-1 text-label-sm text-[var(--color-text-muted)]">/ {totalCredits} Kredit sisa</span>
              </p>
              <span className="text-label-sm font-bold text-[var(--color-primary)]">{creditPercent}% Tersisa</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[var(--color-neutral-100)]">
              <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${creditPercent}%` }} />
            </div>
          </div>
          <ProfileButton>Beli Kredit Tambahan</ProfileButton>
          <ProfileButton>Riwayat Transaksi</ProfileButton>
        </ProfileGroup>

        <ProfileGroup index={3} title="Preferensi">
          <ProfileToggle label="Notifikasi Email" />
          <ProfileToggle label="Notifikasi Stok Kritis" />
        </ProfileGroup>

        <div className="animate-stagger-rise border-t border-[var(--color-border)] pt-4 [--stagger-index:4]">
          <button
            className="w-full rounded-[var(--radius-md)] px-3 py-2 text-left text-label-md font-semibold text-[var(--color-danger)] transition-colors hover:bg-[var(--color-danger-50)]"
            onClick={onLogout}
            type="button"
          >
            Keluar
          </button>
          <p className="mt-5 text-center text-body-xs text-[var(--color-text-muted)]">Cakra v1.0.0</p>
        </div>
      </aside>
    </div>
  )
}

function ProfileGroup({ children, index, title }: { children: ReactNode; index: number; title: string }) {
  return (
    <section
      className="animate-stagger-rise border-t border-[var(--color-border)] py-3"
      style={{ '--stagger-index': index } as CSSProperties}
    >
      <h3 className="px-2 pb-2 text-label-sm font-bold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">{title}</h3>
      <div className="grid gap-1">{children}</div>
    </section>
  )
}

function ProfileButton({ children }: { children: string }) {
  return (
    <button
      className="rounded-[var(--radius-md)] px-3 py-2 text-left text-label-md font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary)]"
      type="button"
    >
      {children}
    </button>
  )
}

function ProfileToggle({ label }: { label: string }) {
  return (
    <label className="flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2 text-label-md font-semibold text-[var(--color-text)]">
      {label}
      <input className="peer sr-only" defaultChecked type="checkbox" />
      <span className="relative h-6 w-11 rounded-full bg-[var(--color-neutral-200)] transition-colors after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:bg-[var(--color-primary)] peer-checked:after:translate-x-5" />
    </label>
  )
}
