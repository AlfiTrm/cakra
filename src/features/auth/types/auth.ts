export type ApiStatus = {
  code: number
  isSuccess: boolean
}

export type ApiResponse<T> = {
  data: T
  message: string
  status: ApiStatus
}

export type RegisterStartRequest = {
  email: string
  full_name: string
}

export type RegisterStartData = {
  otp_expires_at: string
  session_token: string
}

export type ConfirmPasswordData = {
  access_token: string
  token_type: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type LoginData = ConfirmPasswordData

export type ForgotPasswordRequest = {
  email: string
}

export type ForgotPasswordData = {
  session_token?: string
} | null
