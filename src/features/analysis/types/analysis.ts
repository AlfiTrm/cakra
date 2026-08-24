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
