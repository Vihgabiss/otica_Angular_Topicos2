import { Component, Inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CidadeService } from '../../../services/cidade.service';
import { Cidade } from '../../../models/cidade.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';



@Component({
  selector: 'app-cidade-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule
  , MatButtonModule, RouterModule],
  templateUrl: './cidade-list.component.html',
  styleUrl: './cidade-list.component.css'
})
export class CidadeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'estado', 'acao'];
  cidades: Cidade[] = [];
  cidadeToDelete: Cidade | null = null;
  cidadeToDeleteName: string ='';
  showConfirmationModal = false;

  constructor(private cidadeService: CidadeService, public dialog: MatDialog) {

  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, cidade: Cidade): void {
    this.openConfirmationModal(cidade);
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {component : this}
    });
  }

  ngOnInit(): void {
    this.fetchCidades();
  }

  fetchCidades(){
    this.cidadeService.findAll().subscribe(data => {
      this.cidades = data;
    })
  }

  openConfirmationModal(cidade: Cidade): void {
    this.cidadeToDelete = cidade;
    this.cidadeToDeleteName = cidade.nome;
    this.showConfirmationModal = true;
  }

  closeConfirmationModal(): void {
    this.cidadeToDelete = null;
    this.showConfirmationModal = false;
  }

  confirmDeleteCidade(): void {
    if (this.cidadeToDelete) {
      this.cidadeService.delete(this.cidadeToDelete).subscribe(() => {
        this.fetchCidades();
      });
    }
    this.closeConfirmationModal();
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, CidadeListComponent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { component: CidadeListComponent }) {}

    confirmDeleteCidade(): void {
      this.data.component.confirmDeleteCidade();
    }
  
    closeConfirmationModal(): void {
      this.data.component.closeConfirmationModal();
    }

    cidadeToDeleteName = this.data.component.cidadeToDeleteName;
}