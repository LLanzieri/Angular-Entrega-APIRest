import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Alumno } from 'src/app/interfaces/alumno';
import { AlumnosService } from '../../servicio/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notas } from 'src/app/interfaces/opcionesNotas';
import { OpcionesDesplegable } from 'src/app/interfaces/opcionesDesplegable';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-agregar-alumno',
  templateUrl: './form-agregar-alumno.component.html',
  styleUrls: ['./form-agregar-alumno.component.css']
})
export class FormAgregarAlumnoComponent implements OnInit, OnDestroy {

  listaAlumnos!: Alumno[];
  suscripcion!: Subscription;

  formularioAgregarAlumno!: FormGroup;

  opciones: OpcionesDesplegable[] = [

    { valor: true, textoDesplegado: 'Aprobado' },
    { valor: false, textoDesplegado: 'Desaprobado' }

  ];

  notas: Notas[] = [

    { valor: 1, textoDesplegado: '1' },
    { valor: 2, textoDesplegado: '2' },
    { valor: 3, textoDesplegado: '3' },
    { valor: 4, textoDesplegado: '4' },
    { valor: 5, textoDesplegado: '5' },
    { valor: 6, textoDesplegado: '6' },
    { valor: 7, textoDesplegado: '7' },
    { valor: 8, textoDesplegado: '8' },
    { valor: 9, textoDesplegado: '9' },
    { valor: 10, textoDesplegado: '10' }

  ];

  constructor(private _alumnoService: AlumnosService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

    this.formularioAgregarAlumno = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      edad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}$')]),
      nota1: new FormControl(1, [Validators.required]),
      nota2: new FormControl(1, [Validators.required]),
      cursoAprobado: new FormControl(false, [Validators.required])
    })

    // Al cargar el componente linkeo el Observable - Cada vez que mande next se ejecuta esto
    this.suscripcion = this._alumnoService.getAlumnos().subscribe(
      (listaAlumnoServicio: Alumno[]) => {

        if (listaAlumnoServicio)
          this.listaAlumnos = listaAlumnoServicio;  // Asigno lo que me envian a la propiedad

      }
    )
  }

  agregarAlumno() {

    let existeDNI: boolean = false;

    if (this.formularioAgregarAlumno.controls['dni'].valid && this.formularioAgregarAlumno.controls['nombre'].valid && this.formularioAgregarAlumno.controls['apellido'].valid && this.formularioAgregarAlumno.controls['edad'].valid && this.formularioAgregarAlumno.controls['nota1'].valid && this.formularioAgregarAlumno.controls['nota2'].valid && this.formularioAgregarAlumno.controls['cursoAprobado'].valid) {

      let alumno: Alumno = {
        id: "",
        dni: Number(this.formularioAgregarAlumno.controls['dni'].value),
        nombre: this.formularioAgregarAlumno.controls['nombre'].value,
        apellido: this.formularioAgregarAlumno.controls['apellido'].value,
        edad: this.formularioAgregarAlumno.controls['edad'].value,
        nota1: this.formularioAgregarAlumno.controls['nota1'].value,
        nota2: this.formularioAgregarAlumno.controls['nota2'].value,
        cursoAprobado: this.formularioAgregarAlumno.controls['cursoAprobado'].value,
        urlFoto: "../../../assets/incognito.png",

      }

      existeDNI = this.listaAlumnos.some(element => {
        if (element.dni == alumno.dni) {
          return true;
        }

        return false;
      });

      // Si EXISTE EL DNI - DNI DUPLICADO
      if (existeDNI) {
        this._snackBar.open('DNI duplicado', 'Cerrar', {
          duration: 2000
        });
      }
      else {

        // Mando al servicio para agregar
        this._alumnoService.agregarAlumno(alumno).subscribe(() => {

          this._snackBar.open('Alumno agregado', 'Cerrar', {
            duration: 2000
          });

          this.router.navigateByUrl('alumnos/lista');

        });

      }

    }
  }

  ngOnDestroy(): void {

    // Saco la suscripción al observable
    this.suscripcion.unsubscribe();
  }

}