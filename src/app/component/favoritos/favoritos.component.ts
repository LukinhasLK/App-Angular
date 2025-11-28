import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss'
})
export class FavoritosComponent implements OnInit {
  favorites: Product[] = [];
  cartItemCount = 0;

  constructor(
    public favoritesService: FavoritesService,
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFavorites();
    this.updateCartCount();

    this.favoritesService.favorites$.subscribe(() => {
      this.loadFavorites();
    });

    this.cartService.cart$.subscribe(() => {
      this.updateCartCount();
    });
  }

  loadFavorites() {
    this.favorites = this.favoritesService.getFavorites();
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  removeFromFavorites(productId: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.removeFromFavorites(productId);
  }

  addToCart(product: Product, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
  }

  getItemQuantity(productId: number): number {
    return this.cartService.getItemQuantity(productId);
  }

  continueShopping() {
    this.router.navigate(['/menu']);
  }
}
