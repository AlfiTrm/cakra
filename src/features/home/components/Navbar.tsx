import { Icon } from '@iconify/react'
import { useState } from 'react'
import logoPrimary from '../../../assets/brand/logo-primary-default.svg'
import logoSecondary from '../../../assets/brand/logo-secondary-default.svg'
import { Button } from '../../../shared/components'

type NavbarVariant = 'public' | 'app'

type NavbarProps = {
  variant?: NavbarVariant
}

const publicLinks = ['Fitur', 'Cara Kerja', 'Harga', 'FAQ']
const appLinks = ['Dashboard', 'Analisis Baru', 'Riwayat']

export function Navbar({ variant = 'public' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const isPublic = variant === 'public'
  const links = isPublic ? publicLinks : appLinks

  function openMenu() {
    setIsMenuOpen(true)
    window.setTimeout(() => setIsMenuVisible(true), 0)
  }

  function closeMenu() {
    setIsMenuVisible(false)
    window.setTimeout(() => setIsMenuOpen(false), 180)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[var(--color-surface)]">
        <nav className="app-container relative flex h-[72px] items-center justify-between gap-6">
          <a aria-label="Cakra home" className="z-10 shrink-0" href="/">
            <img alt="Cakra" className="hidden h-8 w-auto lg:block" src={logoPrimary} />
            <img alt="Cakra" className="size-10 lg:hidden" src={logoSecondary} />
          </a>

          <div className="group/nav absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
            {links.map((link, index) => (
              <a
                className="group/link flex flex-col items-center gap-2 text-label-md font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)]"
                href="#"
                key={link}
              >
                <span>{link}</span>
                <span
                  className={`h-0.5 w-10 origin-center rounded-full bg-[var(--color-primary)] transition-transform duration-200 ease-out group-hover/link:!scale-x-100 ${
                    index === 0 ? 'scale-x-100 group-hover/nav:scale-x-0' : 'scale-x-0'
                  }`}
                />
              </a>
            ))}
          </div>

          {isPublic ? (
            <div className="z-10 hidden items-center gap-6 lg:flex">
              <Button variant="text">Masuk</Button>
              <Button icon="lucide:arrow-right">Mulai Gratis</Button>
            </div>
          ) : (
            <div className="z-10 hidden items-center gap-3 border-l border-[var(--color-border)] pl-6 lg:flex">
              <div className="grid size-10 place-items-center rounded-full bg-[var(--color-primary-100)] text-label-md text-[var(--color-primary)]">
                R
              </div>
              <div>
                <p className="text-label-md text-[var(--color-text)]">Ratna</p>
                <p className="text-body-xs text-[var(--color-text-muted)]">Premium Member</p>
              </div>
            </div>
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

      {isMenuOpen ? (
        <div
          className={`fixed inset-0 z-[60] bg-[var(--color-surface)] transition-opacity duration-180 ease-out ${
            isMenuVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="app-container flex h-[72px] items-center justify-between">
            <img alt="Cakra" className="size-10" src={logoSecondary} />
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
              {links.map((link, index) => (
                <a
                  className={`text-heading-lg rounded-[var(--radius-xl)] px-5 py-4 font-semibold transition-colors ${
                    index === 0
                      ? '-mx-[var(--container-padding)] rounded-none bg-[var(--color-primary)] px-[calc(var(--container-padding)+var(--space-5))] text-white'
                      : 'text-[var(--color-text)] active:bg-[var(--color-primary-50)]'
                  }`}
                  href="#"
                  key={link}
                  onClick={closeMenu}
                >
                  {link}
                </a>
              ))}
            </div>

            {isPublic ? (
              <div className="grid gap-3">
                <Button className="w-full" onClick={closeMenu} variant="text">
                  Masuk
                </Button>
                <Button className="w-full" icon="lucide:arrow-right" onClick={closeMenu}>
                  Mulai Gratis
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-6">
                <div className="grid size-11 place-items-center rounded-full bg-[var(--color-primary-100)] text-label-md text-[var(--color-primary)]">
                  R
                </div>
                <div>
                  <p className="text-label-md text-[var(--color-text)]">Ratna</p>
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
