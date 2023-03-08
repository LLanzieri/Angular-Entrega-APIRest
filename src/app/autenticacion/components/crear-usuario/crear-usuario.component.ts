import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  listaUsuarios!: Usuario[];
  createForm!: FormGroup;

  constructor(private _loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {

    this.createForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    // Cargo los posibles usuarios
    this._loginService.getUsuarios().subscribe(
      (usuariosMockApi: Usuario[]) => {
        this.listaUsuarios = usuariosMockApi;
      })
  }

  crearUsuario() {

    let usuarioIngresado: Usuario = {
      id: "",
      usuario: this.createForm.value.email,
      contrasena: this.createForm.value.password,
    }

    // Busco si existe el usuario ingresado
    const usuario = this.listaUsuarios.find(a => a.usuario === usuarioIngresado.usuario);

    // Si NO existe, creo el usuario
    if (!usuario) {

      this._loginService.crearUsuario(usuarioIngresado).subscribe(
        () => {
          alert("Nuevo usuario creado.")
          this.router.navigate(['auth/login']);
        });
    }
    else
      this._snackBar.open('El usuario ingresado ya existe.', 'Cerrar', {
        duration: 2000
      });
  }

}