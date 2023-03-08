import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  listaUsuarios!: Usuario[];
  nuevaContrasenaForm!: FormGroup;

  constructor(private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {

    this.nuevaContrasenaForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    // Cargo los posibles usuarios
    this._loginService.getUsuarios().subscribe(
      (usuariosMockApi: Usuario[]) => {
        this.listaUsuarios = usuariosMockApi;
      })
  }

  actualizarContrasena() {

    let usuarioIngresado: Usuario = {
      id: "",
      usuario: this.nuevaContrasenaForm.value.email,
      contrasena: this.nuevaContrasenaForm.value.password,
    }

    // Busco el usuario
    const usuario = this.listaUsuarios.find(a => a.usuario === usuarioIngresado.usuario);

    // Si existe
    if (usuario) {

      usuarioIngresado.id = usuario.id;
      this._loginService.actualizarContrasena(usuarioIngresado).subscribe(
        () => {
          this._snackBar.open('Contraseña restablecida correctamente.', 'Cerrar', {
            duration: 2000
          });

          this.router.navigate(['auth/login']);
        });
    }
    else
      this._snackBar.open('El usuario ingresado no existe.', 'Cerrar', {
        duration: 2000
      });
  }
}