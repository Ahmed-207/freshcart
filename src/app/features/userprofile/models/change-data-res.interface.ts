export interface ChangeDataRes {
  message: string
  user: User
}

export interface User {
  name: string
  email: string
  role: string
}
