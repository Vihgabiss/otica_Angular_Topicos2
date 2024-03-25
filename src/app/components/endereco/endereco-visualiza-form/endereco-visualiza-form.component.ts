import { Component, OnInit } from '@angular/core';
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
import {MatSelectModule} from '@angular/material/select';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';

@Component({
  selector: 'app-endereco-visualiza-form',
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
  templateUrl: './endereco-visualiza-form.component.html',
  styleUrl: './endereco-visualiza-form.component.css',
})
export class EnderecoVisualizaFormComponent implements OnInit {

  formGroup: FormGroup;
  cidades: Cidade[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private cidadeService: CidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.formGroup = formBuilder.group({
      id: [null],
      cep: ['', Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      idUsuario: ['', Validators.required],
      cidade: [null],
    });
  }
  ngOnInit(): void {
    this.cidadeService.findAll().subscribe((data) => {
      this.cidades = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    const endereco: Endereco = this.activatedRoute.snapshot.data['endereco'];

    //selecionando a cidade
    const cidade = this.cidades.find(
      (cidade) => cidade.id === (endereco?.cidade?.id || null)
    );

    this.formGroup = this.formBuilder.group({
      id: [(endereco && endereco.id) ? endereco.id : null],
      cep: [(endereco && endereco.cep) ? endereco.cep : '', Validators.required],
      bairro: [(endereco && endereco.bairro) ? endereco.bairro : '', Validators.required],
      rua: [(endereco && endereco.rua) ? endereco.rua : '', Validators.required],
      numero: [(endereco && endereco.numero) ? endereco.numero : '', Validators.required],
      complemento: [(endereco && endereco.complemento) ? endereco.complemento : '', Validators.required],
      idUsuario: [(endereco && endereco.idUsuario) ? endereco.idUsuario : '', Validators.required],
      cidade: [cidade]
    });

    this.formGroup.disable();
  }
}
