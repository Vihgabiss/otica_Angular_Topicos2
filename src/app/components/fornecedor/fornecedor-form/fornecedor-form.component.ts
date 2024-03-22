import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedor.service';


@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, ReactiveFormsModule, NgIf,
  ],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.css'
})
export class FornecedorFormComponent {
  formGroup: FormGroup;
  imageUrl: SafeUrl;

  constructor(private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitazer: DomSanitizer) {

    const imagePath = 'assets/images/image_logo.png';
    this.imageUrl = this.sanitazer.bypassSecurityTrustUrl(imagePath);

    const fornecedor: Fornecedor = activatedRoute.snapshot.data['fornecedor'];

    this.formGroup = formBuilder.group({
      id: [(fornecedor && fornecedor.id) ? fornecedor.id : null],
      nome: [(fornecedor && fornecedor.nome) ? fornecedor.nome : '',
      Validators.required],
      telefone: [(fornecedor && fornecedor.telefone) ? fornecedor.telefone : '',
      Validators.required],
      email: [(fornecedor && fornecedor.email) ? fornecedor.email : '',
      Validators.compose([
        Validators.required,
        Validators.email
      ])],
      endereco: [(fornecedor && fornecedor.endereco) ? fornecedor.endereco : '',
      Validators.required],
      cnpj: [(fornecedor && fornecedor.cnpj) ? fornecedor.cnpj : '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}\\-\\d{2}$')
      ])]

    });

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const fornecedor = this.formGroup.value;
      if (fornecedor.id == null) {
        this.fornecedorService.insert(fornecedor).subscribe({
          next: (fornecedorCadastrado) => {
            this.router.navigateByUrl('/fornecedores');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.fornecedorService.update(fornecedor).subscribe({
          next: (fornecedorAlterado) => {
            this.router.navigateByUrl('/fornecedores');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    nome: {
      required: 'O nome não pode ser nulo.'
    },
    telefone: {
      required: 'O telefone não pode ser nulo.'
    },
    email: {
      required: 'O email não pode ser nulo.',
      email: 'Email inválido'
    },
    endereco: {
      required: 'O endereço não pode ser nulo.'
    },
    cnpj: {
      required: 'O cnpj não pode ser nulo.',
      pattern: 'Formato de cnpj não aceito'
    }

  }

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }

    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) && this.errorMessages[controlName][errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }
    return 'Invalid field';
  }
}
