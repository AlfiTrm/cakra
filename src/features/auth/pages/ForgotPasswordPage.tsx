import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, AuthInput } from '../components'
import type { FormEvent } from 'react'

export function ForgotPasswordPage() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    window.location.href = '/auth/forgot-password/otp'
  }

  return (
    <main className="h-screen overflow-hidden bg-[#fffdfa]">
      <div className="mx-auto grid h-full w-full max-w-[1440px] lg:grid-cols-[1fr_630px]">
        <section className="flex h-full flex-col px-7 py-7 sm:px-12 lg:px-16">
          <header className="flex items-center justify-between">
            <a aria-label="Cakra home" href="/">
              <img alt="Cakra" className="h-8 w-auto" src={logoPrimary} />
            </a>
            <a className="text-label-md font-bold text-[var(--color-primary)] underline" href="/auth/login">
              Kembali ke Masuk
            </a>
          </header>

          <div className="flex flex-1 items-center py-8">
            <div className="w-full max-w-[480px]">
              <h1 className="text-display-sm text-[var(--color-text)]">Lupa Kata Sandi?</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Masukkan alamat email akun Anda dan kami akan mengirimkan tautan instruksi untuk mengatur ulang kata
                sandi Anda.
              </p>

              <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                <AuthInput label="Alamat Email Akun" placeholder="nama@toko.com" type="email" />

                <button
                  className="mt-3 h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)]"
                  type="submit"
                >
                  Kirim Kode OTP
                </button>
              </form>
            </div>
          </div>
        </section>

        <AuthDecorPanel />
      </div>
    </main>
  )
}
