import { Routes } from '@angular/router';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { FornecedorFormComponent } from './components/fornecedor/fornecedor-form/fornecedor-form.component';
import { FornecedorListComponent } from './components/fornecedor/fornecedor-list/fornecedor-list.component';
import { fornecedorResolver } from './components/fornecedor/resolver/fornecedor.resolver';

export const routes: Routes = [
    { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados' },
    { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado' },

    { path: 'fornecedor', component: FornecedorListComponent, title: 'Lista de Fornecedor' },
    { path: 'fornecedor/new', component: FornecedorFormComponent, title: 'Novo Fornecedor' },
    { path: 'fornecedor/edit/:id', component: FornecedorFormComponent, resolve: { fornecedor: fornecedorResolver } },
];
