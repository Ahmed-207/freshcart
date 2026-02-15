
export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface User {
  name: string
  email: string
  role: string
}
export interface UserData {
  name: string
  email: string
  password: string
  rePassword: string
  phone: string
}

export interface ForgotPassEmail {
  email: string
}

export interface VerifyCodeRes {
  status: string
}
export interface ResetPassRes {
  token: string
}


