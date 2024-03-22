import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CidadeService } from '../../../services/cidade.service';
import { Cidade } from '../../../models/cidade.model';
import { EstadoService } from '../../../services/estado.service';
import { Estado } from '../../../models/estado.model';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-cidade-edit-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    NgIf,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatAccordion,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './cidade-edit-form.component.html',
  styleUrl: './cidade-edit-form.component.css',
})
export class CidadeEditFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.accordion = new MatAccordion();

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      estado: [null],
    });
  }
  ngOnInit(): void {
    this.estadoService.findAll().subscribe((data) => {
      this.estados = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];

    //selecionando o estado
    const estado = this.estados.find(
      (estado) => estado.id === (cidade?.estado?.id || null)
    );

    this.formGroup = this.formBuilder.group({
      id: [(cidade && cidade.id) ? cidade.id : null],
      nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      estado: [estado]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      if (cidade.id == null) {
        this.cidadeService.insert(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/estados_cidades');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: (cidadeAlterado) => {
            this.router.navigateByUrl('/estados_cidades');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;
      if (cidade.id != null) {
        this.cidadeService.delete(cidade).subscribe({
          next: () => {
            this.router.navigateByUrl('/cidades');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
