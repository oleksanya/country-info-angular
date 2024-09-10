import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroments';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/Country.interface';
import { CountryInfo } from '../interfaces/Country-info.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCountryInfo(countryCode: string): Observable<CountryInfo> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get<CountryInfo>(
      `${this.apiUrl}/CountryInfo/${countryCode}`,
      {
        headers,
      }
    );
  }

  getAllCountries(): Observable<Country[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get<Country[]>(`${this.apiUrl}/AvailableCountries`, {
      headers,
    });
  }
}
