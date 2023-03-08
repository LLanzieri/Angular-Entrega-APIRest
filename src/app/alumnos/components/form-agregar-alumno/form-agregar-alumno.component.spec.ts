import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAgregarAlumnoComponent } from './form-agregar-alumno.component';

describe('FormAgregarAlumnoComponent', () => {
  let component: FormAgregarAlumnoComponent;
  let fixture: ComponentFixture<FormAgregarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAgregarAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAgregarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
