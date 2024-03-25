import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './endereco-list.component.html',
  styleUrl: './endereco-list.component.css'
})
export class EnderecoListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'cep', 'bairro', 'rua', 'numero', 'acao'];
  enderecos: Endereco [] = [];

  constructor(private enderecoService: EnderecoService) { }

  ngOnInit(): void {
    this.fetchEnderecos();
  }

  fetchEnderecos() {
    this.enderecoService.findAll().subscribe(data => {
      this.enderecos = data;
    })
  }
}
