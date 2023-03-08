import { Alumno } from 'src/app/interfaces/alumno';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { env } from 'src/environment/environment';

@Injectable()

export class AlumnosService {

  constructor(private http: HttpClient) {

  }

  getAlumnos(): Observable<Alumno[]> {

    return this.http.get<Alumno[]>(`${env.apiURL}/alumnos`);

  }

  agregarAlumno(objAlumno: Alumno): Observable<Alumno> {

    return this.http.post<Alumno>(`${env.apiURL}/alumnos`, objAlumno);

  }

  eliminarAlumno(alumnoElegido: Alumno): Observable<Alumno> {

    return this.http.delete<Alumno>(`${env.apiURL}/alumnos/${alumnoElegido.id}`);

  }

  actualizarListaAlumnos(objAlumno: Alumno) {

    return this.http.put<Alumno>(`${env.apiURL}/alumnos/${objAlumno.id}`, objAlumno);

  }

  actualizarNotas(alumnoNotasEditadas: Alumno) {

    return this.http.put<Alumno>(`${env.apiURL}/alumnos/${alumnoNotasEditadas.id}`, alumnoNotasEditadas);

  }

}