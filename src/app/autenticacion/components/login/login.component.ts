import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/sesion';
import { SesionService } from '../../../core/services/sesion.service';
import { Usuario } from '../../../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  listaUsuarios!: Usuario[];
  loginForm!: FormGroup;

  constructor(private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private _sesionService: SesionService,
    private router: Router) {

  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    // Cargo los posibles usuarios
    this._loginService.getUsuarios().subscribe(
      (usuariosMockApi: Usuario[]) => {
        this.listaUsuarios = usuariosMockApi
      });
  }

  login() {

    // Cargo el objeto con los valores ingresados
    let usuarioIngresado: Usuario = {
      id: "",
      usuario: this.loginForm.value.email,
      contrasena: this.loginForm.value.password,
    }

    // Busco el usuario
    const usuario = this.listaUsuarios.find(a => a.usuario === usuarioIngresado.usuario && a.contrasena === usuarioIngresado.contrasena);

    // Si devolvió algo, existe el usuario
    if (usuario) {

      let sesion: Sesion = {
        sesionActiva: true,
        usuarioLogueado: usuario
      }

      this._sesionService.crearSesion(sesion);
      this._snackBar.open('¡Bienvenid@!', 'Cerrar', {
        duration: 2000
      });
      this.router.navigate(['home']);
    }
    else
      this._snackBar.open('Usuario o contraseña incorrectos.', 'Cerrar', {
        duration: 2000
      });

  }

}