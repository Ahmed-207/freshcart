import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDataResponse } from '../models/cart-data.interface';
import { environment } from '../../../../environments/environment.development';
import { CartDetailsResponse } from '../models/cart-details.interface';
import { PaymentVisaResponse } from '../models/payment-visa.interface';
import { PaymentCashResponse } from '../models/payment-cash.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {



  private readonly httpClient = inject(HttpClient);
  cartCount: WritableSignal<number> = signal<number>(0);

  addProduct(id: string): Observable<CartDataResponse> {
    return this.httpClient.post<CartDataResponse>(environment.base_url + 'cart',
      {
        productId: id
      }

    )
  }

  getCartDetails(): Observable<CartDetailsResponse> {
    return this.httpClient.get<CartDetailsResponse>(environment.base_url + 'cart');
  }

  removeCartItem(id: string): Observable<CartDetailsResponse> {
    return this.httpClient.delete<CartDetailsResponse>(environment.base_url + `cart/${id}`)
  }

  updateProductCount(id: string, count: number): Observable<CartDetailsResponse> {
    return this.httpClient.put<CartDetailsResponse>(environment.base_url + `cart/${id}`,
      {
        "count": count
      }
    )
  }

  checkOutSession(cartId: string | null, shipDetails: object): Observable<PaymentVisaResponse> {
    const returnUrl = window.location.origin;
    return this.httpClient.post<PaymentVisaResponse>(environment.base_url + `orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
      shipDetails
    )
  }

  createCashOrder(cartId: string | null, shipDetails: object): Observable<PaymentCashResponse> {
    return this.httpClient.post<PaymentCashResponse>(environment.base_url + `orders/${cartId}`, shipDetails);
  }

}
