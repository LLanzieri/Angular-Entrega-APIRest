import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from '../../servicio/alumnos.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit, OnDestroy {

  listaAlumnos!: Alumno[];
  suscripcion!: Subscription;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource<Alumno>();

  columnas: string[] = ['Alumno', 'Nota 1', 'Nota 2', 'Modificar notas'];

  constructor(private _alumnosService: AlumnosService,
    private router: Router) { }

  ngOnInit(): void {

    // Al cargar el componente linkeo el Observable - Cada vez que mande next se ejecuta esto
    this.suscripcion = this._alumnosService.getAlumnos().subscribe(
      (listaAlumnoServicio: Alumno[]) => {

        // Asigno lo que me envian a la propiedad
        this.listaAlumnos = listaAlumnoServicio;

        // Refresco la tabla con la lista obtenida
        this.dataSource = new MatTableDataSource<Alumno>(this.listaAlumnos);
      }
    )
  }

  modificarNotas(alumno: Alumno) {

    this.router.navigate(['alumnos/editarnotas', alumno]);
  }

  ngOnDestroy(): void {

    // Saco la suscripción al observable
    this.suscripcion.unsubscribe();
  }

}
