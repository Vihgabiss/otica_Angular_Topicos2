import { Routes } from '@angular/router';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { fornecedorResolver } from './components/fornecedor/resolver/fornecedor.resolver';
import { TabelaCidadeEstadoComponent } from './components/tabela-cidade-estado/tabela-cidade-estado.component';
import { EstadoCidadeFormComponent } from './components/estado-cidade-form/estado-cidade-form.component';
import { estadoResolver } from './components/estado/resolver/estado.resolver';
import { EstadoEditFormComponent } from './components/estado/estado-edit-form/estado-edit-form.component';
import { CidadeEditFormComponent } from './components/cidade/cidade-edit-form/cidade-edit-form.component';
import { cidadeResolver } from './components/cidade/resolver/cidade.resolver';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { EnderecoVisualizaFormComponent } from './components/endereco/endereco-visualiza-form/endereco-visualiza-form.component';
import { enderecoResolver } from './components/endereco/resolver/endereco.resolver';

export const routes: Routes = [
  { path: 'estados_cidades', component: TabelaCidadeEstadoComponent, title: 'Lista de Cidade e Estado'},
  { path: 'estados/new', component: EstadoCidadeFormComponent, title: 'Novo Estado/Cidade' },
  { path: 'estados_cidades/editestado/:id', component: EstadoEditFormComponent, resolve: {estado: estadoResolver}, title: 'Editar Estado'}, 
  { path: 'estados_cidades/editcidade/:id', component: CidadeEditFormComponent, resolve: {cidade: cidadeResolver}, title: 'Editar Cidade'}, 
  { path: 'usuarios', component: UsuarioListComponent, title: 'Lista de Usuarios'},
  { path: 'enderecos', component: EnderecoListComponent, title: 'Lista de Endereços'},
  { path: 'enderecos/new', component: EnderecoFormComponent, title: 'Novo Endereço' },
  { path: 'enderecos/visualiza/:id', component: EnderecoVisualizaFormComponent,  resolve: {endereco: enderecoResolver}, title: 'Ver Endereço' },

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
