export type DashboardStatTone = 'primary' | 'success' | 'danger' | 'info'

export type DashboardStat = {
  change: string
  description: string
  label: string
  tone: DashboardStatTone
  value: string
}

export type RiskStatus = 'Hampir Habis' | 'Normal' | 'Stok Mati'

export type LatestAnalysis = {
  category: string
  date: string
  id: string
  rop: number
  roq: number
  skuName: string
  status: RiskStatus
}

export type AttentionSkuTone = 'danger' | 'warning'

export type AttentionSku = {
  message: string
  skuName: string
  tone: AttentionSkuTone
}
