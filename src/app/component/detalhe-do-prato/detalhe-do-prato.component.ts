import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-detalhe-do-prato',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhe-do-prato.component.html',
  styleUrl: './detalhe-do-prato.component.scss'
})
export class DetalheDoPratoComponent implements OnInit {
  product: Product | undefined;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService,
    public favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productsService.getProductById(id);

    if (!this.product) {
      this.router.navigate(['/menu']);
    } else {
      const existingQuantity = this.cartService.getItemQuantity(id);
      if (existingQuantity > 0) {
        this.quantity = existingQuantity;
      }
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      const existingQuantity = this.cartService.getItemQuantity(this.product.id);
      if (existingQuantity > 0) {
        this.cartService.updateQuantity(this.product.id, this.quantity);
      } else {
        this.cartService.addToCart(this.product, this.quantity);
      }
      this.router.navigate(['/menu']);
    }
  }

  getTotal(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }

  toggleFavorite() {
    if (this.product) {
      this.favoritesService.toggleFavorite(this.product);
    }
  }

  isFavorite(): boolean {
    return this.product ? this.favoritesService.isFavorite(this.product.id) : false;
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
}
