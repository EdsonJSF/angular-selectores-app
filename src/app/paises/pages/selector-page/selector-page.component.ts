import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.scss'],
})
export class SelectorPageComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    region: ['', Validators.required],
  });

  // Llenar selectores
  regiones: string[] = [];

  constructor(private fb: FormBuilder, private paisesServ: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesServ.regiones;
  }

  guardar() {
    console.log(this.miFormulario.value);
  }
}
