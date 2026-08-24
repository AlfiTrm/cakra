import { Icon } from '@iconify/react'
import { useState } from 'react'
import type { HistoryCategory, HistoryFilters } from '../types/history'

type HistoryFilterBarProps = {
  categories: HistoryCategory[]
  filters: HistoryFilters
  onChange: (filters: HistoryFilters) => void
  totalItems: number
}

export function HistoryFilterBar({ categories, filters, onChange, totalItems }: HistoryFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <FilterSelect
          label="Status"
          value={filters.riskLabel}
          onChange={(value) => onChange({ ...filters, page: 1, riskLabel: value })}
          options={[
            { label: 'Semua Status', value: '' },
            { label: 'Normal', value: 'NORMAL' },
            { label: 'Hampir Habis', value: 'STOCKOUT_IMMINENT' },
            { label: 'Stok Mati', value: 'DEADSTOCK' },
          ]}
        />
        <FilterSelect
          label="Kategori"
          value={filters.category}
          onChange={(value) => onChange({ ...filters, category: value, page: 1 })}
          options={[
            { label: 'Semua Kategori', value: '' },
            ...categories.map((category) => ({ label: category.name, value: category.id })),
          ]}
        />
      </div>
      <div className="flex items-center justify-between gap-5">
        <FilterSelect
          label="Urutkan"
          value={filters.sort}
          onChange={(value) => onChange({ ...filters, page: 1, sort: value as HistoryFilters['sort'] })}
          options={[
            { label: 'Terbaru', value: 'newest' },
            { label: 'Terlama', value: 'oldest' },
          ]}
        />
        <span className="text-label-sm font-bold text-[var(--color-primary)]">{totalItems} Analisis</span>
      </div>
    </div>
  )
}

type FilterSelectProps = {
  label: string
  onChange: (value: string) => void
  options: Array<{ label: string; value: string }>
  value: string
}

function FilterSelect({ label, onChange, options, value }: FilterSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false)
      }}
    >
      <span className="sr-only">{label}</span>
      <button
        aria-expanded={isOpen}
        className="flex h-9 items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-white px-4 text-label-sm font-bold text-[var(--color-text)] outline-none transition-colors hover:border-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-3 focus:ring-[var(--color-primary-100)]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span>
          {label}: {selectedOption.label}
        </span>
        <Icon className={`size-4 text-[var(--color-text-muted)] transition-transform ${isOpen ? 'rotate-180' : ''}`} icon="lucide:chevron-down" />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-30 mt-2 min-w-[220px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-white p-1 shadow-lg">
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                className={`flex w-full items-center justify-between gap-3 rounded-[var(--radius-md)] px-3 py-2 text-left text-label-sm transition-colors ${
                  isSelected
                    ? 'bg-[var(--color-primary-50)] font-bold text-[var(--color-primary)]'
                    : 'font-semibold text-[var(--color-text)] hover:bg-[var(--color-neutral-50)]'
                }`}
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                type="button"
              >
                {option.label}
                {isSelected ? <Icon className="size-4" icon="lucide:check" /> : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
