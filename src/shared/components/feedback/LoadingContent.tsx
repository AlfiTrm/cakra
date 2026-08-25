type LoadingContentProps = {
  lines?: number
}

export function LoadingContent({ lines = 3 }: LoadingContentProps) {
  return (
    <div aria-label="Memuat konten" aria-live="polite" className="grid gap-3" role="status">
      {Array.from({ length: lines }, (_, index) => (
        <div
          className="h-4 animate-pulse rounded-[var(--radius-full)] bg-[var(--color-neutral-100)]"
          key={index}
          style={{ width: `${100 - index * 14}%` }}
        />
      ))}
    </div>
  )
}
