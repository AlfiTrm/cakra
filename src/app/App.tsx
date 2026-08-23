import { HomePage } from '../features/home/pages/HomePage'
import { Navbar } from '../features/home/components/Navbar'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { RegisterOtpPage } from '../features/auth/pages/RegisterOtpPage'
import { CreatePasswordPage } from '../features/auth/pages/CreatePasswordPage'
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage'
import { ForgotPasswordOtpPage } from '../features/auth/pages/ForgotPasswordOtpPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage'

function App() {
  if (window.location.pathname === '/privacy') {
    return <LegalPage title="Kebijakan Privasi" />
  }

  if (window.location.pathname === '/terms') {
    return <LegalPage title="Syarat Ketentuan Layanan" />
  }

  if (window.location.pathname === '/history') {
    return <AppPlaceholder title="Riwayat" />
  }

  if (window.location.pathname === '/analysis/new') {
    return <AppPlaceholder title="Analisis Baru" />
  }

  if (window.location.pathname === '/dashboard') {
    return <AppPlaceholder title="Dashboard" />
  }

  if (window.location.pathname === '/auth/reset-password') {
    return <ResetPasswordPage />
  }

  if (window.location.pathname === '/auth/forgot-password/otp') {
    return <ForgotPasswordOtpPage />
  }

  if (window.location.pathname === '/auth/forgot-password') {
    return <ForgotPasswordPage />
  }

  if (window.location.pathname === '/auth/login') {
    return <LoginPage />
  }

  if (window.location.pathname === '/auth/register/password') {
    return <CreatePasswordPage />
  }

  if (window.location.pathname === '/auth/register/otp') {
    return <RegisterOtpPage />
  }

  if (window.location.pathname === '/auth/register') {
    return <RegisterPage />
  }

  return <HomePage />
}

function AppPlaceholder({ title }: { title: string }) {
  return (
    <>
      <Navbar variant="app" />
      <main className="min-h-[calc(100vh-72px)] bg-[var(--color-surface)]">
        <section className="app-container py-16">
          <h1 className="text-display-sm text-[var(--color-text)]">{title}</h1>
          <p className="mt-4 max-w-[560px] text-body-md text-[var(--color-text-muted)]">
            Halaman ini placeholder statis untuk menyambungkan flow demo.
          </p>
        </section>
      </main>
    </>
  )
}

function LegalPage({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-[var(--color-surface)]">
      <section className="app-container py-16">
        <a className="text-label-md font-bold text-[var(--color-primary)]" href="/">
          Kembali ke Beranda
        </a>
        <h1 className="mt-10 text-display-sm text-[var(--color-text)]">{title}</h1>
        <p className="mt-4 max-w-[680px] text-body-md text-[var(--color-text-muted)]">
          Konten legal akan dilengkapi nanti. Untuk demo statis, halaman ini memastikan tautan tidak berhenti di anchor kosong.
        </p>
      </section>
    </main>
  )
}

export default App
