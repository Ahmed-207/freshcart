import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { UserOrders } from '../models/user-orders.interface';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root',
})
export class UserOrdersService {

  private readonly httpClient = inject(HttpClient);

  getUserOrders(): Observable<UserOrders[]> {
    return this.httpClient.get<UserOrders[]>(environment.base_url + `orders/user`);
  }

  getSpecificOrder(orderId: string): Observable<UserOrders | undefined> {

    return this.getUserOrders().pipe<UserOrders | undefined>(map(ordersArr => ordersArr.find(order => order._id === orderId)));

  }

}
