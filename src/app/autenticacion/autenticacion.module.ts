import { AutenticacionInicioComponent } from './components/autenticacion-inicio/autenticacion-inicio.component';
import { AutenticacionRoutingModule } from './autenticacion-routing.module';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { CommonModule } from '@angular/common';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AutenticacionInicioComponent,
    LoginComponent,
    CrearUsuarioComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    SharedModule
  ]
})
export class AutenticacionModule { }
