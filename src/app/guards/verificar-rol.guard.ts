import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioLoginService } from '../servicios/usuario-login.service';

@Injectable({
  providedIn: 'root'
})
export class VerificarRolGuard implements CanActivate {
  constructor(
    private usuarioLogin:UsuarioLoginService, private route: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.usuarioLogin.getRol()?.includes(route.data.rol)){
        return true;
      }else{
        this.route.navigate(['/']);
        return false;
      }
  }

}
