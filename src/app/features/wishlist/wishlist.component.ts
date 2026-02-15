import { Component, computed, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { WishlistService } from './services/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { Products } from '../../core/models/products/products.interface';
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent, RouterLink,TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {

  private readonly wishlistService = inject(WishlistService);
  private readonly plat_id = inject(PLATFORM_ID);
  wishListProducts: Signal<Products[]> = computed(() => this.wishlistService.wishListProds());

  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {
      this.getUserWishList();
    }

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




}
