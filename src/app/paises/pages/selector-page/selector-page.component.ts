import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators';

import { PaisesService } from '../../services/paises.service';
import { PaisSmall } from '../../interfaces';

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

  constructor(private fb: FormBuilder, private paisesServ: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesServ.regiones;

    this.miFormulario
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => this.miFormulario.get('pais')?.reset('')),
        switchMap((region) => this.paisesServ.getPaisesPorRegion(region))
      )
      .subscribe((paises) => (this.paises = paises));

    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(tap(console.log))
      .subscribe();
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
