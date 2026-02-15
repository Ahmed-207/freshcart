import { productDetailsResponse } from './../../models/products/product-details.interface';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {

  private readonly httpClient = inject(HttpClient);

  getProductDetails(productID: string | null): Observable<productDetailsResponse> {
    return this.httpClient.get<productDetailsResponse>(environment.base_url + 'products/' + `${productID}`)
  }

}
