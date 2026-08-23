import logoSecondary from '../../../assets/brand/logo-secondary-default.svg'

export function LoadingPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-surface)]">
      <img alt="Cakra" className="size-24 animate-pulse sm:size-28" src={logoSecondary} />
    </main>
  )
}
