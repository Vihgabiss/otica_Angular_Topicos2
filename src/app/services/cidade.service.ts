import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cidade } from "../models/cidade.model";

@Injectable({
    providedIn: 'root'
})
export class CidadeService{
    private baseUrl = 'http://localhost:8080/estado';

    constructor(private httpClient: HttpClient){}

    findAll(): Observable<Cidade[]>{
        return this.httpClient.get<Cidade[]>('http://localhost:8080/estado/allCities');
    }

    findById(id: string): Observable<Cidade>{
        return this.httpClient.get<Cidade>(`${this.baseUrl}/${id}`);
    }

    insert(cidade: Cidade): Observable<Cidade>{
        const data = {
            nome: cidade.nome,
            idEstado: cidade.estado.id
        }
        return this.httpClient.post<Cidade>('http://localhost:8080/estado/insere-cidade', data);
    }

    update(cidade: Cidade): Observable<Cidade>{
        return this.httpClient.put<Cidade>(`${this.baseUrl}/${cidade.id}`, cidade);
    }

    delete(cidade: Cidade): Observable<any>{
        return this.httpClient.delete<any>(`${this.baseUrl}/${cidade.id}`);
    }
}