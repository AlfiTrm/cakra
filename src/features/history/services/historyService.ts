import { http } from '../../../shared/services/http'
import type { AnalysisRiskStatus } from '../../../shared/components'
import type { DashboardStat } from '../../dashboard/types/dashboard'
import type { HistoryCategory, HistoryFilters, HistoryPagination, HistoryViewModel } from '../types/history'

type ApiResponse<T> = {
  data: T
  message: string
  status: {
    code: number
    isSuccess: boolean
  }
}

type CategoryResponse = {
  category_id: string
  name: string
}

type HistoryResponse = {
  items: HistoryItemResponse[]
  pagination: {
    limit: number
    page: number
    total_items: number
    total_pages: number
  }
  summary: {
    accuracy_ready: boolean
    at_risk_sku_count: number
    average_accuracy: number | null
    total_analysis: number
  }
}

type HistoryItemResponse = {
  analysis_date: string
  category: string | null
  reorder_point: number
  reorder_quantity: number
  risk_label: string
  session_id: string
  session_status: string
  sku_id: string
  sku_name: string
}

export async function getCategories(signal?: AbortSignal): Promise<HistoryCategory[]> {
  const response = await http<ApiResponse<CategoryResponse[]>>('/analysis/categories', { signal })

  return response.data.map((category) => ({
    id: category.category_id,
    name: category.name,
  }))
}

export async function getHistory(filters: HistoryFilters, signal?: AbortSignal): Promise<HistoryViewModel> {
  const historyResponse = await http<ApiResponse<HistoryResponse>>(`/analysis/history?${buildHistoryQuery(filters)}`, { signal })

  return {
    items: historyResponse.data.items.map((item) => ({
      category: item.category ?? '-',
      date: formatDate(item.analysis_date),
      id: item.sku_id,
      rop: item.reorder_point,
      roq: item.reorder_quantity,
      sessionId: item.session_id,
      skuName: item.sku_name,
      status: mapRiskStatus(item.risk_label),
    })),
    pagination: mapPagination(historyResponse.data.pagination),
    stats: mapStats(historyResponse.data.summary),
  }
}

function buildHistoryQuery(filters: HistoryFilters) {
  const params = new URLSearchParams({
    limit: '8',
    page: String(filters.page),
    sort: filters.sort,
  })

  if (filters.search.trim()) params.set('search', filters.search.trim())
  if (filters.riskLabel) params.set('risk_label', filters.riskLabel)
  if (filters.category) params.set('category_id', filters.category)

  return params.toString()
}

function mapStats(summary: HistoryResponse['summary']): DashboardStat[] {
  return [
    {
      change: '',
      description: 'Telah dianalisis dalam sistem',
      label: 'Total Analisis',
      tone: 'primary',
      value: `${summary.total_analysis} SKU`,
    },
    {
      change: '',
      description: summary.accuracy_ready ? 'Berdasarkan data historis aktual' : 'Menunggu data historis cukup',
      label: 'Rata-rata Akurasi',
      tone: 'info',
      value: summary.accuracy_ready && summary.average_accuracy !== null ? `${summary.average_accuracy}%` : '-',
    },
    {
      change: '',
      description: 'Membutuhkan restock segera',
      label: 'SKU Berisiko',
      tone: 'danger',
      value: `${summary.at_risk_sku_count} SKU`,
    },
  ]
}

function mapPagination(pagination: HistoryResponse['pagination']): HistoryPagination {
  return {
    limit: pagination.limit,
    page: pagination.page,
    totalItems: pagination.total_items,
    totalPages: pagination.total_pages,
  }
}

function mapRiskStatus(label: string): AnalysisRiskStatus {
  if (label === 'NORMAL') return 'Normal'
  if (label === 'DEADSTOCK') return 'Stok Mati'
  return 'Hampir Habis'
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
