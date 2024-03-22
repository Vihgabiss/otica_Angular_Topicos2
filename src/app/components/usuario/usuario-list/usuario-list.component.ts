import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email','acao'];
  usuarios: Usuario[] = [];

  constructor(private usuarioSevice: UsuarioService) { }

  ngOnInit(): void {
    this.fetchUsuarios();
  }

  fetchUsuarios() {
    this.usuarioSevice.findAll().subscribe(data => {
      this.usuarios = data;
    })
  }

}
