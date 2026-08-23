import { API_BASE_URL } from '../config/env'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | Record<string, unknown>
}

export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const body =
    options.body instanceof FormData || typeof options.body === 'string'
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    body,
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request gagal.')
  }

  return data as T
}
