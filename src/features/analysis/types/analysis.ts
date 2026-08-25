export type UploadFileState = {
  name: string
  rows: number
  sizeLabel: string
}

export type UploadErrorState = {
  fileName: string
  problems: string[]
  sizeLabel: string
}

export type AnalysisStep = {
  id: number
  label: string
}

export type AnalysisCategory = {
  id: string
  name: string
}

export type PreviewValidRow = {
  date: string
  name: string
  no: number
  price: string
  quantity: string
}

export type PreviewErrorRow = PreviewValidRow & {
  error: string
}

export type AnalysisUploadPreview = {
  errorRowCount: number
  errors: PreviewErrorRow[]
  fileName: string
  sizeLabel: string
  skuName: string
  status: string
  uploadId: string
  validRowCount: number
  validRows: PreviewValidRow[]
}

export type AnalysisSessionDraft = {
  categoryName: string
  currentStock: number
  leadTimeDays: number
}

export type AnalysisSessionStart = {
  availableCredits: number
  sessionId: string
  status: string
}

export type AnalysisResultViewModel = {
  analysisDate: string
  availableCredits: number
  averageDailyDemand: number
  currentStock: number
  demandCategory: string
  explanationText: string
  failureCode?: string
  failureMessage?: string
  forecast: Array<{
    date: string
    p50: number
    p90: number
  }>
  historicalDays: number
  historicalRowCount: number
  leadTimeDays: number
  reorderPoint: number
  reorderQuantity: number
  riskLabel: string
  riskReason: string
  sessionId: string
  skuId: string
  skuName: string
  status: string
  targetServiceLevel: number
}
