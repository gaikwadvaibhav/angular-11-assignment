import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  headers: HttpHeaders;

  private headerOptions: any = {
    'Content-type': 'application/json',
    // 'x-access-token': null
  };

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders(this.headerOptions);
  }

  get(url: string): Observable<any> {
    return this.http.get(url, {
      headers: this.headers,
    });
  }

  post(url: string, data?: any) {
    return this.http.post(url, data, {
      headers: this.headers,
    });
  }
}
