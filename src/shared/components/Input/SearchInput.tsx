import { Icon } from '@iconify/react'
import type { InputHTMLAttributes } from 'react'

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

export function SearchInput({ className = '', ...props }: SearchInputProps) {
  return (
    <label className={`relative block ${className}`.trim()}>
      <span className="sr-only">{props['aria-label'] ?? 'Cari'}</span>
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-neutral-400)]"
        icon="lucide:search"
      />
      <input
        className="h-10 w-full rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white px-5 pl-11 text-label-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
        type="search"
        {...props}
      />
    </label>
  )
}
