import { http, httpWithResponse } from '../../../shared/services/http'
import type {
  ApiResponse,
  ConfirmPasswordData,
  ForgotPasswordData,
  ForgotPasswordRequest,
  LoginData,
  LoginRequest,
  RegisterStartData,
  RegisterStartRequest,
} from '../types/auth'

export function startRegister(body: RegisterStartRequest) {
  return http<ApiResponse<RegisterStartData>>('/auth/register', {
    body,
    method: 'POST',
  })
}

export function verifyRegisterOtp(sessionToken: string, otp: string) {
  return http<ApiResponse<null>>('/auth/register/verify-otp', {
    body: { otp },
    headers: {
      'X-Session-Token': sessionToken,
    },
    method: 'POST',
  })
}

export function resendRegisterOtp(sessionToken: string) {
  return http<ApiResponse<null>>('/auth/register/resend-otp', {
    headers: {
      'X-Session-Token': sessionToken,
    },
    method: 'POST',
  })
}

export function confirmRegisterPassword(sessionToken: string, password: string, confirmPassword: string) {
  return http<ApiResponse<ConfirmPasswordData>>('/auth/register/password', {
    body: {
      confirm_password: confirmPassword,
      password,
    },
    headers: {
      'X-Session-Token': sessionToken,
    },
    method: 'POST',
  })
}

export function login(body: LoginRequest) {
  return http<ApiResponse<LoginData>>('/auth/login', {
    body,
    method: 'POST',
  })
}

export async function forgotPassword(body: ForgotPasswordRequest) {
  const result = await httpWithResponse<ApiResponse<ForgotPasswordData>>('/auth/forgot-password', {
    body,
    method: 'POST',
  })

  return {
    ...result.data,
    sessionToken: result.data.data?.session_token ?? result.headers.get('X-Session-Token'),
  }
}

export function verifyForgotPasswordOtp(sessionToken: string, otp: string) {
  return http<ApiResponse<null>>('/auth/forgot-password/verify-otp', {
    body: { otp },
    headers: {
      'X-Session-Token': sessionToken,
    },
    method: 'POST',
  })
}

export function resendForgotPasswordOtp(sessionToken: string) {
  return http<ApiResponse<null>>('/auth/forgot-password/resend-otp', {
    headers: {
      'X-Session-Token': sessionToken,
    },
    method: 'POST',
  })
}

export function setForgotPassword(sessionToken: string, password: string, confirmPassword: string) {
  return http<ApiResponse<null>>('/auth/forgot-password/password', {
    body: {
      confirm_password: confirmPassword,
      password,
    },
    headers: {
      'X-Session-Token': sessionToken,
    },
    method: 'POST',
  })
}
