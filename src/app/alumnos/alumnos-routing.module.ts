import { RouterModule, Routes } from '@angular/router';

import { CalificacionesComponent } from './components/calificaciones/calificaciones.component';
import { EditarNotasComponent } from './components/editar-notas/editar-notas.component';
import { FormAgregarAlumnoComponent } from './components/form-agregar-alumno/form-agregar-alumno.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { ListaCardsComponent } from './components/lista-cards/lista-cards.component';
import { NgModule } from '@angular/core';
import { SesionGuard } from '../core/guards/sesion.guard';

const routes: Routes = [
  { path: 'alumnos', redirectTo: 'alumnos/lista', pathMatch: 'full' },
  {
    path: '', canActivateChild: [SesionGuard], children: [
      { path: 'lista', component: ListaCardsComponent },
      { path: 'datos', component: ListaAlumnosComponent },
      { path: 'formularioagregar', component: FormAgregarAlumnoComponent },
      { path: 'calificaciones', component: CalificacionesComponent },
      { path: 'editarnotas', component: EditarNotasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
