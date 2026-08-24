import type { ButtonHTMLAttributes, ReactNode } from 'react'

type AuthSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  children: ReactNode
}

export function AuthSubmitButton({ children, className = '', isLoading = false, ...props }: AuthSubmitButtonProps) {
  const isDisabled = isLoading || props.disabled

  return (
    <span className={`block ${isDisabled ? '!cursor-not-allowed' : 'cursor-pointer'}`}>
      <button
        className={`relative h-12 w-full rounded-[var(--radius-lg)] bg-[var(--color-primary)] px-6 text-label-md font-bold text-white shadow-lg shadow-[rgb(45_82_221_/_0.22)] transition-colors hover:bg-[var(--color-primary-hover)] disabled:!cursor-not-allowed disabled:bg-[var(--color-neutral-300)] disabled:text-[var(--color-neutral-500)] disabled:shadow-none disabled:hover:bg-[var(--color-neutral-300)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)] ${isDisabled ? '!cursor-not-allowed' : 'cursor-pointer'} ${className}`}
        {...props}
        disabled={isDisabled}
        type="submit"
      >
        <span className={`[cursor:inherit] ${isLoading ? 'opacity-0' : ''}`}>{children}</span>
        {isLoading ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/35 border-t-white [cursor:inherit]"
          />
        ) : null}
      </button>
    </span>
  )
}
