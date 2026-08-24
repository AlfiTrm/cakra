import { useEffect, useState } from 'react'
import { Button } from '../../../shared/components'
import { navigateTo } from '../../../shared/utils/navigation'

type DashboardHeaderProps = {
  userName: string
}

const dashboardPrompts = [
  'Mau cek SKU mana hari ini?',
  'Pantau risiko stok sebelum telat restock.',
  'Cari SKU untuk lihat rekomendasi terbaru.',
]

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  const [promptIndex, setPromptIndex] = useState(0)
  const hour = new Date().getHours()
  const greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam'
  const today = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPromptIndex((index) => (index + 1) % dashboardPrompts.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-heading-xl text-[var(--color-text)]">
          {greeting}, <span className="text-[var(--color-primary)]">{userName}</span>
        </h1>
        <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">{today}</p>
        <p
          className="mt-1 overflow-hidden text-body-sm font-medium text-[var(--color-primary)]"
          key={promptIndex}
        >
          <span className="inline-block animate-dashboard-tip-swipe">{dashboardPrompts[promptIndex]}</span>
        </p>
      </div>

      <Button className="w-full sm:w-auto" onClick={() => navigateTo('/analysis/new')}>
        Analisis SKU Baru
      </Button>
    </header>
  )
}
