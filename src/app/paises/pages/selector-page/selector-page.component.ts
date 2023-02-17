import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PaisesService } from '../../services/paises.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];
  paises: Pais[] = [];

  constructor(private fb: FormBuilder, private paisesServ: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesServ.regiones;

    this.miFormulario.get('region')?.valueChanges.subscribe((region) => {
      this.paisesServ.getPaisesPorRegion(region).subscribe((paises) => {
        this.paises = paises;
      });
    });
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
