import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall, PaisSmall2 } from '../../interfaces';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall2[] = [];

  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesServ: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesServ.regiones;

    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap(() => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((region) => this.paisesServ.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
        this.cargando = false;
      });

    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap(() => {
          this.miFormulario.get('frontera')?.reset('');
          this.cargando = true;
        }),
        switchMap((cca3) => this.paisesServ.getPaisesPorCCA3(cca3)),
        switchMap((pais) =>
          this.paisesServ.getPaisesPorBorders(
            pais ? pais[0]?.borders || [] : null
          )
        )
      )
      .subscribe((paises) => {
        this.fronteras = paises;
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
