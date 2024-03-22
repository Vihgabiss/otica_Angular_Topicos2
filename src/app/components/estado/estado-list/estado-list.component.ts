import { Component, Inject, OnInit } from '@angular/core';
import { Estado } from '../../../models/estado.model';
import { EstadoService } from '../../../services/estado.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-estado-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
    , MatButtonModule, RouterModule],
  templateUrl: './estado-list.component.html',
  styleUrl: './estado-list.component.css'
})
export class EstadoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'sigla', 'acao'];
  estados: Estado[] = [];
  estadoToDelete: Estado | null = null;
  estadoToDeleteName: string = '';
  showConfirmationModal = false;

  constructor(private estadoService: EstadoService, public dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, estado: Estado): void {
    this.openConfirmationModal(estado);
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { component: this }
    });
  }

  ngOnInit(): void {
    this.fetchEstados();
  }

  //chama a lista de estados
  fetchEstados() {
    this.estadoService.findAll().subscribe(data => {
      this.estados = data;
    })
  }

  openConfirmationModal(estado: Estado): void {
    this.estadoToDelete = estado;
    this.estadoToDeleteName = estado.nome;
    this.showConfirmationModal = true;
  }

  closeConfirmationModal(): void {
    this.estadoToDelete = null;
    this.showConfirmationModal = false;
  }

  confirmDeleteEstado(): void {
    if (this.estadoToDelete) {
      this.estadoService.delete(this.estadoToDelete).subscribe({
        next: () => {
          this.fetchEstados();
          this.closeConfirmationModal();
        },
        error: (error) => {
          console.log('Erro:', error);
          alert('Esse estado está sendo utilizado no cadastro de uma cidade, portanto não é possível excluir.');
        },
      });
    }
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, EstadoListComponent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { component: EstadoListComponent }) { }

  confirmDeleteEstado(): void {
    this.data.component.confirmDeleteEstado();
  }

  closeConfirmationModal(): void {
    this.data.component.closeConfirmationModal();
  }

  estadoToDeleteName = this.data.component.estadoToDeleteName;
}