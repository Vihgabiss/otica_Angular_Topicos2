import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
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
    MatButtonModule, ReactiveFormsModule, NgIf
  ],
  templateUrl: './fornecedor-form.component.html',
  styleUrl: './fornecedor-form.component.css'
})
export class FornecedorFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private fornecedorService: FornecedorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const fornecedor: Fornecedor = activatedRoute.snapshot.data['fornecedor'];

    this.formGroup = formBuilder.group({
      id: [(fornecedor && fornecedor.id) ? fornecedor.id : null],
      nome: [(fornecedor && fornecedor.nome) ? fornecedor.nome : '',
      Validators.required],
      telefone: [(fornecedor && fornecedor.telefone) ? fornecedor.telefone : '',
      Validators.required],
      email: [(fornecedor && fornecedor.email) ? fornecedor.email : '',
      Validators.required],
      endereco: [(fornecedor && fornecedor.endereco) ? fornecedor.endereco : '',
      Validators.required],
      cnpj: [(fornecedor && fornecedor.cnpj) ? fornecedor.cnpj : '',
      Validators.required],

    });

  }

  salvar() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const fornecedor = this.formGroup.value;
      if (fornecedor.id == null) {
        this.fornecedorService.insert(fornecedor).subscribe({
          next: (estadoCadastrado) => {
            this.router.navigateByUrl('/fornecedor');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.fornecedorService.update(fornecedor).subscribe({
          next: (fornecedorAlterado) => {
            this.router.navigateByUrl('/fornecedor');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const fornecedor = this.formGroup.value;
      if (fornecedor.id != null) {
        this.fornecedorService.delete(fornecedor).subscribe({
          next: () => {
            this.router.navigateByUrl('/fornecedor');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
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
      required: 'O telefone não pode ser nulo.'
    },
    endereco: {
      required: 'O telefone não pode ser nulo.'
    },
    cnpj: {
      required: 'O telefone não pode ser nulo.'
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
