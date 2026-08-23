import type { DashboardStat, DashboardStatTone } from '../types/dashboard'

type DashboardStatsProps = {
  columns?: 3 | 4
  stats: DashboardStat[]
}

const toneClass: Record<DashboardStatTone, string> = {
  danger: 'border-[var(--color-danger-200)] bg-[var(--color-danger-50)] text-[var(--color-danger)]',
  info: 'border-[var(--color-primary-100)] bg-[#f5f2ff] text-[#6d35e8]',
  primary: 'border-[var(--color-primary-200)] bg-[var(--color-primary-50)] text-[var(--color-primary)]',
  success: 'border-[var(--color-success-200)] bg-[var(--color-success-50)] text-[var(--color-success)]',
}

export function DashboardStats({ columns = 4, stats }: DashboardStatsProps) {
  return (
    <section className={`grid gap-5 md:grid-cols-2 ${columns === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}>
      {stats.map((stat) => (
        <article
          className={`rounded-[var(--radius-lg)] border p-6 shadow-sm ${toneClass[stat.tone]}`}
          key={stat.label}
        >
          <p className="text-label-sm font-bold uppercase tracking-[0.04em] text-[var(--color-text-muted)]">
            {stat.label}
          </p>
          <p className="mt-4 font-mono text-[32px] font-extrabold leading-10">{stat.value}</p>
          <p className="mt-2 text-body-sm text-[var(--color-text-muted)]">{stat.description}</p>
          {stat.change ? <p className="mt-1 text-label-sm font-bold">{stat.change}</p> : null}
        </article>
      ))}
    </section>
  )
}
