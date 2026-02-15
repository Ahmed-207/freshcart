import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { UserOrders } from '../../models/user-orders.interface';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-order-card',
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {


  orderDetails:InputSignal<UserOrders> = input.required<UserOrders>();

  flag:ModelSignal<boolean> = model<boolean>(true);

  closeModal(): void {

   this.flag.set(false);

  }



}
