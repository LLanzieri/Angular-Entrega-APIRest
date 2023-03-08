import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/sesion';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router: Router,

  ) { }


  redirigirListaAlumnos() {
    this.router.navigateByUrl('alumnos/lista');
  }

  redirigirDatosAlumnos() {
    this.router.navigateByUrl('alumnos/datos');
  }

  redirigirFormularioAgregarAlumno() {
    this.router.navigateByUrl('alumnos/formularioagregar');
  }

}