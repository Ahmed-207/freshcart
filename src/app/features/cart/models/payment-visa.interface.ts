export interface PaymentVisaResponse {
  status: string
  session: PaymentVisa
}

export interface PaymentVisa {
  url: string
  success_url: string
  cancel_url: string
}
