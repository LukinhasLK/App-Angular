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

  imagePreview: string | null = null;
  selectedFile: File | null = null;
  successMessage = '';
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  voltar() {
    this.router.navigate(['/menu']);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      // Criar preview da imagem
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  adicionarAoCardapio() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validação básica
    if (!this.formData.name || !this.formData.category || !this.formData.price || !this.formData.ingredient) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    // Usar a imagem selecionada ou uma padrão
    const imagePath = this.imagePreview || 'images/prato-de-macarrao.png';

    // monta o objeto no formato do Product (sem id)
    this.productsService.addProduct({
      name: this.formData.name,
      category: this.formData.category,
      price: this.formData.price,
      description: this.formData.ingredient,
      image: imagePath,
      ingredients: [this.formData.ingredient],
      rating: 0,
      prepTime: ''
    });

    this.successMessage = `Produto "${this.formData.name}" adicionado com sucesso!`;

    // Redirecionar após 2 segundos
    setTimeout(() => {
      this.router.navigate(['/menu']);
    }, 2000);
  }
}
