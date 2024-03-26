import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

    insert(endereco: Endereco): Observable<Endereco>{
        const data = {
            cep: endereco.cep,
            bairro: endereco.bairro,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            idUsuario: endereco.idUsuario,
            idCidade: endereco.cidade.id  
        }
        return this.httpClient.post<Endereco>('http://localhost:8080/endereco/insere-endereco', data);
    } 

    update(endereco: Endereco): Observable<Endereco>{
        const data = {
            cep: endereco.cep,
            bairro: endereco.bairro,
            rua: endereco.rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            idUsuario: endereco.idUsuario,
            idCidade: endereco.cidade.id  
        }
        return this.httpClient.put<Endereco>(`${'http://localhost:8080/endereco/atualiza-endereco'}/${endereco.id}`, data);
    }

    delete(endereco: Endereco): Observable<any>{
        return this.httpClient.delete<any>(`${this.baseUrl}/${endereco.id}`);
    }
}