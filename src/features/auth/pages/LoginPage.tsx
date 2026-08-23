import { Icon } from '@iconify/react'
import { useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, AuthInput, AuthSubmitButton } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'
import { setAccessToken } from '../services/authStorage'
import { login } from '../services/authService'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState('')
  const canSubmit = email.trim().length > 0 && password.length > 0

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await login({ email, password })
      setAccessToken(response.data.access_token)
      navigateTo('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal.')
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
            <p className="text-label-sm text-[var(--color-text-muted)]">
              Belum punya akun?{' '}
              <a className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" href="/auth/register">
                Daftar
              </a>
            </p>
          </header>

          <div className="flex flex-1 items-center py-8">
            <div className="w-full max-w-[480px]">
              <h1 className="text-display-sm text-[var(--color-text)]">Selamat Datang!</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Masuk untuk melanjutkan analisis stok Anda.
              </p>

              <button
                className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-5 text-label-md font-bold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)]"
                onClick={() => navigateTo('/dashboard')}
                type="button"
              >
                <span className="grid size-4 shrink-0 place-items-center">
                  <Icon aria-hidden="true" className="size-4" icon="logos:google-icon" />
                </span>
                Masuk dengan Google
              </button>

              <div className="my-6 flex items-center gap-4 text-label-sm font-semibold text-[var(--color-text-muted)]">
                <span className="h-px flex-1 bg-[var(--color-border)]" />
                Atau
                <span className="h-px flex-1 bg-[var(--color-border)]" />
              </div>

              <form className="grid gap-4" onSubmit={handleSubmit}>
                <AuthInput
                  label="Alamat Email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@toko.com"
                  required
                  type="email"
                  value={email}
                />
                <AuthInput
                  label="Kata Sandi"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan kata sandi"
                  required
                  type="password"
                  value={password}
                />

                <div className="mt-1 flex items-center justify-between text-label-sm">
                  <label className="flex items-center gap-2 font-semibold text-[var(--color-text)]">
                    <input className="size-4 accent-[var(--color-primary)]" type="checkbox" />
                    Ingat saya
                  </label>
                  <a className="font-bold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]" href="/auth/forgot-password">
                    Lupa kata sandi?
                  </a>
                </div>

                {error ? <p className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</p> : null}

                <AuthSubmitButton className="mt-3 shadow-[rgb(45_82_221_/_0.25)]" disabled={!canSubmit} isLoading={isSubmitting}>
                  Masuk
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
            Cakra AI.
          </footer>
        </section>

        <AuthDecorPanel />
      </div>
    </main>
  )
}
