import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { EstadoFormComponent } from './components/estado-cidade-form/estado-cidade-form.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { TabelaCidadeEstadoComponent } from './components/tabela-cidade-estado/tabela-cidade-estado.component';

export const routes: Routes = [
    { path: 'estados_cidades', component: TabelaCidadeEstadoComponent, title: 'Lista de Cidade e Estado'},
    { path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'}
  //  { path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
   // { path: 'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},

];
