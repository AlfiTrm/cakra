import { API_BASE_URL } from '../config/env'
import { getAccessToken, logout } from './authToken'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown>
  timeoutMs?: number
}

export type HttpResult<T> = {
  data: T
  headers: Headers
  status: number
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
  const result = await httpWithResponse<T>(path, options)
  return result.data
}

export async function httpWithResponse<T>(path: string, options: RequestOptions = {}): Promise<HttpResult<T>> {
  if (!API_BASE_URL) {
    throw new Error('VITE_BASE_API belum diset.')
  }

  const { timeoutMs = 30_000, ...requestOptions } = options
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)
  const body = serializeBody(options.body)
  const isJson = typeof body === 'string' && typeof options.body !== 'string'
  const token = getAccessToken()

  try {
    let response: Response

    try {
      response = await fetch(buildUrl(path), {
        ...requestOptions,
        headers: {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(isJson ? { 'Content-Type': 'application/json' } : {}),
          ...options.headers,
        },
        body,
        signal: options.signal ?? controller.signal,
      })
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new Error('Request terlalu lama. Coba lagi.', { cause: err })
      }

      throw new Error('Tidak bisa terhubung ke server. Periksa koneksi atau coba lagi.', { cause: err })
    }

    const data = await parseResponse(response)

    if (!response.ok) {
      if (response.status === 401) {
        logout()
      }

      throw new HttpError(getErrorMessage(data), response.status, data)
    }

    return {
      data: data as T,
      headers: response.headers,
      status: response.status,
    }
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
