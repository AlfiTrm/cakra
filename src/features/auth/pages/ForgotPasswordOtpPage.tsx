import { useEffect, useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import { AuthDecorPanel, AuthSubmitButton, OtpInput } from '../components'
import type { FormEvent } from 'react'
import { navigateTo } from '../../../shared/utils/navigation'
import { getResetSessionToken } from '../services/authStorage'
import { resendForgotPasswordOtp, verifyForgotPasswordOtp } from '../services/authService'

export function ForgotPasswordOtpPage() {
  const [error, setError] = useState('')
  const [isResending, setIsResending] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [otp, setOtp] = useState('')
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(true)

  useEffect(() => {
    if (otp.length === 6 && shouldAutoSubmit && !isSubmitting) {
      void submitOtp()
    }
  }, [isSubmitting, otp, shouldAutoSubmit])

  async function submitOtp() {
    const sessionToken = getResetSessionToken()
    if (!sessionToken) {
      navigateTo('/auth/forgot-password')
      return
    }

    setError('')
    setMessage('')
    setIsSubmitting(true)

    try {
      await verifyForgotPasswordOtp(sessionToken, otp)
      navigateTo('/auth/reset-password')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP tidak valid.')
      setShouldAutoSubmit(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submitOtp()
  }

  async function handleResend() {
    const sessionToken = getResetSessionToken()
    if (!sessionToken) {
      navigateTo('/auth/forgot-password')
      return
    }

    setError('')
    setMessage('')
    setIsResending(true)

    try {
      const response = await resendForgotPasswordOtp(sessionToken)
      setMessage(response.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengirim ulang OTP.')
    } finally {
      setIsResending(false)
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
              <h1 className="text-display-sm text-[var(--color-text)]">Masukkan kode OTP</h1>
              <p className="mt-3 text-body-md text-[var(--color-text-muted)]">
                Masukkan kode otp yang dikirim ke email anda
              </p>

              <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
                <OtpInput
                  hasError={Boolean(error)}
                  value={otp}
                  onChange={(nextOtp) => {
                    setOtp(nextOtp)
                    if (error) setError('')
                  }}
                />

                {error ? <p className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</p> : null}
                {message ? <p className="text-body-sm font-semibold text-[var(--color-success)]">{message}</p> : null}

                <AuthSubmitButton disabled={otp.length < 6} isLoading={isSubmitting}>
                  Verifikasi
                </AuthSubmitButton>
              </form>

              <p className="mt-4 text-center text-body-md text-[var(--color-text-muted)]">
                Tidak menerima kode?{' '}
                <button
                  className="font-bold text-[var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isResending}
                  onClick={handleResend}
                  type="button"
                >
                  {isResending ? 'Mengirim...' : 'Kirim ulang'}
                </button>
              </p>
            </div>
          </div>
        </section>

        <AuthDecorPanel />
      </div>
    </main>
  )
}
