import type { AnalysisRiskStatus, AnalysisTableRow } from '../../../shared/components'

export type DashboardStatTone = 'primary' | 'success' | 'danger' | 'info'

export type DashboardStat = {
  change: string
  description: string
  label: string
  tone: DashboardStatTone
  value: string
}

export type RiskStatus = AnalysisRiskStatus

export type LatestAnalysis = AnalysisTableRow

export type AttentionSkuTone = 'danger' | 'warning'

export type AttentionSku = {
  message: string
  skuName: string
  tone: AttentionSkuTone
}

export type CreditUsage = {
  availableCredits: number
  balance: number
  reservedCredits: number
  usedThisMonth: number
}

export type DashboardViewModel = {
  analyses: LatestAnalysis[]
  attentionSkus: AttentionSku[]
  creditUsage: CreditUsage
  stats: DashboardStat[]
  userName: string
}
