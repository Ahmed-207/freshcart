import { CartService } from './../cart/services/cart.service';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  private readonly formBuilder = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  cartId: string | null = null;
  shippingDetails!: FormGroup;

  ngOnInit(): void {
    this.initializeShippingForm();
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId = urlParams.get('id');
      }
    })
  }

  initializeShippingForm(): void {

    this.shippingDetails = this.formBuilder.group({
      shippingAddress: this.formBuilder.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0-9]{9}$/)]],
        city: [null, [Validators.required]]
      })
    })

  }


  payWithVisa(): void {
    if (this.shippingDetails.valid) {
      this.cartService.checkOutSession(this.cartId, this.shippingDetails.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            console.log(res.session);
            window.open(res.session.url,'_self');
          }
        }
      })
    }
  }

  payWithCash(): void {
    if (this.shippingDetails.valid) {
      this.cartService.createCashOrder(this.cartId, this.shippingDetails.value).subscribe({
        next:(res)=>{
          if(res.status === 'success'){
            console.log(res.data);
            this.router.navigate(['/allorders']);
          }
        }
      })
    }
  }

}
