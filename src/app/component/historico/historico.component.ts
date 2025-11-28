import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrdersService } from '../../services/orders.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent implements OnInit {
  orders: Order[] = [];
  cartItemCount = 0;
  selectedOrder: Order | null = null;

  constructor(
    private ordersService: OrdersService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.updateCartCount();

    this.ordersService.orders$.subscribe(() => {
      this.loadOrders();
    });

    this.cartService.cart$.subscribe(() => {
      this.updateCartCount();
    });
  }

  loadOrders() {
    this.orders = this.ordersService.getOrders();
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  viewOrderDetails(order: Order) {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  continueShopping() {
    this.router.navigate(['/menu']);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
