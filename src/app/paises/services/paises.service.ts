import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pais } from '../interfaces/pais.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _baseURL: string = 'https://restcountries.com/v3.1';
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

  constructor(private http: HttpClient) {}

  getPaisesPorRegion(region: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(
      `${this._baseURL}/region/${region}?fields=cca3,name`
    );
  }
}
