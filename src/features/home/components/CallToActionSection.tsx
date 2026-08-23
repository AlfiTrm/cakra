import { Icon } from '@iconify/react'
import type { FormEvent } from 'react'
import { useStaggerInView } from '../../../shared/hooks/useStaggerInView'

const notes = ['Gratis 10 kredit pertama', 'Tanpa kartu kredit', 'Setup 2 menit']

export function CallToActionSection() {
  const { ref, isVisible } = useStaggerInView<HTMLElement>()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = '/auth/register'
  }

  return (
    <section
      ref={ref}
      className={`bg-[var(--color-primary)] py-20 text-white md:py-24 ${isVisible ? 'is-stagger-visible' : ''}`}
    >
      <div className="app-container text-center">
        <h2 className="animate-stagger-rise mx-auto max-w-[620px] text-display-sm [--stagger-index:0] md:text-[52px] md:leading-[60px]">
          Mulai Optimalkan
          <span className="block">Stok Anda</span>
        </h2>
        <p className="animate-stagger-rise mx-auto mt-8 max-w-[600px] text-body-sm text-[var(--color-primary-100)] [--stagger-index:1]">
          Bergabunglah dengan 500+ pemilik toko ritel di Indonesia yang sudah mengurangi stok mati dan meningkatkan
          omset dengan AI Cakra.
        </p>

        <form
          className="animate-stagger-rise mx-auto mt-9 flex max-w-[580px] flex-col gap-3 rounded-[var(--radius-lg)] bg-[var(--color-neutral-900)] p-2 [--stagger-index:2] sm:h-16 sm:flex-row sm:rounded-[var(--radius-full)]"
          onSubmit={handleSubmit}
        >
          <label className="sr-only" htmlFor="cta-email">
            Alamat email
          </label>
          <input
            className="min-h-12 flex-1 bg-transparent px-5 text-label-md text-white outline-none placeholder:text-[var(--color-neutral-400)]"
            id="cta-email"
            placeholder="Masukkan alamat email Anda"
            type="email"
          />
          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-white px-7 text-label-md font-bold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary-50)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)] sm:rounded-[var(--radius-full)]"
            type="submit"
          >
            Daftar Sekarang
            <Icon aria-hidden="true" className="size-4" icon="lucide:arrow-right" />
          </button>
        </form>

        <div className="animate-stagger-rise mt-5 flex flex-col items-center justify-center gap-3 text-label-sm text-[var(--color-primary-100)] [--stagger-index:3] sm:flex-row">
          {notes.map((note, index) => (
            <div className="flex items-center gap-3" key={note}>
              {index > 0 ? <span className="hidden h-4 w-px bg-white/25 sm:block" /> : null}
              <span>{note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
