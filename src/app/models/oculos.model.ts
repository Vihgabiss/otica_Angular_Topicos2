import { Marca } from "./marca.model";
import { TipoOculos } from "./tipoOculos.model";


export class Oculos{
    id!: number;
    referencia!: string;
    cor!: string;
    tamanho!: string;
    precoCusto!: number;
    precoVenda!: number;
    quantidade!: number;
    tipoOculos!: TipoOculos;//perguntar para o professor
    marca!: Marca;
    nomeImagem!: string; //perguntar para o professor
}