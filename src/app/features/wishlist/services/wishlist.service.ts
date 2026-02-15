import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Products, UpdateWishListRes, WishListRes } from '../models/wishlist.interface';


@Injectable({
  providedIn: 'root',
})
export class WishlistService {

  private readonly httpClient = inject(HttpClient);
  wishListProds: WritableSignal<Products[]> = signal([])
  wishListIds: WritableSignal<string[]> = signal([]);
  prodIdCheck: WritableSignal<boolean> = signal(false);

  toggleIdInList(id: string, add: boolean) {
    if (add) {
      this.wishListIds.update(ids => [...ids, id]);
    } else {
      this.wishListIds.update(ids => ids.filter(i => i !== id));
    }
  }



  reqGetUserWishList(): Observable<WishListRes> {
    return this.httpClient.get<WishListRes>(environment.base_url + 'wishlist')
  }

  reqAddProductToWishList(prodId: string): Observable<UpdateWishListRes> {
    return this.httpClient.post<UpdateWishListRes>(environment.base_url + 'wishlist', {
      productId: prodId
    })
  }

  reqRemoveProductFromWishList(prodId: string): Observable<UpdateWishListRes> {
    return this.httpClient.delete<UpdateWishListRes>(environment.base_url + `wishlist/${prodId}`);
  }


}
