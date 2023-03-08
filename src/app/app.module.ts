import { AgregarAlumnoDialogComponent } from './alumnos/components/agregar-alumno-dialog/agregar-alumno-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { EditarAlumnoDialogComponent } from './alumnos/components/editar-alumno-dialog/editar-alumno-dialog.component';
import { FormatoTituloDirective } from './directives/formato-titulo.directive';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FormatoTituloDirective,
    EditarAlumnoDialogComponent,
    AgregarAlumnoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
