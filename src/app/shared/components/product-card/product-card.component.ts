import { WishlistService } from './../../../features/wishlist/services/wishlist.service';
import { Component, computed, inject, Input } from '@angular/core';
import { Products } from '../../../core/models/products/products.interface';
import { RouterLink } from "@angular/router";
import { CardModule } from 'primeng/card';
import { CurrencyPipe } from '@angular/common';
import { ProductCutPipe } from "../../pipes/product-cut-pipe";
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CardModule, CurrencyPipe, ProductCutPipe, ToastModule, RippleModule,TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  providers: [MessageService]
})
export class ProductCardComponent {

  @Input() productData: Products = {} as Products;

  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);
  private readonly wishlistService = inject(WishlistService);
  wishListFlag = computed(() =>
    this.wishlistService.wishListIds().includes(this.productData._id)
  );





  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'there is something went wrong, please try again' });
  }

  handleChildClick(event: Event) {
    event.stopPropagation();
  }

  addProductToCart(id: string): void {
    this.cartService.addProduct(id).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
        this.showSuccess(res.message);

      }
    })
  }


  addToWishList(event: Event, prodId: string): void {
    this.handleChildClick(event);
    this.wishlistService.reqAddProductToWishList(prodId).subscribe({
      next: (res) => {
        this.showSuccess(res.message);
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this.showError();
        console.log(err)
      },
      complete: () => {
        this.wishlistService.toggleIdInList(prodId, true);
      }
    })
  }

  removeFromWishList(event: Event, prodId: string): void {
    this.handleChildClick(event);
    this.wishlistService.reqRemoveProductFromWishList(prodId).subscribe({
      next: (res) => {
        this.showSuccess(res.message);
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this.showError();
        console.log(err)
      },
      complete: () => {
        this.wishlistService.wishListProds.set(this.wishlistService.wishListProds().filter(p => p._id !== prodId));
        this.wishlistService.toggleIdInList(prodId, false);
        console.log(this.wishlistService.wishListProds());
      }
    })
  }






}