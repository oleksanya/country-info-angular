import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroments';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PublicHoliday } from '../interfaces/PublicHoliday.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicHolidayService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublicHolidays(
    year: number,
    countryCode: string
  ): Observable<PublicHoliday[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get<PublicHoliday[]>(
      `${this.apiUrl}/PublicHolidays/${year}/${countryCode}`,
      {
        headers,
      }
    );
  }

  isTodayPublicHoliday(countryCode: string): Observable<PublicHoliday> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get<PublicHoliday>(
      `${this.apiUrl}/IsTodayPublicHoliday/${countryCode}`,
      {
        headers,
      }
    );
  }

  nextPublicHolidays(countryCode: string): Observable<PublicHoliday[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get<PublicHoliday[]>(
      `${this.apiUrl}/NextPublicHolidays/${countryCode}`,
      {
        headers,
      }
    );
  }

  nextPublicHolidaysWorldwide(): Observable<PublicHoliday> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get<PublicHoliday>(
      `${this.apiUrl}/NextPublicHolidaysWorldwide`,
      {
        headers,
      }
    );
  }
}
