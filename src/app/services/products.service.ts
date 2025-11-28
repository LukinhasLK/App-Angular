import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Churrasco com Legumes Grelhados',
      price: 28.00,
      image: 'Tela Principal/prato-churrasco.png',
      category: 'Churrasco',
      description: 'Um prato robusto com carnes variadas grelhadas, acompanhado de legumes tostados na brasa.',
      ingredients: ['150g de picanha ou contra-filé', '1 linguiça toscana', '½ cebola', '½ pimentão', '½ abobrinha', 'Sal grosso'],
      rating: 4.3,
      prepTime: '30 minutos'
    },
    {
      id: 2,
      name: 'Pizza de Calabresa e Queijo',
      price: 18.00,
      image: 'Tela Principal/prato-pizza.png',
      category: 'Pizzas',
      description: 'Pizza tradicional com calabresa artesanal, queijo mussarela e orégano.',
      ingredients: ['Massa de pizza', '200g calabresa', '150g queijo mussarela', 'Molho de tomate', 'Orégano'],
      rating: 4.5,
      prepTime: '25 minutos'
    },
    {
      id: 3,
      name: 'Espaguete ao Molho de Tomate',
      price: 12.00,
      image: 'Tela Principal/prato-massa.png',
      category: 'Massas',
      description: 'Espaguete tradicional com molho de tomate caseiro e manjericão fresco.',
      ingredients: ['200g espaguete', 'Molho de tomate', 'Alho', 'Azeite', 'Manjericão', 'Queijo parmesão'],
      rating: 4.2,
      prepTime: '20 minutos'
    },
    {
      id: 4,
      name: 'Salada Verde Mediterrânea',
      price: 9.00,
      image: 'Tela Principal/prato-salada.png',
      category: 'Todos',
      description: 'Salada fresca com mix de folhas, tomate cereja, pepino e molho especial.',
      ingredients: ['Mix de folhas', 'Tomate cereja', 'Pepino', 'Cebola roxa', 'Azeite', 'Limão'],
      rating: 4.0,
      prepTime: '10 minutos'
    },
    {
      id: 5,
      name: 'Combinado de Sushi Simples',
      price: 32.00,
      image: 'Tela Principal/prato-sushi.png',
      category: 'Todos',
      description: 'Seleção de sushis e sashimis frescos com wasabi e gengibre.',
      ingredients: ['Arroz para sushi', 'Salmão fresco', 'Atum', 'Alga nori', 'Wasabi', 'Gengibre'],
      rating: 4.7,
      prepTime: '35 minutos'
    },
    {
      id: 6,
      name: 'Bolo com Sorvete de Baunilha',
      price: 14.00,
      image: 'Tela Principal/prato-sorvete.png',
      category: 'Todos',
      description: 'Bolo de chocolate quente servido com sorvete de baunilha cremoso.',
      ingredients: ['Bolo de chocolate', 'Sorvete de baunilha', 'Calda de chocolate', 'Raspas de chocolate'],
      rating: 4.6,
      prepTime: '15 minutos'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    if (category === 'Todos') {
      return this.products;
    }
    return this.products.filter(p => p.category === category);
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery)
    );
  }
}
