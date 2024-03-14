import { Component } from '@angular/core';
import { EstadoListComponent } from '../estado/estado-list/estado-list.component';
import { CidadeListComponent } from '../cidade/cidade-list/cidade-list.component';

@Component({
  selector: 'app-tabela-cidade-estado',
  standalone: true,
  imports: [EstadoListComponent, CidadeListComponent],
  templateUrl: './tabela-cidade-estado.component.html',
  styleUrl: './tabela-cidade-estado.component.css'
})
export class TabelaCidadeEstadoComponent {
}
