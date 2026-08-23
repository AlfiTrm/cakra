import type { InputHTMLAttributes } from 'react'

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function AuthInput({ label, ...props }: AuthInputProps) {
  return (
    <label className="grid gap-2">
      <span className="text-label-md font-bold text-[var(--color-text)]">{label}</span>
      <input
        className="h-13 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white px-4 text-body-md text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-neutral-400)] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
        {...props}
      />
    </label>
  )
}
