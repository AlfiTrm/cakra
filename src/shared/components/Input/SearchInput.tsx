import type { InputHTMLAttributes } from 'react'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
}

export function SearchInput({ className = '', isLoading = false, ...props }: SearchInputProps) {
  return (
    <label className={`relative block ${className}`.trim()}>
      <span className="sr-only">{props['aria-label'] ?? 'Cari'}</span>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-neutral-400)]"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
      <input
        className="h-10 w-full rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white px-5 pl-11 pr-11 text-label-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
        type="search"
        {...props}
      />
      {isLoading ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 animate-spin rounded-full border-2 border-[var(--color-primary-100)] border-t-[var(--color-primary)]"
        />
      ) : null}
    </label>
  )
}
