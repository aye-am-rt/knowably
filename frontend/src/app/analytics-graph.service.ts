import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { analyticsgraph } from 'src/analyticsgraph';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsGraphService {
private _url: string = "https://knowably.stackroute.io:8080/analytics-service/api/v1/analytics";
  constructor(private http: HttpClient) { }
  getResponses(): Observable<analyticsgraph> {
	const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      })
    };
    return this.http.get<analyticsgraph>(this._url,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return Observable.throw(error.message || "Server Error");
      })
    )
  }
}
