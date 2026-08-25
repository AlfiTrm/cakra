import { lazy, Suspense, useEffect, useState } from 'react'
import { LoadingPage } from '../shared/components/feedback/LoadingPage'
import { NAVIGATION_EVENT } from '../shared/utils/navigation'
import { AUTH_LOGOUT_EVENT, isAuthenticated } from '../shared/services/authToken'
import type { ReactNode } from 'react'

const HomePage = lazy(() => import('../features/home/pages/HomePage').then((module) => ({ default: module.HomePage })))
const Footer = lazy(() => import('../features/home/components/Footer').then((module) => ({ default: module.Footer })))
const Navbar = lazy(() => import('../features/home/components/Navbar').then((module) => ({ default: module.Navbar })))
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))
const HistoryPage = lazy(() => import('../features/history/pages/HistoryPage').then((module) => ({ default: module.HistoryPage })))
const AnalysisConfigPage = lazy(() => import('../features/analysis/pages/AnalysisConfigPage').then((module) => ({ default: module.AnalysisConfigPage })))
const AnalysisResultPage = lazy(() => import('../features/analysis/pages/AnalysisResultPage').then((module) => ({ default: module.AnalysisResultPage })))
const AnalysisRunningPage = lazy(() => import('../features/analysis/pages/AnalysisRunningPage').then((module) => ({ default: module.AnalysisRunningPage })))
const NewAnalysisPage = lazy(() => import('../features/analysis/pages/NewAnalysisPage').then((module) => ({ default: module.NewAnalysisPage })))
const AnalysisPreviewPage = lazy(() => import('../features/analysis/pages/AnalysisPreviewPage').then((module) => ({ default: module.AnalysisPreviewPage })))
const NotFoundPage = lazy(() => import('../shared/components/feedback/NotFoundPage').then((module) => ({ default: module.NotFoundPage })))
const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage').then((module) => ({ default: module.RegisterPage })))
const RegisterOtpPage = lazy(() => import('../features/auth/pages/RegisterOtpPage').then((module) => ({ default: module.RegisterOtpPage })))
const CreatePasswordPage = lazy(() =>
  import('../features/auth/pages/CreatePasswordPage').then((module) => ({ default: module.CreatePasswordPage })),
)
const ForgotPasswordPage = lazy(() =>
  import('../features/auth/pages/ForgotPasswordPage').then((module) => ({ default: module.ForgotPasswordPage })),
)
const ForgotPasswordOtpPage = lazy(() =>
  import('../features/auth/pages/ForgotPasswordOtpPage').then((module) => ({ default: module.ForgotPasswordOtpPage })),
)
const LoginPage = lazy(() => import('../features/auth/pages/LoginPage').then((module) => ({ default: module.LoginPage })))
const ResetPasswordPage = lazy(() =>
  import('../features/auth/pages/ResetPasswordPage').then((module) => ({ default: module.ResetPasswordPage })),
)

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

  useEffect(() => {
    if (!isLoading && isAuthPath(path) && isAuthenticated()) {
      window.history.replaceState({}, '', '/dashboard')
      setPath('/dashboard')
    }
  }, [isLoading, path])

  if (isLoading) return <LoadingPage />

  let route: ReactNode

  if (isProtectedPath(path) && !isAuthenticated()) {
    route = <LoginPage />
  } else if (path === '/privacy') {
    route = <LegalPage title="Kebijakan Privasi" />
  } else if (path === '/terms') {
    route = <LegalPage title="Syarat Ketentuan Layanan" />
  } else if (path === '/history') {
    route = <HistoryPage />
  } else if (path === '/analysis/new/config') {
    route = <AnalysisConfigPage />
  } else if (path === '/analysis/new/running') {
    route = <AnalysisRunningPage />
  } else if (path === '/analysis/new/preview') {
    route = <AnalysisPreviewPage />
  } else if (path === '/analysis/new') {
    route = <NewAnalysisPage />
  } else if (path.startsWith('/analysis/')) {
    route = <AnalysisResultPage sessionId={path.split('/').filter(Boolean)[1] ?? ''} />
  } else if (path === '/settings') {
    route = <AppPlaceholder title="Pengaturan" />
  } else if (path === '/dashboard') {
    route = <DashboardPage />
  } else if (path === '/auth/reset-password') {
    route = <ResetPasswordPage />
  } else if (path === '/auth/forgot-password/otp') {
    route = <ForgotPasswordOtpPage />
  } else if (path === '/auth/forgot-password') {
    route = <ForgotPasswordPage />
  } else if (path === '/auth/login') {
    route = <LoginPage />
  } else if (path === '/auth/register/password') {
    route = <CreatePasswordPage />
  } else if (path === '/auth/register/otp') {
    route = <RegisterOtpPage />
  } else if (path === '/auth/register') {
    route = <RegisterPage />
  } else if (path === '/') {
    route = <HomePage />
  } else {
    route = <NotFoundRoute path={path} />
  }

  return <Suspense fallback={<LoadingPage />}>{route}</Suspense>
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

function isAuthPath(path: string) {
  return path.startsWith('/auth/')
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
