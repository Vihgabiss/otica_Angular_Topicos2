import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EstadoFormComponent } from '../estado/estado-form/estado-form.component';
import { CidadeFormComponent } from '../cidade/cidade-form/cidade-form.component';



@Component({
  selector: 'app-estado-cidade-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [EstadoFormComponent, CidadeFormComponent],
  templateUrl: './estado-cidade-form.component.html',
  styleUrl: './estado-cidade-form.component.css'
})
export class EstadoCidadeFormComponent {
  
}