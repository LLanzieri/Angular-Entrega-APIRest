import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Sesion } from 'src/app/interfaces/sesion';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() estadoMenuTool!: boolean;
  @Output() eventoCambioEstadoMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  sesion$!: Observable<Sesion>;

  constructor(
    private _sesionService: SesionService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.sesion$ = this._sesionService.obtenerSesion();

  };

  toggleMenu() {
    this.estadoMenuTool = !this.estadoMenuTool;
    this.eventoCambioEstadoMenu.emit(this.estadoMenuTool);
  }

  cerrarSesion() {
    this._sesionService.logout();
    this.router.navigate(['auth/login']);
  }

}