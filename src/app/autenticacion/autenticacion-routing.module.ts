import { RouterModule, Routes } from '@angular/router';

import { AutenticacionInicioComponent } from './components/autenticacion-inicio/autenticacion-inicio.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: AutenticacionInicioComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'crearusuario', component: CrearUsuarioComponent },
      { path: 'cambiarcontrasena', component: CambiarContrasenaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacionRoutingModule { }
