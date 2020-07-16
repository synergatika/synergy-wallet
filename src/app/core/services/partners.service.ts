// Core
import { Injectable } from '@angular/core';

// Common
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Env
import { environment } from '../../../environments/environment';

// Models
import { Partner } from '../models/partner.model'

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(
    private http: HttpClient
  ) { }

  readPartners(offset: string): Observable<Partner[]> {
    return this.http.get<any>(`${environment.apiUrl}/partners/public/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readPartnerInfo(partner_id: string): Observable<Partner> {
    return this.http.get<any>(`${environment.apiUrl}/partners/${partner_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  updatePartnerInfo(partner_id: string, formData: FormData): Observable<Partner> {
    return this.http.put<any>(`${environment.apiUrl}/partners/${partner_id}`, formData)
      .pipe(map(response => {
        return response.data;
      }));
  }
}
