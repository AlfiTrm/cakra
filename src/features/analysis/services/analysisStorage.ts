import type { AnalysisSessionDraft, AnalysisSessionStart, AnalysisUploadPreview } from '../types/analysis'

const UPLOAD_KEY = 'cakra_analysis_upload'
const SESSION_KEY = 'cakra_analysis_session'
const DRAFT_KEY = 'cakra_analysis_draft'
const RUNNING_KEY = 'cakra_analysis_running'

export function getStoredUpload() {
  return readJson<AnalysisUploadPreview>(UPLOAD_KEY)
}

export function setStoredUpload(upload: AnalysisUploadPreview) {
  window.sessionStorage.setItem(UPLOAD_KEY, JSON.stringify(upload))
}

export function getStoredSession() {
  return readJson<AnalysisSessionStart>(SESSION_KEY)
}

export function setStoredSession(session: AnalysisSessionStart) {
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getStoredDraft() {
  return readJson<AnalysisSessionDraft>(DRAFT_KEY)
}

export function setStoredDraft(draft: AnalysisSessionDraft) {
  window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function ensureAnalysisRunningStartedAt(sessionId: string) {
  const stored = readJson<{ sessionId: string; startedAt: number }>(RUNNING_KEY)
  if (stored?.sessionId === sessionId) return stored.startedAt

  const startedAt = Date.now()
  window.sessionStorage.setItem(RUNNING_KEY, JSON.stringify({ sessionId, startedAt }))
  return startedAt
}

export function clearAnalysisFlow() {
  window.sessionStorage.removeItem(UPLOAD_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(DRAFT_KEY)
  window.sessionStorage.removeItem(RUNNING_KEY)
}

function readJson<T>(key: string): T | null {
  const value = window.sessionStorage.getItem(key)
  if (!value) return null

  try {
    return JSON.parse(value) as T
  } catch {
    window.sessionStorage.removeItem(key)
    return null
  }
}
