import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Alumno } from '../../../interfaces/alumno';
import { AlumnosService } from '../../servicio/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notas } from 'src/app/interfaces/opcionesNotas';

@Component({
  selector: 'app-editar-notas',
  templateUrl: './editar-notas.component.html',
  styleUrls: ['./editar-notas.component.css']
})

export class EditarNotasComponent implements OnInit {

  id!: string;
  dniAlumno!: number;
  nombreAlumno?: string;
  apellidoAlumno?: string;
  edad!: number;
  cursoAprobado!: boolean;
  urlFoto?: string;
  nota1!: number;
  nota2!: number;

  formularioAgregarAlumno!: FormGroup;

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

  constructor(private _activatedRoute: ActivatedRoute,
    private _alumnoServicio: AlumnosService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this._activatedRoute.paramMap.subscribe((parametros) => {

      this.id = parametros.get('id')!.toString();
      this.dniAlumno = Number(parametros.get('dni')?.toString());
      this.nombreAlumno = parametros.get('nombre')?.toString();
      this.apellidoAlumno = parametros.get('apellido')?.toString();
      this.urlFoto = parametros.get('urlFoto')?.toString();
      this.edad = Number(parametros.get('edad')?.toString());
      this.cursoAprobado = Boolean(parametros.get('cursoAprobado')?.toString())

      this.formularioAgregarAlumno = new FormGroup({

        nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
        apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
        nota1: new FormControl(Number(parametros.get('nota1')) || '', [Validators.required]),
        nota2: new FormControl(Number(parametros.get('nota2')) || '', [Validators.required])

      })
    })

  }

  editarNotas() {

    if (this.formularioAgregarAlumno.controls['nota1'].valid && this.formularioAgregarAlumno.controls['nota2'].valid) {

      let alumnoNotasEditadas: Alumno = {
        id: this.id,
        dni: this.dniAlumno,
        nombre: '',
        apellido: '',
        edad: this.edad,
        cursoAprobado: this.cursoAprobado,
        urlFoto: '',
        nota1: this.formularioAgregarAlumno.controls['nota1'].value,
        nota2: this.formularioAgregarAlumno.controls['nota2'].value
      }

      if (this.nombreAlumno)
        alumnoNotasEditadas.nombre = this.nombreAlumno;
      if (this.apellidoAlumno)
        alumnoNotasEditadas.apellido = this.apellidoAlumno;
      if (this.urlFoto)
        alumnoNotasEditadas.urlFoto = this.urlFoto;

      this._alumnoServicio.actualizarNotas(alumnoNotasEditadas).subscribe(
        () => {

          this._snackBar.open('Información actualizada', 'Cerrar', {
            duration: 2000
          });

          this.router.navigate(['alumnos/calificaciones']);
        });

    }
  }

  volverAtras() {
    this.router.navigate(['alumnos/calificaciones']);
  }

}