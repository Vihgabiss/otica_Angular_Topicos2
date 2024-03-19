import { Routes } from '@angular/router';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { fornecedorResolver } from './components/fornecedor/resolver/fornecedor.resolver';
import { TabelaCidadeEstadoComponent } from './components/tabela-cidade-estado/tabela-cidade-estado.component';
import { EstadoFormComponent } from './components/estado-cidade-form/estado-cidade-form.component';

export const routes: Routes = [
  { path: 'estados_cidades', component: TabelaCidadeEstadoComponent, title: 'Lista de Cidade e Estado' },
  { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado' }
//  { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
 // { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},
 
  ,{ path: 'fornecedores', component: FornecedorListComponent, title: 'Lista de Fornecedor' },
  { path: 'fornecedores/new', component: FornecedorFormComponent, title: 'Novo Fornecedor' },
  { path: 'fornecedores/edit', component: FornecedorFormComponent, resolve: { fornecedor: fornecedorResolver } },


];
