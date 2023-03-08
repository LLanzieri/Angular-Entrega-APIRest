import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, map, of } from 'rxjs';

import { AgregarAlumnoDialogComponent } from '../agregar-alumno-dialog/agregar-alumno-dialog.component';
import { Alumno } from '../../../interfaces/alumno';
import { AlumnosService } from 'src/app/alumnos/servicio/alumnos.service';
import { EditarAlumnoDialogComponent } from '../editar-alumno-dialog/editar-alumno-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})

export class ListaAlumnosComponent implements OnInit, OnDestroy {

  listaAlumnos!: Alumno[];

  suscripcion!: Subscription;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource<Alumno>();

  columnas: string[] = ['DNI', 'Alumno', 'Edad', 'Estado', 'Acciones'];

  constructor(
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _alumnosService: AlumnosService
  ) { }


  ngOnInit(): void {

    // Al cargar el componente linkeo el Observable -
    this.suscripcion = this._alumnosService.getAlumnos().subscribe(
      (listaAlumnoServicio: Alumno[]) => {

        // Asigno lo que me envian a la propiedad
        this.listaAlumnos = listaAlumnoServicio;

        // Refresco la tabla con la lista obtenida
        this.dataSource = new MatTableDataSource<Alumno>(this.listaAlumnos);
      }
    )

  }

  ngOnDestroy(): void {

    // Saco la suscripción al observable
    this.suscripcion.unsubscribe();
  }

  editarAlumno(item: Alumno) {
    const dialogRef = this.dialog.open(EditarAlumnoDialogComponent, {
      data: item
    });

    // Agarro el objeto modificado
    dialogRef.afterClosed().subscribe(result => {

      this._alumnosService.actualizarListaAlumnos(result).subscribe(
        () => {

          this.refrescarTabla();

          this._snackBar.open('Información actualizada', 'Cerrar', {
            duration: 2000
          });
        });
    });

  }

  eliminarAlumno(item: Alumno) {

    this._alumnosService.eliminarAlumno(item).subscribe(
      () => {

        this.refrescarTabla();

        this._snackBar.open('Alumno eliminado', 'Cerrar', {
          duration: 2000
        });

      });
  }

  agregarAlumno() {
    const dialogRef = this.dialog.open(AgregarAlumnoDialogComponent, {

    });

    // Agarro el objeto modificado
    dialogRef.afterClosed().subscribe(result => {

      let existeDNI: boolean = false;

      // Si el modal mando algo, me fijo si no existe ya el DNI que quiero agregar
      if (result) {

        existeDNI = this.listaAlumnos.some(element => {
          if (element.dni == result.dni) {
            return true;
          }

          return false;
        });
      }

      // Si el dialog mando algo y EXISTE EL DNI - DNI DUPLICADO
      if (result && existeDNI) {
        this._snackBar.open('DNI duplicado', 'Cerrar', {
          duration: 2000
        });
      }

      // Si el dialog mando algo y NO EXISTE EL DNI - AGREGO
      if (result && !existeDNI) {

        this._alumnosService.agregarAlumno(result).subscribe(
          () => {

            this.refrescarTabla();

            this._snackBar.open('Alumno agregado', 'Cerrar', {
              duration: 2000
            });
          });
      }

    });
  }

  mostrarAprobados(valor: boolean) {

    if (valor) {
      of(this.listaAlumnos).pipe(
        map((alumnos: Alumno[]) => {
          return alumnos.filter((item: Alumno) => item.cursoAprobado == true)
        })
      ).subscribe(
        (resultado) => {

          // Refresco la tabla con la lista obtenida
          this.dataSource = new MatTableDataSource<Alumno>(resultado);
        });
    }
    else
      // Refresco la tabla con la lista existente
      this.dataSource = new MatTableDataSource<Alumno>(this.listaAlumnos);
  }

  mostrarDesaprobados(valor: boolean) {

    if (valor) {
      of(this.listaAlumnos).pipe(
        map((alumnos: Alumno[]) => {
          return alumnos.filter((item: Alumno) => item.cursoAprobado == false)
        })
      ).subscribe(
        (resultado) => {

          // Refresco la tabla con la lista obtenida
          this.dataSource = new MatTableDataSource<Alumno>(resultado);
        });
    }
    else
      // Refresco la tabla con la lista existente
      this.dataSource = new MatTableDataSource<Alumno>(this.listaAlumnos);
  }

  refrescarTabla(): void {
    this._alumnosService.getAlumnos().subscribe(
      (listaAlumnoServicio: Alumno[]) => {

        // Asigno lo que me envian a la propiedad
        this.listaAlumnos = listaAlumnoServicio;

        // Refresco la tabla con la lista obtenida
        this.dataSource = new MatTableDataSource<Alumno>(this.listaAlumnos);
      }
    )
  }

}