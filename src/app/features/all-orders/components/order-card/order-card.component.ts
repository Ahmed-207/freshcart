import { Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { UserOrders } from '../../models/user-orders.interface';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-order-card',
  imports: [CurrencyPipe],
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
