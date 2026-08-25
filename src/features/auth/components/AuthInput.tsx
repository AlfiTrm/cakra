import type { InputHTMLAttributes } from 'react'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  label: string
}

export function AuthInput({ error, label, ...props }: AuthInputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-label-md font-bold text-[var(--color-text)]">{label}</span>
      <input
        aria-invalid={error ? true : undefined}
        className={`h-13 rounded-[var(--radius-lg)] border bg-white px-4 text-body-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:ring-3 ${
          error
            ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger-100)]'
            : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-100)]'
        }`}
        {...props}
      />
      {error ? <span className="text-body-sm font-semibold text-[var(--color-danger)]">{error}</span> : null}
    </label>
  )
}
