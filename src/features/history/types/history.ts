import type { AnalysisTableRow } from '../../../shared/components'
import type { DashboardStat } from '../../dashboard/types/dashboard'

export type HistoryCategory = {
  id: string
  name: string
}

export type HistoryFilters = {
  category: string
  page: number
  riskLabel: string
  search: string
  sort: 'newest' | 'oldest'
}

export type HistoryPagination = {
  limit: number
  page: number
  totalItems: number
  totalPages: number
}

export type HistoryViewModel = {
  items: AnalysisTableRow[]
  pagination: HistoryPagination
  stats: DashboardStat[]
}
