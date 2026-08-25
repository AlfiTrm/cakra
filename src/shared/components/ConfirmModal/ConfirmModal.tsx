import { Icon } from '@iconify/react'
import { useEffect } from 'react'
import { Button } from '../Button'

type ConfirmModalVariant = 'default' | 'danger'

type ConfirmModalProps = {
  cancelLabel?: string
  confirmLabel?: string
  description: string
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  variant?: ConfirmModalVariant
}

export function ConfirmModal({
  cancelLabel = 'Batal',
  confirmLabel = 'Lanjutkan',
  description,
  isLoading = false,
  isOpen,
  onClose,
  onConfirm,
  title,
  variant = 'default',
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const isDanger = variant === 'danger'

  return (
    <div
      aria-labelledby="confirm-modal-title"
      aria-modal="true"
      className="is-stagger-visible fixed inset-0 z-[90] grid place-items-center bg-[var(--color-neutral-950)]/35 px-4 backdrop-blur-[3px]"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="animate-stagger-scale w-full max-w-[420px] rounded-[var(--radius-xl)] bg-white p-6 shadow-2xl shadow-[rgb(15_23_42_/_0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`grid size-11 place-items-center rounded-[var(--radius-lg)] ${
            isDanger ? 'bg-[var(--color-danger-50)] text-[var(--color-danger)]' : 'bg-[var(--color-primary-50)] text-[var(--color-primary)]'
          }`}
        >
          <Icon aria-hidden="true" className="size-5" icon={isDanger ? 'lucide:log-out' : 'lucide:circle-alert'} />
        </div>

        <h2 className="mt-5 text-heading-md text-[var(--color-text)]" id="confirm-modal-title">
          {title}
        </h2>
        <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">{description}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button className="w-full" disabled={isLoading} onClick={onClose} variant="outline">
            {cancelLabel}
          </Button>
          <button
            className={`h-12 rounded-[var(--radius-lg)] px-5 text-label-md font-bold text-white transition-colors focus-visible:outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-55 ${
              isDanger
                ? 'bg-[var(--color-danger)] hover:bg-[var(--color-danger-700)] focus-visible:ring-[var(--color-danger-200)]'
                : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary-200)]'
            }`}
            disabled={isLoading}
            onClick={onConfirm}
            type="button"
          >
            {isLoading ? 'Memproses...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
