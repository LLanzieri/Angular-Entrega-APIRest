import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from './core/components/error404/error404.component';
import { InicioComponent } from './core/components/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { SesionGuard } from './core/guards/sesion.guard';

const routes: Routes = [
  { path: 'home', component: InicioComponent, canActivate: [SesionGuard] },
  { path: 'alumnos', loadChildren: () => import('./alumnos/alumnos.module').then((modulo) => modulo.AlumnosModule), canLoad: [SesionGuard] },
  { path: 'auth', loadChildren: () => import('./autenticacion/autenticacion.module').then((modulo) => modulo.AutenticacionModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: Error404Component }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }