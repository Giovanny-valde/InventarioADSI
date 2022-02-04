import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioLoginService } from '../servicios/usuario-login.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService:UsuarioLoginService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.usuarioLogueado();
  }
  private usuarioLogueado():boolean{
    if(this.loginService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/']);
      return false;
    }
  }
}
