import { Injectable } from '@angular/core';
// Common
import { HttpClient } from '@angular/common/http';

// Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Env
import { environment } from '../../../environments/environment';

// Models
import { Content } from '../models/content.model';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(
    private http: HttpClient
  ) { }

  readContent(): Observable<Content[]> {
    return this.http.get<any>(`${environment.apiUrl}/content`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  readContentById(content_id: string): Observable<Content> {
    return this.http.get<any>(`${environment.apiUrl}/content/${content_id}`)
      .pipe(map(response => {
        return response.data;
      }));
  }

  createContent(name: string, el_title: string, en_title: string, el_content: string, en_content: string): Observable<Message> {
    return this.http.post<any>(`${environment.apiUrl}/content`, { name, el_title, en_title, el_content, en_content })
      .pipe(map(response => {
        return response.data;
      }));
  }

  updateContent(content_id: string, name: string, el_title: string, en_title: string, el_content: string, en_content: string): Observable<Message> {
    return this.http.put<any>(`${environment.apiUrl}/content/${content_id}`, { name, el_title, en_title, el_content, en_content })
      .pipe(map(response => {
        return response.data;
      }));
  }
}