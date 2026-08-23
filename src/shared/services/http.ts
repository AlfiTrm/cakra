import { API_BASE_URL } from '../config/env'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown>
  timeoutMs?: number
}

export class HttpError extends Error {
  data: unknown
  status: number

  constructor(message: string, status: number, data: unknown) {
    super(message)
    this.status = status
    this.data = data
  }
}

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('VITE_BASE_API belum diset.')
  }

  const { timeoutMs = 30_000, ...requestOptions } = options
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)
  const body = serializeBody(options.body)
  const isJson = typeof body === 'string' && typeof options.body !== 'string'

  try {
    const response = await fetch(buildUrl(path), {
      ...requestOptions,
      headers: {
        Accept: 'application/json',
        ...(isJson ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
      body,
      signal: options.signal ?? controller.signal,
    })

    const data = await parseResponse(response)

    if (!response.ok) {
      throw new HttpError(getErrorMessage(data), response.status, data)
    }

    return data as T
  } finally {
    window.clearTimeout(timeoutId)
  }
}

function buildUrl(path: string) {
  return `${API_BASE_URL}/${path.replace(/^\/+/, '')}`
}

function serializeBody(body: RequestOptions['body']) {
  if (!body || isBodyInit(body)) return body

  return JSON.stringify(body)
}

function isBodyInit(body: RequestOptions['body']): body is BodyInit {
  return (
    typeof body === 'string' ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer
  )
}

async function parseResponse(response: Response) {
  if (response.status === 204) return null

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return response.json().catch(() => null)
  }

  return response.text().catch(() => null)
}

function getErrorMessage(data: unknown) {
  if (data && typeof data === 'object' && 'message' in data && typeof data.message === 'string') {
    return data.message
  }

  if (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string') {
    return data.error
  }

  if (typeof data === 'string' && data) {
    return data
  }

  return 'Request gagal.'
}
