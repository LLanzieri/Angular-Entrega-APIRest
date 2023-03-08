import { ModuloPersonalizadoModule } from '../modulo-personalizado.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        ModuloPersonalizadoModule
    ],
    exports: [
        ModuloPersonalizadoModule
    ]
})
export class SharedModule { }