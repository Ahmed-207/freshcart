import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CartService } from './services/cart.service';
import { CartDetails } from './models/cart-details.interface';
import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {


  private readonly cartService = inject(CartService);
  private readonly plat_id = inject(PLATFORM_ID);

  cartProducts:WritableSignal<CartDetails>=signal({} as CartDetails);

  ngOnInit(): void {

    if(isPlatformBrowser(this.plat_id)){

          this.showCartDetails();

    }
    
  }

  showCartDetails():void{
    this.cartService.getCartDetails().subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.cartProducts.set(res.data);
        }
      }
    })
  }

  removeProduct(id:string):void{
    this.cartService.removeCartItem(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.cartService.cartCount.set(res.numOfCartItems);
          this.cartProducts.set(res.data);
        }
      }
    });
  }

  changeProductCount(id:string, count:number):void{
    this.cartService.updateProductCount(id,count).subscribe({
      next:(res)=>{
        if(res.status === "success"){
          this.cartService.cartCount.set(res.numOfCartItems);
          this.cartProducts.set(res.data);
        }
      }
    })
  }


}
