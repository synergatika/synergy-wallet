// Core
import { Injectable } from '@angular/core';

// Common
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

// Env
import { environment } from '../../../environments/environment';

// Models
import { Message } from '../models/message.model';
import { MicrocreditSupport } from '../models/microcredit-support.model';

@Injectable({
  providedIn: 'root'
})

export class MicrocreditService {

  constructor(
    private http: HttpClient
  ) { }


  readAllSuports(): Observable<MicrocreditSupport[]> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/supports`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readSupportsByMicrocreditCampaign(merchant_id: string, campaign_id: string, identifier: string): Observable<MicrocreditSupport[]> {
    return this.http.get<any>(`${environment.apiUrl}/microcredit/supports/${merchant_id}/${campaign_id}/${identifier}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  confirmPayment(merchant_id: string, campaign_id: string, payment: string, payment_id: string[]): Observable<Message> {
    return this.http.put<any>(`${environment.apiUrl}/microcredit/supports/${merchant_id}/${campaign_id}/${payment}`, { payment_id: payment_id })
      .pipe(map(response => {
        return response;
      }));
  }

  unConfirmPayment(merchant_id: string, campaign_id: string, payment: string, payment_id: string[]): Observable<Message> {
    return this.http.put<any>(`${environment.apiUrl}/microcredit/supports/${merchant_id}/${campaign_id}/${payment}`, { payment_id: payment_id })
      .pipe(map(response => {
        return response;
      }));
  }

  earnTokens(merchant_id: string, campaign_id: string, _amount: number) {
    return this.http.post<any>(`${environment.apiUrl}/microcredit/earn/${merchant_id}/${campaign_id}`, { _amount: _amount })
      .pipe(map(response => {
        return response;
      }));
  }

  earnTokensByMerchant(merchant_id: string, campaign_id: string, identifier: string, _amount: number, paid: boolean): Observable<Message> {
    return this.http.post<any>(`${environment.apiUrl}/microcredit/earn/${merchant_id}/${campaign_id}/${identifier}`, { _amount: _amount, paid: paid })
      .pipe(map(response => {
        return response;
      }));
  }

  redeemTokens(merchant_id: string, campaign_id: string, _to: string, _tokens: number, password: string, support_id: string): Observable<Message> {
    return this.http.post<any>(`${environment.apiUrl}/microcredit/redeem/${merchant_id}/${campaign_id}`, { _to, _tokens, password, support_id })
      .pipe(map(response => {
        return response;
      }));
  }
}
