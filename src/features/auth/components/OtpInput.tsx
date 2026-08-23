import type { ClipboardEvent, KeyboardEvent } from 'react'

type OtpInputProps = {
  length?: number
  value: string
  onChange: (value: string) => void
}

export function OtpInput({ length = 6, onChange, value }: OtpInputProps) {
  const digits = Array.from({ length }, (_, index) => value[index] ?? '')

  function updateDigit(index: number, nextValue: string) {
    const next = digits.slice()
    next[index] = nextValue.replace(/\D/g, '').slice(-1)
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
          className="h-[60px] min-w-0 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white text-center font-mono text-data-lg text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
          data-otp-index={index}
          inputMode="numeric"
          key={index}
          maxLength={1}
          onChange={(event) => {
            updateDigit(index, event.target.value)
            if (event.target.value && index < length - 1) focusInput(index + 1)
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
