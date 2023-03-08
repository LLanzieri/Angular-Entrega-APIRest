import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Sesion } from 'src/app/interfaces/sesion';

@Injectable({
  providedIn: 'root'
})

export class SesionService {

  sesion$!: BehaviorSubject<Sesion>;

  sesion: Sesion = { sesionActiva: false };

  constructor() {

    this.sesion$ = new BehaviorSubject<Sesion>(this.sesion);

  }

  crearSesion(sesionRecibida: Sesion) {

    this.sesion = sesionRecibida;
    this.retornarSesion();

  }

  obtenerSesion(): Observable<Sesion> {
    return this.sesion$.asObservable();
  }

  logout() {

    this.sesion = { sesionActiva: false };
    this.retornarSesion();

  }

  private retornarSesion() {
    this.sesion$.next(this.sesion);
  }

}
