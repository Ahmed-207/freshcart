import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from '../../core/services/products/product-details.service';
import { productDetails } from '../../core/models/products/product-details.interface';
import { CartService } from '../cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-details',
  imports: [TranslatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {


  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly productDetailsService = inject(ProductDetailsService);

  private readonly cartService = inject(CartService);

  private readonly plat_id = inject(PLATFORM_ID);


  productIdForDetails: WritableSignal<string | null> = signal(null);

  productDetailsForPage: WritableSignal<productDetails> = signal({} as productDetails);

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.productIdForDetails.set(urlParams.get('id'));
      }
    });

    if (isPlatformBrowser(this.plat_id)) {

      this.getAllProductDetails();
    }




  }

  getAllProductDetails(): void {
    this.productDetailsService.getProductDetails(this.productIdForDetails()).subscribe({
      next: (res) => {
        this.productDetailsForPage.set(res.data);
      }
    })
  }

  addToCart(): void {
    this.cartService.addProduct(this.productIdForDetails()!).subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      }
    })
  }

}
