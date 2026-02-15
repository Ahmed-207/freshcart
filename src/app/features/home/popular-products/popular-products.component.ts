import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { Products } from '../../../core/models/products/products.interface';
import { ProductCardComponent } from "../../../shared/components/product-card/product-card.component";
import { TranslatePipe } from '@ngx-translate/core';
import { WishlistService } from '../../wishlist/services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCardComponent, TranslatePipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly plat_id = inject(PLATFORM_ID);

  productList: WritableSignal<Products[]> = signal<Products[]>([]);

  getPopularProducts(): void {
    this.productsService.setGetAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);
      }
    })
  }

  getUserWishList(): void {
    this.wishlistService.reqGetUserWishList().subscribe({
      next: (res) => {
        this.wishlistService.wishListProds.set(res.data);
        const ids = res.data.map(item => item._id);
        this.wishlistService.wishListIds.set(ids);
      }
    })
  }



  ngOnInit(): void {
    if(isPlatformBrowser(this.plat_id)){
      this.getUserWishList();
    }
    this.getPopularProducts();

  }


}
