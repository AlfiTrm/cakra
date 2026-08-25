import { http } from '../../../shared/services/http'
import type { AnalysisCategory, AnalysisResultViewModel, AnalysisSessionDraft, AnalysisSessionStart, AnalysisUploadPreview, PreviewErrorRow, PreviewValidRow } from '../types/analysis'

type ApiResponse<T> = {
  data: T
  message: string
  status: {
    code: number
    isSuccess: boolean
  }
}

type UploadResponse = {
  error_row_count: number
  errors: UploadErrorResponse[]
  sku_name: string
  status: string
  upload_id: string
  valid_row_count: number
  valid_rows: UploadRowResponse[]
}

type UploadRowResponse = {
  quantity_sold: number
  row_number: number
  sale_date: string
  sku_name: string
  unit_price: number
}

type UploadErrorResponse = Partial<UploadRowResponse> & {
  error?: string
  message?: string
}

type CreateSessionResponse = {
  available_credits: number
  session_id: string
  status: string
}

type CategoryResponse = {
  category_id: string
  name: string
}

type SessionResultResponse = {
  available_credits: number
  failure_code?: string
  failure_message?: string
  result: {
    analysis_date: string
    average_daily_demand: number
    current_stock: number
    demand_category: string
    explanation_text: string
    forecast: {
      points: Array<{
        date: string
        p50: number
        p90: number
      }>
    }
    historical_data: {
      period_days: number
      row_count: number
    }
    lead_time_days: number
    reorder_point: number
    reorder_quantity: number
    risk: {
      label: string
      reason: string
    }
    sku: {
      id: string
      name: string
    }
    target_service_level: number
  } | null
  session_id: string
  status: string
}

export async function uploadAnalysisFile(file: File, signal?: AbortSignal): Promise<AnalysisUploadPreview> {
  const formData = new FormData()
  formData.append('file', file)

  const response = await http<ApiResponse<UploadResponse>>('/analysis/upload', {
    body: formData,
    method: 'POST',
    signal,
    timeoutMs: 60_000,
  })

  return {
    errorRowCount: response.data.error_row_count,
    errors: response.data.errors.map(mapUploadError),
    fileName: file.name,
    sizeLabel: formatFileSize(file.size),
    skuName: response.data.sku_name,
    status: response.data.status,
    uploadId: response.data.upload_id,
    validRowCount: response.data.valid_row_count,
    validRows: response.data.valid_rows.map(mapUploadRow),
  }
}

export async function createAnalysisSession(uploadId: string, draft: AnalysisSessionDraft, signal?: AbortSignal): Promise<AnalysisSessionStart> {
  const response = await http<ApiResponse<CreateSessionResponse>>(`/analysis/sessions/${uploadId}`, {
    body: {
      category_name: draft.categoryName,
      current_stock: draft.currentStock,
      lead_time_days: draft.leadTimeDays,
    },
    method: 'POST',
    signal,
  })

  return {
    availableCredits: response.data.available_credits,
    sessionId: response.data.session_id,
    status: response.data.status,
  }
}

export async function getAnalysisCategories(signal?: AbortSignal): Promise<AnalysisCategory[]> {
  const response = await http<ApiResponse<CategoryResponse[]>>('/analysis/categories', { signal })

  return response.data.map((category) => ({
    id: category.category_id,
    name: category.name,
  }))
}

export async function getAnalysisSessionResult(sessionId: string, signal?: AbortSignal): Promise<AnalysisResultViewModel> {
  const response = await http<ApiResponse<SessionResultResponse>>(`/analysis/sessions/${sessionId}`, { signal })
  const result = response.data.result

  if (!result) {
    return {
      analysisDate: '',
      availableCredits: response.data.available_credits,
      averageDailyDemand: 0,
      currentStock: 0,
      demandCategory: '',
      explanationText: '',
      failureCode: response.data.failure_code,
      failureMessage: response.data.failure_message,
      forecast: [],
      historicalDays: 0,
      historicalRowCount: 0,
      leadTimeDays: 0,
      reorderPoint: 0,
      reorderQuantity: 0,
      riskLabel: '',
      riskReason: '',
      sessionId: response.data.session_id,
      skuId: '',
      skuName: '',
      status: response.data.status,
      targetServiceLevel: 0,
    }
  }

  return {
    analysisDate: formatDate(result.analysis_date),
    availableCredits: response.data.available_credits,
    averageDailyDemand: result.average_daily_demand,
    currentStock: result.current_stock,
    demandCategory: mapDemandCategory(result.demand_category),
    explanationText: result.explanation_text,
    failureCode: response.data.failure_code,
    failureMessage: response.data.failure_message,
    forecast: result.forecast.points,
    historicalDays: result.historical_data.period_days,
    historicalRowCount: result.historical_data.row_count,
    leadTimeDays: result.lead_time_days,
    reorderPoint: result.reorder_point,
    reorderQuantity: result.reorder_quantity,
    riskLabel: result.risk.label,
    riskReason: result.risk.reason,
    sessionId: response.data.session_id,
    skuId: result.sku.id,
    skuName: result.sku.name,
    status: response.data.status,
    targetServiceLevel: result.target_service_level,
  }
}

function mapUploadRow(row: UploadRowResponse): PreviewValidRow {
  return {
    date: row.sale_date,
    name: row.sku_name,
    no: row.row_number,
    price: formatCurrency(row.unit_price),
    quantity: String(row.quantity_sold),
  }
}

function mapUploadError(row: UploadErrorResponse): PreviewErrorRow {
  return {
    date: row.sale_date ?? '-',
    error: row.error ?? row.message ?? 'Baris tidak valid.',
    name: row.sku_name ?? '-',
    no: row.row_number ?? 0,
    price: typeof row.unit_price === 'number' ? formatCurrency(row.unit_price) : '-',
    quantity: typeof row.quantity_sold === 'number' ? String(row.quantity_sold) : '-',
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('id-ID').format(value)
}

function formatDate(value: string) {
  if (!value) return '-'

  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`

  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

function mapDemandCategory(category: string) {
  if (category === 'SMOOTH') return 'Smooth (Reguler)'
  if (category === 'INTERMITTENT') return 'Intermittent'
  if (category === 'ERRATIC') return 'Erratic'
  if (category === 'LUMPY') return 'Lumpy'
  return category || '-'
}
