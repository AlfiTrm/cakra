import { Icon } from '@iconify/react'
import logoSecondary from '../../../assets/brand/logo-secondary-default.svg'
import { navigateTo } from '../../utils/navigation'

export function NotFoundPage() {
  function goBack() {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    navigateTo('/')
  }

  return (
    <main className="grid min-h-[calc(100vh-72px)] place-items-center overflow-hidden bg-[var(--color-surface)] px-6 text-center">
      <section className="relative w-full max-w-[560px]">
        <div className="absolute left-1/2 top-5 -z-0 h-28 w-64 -translate-x-1/2 rounded-full bg-[var(--color-primary-50)] blur-3xl" />
        <div
          aria-label="404"
          className="relative z-10 flex items-center justify-center gap-2 font-mono text-[116px] font-extrabold leading-none text-[var(--color-primary)] sm:gap-4 sm:text-[168px]"
        >
          <span>4</span>
          <img alt="" aria-hidden="true" className="size-[86px] sm:size-[124px]" src={logoSecondary} />
          <span>4</span>
        </div>
        <h1 className="mt-8 text-heading-xl text-[var(--color-text)]">Oops! Halaman tidak ditemukan</h1>
        <p className="mx-auto mt-4 max-w-[520px] text-body-md text-[var(--color-text-muted)]">
          Maaf, halaman yang Anda cari tidak tersedia. Bisa jadi tautannya berubah atau halaman sudah dipindahkan.
        </p>
        <button
          aria-label="Kembali ke halaman sebelumnya"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)]"
          onClick={goBack}
          type="button"
        >
          <Icon aria-hidden="true" className="size-5" icon="lucide:home" />
          Kembali
        </button>
      </section>
    </main>
  )
}
