import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { Estado } from "../models/estado.model";

@Injectable({
    providedIn: 'root'
})
export class EstadoService{
    private baseUrl = 'http://localhost:8080/estado';

    constructor(private httpClient: HttpClient){}

    findAll(): Observable<Estado[]>{
        return this.httpClient.get<Estado[]>(this.baseUrl);
    }

    findById(id: string): Observable<Estado>{
        return this.httpClient.get<Estado>(`${this.baseUrl}/${id}`);
    }

    findBySigla(sigla: string): Observable<Estado>{
        return this.httpClient.get<Estado>(`${this.baseUrl}/${sigla}`);
    } 

    insert(estado: Estado): Observable<Estado>{
        return this.httpClient.post<Estado>(this.baseUrl, estado);
    } 

    update(estado: Estado): Observable<Estado>{
        return this.httpClient.put<Estado>(`${this.baseUrl}/${estado.id}`, estado);
    }

    delete(estado: Estado): Observable<any>{
        return this.httpClient.delete<any>(`${this.baseUrl}/${estado.id}`);
    }
}