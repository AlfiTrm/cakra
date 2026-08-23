import { useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, AuthInput, AuthSubmitButton } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'
import { forgotPassword } from '../services/authService'
import { setResetSessionToken } from '../services/authStorage'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canSubmit = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && !email.toLowerCase().endsWith('.con')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await forgotPassword({ email })
      if (!response.sessionToken) {
        setError('Session reset tidak ditemukan dari server.')
        return
      }

      setResetSessionToken(response.sessionToken)
      navigateTo('/auth/forgot-password/otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim kode OTP.')
    } finally {
      setIsSubmitting(false)
    }
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
                <AuthInput
                  label="Alamat Email Akun"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@toko.com"
                  required
                  type="email"
                  value={email}
                />

                {error ? <p className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</p> : null}

                <AuthSubmitButton className="mt-3" disabled={!canSubmit} isLoading={isSubmitting}>
                  Kirim Kode OTP
                </AuthSubmitButton>
              </form>
            </div>
          </div>
        </section>

        <AuthDecorPanel />
      </div>
    </main>
  )
}
