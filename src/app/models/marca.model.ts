import { Fornecedor } from "./fornecedor.model";

export class Marca {
    id!: number;
    nome!: string;
    fornecedor!: Fornecedor;
}