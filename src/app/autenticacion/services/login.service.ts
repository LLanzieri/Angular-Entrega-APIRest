import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${env.apiURL}/usuarios`);
  }

  crearUsuario(usuarioIngresado: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${env.apiURL}/usuarios`, usuarioIngresado);
  }

  actualizarContrasena(usuarioIngresado: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${env.apiURL}/usuarios/${usuarioIngresado.id}`, usuarioIngresado);
  }

}