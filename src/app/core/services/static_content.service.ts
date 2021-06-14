// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Content, IStaticContentService, Sector } from 'sng-core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaticContentService {//extends IStaticContentService {

  public _content: Content[];
  public _sectors: Sector[];

  constructor(
    private http: HttpClient,
  ) {
    // super();
  }

  get content(): Content[] {
    console.log("Provider");
    console.log(this._content)
    return this._content;
  }

  get sectors(): Sector[] {
    return this._sectors;
  }


  readContent(): Promise<any> {

    return new Promise((resolve, reject) => {//An Http Get to my API to get the available languages in my application
      this.http.get<Observable<Content[]>>(`${environment.apiUrl}/content`)
        .subscribe(response => {
          this._content = response['data'];
          console.log(this._content)
          resolve(true);
        })
    })
  }

  readSectors(): Promise<any> {

    return new Promise((resolve, reject) => {//An Http Get to my API to get the available languages in my application
      this.http.get<Observable<Content[]>>(`${environment.apiUrl}/content/sectors`)
        .subscribe(response => {
          this._sectors = response['data'];
          resolve(true);
        })
    })
  }

  // return new Promise<boolean>((resolve) => {
  //   // this.http.get(`${environment.apiUrl}/content`).subscribe((response) => {
  //   //  this.content$ = response['data'];
  //   console.log('loadSettings FINISH');
  //   resolve(true);
  //   // });
  //   // this.http.get<any>(`${environment.apiUrl}/content`)
  //   //   .pipe(map(response => {
  //   //     this.content$ = response.data;
  //   //     this.content$.subscribe((data) => { console.log(data) })
  //   //     resolve(true);
  //   //   }));
  //   // setTimeout(() => {
  //   //   this.message = "Hello World";
  //   //   console.log('hello world');
  //   //   resolve(true);
  //   // }, 5000);
  // });

  // }

  // readContent(): any {
  //   return this.http.get<any>(`${environment.apiUrl}/content`)
  //     .pipe(map(response => {
  //       this.content$ = response.data;
  //       return this.content$
  //       // .subscribe((data) => {
  //       //   console.log(data); this.content = data;
  //       //   resolve (this.content);
  //       // })
  //     }));
  // }
}