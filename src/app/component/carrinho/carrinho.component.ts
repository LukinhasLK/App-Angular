import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(
    public cartService: CartService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
    this.cartService.cart$.subscribe(() => {
      this.loadCart();
    });
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        this.cartService.updateQuantity(productId, item.quantity - 1);
      } else {
        this.removeItem(productId);
      }
    }
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  finalizarPedido() {
    if (this.cartItems.length > 0) {
      this.ordersService.createOrder(this.cartItems, this.total);
      this.cartService.clearCart();
      this.router.navigate(['/historico']);
    }
  }

  continueShopping() {
    this.router.navigate(['/menu']);
  }
}
