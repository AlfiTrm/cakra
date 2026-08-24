import type { AnalysisStep, UploadFileState } from '../types/analysis'

export const analysisSteps: AnalysisStep[] = [
  { id: 1, label: 'Seleksi File' },
  { id: 2, label: 'Preview & Validasi' },
  { id: 3, label: 'Konfigurasi' },
  { id: 4, label: 'Analisis' },
]

export const demoUploadFile: UploadFileState = {
  name: 'Indomie_Goreng_Sales.csv',
  rows: 180,
  sizeLabel: '12 KB',
}
