import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import logoSecondary from '../../../assets/brand/logo-secondary-default.svg'
import { Button, ConfirmModal } from '../../../shared/components'
import { logout, getStoredUserName } from '../../../shared/services/authToken'
import { navigateTo } from '../../../shared/utils/navigation'
import { logoutSession } from '../../auth/services/authService'
import { appLinks, publicLinks } from '../data/navbarLinks'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import type { NavbarProps } from '../types/navbar'
import { ProfileDropdown } from './ProfileDropdown'

export function Navbar({ availableCredits = 18, totalCredits = 50, userName, variant = 'public' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [activeHash, setActiveHash] = useState('#beranda')
  const isPublic = variant === 'public'
  const links = isPublic ? publicLinks : appLinks
  const homeHref = isPublic ? '/' : '/dashboard'
  const currentPath = window.location.pathname
  const displayName = userName ?? getStoredUserName() ?? 'Pengguna'
  const creditPercent = Math.max(0, Math.min(Math.round((availableCredits / Math.max(totalCredits, 1)) * 100), 100))
  useBodyScrollLock(isProfileOpen || isMenuOpen)

  useEffect(() => {
    if (!isPublic) return

    const sections = publicLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) setActiveHash(`#${visibleEntry.target.id}`)
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: [0.12, 0.32, 0.56] },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [isPublic])

  function openMenu() {
    setIsMenuOpen(true)
    window.setTimeout(() => setIsMenuVisible(true), 0)
  }

  function closeMenu() {
    setIsMenuVisible(false)
    window.setTimeout(() => setIsMenuOpen(false), 180)
  }

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await logoutSession()
    } finally {
      setIsLoggingOut(false)
      setIsLogoutConfirmOpen(false)
      setIsProfileOpen(false)
      logout()
    }
  }

  function handlePublicLinkClick(href: string) {
    const section = document.querySelector<HTMLElement>(href)
    if (!section) return

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState({}, '', href)
    setActiveHash(href)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[var(--color-surface)]">
        <nav className="app-container relative flex h-[72px] items-center justify-between gap-6">
          <a aria-label="Cakra home" className="z-10 shrink-0" href={homeHref}>
            <img alt="Cakra" className="hidden h-8 w-auto lg:block" src={logoPrimary} />
            <img alt="Cakra" className="size-10 lg:hidden" src={logoSecondary} />
          </a>

          <div className="group/nav absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
            {links.map((link) => {
              const isActive = isPublic ? activeHash === link.href : currentPath === link.href

              return (
                <a
                  className="group/link flex flex-col items-center gap-2 text-label-md font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
                  href={link.href}
                  key={link.label}
                  onClick={(event) => {
                    if (!isPublic) return
                    event.preventDefault()
                    handlePublicLinkClick(link.href)
                  }}
                >
                  <span>{link.label}</span>
                  <span
                    className={`h-0.5 w-10 origin-center rounded-full bg-[var(--color-primary)] transition-transform duration-200 ease-out group-hover/link:!scale-x-100 ${
                      isActive ? 'scale-x-100 group-hover/nav:scale-x-0' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            })}
          </div>

          {isPublic ? (
            <div className="z-10 hidden items-center gap-6 lg:flex">
              <Button onClick={() => navigateTo('/auth/login')} variant="text">
                Masuk
              </Button>
              <Button icon="lucide:arrow-right" onClick={() => navigateTo('/auth/register')}>
                Mulai Gratis
              </Button>
            </div>
          ) : (
            <button
              aria-expanded={isProfileOpen}
              className={`hidden items-center gap-3 rounded-[var(--radius-lg)] border border-transparent py-2 pl-3 pr-4 text-left transition-colors hover:border-[var(--color-border)] hover:bg-white lg:flex ${
                isProfileOpen ? 'z-[70] bg-white' : 'z-10'
              }`}
              onClick={() => setIsProfileOpen((current) => !current)}
              type="button"
            >
              <div className="grid size-10 place-items-center rounded-full bg-[var(--color-primary-100)] text-label-md text-[var(--color-primary)]">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-label-md text-[var(--color-text)]">{displayName}</p>
                <p className="text-body-xs text-[var(--color-text-muted)]">Premium Member</p>
              </div>
            </button>
          )}

          <button
            aria-expanded={isMenuOpen}
            aria-label="Open navigation menu"
            className="z-10 grid size-11 place-items-center rounded-[var(--radius-lg)] text-[var(--color-text)] lg:hidden"
            onClick={openMenu}
            type="button"
          >
            <Icon aria-hidden="true" className="size-5" icon="lucide:menu" />
          </button>
        </nav>
      </header>

      <div className="h-[72px]" />

      {!isPublic && isProfileOpen ? (
        <>
          <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] hidden lg:block">
            <div className="app-container flex h-[72px] items-center justify-end">
              <button
                aria-expanded="true"
                className="pointer-events-auto flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white py-2 pl-3 pr-4 text-left"
                onClick={() => setIsProfileOpen(false)}
                type="button"
              >
                <div className="grid size-10 place-items-center rounded-full bg-[var(--color-primary-100)] text-label-md text-[var(--color-primary)]">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-label-md text-[var(--color-text)]">{displayName}</p>
                  <p className="text-body-xs text-[var(--color-text-muted)]">Premium Member</p>
                </div>
              </button>
            </div>
          </div>
          <ProfileDropdown
            availableCredits={availableCredits}
            creditPercent={creditPercent}
            displayName={displayName}
            totalCredits={totalCredits}
            onClose={() => setIsProfileOpen(false)}
            onLogout={() => setIsLogoutConfirmOpen(true)}
          />
          <ConfirmModal
            confirmLabel="Keluar"
            description="Sesi akun akan ditutup dan Anda perlu masuk kembali untuk mengakses dashboard."
            isLoading={isLoggingOut}
            isOpen={isLogoutConfirmOpen}
            title="Keluar dari akun?"
            variant="danger"
            onClose={() => {
              if (!isLoggingOut) setIsLogoutConfirmOpen(false)
            }}
            onConfirm={handleLogout}
          />
        </>
      ) : null}

      {isMenuOpen ? (
        <div
          className={`fixed inset-0 z-[60] bg-[var(--color-surface)] transition-opacity duration-180 ease-out ${
            isMenuVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="app-container flex h-[72px] items-center justify-between">
            <a aria-label="Cakra home" href={homeHref}>
              <img alt="Cakra" className="size-10" src={logoSecondary} />
            </a>
            <button
              aria-label="Close navigation menu"
              className="grid size-11 place-items-center rounded-[var(--radius-lg)] text-[var(--color-text)]"
              onClick={closeMenu}
              type="button"
            >
              <Icon aria-hidden="true" className="size-5" icon="lucide:x" />
            </button>
          </div>

          <div
            className={`app-container flex min-h-[calc(100vh-72px)] flex-col justify-between py-10 transition-all duration-180 ease-out ${
              isMenuVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="grid gap-5">
              {links.map((link) => {
                const isActive = isPublic ? activeHash === link.href : currentPath === link.href

                return (
                  <a
                    className={`text-heading-lg rounded-[var(--radius-xl)] px-5 py-4 font-semibold transition-colors ${
                      isActive
                        ? '-mx-[var(--container-padding)] rounded-none bg-[var(--color-primary)] px-[calc(var(--container-padding)+var(--space-5))] text-white'
                        : 'text-[var(--color-text)] active:bg-[var(--color-primary-50)]'
                    }`}
                    href={link.href}
                    key={link.label}
                    onClick={(event) => {
                      if (isPublic) {
                        event.preventDefault()
                        handlePublicLinkClick(link.href)
                      }
                      closeMenu()
                    }}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            {isPublic ? (
              <div className="grid gap-3">
                <Button className="w-full" onClick={() => navigateTo('/auth/login')} variant="text">
                  Masuk
                </Button>
                <Button className="w-full" icon="lucide:arrow-right" onClick={() => navigateTo('/auth/register')}>
                  Mulai Gratis
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-6">
                <div className="grid size-11 place-items-center rounded-full bg-[var(--color-primary-100)] text-label-md text-[var(--color-primary)]">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-label-md text-[var(--color-text)]">{displayName}</p>
                  <p className="text-body-xs text-[var(--color-text-muted)]">Premium Member</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
