import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-excluir-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './excluir-produto.component.html',
  styleUrls: ['./excluir-produto.component.scss']
})
export class ExcluirProdutoComponent implements OnInit {
  products: Product[] = [];
  successMessage = '';
  confirmDeleteId: number | null = null;
  confirmDeleteName = '';

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productsService.getProducts();
  }

  voltar() {
    this.router.navigate(['/menu']);
  }

  excluirProduto(id: number, name: string) {
    this.confirmDeleteId = id;
    this.confirmDeleteName = name;
  }

  confirmarExclusao() {
    if (this.confirmDeleteId !== null) {
      const sucesso = this.productsService.deleteProduct(this.confirmDeleteId);
      if (sucesso) {
        this.successMessage = `Produto "${this.confirmDeleteName}" excluído com sucesso!`;
        this.loadProducts();
        this.confirmDeleteId = null;
        this.confirmDeleteName = '';

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }
    }
  }

  cancelarExclusao() {
    this.confirmDeleteId = null;
    this.confirmDeleteName = '';
  }
}
