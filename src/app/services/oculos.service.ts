import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Oculos } from '../models/oculos.model';

@Injectable({
    providedIn: 'root'
})
export class OculosService {
    private baseUrl = 'http://localhost:8080/oculos';

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Oculos[]> {
        return this.httpClient.get<Oculos[]>(this.baseUrl);
    }

    findById(id: string): Observable<Oculos> {
        return this.httpClient.get<Oculos>(`${this.baseUrl}/${id}`);
    }

    findByReferencia(referencia: string): Observable<Oculos> {
        return this.httpClient.get<Oculos>(`${this.baseUrl}/${referencia}`);
    }

    insert(oculos: Oculos): Observable<Oculos> {
        const object = {
            referencia: oculos.referencia,
            cor: oculos.cor,
            tamanho: oculos.tamanho,
            precoCusto: oculos.precoCusto,
            precoVenda: oculos.precoVenda,
            quantidade: oculos.quantidade,
            idtipoOculos: oculos.tipoOculos,
            novaImagem: oculos.nomeImagem,
            idMarca: oculos.marca.id
        }
        return this.httpClient.post<Oculos>(this.baseUrl, object);
    }

    update(oculos: Oculos): Observable<Oculos> {
        const object = {
            referencia: oculos.referencia,
            cor: oculos.cor,
            tamanho: oculos.tamanho,
            precoCusto: oculos.precoCusto,
            precoVenda: oculos.precoVenda,
            quantidade: oculos.quantidade,
            idtipoOculos: oculos.tipoOculos,
            novaImagem: oculos.nomeImagem,
            idMarca: oculos.marca.id
        }
        return this.httpClient.put<Oculos>(`${this.baseUrl}/${oculos.id}`, object);
    }

    delete(oculos: Oculos): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/${oculos.id}`);
    }

}
