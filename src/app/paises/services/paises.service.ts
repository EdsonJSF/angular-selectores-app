import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pais, PaisSmall, PaisSmall2 } from '../interfaces';
import { Observable, combineLatest, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private _baseURL: string = 'https://restcountries.com/v3.1';
  private _baseURL2: string = 'https://restcountries.com/v2';
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

  getPaisesSmallPorCCA3(cca3: string): Observable<PaisSmall2> {
    return this.http.get<PaisSmall2>(
      `${this._baseURL2}/alpha/${cca3}?fields=alpha3Code,name`
    );
  }

  getPaisesPorBorders(borders: string[] | null): Observable<PaisSmall2[]> {
    if (!borders) return of([]);

    let peticiones: Observable<PaisSmall2>[] = [];

    borders.forEach((cca3) => {
      const peticion = this.getPaisesSmallPorCCA3(cca3);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
