import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { PaisesComponent } from './services/paises/paises.component';

@NgModule({
  declarations: [SelectorPageComponent, PaisesComponent],
  imports: [CommonModule, ReactiveFormsModule, PaisesRoutingModule],
})
export class PaisesModule {}
