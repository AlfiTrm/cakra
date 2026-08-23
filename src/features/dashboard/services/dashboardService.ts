import { http } from '../../../shared/services/http'
import { setStoredUserName } from '../../../shared/services/authToken'
import type { AttentionSkuTone, DashboardStat, DashboardViewModel, LatestAnalysis, RiskStatus } from '../types/dashboard'

type ApiResponse<T> = {
  data: T
  message: string
  status: {
    code: number
    isSuccess: boolean
  }
}

type DashboardResponse = {
  accuracy_ready: boolean
  available_credits: number
  average_accuracy: number | null
  credit_account: {
    available_credits: number
    balance: number
    reserved_credits: number
  }
  credit_used_this_month: number
  recent_analyses: DashboardAnalysis[]
  stockout_risk_count: number
  total_analyzed_skus: number
  urgent_skus: DashboardUrgentSku[]
  user_name: string
}

type CreditAccountResponse = {
  available_credits: number
  balance: number
  reserved_credits: number
}

type DashboardAnalysis = {
  analysis_date: string
  category: string
  reorder_point: number
  reorder_quantity: number
  risk_label: string
  session_id: string
  session_status: string
  sku_id: string
  sku_name: string
}

type DashboardUrgentSku = {
  analysis_date: string
  risk_label: string
  risk_reason: string
  session_id: string
  sku_id: string
  sku_name: string
}

export async function getDashboard(search = '', signal?: AbortSignal): Promise<DashboardViewModel> {
  const query = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ''
  const dashboardResponse = await http<ApiResponse<DashboardResponse>>(`/analysis/dashboard${query}`, { signal })
  const creditResponse = await http<ApiResponse<CreditAccountResponse>>('/analysis/credit-account', { signal }).catch(() => null)
  const creditAccount = creditResponse?.data ?? dashboardResponse.data.credit_account

  setStoredUserName(dashboardResponse.data.user_name)

  return mapDashboard(dashboardResponse.data, creditAccount)
}

function mapDashboard(data: DashboardResponse, creditAccount: CreditAccountResponse): DashboardViewModel {
  return {
    analyses: data.recent_analyses.map(mapAnalysis),
    attentionSkus: data.urgent_skus.map(mapUrgentSku),
    creditUsage: {
      availableCredits: creditAccount.available_credits,
      balance: creditAccount.balance,
      reservedCredits: creditAccount.reserved_credits,
      usedThisMonth: data.credit_used_this_month,
    },
    stats: mapStats(data, creditAccount),
    userName: data.user_name,
  }
}

function mapStats(data: DashboardResponse, creditAccount: CreditAccountResponse): DashboardStat[] {
  return [
    {
      change: '',
      description: 'Aktif dipantau sistem AI',
      label: 'Total SKU Dianalisis',
      tone: 'primary',
      value: `${data.total_analyzed_skus} SKU`,
    },
    {
      change: '',
      description: `Cukup untuk ${creditAccount.available_credits} analisis SKU`,
      label: 'Sisa Kredit',
      tone: 'success',
      value: `${creditAccount.available_credits} Kredit`,
    },
    {
      change: '',
      description: 'Perlu perhatian segera',
      label: 'Risiko Stockout',
      tone: 'danger',
      value: `${data.stockout_risk_count} SKU`,
    },
    {
      change: '',
      description: data.accuracy_ready ? 'Berdasarkan histori penjualan' : 'Menunggu data historis cukup',
      label: 'Rata-rata Akurasi',
      tone: 'info',
      value: data.accuracy_ready && data.average_accuracy !== null ? `${data.average_accuracy}%` : '-',
    },
  ]
}

function mapAnalysis(analysis: DashboardAnalysis): LatestAnalysis {
  return {
    category: analysis.category,
    date: formatDate(analysis.analysis_date),
    id: analysis.sku_id,
    rop: analysis.reorder_point,
    roq: analysis.reorder_quantity,
    skuName: analysis.sku_name,
    status: mapRiskStatus(analysis.risk_label),
  }
}

function mapUrgentSku(sku: DashboardUrgentSku) {
  return {
    message: sku.risk_reason,
    skuName: sku.sku_name,
    tone: mapUrgentTone(sku.risk_label),
  }
}

function mapRiskStatus(label: string): RiskStatus {
  if (label === 'NORMAL') return 'Normal'
  if (label === 'DEADSTOCK') return 'Stok Mati'
  return 'Hampir Habis'
}

function mapUrgentTone(label: string): AttentionSkuTone {
  return label === 'STOCKOUT_IMMINENT' ? 'danger' : 'warning'
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
