import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CidadeService } from '../../../services/cidade.service';
import { Cidade } from '../../../models/cidade.model';



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

  constructor(private cidadeService: CidadeService) {

  }

  ngOnInit(): void {
    this.cidadeService.findAll().subscribe(data => {
      this.cidades = data;
    })
  }

}