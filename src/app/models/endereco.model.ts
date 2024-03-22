import { Cidade } from "./cidade.model";

export class Endereco{
    id!: number;
    cep!: string;
    bairro!: string;
    rua!: string;
    numero!: number;
    complemento!: string;
    cidade!: Cidade;
    
}