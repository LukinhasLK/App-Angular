import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cadastro-produto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss']
})
export class CadastroProdutoComponent {

  formData = {
    name: '',
    category: '',
    price: 0,
    ingredient: ''
  };

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  voltar() {
    this.router.navigate(['/menu']);
  }

  adicionarAoCardapio() {
    // monta o objeto no formato do Product (sem id)
    this.productsService.addProduct({
      name: this.formData.name,
      category: this.formData.category,
      price: this.formData.price,
      description: this.formData.ingredient,
      image: 'Tela Principal/prato-sorvete.png',   // coloque aqui uma imagem válida sua
      ingredients: [this.formData.ingredient],
      rating: 0,
      prepTime: ''
    });

    alert(`Produto "${this.formData.name}" adicionado!`);

    this.router.navigate(['/menu']);
  }
}
