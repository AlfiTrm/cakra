import { useEffect, useState } from 'react'
import { HomePage } from '../features/home/pages/HomePage'
import { Footer } from '../features/home/components/Footer'
import { Navbar } from '../features/home/components/Navbar'
import { DashboardPage } from '../features/dashboard/pages/DashboardPage'
import { HistoryPage } from '../features/history/pages/HistoryPage'
import { LoadingPage, NotFoundPage } from '../shared/components'
import { NAVIGATION_EVENT } from '../shared/utils/navigation'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { RegisterOtpPage } from '../features/auth/pages/RegisterOtpPage'
import { CreatePasswordPage } from '../features/auth/pages/CreatePasswordPage'
import { ForgotPasswordPage } from '../features/auth/pages/ForgotPasswordPage'
import { ForgotPasswordOtpPage } from '../features/auth/pages/ForgotPasswordOtpPage'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { ResetPasswordPage } from '../features/auth/pages/ResetPasswordPage'
import { AUTH_LOGOUT_EVENT, isAuthenticated } from '../shared/services/authToken'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    let timeoutId: number

    function openPath(nextPath: string, replace = false) {
      if (nextPath === window.location.pathname) return

      setIsLoading(true)
      timeoutId = window.setTimeout(() => {
        window.history[replace ? 'replaceState' : 'pushState']({}, '', nextPath)
        setPath(window.location.pathname)
        window.scrollTo({ top: 0 })
        setIsLoading(false)
      }, 260)
    }

    function handleNavigate(event: Event) {
      openPath((event as CustomEvent<string>).detail)
    }

    function handlePopState() {
      setIsLoading(true)
      timeoutId = window.setTimeout(() => {
        setPath(window.location.pathname)
        setIsLoading(false)
      }, 180)
    }

    function handleAuthLogout() {
      openPath('/auth/login', true)
    }

    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target || link.hasAttribute('download')) return

      const url = new URL(link.href)
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return

      event.preventDefault()
      openPath(url.pathname)
    }

    window.addEventListener(NAVIGATION_EVENT, handleNavigate)
    window.addEventListener(AUTH_LOGOUT_EVENT, handleAuthLogout)
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleClick)

    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener(NAVIGATION_EVENT, handleNavigate)
      window.removeEventListener(AUTH_LOGOUT_EVENT, handleAuthLogout)
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  if (isProtectedPath(path) && !isAuthenticated()) {
    return <LoginPage />
  }

  if (path === '/privacy') {
    return <LegalPage title="Kebijakan Privasi" />
  }

  if (path === '/terms') {
    return <LegalPage title="Syarat Ketentuan Layanan" />
  }

  if (path === '/history') {
    return <HistoryPage />
  }

  if (path === '/analysis/new') {
    return <AppPlaceholder title="Analisis Baru" />
  }

  if (path === '/dashboard') {
    return <DashboardPage />
  }

  if (path === '/auth/reset-password') {
    return <ResetPasswordPage />
  }

  if (path === '/auth/forgot-password/otp') {
    return <ForgotPasswordOtpPage />
  }

  if (path === '/auth/forgot-password') {
    return <ForgotPasswordPage />
  }

  if (path === '/auth/login') {
    return <LoginPage />
  }

  if (path === '/auth/register/password') {
    return <CreatePasswordPage />
  }

  if (path === '/auth/register/otp') {
    return <RegisterOtpPage />
  }

  if (path === '/auth/register') {
    return <RegisterPage />
  }

  if (path === '/') {
    return <HomePage />
  }

  return <NotFoundRoute path={path} />
}

function NotFoundRoute({ path }: { path: string }) {
  const isAppRoute = isProtectedPath(path)

  return (
    <>
      <Navbar variant={isAppRoute ? 'app' : 'public'} />
      <NotFoundPage />
      {isAppRoute ? null : <Footer />}
    </>
  )
}

function isProtectedPath(path: string) {
  return ['/dashboard', '/analysis', '/history', '/settings'].some((appPath) => path.startsWith(appPath))
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
