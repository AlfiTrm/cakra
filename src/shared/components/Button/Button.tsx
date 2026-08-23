import { Icon } from '@iconify/react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'default' | 'outline' | 'text'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: string
  variant?: ButtonVariant
}

const baseClass =
  'text-label-md inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-lg)] px-6 font-semibold transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--color-primary-200)] disabled:pointer-events-none disabled:opacity-55'

const variantClass = {
  default: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]',
  outline:
    'border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]',
  text: 'bg-transparent text-[var(--color-text)] hover:text-[var(--color-primary)] active:text-[var(--color-primary)]',
}

export function Button({ children, className = '', icon, type = 'button', variant = 'default', ...props }: ButtonProps) {
  return (
    <button className={`${baseClass} ${variantClass[variant]} ${className}`.trim()} type={type} {...props}>
      <span className="relative z-10">{children}</span>
      {icon ? (
        <span className="relative z-10 grid size-4 shrink-0 place-items-center">
          <Icon aria-hidden="true" className="size-4" icon={icon} />
        </span>
      ) : null}
    </button>
  )
}
