import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Cidade } from "../../../models/cidade.model";
import { CidadeService } from "../../../services/cidade.service";
import { inject } from "@angular/core";

export const cidadeResolver: ResolveFn<Cidade> = 
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CidadeService).findById(route.paramMap.get('id')!);
    }