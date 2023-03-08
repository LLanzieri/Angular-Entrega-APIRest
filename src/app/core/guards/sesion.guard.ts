import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { Sesion } from 'src/app/interfaces/sesion';
import { SesionService } from '../services/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private _sesionService: SesionService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._sesionService.obtenerSesion().pipe(
      map((sesion: Sesion) => {

        if (sesion.sesionActiva)
          return true;
        else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._sesionService.obtenerSesion().pipe(
      map((sesion: Sesion) => {

        if (sesion.sesionActiva)
          return true;
        else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this._sesionService.obtenerSesion().pipe(
      map((sesion: Sesion) => {

        if (sesion.sesionActiva)
          return true;
        else {
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    );

  }
}
