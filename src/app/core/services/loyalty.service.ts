import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Environment
 */
import { environment } from '../../../environments/environment';

/**
 * Models & Interfaces
 */
import {
  Activity,
  Points,
  LoyaltyTransaction,
  Message,
  Statistics,
  Balance
} from 'sng-core';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {

  constructor(
    private http: HttpClient
  ) { }


  readBalance(): Observable<Points> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/balance`)
      .pipe(map(response => {
        console.log(response)
        return response.data;
      }));
  }

  readBadge(): Observable<Activity> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/badge`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readBalanceByPartner(_to: string): Observable<Balance> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/balance/${_to}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readBadgeByPartner(_to: string): Observable<Activity> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/badge/${_to}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readTransactions(offset: string): Observable<LoyaltyTransaction[]> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/transactions/${offset}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  earnPoints(_to: string, password: string, _amount: number): Observable<Balance> {
    return this.http.post<any>(`${environment.apiUrl}/loyalty/earn/${_to}`, { password, _amount })
      .pipe(map(response => {
        return response.data;
      }));
  }

  redeemPoints(_to: string, password: string, _points: number, _amount: number): Observable<Balance> {
    return this.http.post<any>(`${environment.apiUrl}/loyalty/redeem/${_to}`, { password, _points, _amount })
      .pipe(map(response => {
        return response.data;
      }));
  }

  redeemOffer(partner_id: string, offer_id: string, _to: string, password: string, _points: number, quantity: number): Observable<Balance> {
    return this.http.post<any>(`${environment.apiUrl}/loyalty/redeem/${partner_id}/${offer_id}/${_to}`, { password, _points, quantity })
      .pipe(map(response => {
        return response.data;
      }));
  }

  readLoyaltyStatistics(_date): Observable<Statistics> {
    console.log("Statistics")
    return this.http.get<any>(`${environment.apiUrl}/loyalty/statistics/${_date}?page=0&size=0`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  exportLoyaltyStatistics(_date: string, _type: string) {
    window.open(`${environment.apiUrl}/loyalty/statistics/${_date}/${_type}/export?page=0&size=0`, "_self");
    return 'ok';
    // return this.http.get<any>(`${environment.apiUrl}/loyalty/statistics/${_date}/${_type}/export?page=0&size=0`)
    //   .pipe(map(response => {
    //     return response.data;
    //   }));
  }

  readOfferStatistics(partner_id: string, offer_id: string, _date: string): Observable<Statistics> {
    return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/${partner_id}/${offer_id}/statistics/${_date}?page=0&size=0`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  exportOfferStatistics(partner_id: string, offer_id: string, _date: string): string {
    window.open(`${environment.apiUrl}/loyalty/offers/${partner_id}/${offer_id}/statistics/${_date}/export?page=0&size=0`, "_self");
    return 'ok';
    // return this.http.get<any>(`${environment.apiUrl}/loyalty/offers/${partner_id}/${offer_id}/statistics/${_date}/export?page=0&size=0`)
    //   .pipe(map(response => {
    //     return response.data;
    //   }));
  }
}
