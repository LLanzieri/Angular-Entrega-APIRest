import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Alumno } from 'src/app/interfaces/alumno';
import { Notas } from 'src/app/interfaces/opcionesNotas';
import { OpcionesDesplegable } from 'src/app/interfaces/opcionesDesplegable';

@Component({
  selector: 'app-agregar-alumno-dialog',
  templateUrl: './agregar-alumno-dialog.component.html',
  styleUrls: ['./agregar-alumno-dialog.component.css']
})
export class AgregarAlumnoDialogComponent {

  formularioAgregarAlumno!: FormGroup;

  nuevoAlumno!: Alumno;

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

  constructor(
    private dialogRef: MatDialogRef<AgregarAlumnoDialogComponent>

  ) {

    this.formularioAgregarAlumno = new FormGroup({
      dni: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      nombre: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      edad: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{2}$')]),
      nota1: new FormControl(1, [Validators.required]),
      nota2: new FormControl(1, [Validators.required]),
      cursoAprobado: new FormControl(false, [Validators.required])

    })

  }

  agregarAlumno() {

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
        urlFoto: "../../../assets/incognito.png"
      }

      this.dialogRef.close(alumno);
    }
  }

  cerrarDialog() {
    this.dialogRef.close();
  }

}
