import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Endereco } from "../../../models/endereco.model";
import { EnderecoService } from "../../../services/endereco.service";

export const enderecoResolver: ResolveFn<Endereco> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(EnderecoService).findById(route.paramMap.get('id')!);
    }