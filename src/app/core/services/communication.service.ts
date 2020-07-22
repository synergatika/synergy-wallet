import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

/**
 * Environment
 */
import { environment } from '../../../environments/environment';

/**
 * Models & Interfaces
 */
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {

  constructor(
    private http: HttpClient
  ) { }


  sendInvitation(email: string): Observable<Message> {
    return this.http.post<any>(`${environment.apiUrl}/communication/invite`, { email: email })
      .pipe(map(response => {
        return response;
      }));
  }
}
