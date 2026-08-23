import { useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, OtpInput } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'

export function ForgotPasswordOtpPage() {
  const [otp, setOtp] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigateTo('/auth/reset-password')
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
              <h1 className="text-display-sm text-[var(--color-text)]">Masukkan kode OTP</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Masukkan kode otp yang dikirim ke email anda
              </p>

              <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
                <OtpInput value={otp} onChange={setOtp} />

                <button
                  className="h-12 rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)]"
                  type="submit"
                >
                  Verifikasi
                </button>
              </form>

              <p className="mt-4 text-center text-body-md text-[var(--color-text-muted)]">
                kirim ulang dalam <span className="font-bold text-[var(--color-primary)]">05.00</span>
              </p>
            </div>
          </div>
        </section>

        <AuthDecorPanel />
      </div>
    </main>
  )
}
