import { Routes } from '@angular/router';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { fornecedorResolver } from './components/fornecedor/resolver/fornecedor.resolver';
import { TabelaCidadeEstadoComponent } from './components/tabela-cidade-estado/tabela-cidade-estado.component';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';
import { EstadoCidadeFormComponent } from './components/estado-cidade-form/estado-cidade-form.component';
import { estadoResolver } from './components/estado/resolver/estado.resolver';
import { EstadoEditFormComponent } from './components/estado/estado-edit-form/estado-edit-form.component';

export const routes: Routes = [
  {
    path: 'estados_cidades',
    component: TabelaCidadeEstadoComponent,
    title: 'Lista de Cidade e Estado',
  },
  { path: 'estados/new', component: EstadoCidadeFormComponent, title: 'Novo Estado' },
  { path: 'cidades', component: CidadeFormComponent, title: 'Nova Cidade' },
  { path : 'estados_cidades/edit/:id', component: EstadoEditFormComponent, resolve: {estado: estadoResolver}, title: 'Editar Estado'}, 

  {
    path: 'fornecedores',
    component: FornecedorListComponent,
    title: 'Lista de Fornecedor',
  },
  {
    path: 'fornecedores/new',
    component: FornecedorFormComponent,
    title: 'Novo Fornecedor',
  },
  {
    path: 'fornecedores/edit',
    component: FornecedorFormComponent,
    resolve: { fornecedor: fornecedorResolver },
  },
];
