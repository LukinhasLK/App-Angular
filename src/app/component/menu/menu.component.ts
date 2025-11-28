import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories = ['Todos', 'Massas', 'Pizzas', 'Churrasco', 'Bebidas'];
  selectedCategory = 'Todos';
  searchQuery = '';
  cartItemCount = 0;

  constructor(
    private productsService: ProductsService,
    public cartService: CartService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.filteredProducts = this.products;
    this.updateCartCount();

    this.cartService.cart$.subscribe(() => {
      this.updateCartCount();
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSearch() {
    this.filterProducts();
  }

  filterProducts() {
    let results = this.products;

    if (this.selectedCategory !== 'Todos') {
      results = results.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      results = this.productsService.searchProducts(this.searchQuery);
      if (this.selectedCategory !== 'Todos') {
        results = results.filter(p => p.category === this.selectedCategory);
      }
    }

    this.filteredProducts = results;
  }

  addToCart(product: Product, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(product, 1);
  }

  getItemQuantity(productId: number): number {
    return this.cartService.getItemQuantity(productId);
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  toggleFavorite(product: Product, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(product);
  }

  isFavorite(productId: number): boolean {
    return this.favoritesService.isFavorite(productId);
  }
}
