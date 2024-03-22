import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Endereco } from "../models/endereco.model";


@Injectable({
    providedIn: 'root'
})
export class EnderecoService{
    private baseUrl = 'http://localhost:8080/endereco';

    constructor(private httpClient: HttpClient){}

    findAll(): Observable<Endereco[]>{
        return this.httpClient.get<Endereco[]>(this.baseUrl);
    }

    findById(id: string): Observable<Endereco>{
        return this.httpClient.get<Endereco>(`${this.baseUrl}/${id}`);
    }

    findBySigla(sigla: string): Observable<Endereco>{
        return this.httpClient.get<Endereco>(`${this.baseUrl}/${sigla}`);
    } 

    insert(endereco: Endereco): Observable<Endereco>{
        return this.httpClient.post<Endereco>(this.baseUrl, endereco);
    } 

    update(endereco: Endereco): Observable<Endereco>{
        return this.httpClient.put<Endereco>(`${this.baseUrl}/${endereco.id}`, endereco);
    }

    delete(endereco: Endereco): Observable<any>{
        return this.httpClient.delete<any>(`${this.baseUrl}/${endereco.id}`);
    }
}