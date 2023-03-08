import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { Error404Component } from './components/error404/error404.component';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
    declarations: [
        InicioComponent,
        Error404Component,
        ToolbarComponent,
        NavbarComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AppRoutingModule,
        HttpClientModule
    ],
    exports: [
        InicioComponent,
        Error404Component,
        ToolbarComponent,
        NavbarComponent,
        HttpClientModule
    ],
    providers: []
})
export class CoreModule { }