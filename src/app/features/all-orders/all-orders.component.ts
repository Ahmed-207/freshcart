import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { UserOrdersService } from './services/user-orders.service';
import { isPlatformBrowser } from '@angular/common';
import { UserOrders } from './models/user-orders.interface';
import { OrderCardComponent } from "./components/order-card/order-card.component";
import { TranslatePipe } from '@ngx-translate/core';




@Component({
  selector: 'app-all-orders',
  imports: [OrderCardComponent,TranslatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit {


  private readonly userOrders = inject(UserOrdersService);
  private readonly plat_id = inject(PLATFORM_ID);
  allUserOrders: WritableSignal<UserOrders[]> = signal([]);
  allOrderDetails: WritableSignal<UserOrders | undefined> = signal({} as UserOrders);
  modalFlag: WritableSignal<boolean> = signal(false);




  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {
      this.getAllUserOrders();
    }


  }

  getAllUserOrders(): void {
    this.userOrders.getUserOrders().subscribe({
      next: (res) => {
        this.allUserOrders.set(res);
        console.log(res);

      }
    })
  }

  getSpecificOrderData(orderId: string): void {
    this.userOrders.getSpecificOrder(orderId).subscribe({
      next: (res) => {
        this.allOrderDetails.set(res);
        this.modalFlag.set(true);
      }
    });
  }

}
