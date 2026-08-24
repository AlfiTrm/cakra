import { useState } from 'react'
import logoSecondary from '../../../assets/brand/logo-secondary-default.svg'
import { AuthDecorPanel, AuthInput, AuthSubmitButton } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'
import { setRegisterSessionToken } from '../services/authStorage'
import { startRegister } from '../services/authService'

export function RegisterPage() {
  const [emailError, setEmailError] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canSubmit = fullName.trim().length > 0 && isValidEmail(email)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setEmailError('')

    if (!isValidEmail(email)) {
      setEmailError('Alamat email belum valid.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await startRegister({ email, full_name: fullName })
      setRegisterSessionToken(response.data.session_token)
      navigateTo('/auth/register/otp')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim OTP.')
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
              <img alt="Cakra" className="h-8 w-auto" src={logoSecondary} />
            </a>
            <p className="text-label-sm text-[var(--color-text-muted)]">
              Sudah punya akun?{' '}
              <a className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" href="/auth/login">
                Masuk
              </a>
            </p>
          </header>

          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full max-w-[480px]">
              <h1 className="text-display-sm text-[var(--color-text)]">Buat Akun Baru</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Mulai optimalkan stok bisnis Anda dalam hitungan menit.
              </p>

              <button
                className="mt-7 flex h-12 w-full cursor-not-allowed items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-5 text-label-md font-bold text-[var(--color-text-muted)] opacity-70"
                disabled
                type="button"
              >
                Daftar dengan Google
              </button>

              <div className="my-6 flex items-center gap-4 text-label-sm font-semibold text-[var(--color-text-muted)]">
                <span className="h-px flex-1 bg-[var(--color-border)]" />
                Atau
                <span className="h-px flex-1 bg-[var(--color-border)]" />
              </div>

              <form className="grid gap-4" onSubmit={handleSubmit}>
                <AuthInput
                  label="Nama Lengkap"
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  required
                  type="text"
                  value={fullName}
                />
                <AuthInput
                  error={emailError}
                  label="Alamat Email"
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (emailError) setEmailError('')
                  }}
                  placeholder="nama@toko.com"
                  required
                  type="email"
                  value={email}
                />

                {error ? <p className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</p> : null}

                <AuthSubmitButton className="mt-3 shadow-[rgb(45_82_221_/_0.25)]" disabled={!canSubmit} isLoading={isSubmitting}>
                  Daftar dengan Email
                </AuthSubmitButton>
              </form>

            </div>
          </div>

          <footer className="border-t border-[var(--color-border)] pt-5 text-body-xs leading-6 text-[var(--color-text-muted)] [word-spacing:0.08em]">
            Dengan melanjutkan, Anda menyetujui{' '}
            <a className="font-bold text-[var(--color-primary)]" href="/terms">
              Syarat Ketentuan Layanan
            </a>{' '}
            serta{' '}
            <a className="font-bold text-[var(--color-primary)]" href="/privacy">
              Kebijakan Privasi
            </a>{' '}
            Cakra.
          </footer>
        </section>

        <AuthDecorPanel />
      </div>
    </main>
  )
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && !value.toLowerCase().endsWith('.con')
}
