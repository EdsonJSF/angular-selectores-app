import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pais, PaisSmall } from '../interfaces';
import { Observable, of } from 'rxjs';

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

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    return this.http.get<PaisSmall[]>(
      `${this._baseURL}/region/${region}?fields=cca3,name`
    );
  }

  getPaisesPorCCA3(cca3: string): Observable<Pais[] | null> {
    if (!cca3) return of(null);
    return this.http.get<Pais[]>(`${this._baseURL}/alpha/${cca3}`);
  }
}
