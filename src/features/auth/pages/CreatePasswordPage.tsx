import { useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, AuthInput, AuthSubmitButton } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'
import { clearRegisterSessionToken, getRegisterSessionToken, setAccessToken } from '../services/authStorage'
import { confirmRegisterPassword } from '../services/authService'

export function CreatePasswordPage() {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [password, setPassword] = useState('')
  const canSubmit = password.length >= 8 && confirmPassword.length >= 8 && password === confirmPassword

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const sessionToken = getRegisterSessionToken()
    if (!sessionToken) {
      navigateTo('/auth/register')
      return
    }

    if (password !== confirmPassword) {
      setError('Konfirmasi password belum sama.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const response = await confirmRegisterPassword(sessionToken, password, confirmPassword)
      setAccessToken(response.data.access_token)
      clearRegisterSessionToken()
      navigateTo('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengaktifkan akun.')
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
            <a className="text-label-md font-bold text-[var(--color-primary)] underline" href="/auth/register">
              Ubah akun email
            </a>
          </header>

          <div className="flex flex-1 items-center py-8">
            <div className="w-full max-w-[480px]">
              <h1 className="text-display-sm text-[var(--color-text)]">Buat Password</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Masukkan password untuk akun cakra anda
              </p>

              <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                <AuthInput
                  label="Masukkan password"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  required
                  type="password"
                  value={password}
                />
                <AuthInput
                  label="Konfirmasi password anda"
                  minLength={8}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Konfirmasi password anda"
                  required
                  type="password"
                  value={confirmPassword}
                />

                {error ? <p className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</p> : null}

                <AuthSubmitButton className="mt-3" disabled={!canSubmit} isLoading={isSubmitting}>
                  Aktifkan akun
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
