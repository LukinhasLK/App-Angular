import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private orders: Order[] = [];
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  constructor() {
    this.loadOrders();
  }

  private loadOrders() {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        date: new Date(order.date)
      }));
      this.ordersSubject.next(this.orders);
    }
  }

  private saveOrders() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.ordersSubject.next(this.orders);
  }

  createOrder(items: CartItem[], total: number): Order {
    const orderId = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: orderId,
      items: items,
      total: total,
      date: new Date(),
      status: 'Pendente',
      deliveryFee: 14.90
    };

    this.orders.unshift(newOrder);
    this.saveOrders();
    return newOrder;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(order => order.id === id);
  }
}
