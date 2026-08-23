import type { ClipboardEvent, KeyboardEvent } from 'react'

type OtpInputProps = {
  hasError?: boolean
  length?: number
  value: string
  onChange: (value: string) => void
}

export function OtpInput({ hasError = false, length = 6, onChange, value }: OtpInputProps) {
  const digits = Array.from({ length }, (_, index) => value[index] ?? '')

  function updateDigit(index: number, nextValue: string) {
    const sanitized = nextValue.replace(/\D/g, '')
    const next = digits.slice()
    if (sanitized.length > 1) {
      sanitized
        .slice(0, length - index)
        .split('')
        .forEach((digit, digitIndex) => {
          next[index + digitIndex] = digit
        })
    } else {
      next[index] = sanitized.slice(-1)
    }

    onChange(next.join(''))
  }

  function focusInput(index: number) {
    document.querySelector<HTMLInputElement>(`[data-otp-index="${index}"]`)?.focus()
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault()
    onChange(event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length))
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      focusInput(index - 1)
    }
  }

  return (
    <div className="grid grid-cols-6 gap-4">
      {digits.map((digit, index) => (
        <input
          aria-label={`Digit OTP ${index + 1}`}
          aria-invalid={hasError ? true : undefined}
          className={`h-[60px] min-w-0 rounded-[var(--radius-lg)] border bg-white text-center font-mono text-data-lg text-[var(--color-text)] outline-none transition-colors focus:ring-3 ${
            hasError
              ? 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger-100)]'
              : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary-100)]'
          }`}
          data-otp-index={index}
          inputMode="numeric"
          key={index}
          maxLength={1}
          onChange={(event) => {
            updateDigit(index, event.target.value)
            if (event.target.value && index < length - 1) {
              focusInput(Math.min(index + event.target.value.replace(/\D/g, '').length, length - 1))
            }
          }}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          type="text"
          value={digit}
        />
      ))}
    </div>
  )
}
