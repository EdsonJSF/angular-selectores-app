import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  public get regiones(): string[] {
    return [...this._regiones];
  }

  constructor() {}
}
