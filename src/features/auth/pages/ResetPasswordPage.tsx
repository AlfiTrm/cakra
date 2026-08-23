import { useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, AuthInput, AuthSubmitButton } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'
import { setForgotPassword } from '../services/authService'
import { clearResetSessionToken, getResetSessionToken } from '../services/authStorage'

export function ResetPasswordPage() {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState('')
  const canSubmit = password.length >= 8 && confirmPassword.length >= 8 && password === confirmPassword

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const sessionToken = getResetSessionToken()
    if (!sessionToken) {
      navigateTo('/auth/forgot-password')
      return
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password belum sama.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      await setForgotPassword(sessionToken, password, confirmPassword)
      clearResetSessionToken()
      navigateTo('/auth/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menyimpan password baru.')
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
              <h1 className="text-display-sm text-[var(--color-text)]">Buat Password Baru</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Masukkan password baru untuk akun cakra anda
              </p>

              <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                <AuthInput
                  label="Masukkan password baru"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password baru"
                  required
                  type="password"
                  value={password}
                />
                <AuthInput
                  label="Konfirmasi password baru"
                  minLength={8}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Konfirmasi password baru"
                  required
                  type="password"
                  value={confirmPassword}
                />

                {error ? <p className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</p> : null}

                <AuthSubmitButton className="mt-3" disabled={!canSubmit} isLoading={isSubmitting}>
                  Simpan password baru
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
