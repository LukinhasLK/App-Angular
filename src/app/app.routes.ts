import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { CadastroComponent } from './component/cadastro/cadastro.component';
import { MenuComponent } from './component/menu/menu.component';
import { DetalheDoPratoComponent } from './component/detalhe-do-prato/detalhe-do-prato.component';
import { CarrinhoComponent } from './component/carrinho/carrinho.component';
import { FavoritosComponent } from './component/favoritos/favoritos.component';
import { HistoricoComponent } from './component/historico/historico.component';
import { CadastroProdutoComponent } from './component/cadastro-produto/cadastro-produto.component';
import { ExcluirProdutoComponent } from './component/excluir-produto/excluir-produto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'detalhe/:id', component: DetalheDoPratoComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'cadastro-produto', component: CadastroProdutoComponent },
  { path: 'excluir-produto', component: ExcluirProdutoComponent }
];
