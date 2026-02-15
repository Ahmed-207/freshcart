import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsRes } from '../../models/products/products.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  setGetAllProducts(
    sort:string = 'price',
    highestPrice?:number,
    currentPage:number = 1,
    limit:number = 56,
    brand?:string,
    lowestPrice?:number,
    categoryId?:string
  ):Observable<ProductsRes>{

    let params = new HttpParams().set('sort', sort).set('page',currentPage).set('limit',limit);
    if(highestPrice){
      params = params.set('price[gte]',highestPrice.toString());
    }
    if(brand){
      params = params.set('brand',brand);
    }
    if(lowestPrice){
      params = params.set('price[lte]',lowestPrice);
    }
    if(categoryId){
      params = params.set('category[in]',categoryId)
    }

   return this.httpClient.get<ProductsRes>(environment.base_url + `products`, { params } );
  }
}
