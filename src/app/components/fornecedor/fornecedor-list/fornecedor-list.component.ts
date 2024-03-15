import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Fornecedor } from '../../../models/fornecedor.model';
import { FornecedorService } from '../../../services/fornecedor.service';
@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatTableModule, RouterModule],
  templateUrl: './fornecedor-list.component.html',
  styleUrl: './fornecedor-list.component.css'
})
export class FornecedorListComponent implements OnInit {

  displayedColumns: string[] = ['empresa', 'marca', 'cnpj'];
  fornecedores: Fornecedor[] = [];

  constructor(private fornecedorService: FornecedorService) {

  }

  ngOnInit(): void {
    this.fornecedorService.findAll().subscribe(data => {
      this.fornecedores = data;
    })
  }

}
