import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Product[] = [];
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesSubject.next(this.favorites);
    }
  }

  private saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    this.favoritesSubject.next(this.favorites);
  }

  addToFavorites(product: Product) {
    if (!this.isFavorite(product.id)) {
      this.favorites.push(product);
      this.saveFavorites();
    }
  }

  removeFromFavorites(productId: number) {
    this.favorites = this.favorites.filter(p => p.id !== productId);
    this.saveFavorites();
  }

  toggleFavorite(product: Product) {
    if (this.isFavorite(product.id)) {
      this.removeFromFavorites(product.id);
    } else {
      this.addToFavorites(product);
    }
  }

  isFavorite(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }

  getFavorites(): Product[] {
    return this.favorites;
  }
}
