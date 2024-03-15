import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';

@Injectable({
    providedIn: 'root'
})
export class MarcaService {
    private baseUrl = 'http://localhost:8080/marca';

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Marca[]> {
        return this.httpClient.get<Marca[]>(this.baseUrl);
    }

    findById(id: string): Observable<Marca> {
        return this.httpClient.get<Marca>(`${this.baseUrl}/${id}`);
    }

    findByNome(nome: string): Observable<Marca> {
        return this.httpClient.get<Marca>(`${this.baseUrl}/${nome}`);
    }

    insert(marca: Marca): Observable<Marca> {
        const object = {
            nome: marca.nome,
            idFornecedor: marca.fornecedor.id
        }
        return this.httpClient.post<Marca>(this.baseUrl, object);
    }

    update(marca: Marca): Observable<Marca> {
        const object = {
            nome: marca.nome,
            idFornecedor: marca.fornecedor.id
        }
        return this.httpClient.put<Marca>(`${this.baseUrl}/${marca.id}`, object);
    }

    delete(marca: Marca): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/${marca.id}`);
    }

}
