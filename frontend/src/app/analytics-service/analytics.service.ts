import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analytics } from 'src/analytics';
import { catchError } from 'rxjs/operators';
import { searchQuery } from 'src/searchQuery';
import { throwError } from 'rxjs';
import { responses } from 'src/responses';
import { expertDTO } from 'src/expertDTO';


@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private _url: string = "https://knowably.stackroute.io:8080/analytics-service/api/v1/display";

  constructor(private http: HttpClient) { }
  changeURL(url: string) {
    this._url = url;
  }
  getResponses(): Observable<analytics[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      })
    };
    
    console.log(httpOptions.headers);
    return this.http.get<analytics[]>(this._url,httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message || "Server Error");
      })
    )
  }
  postQuery(query:searchQuery) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      })
    };
    
    return this.http.post("https://knowably.stackroute.io:8080/queryservice/api/v1/analyticsquery",query,httpOptions);
  }
  postConcept(concept:expertDTO) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      })
    };
    
    return this.http.post("https://knowably.stackroute.io:8080/google-search/api/v1/domain",concept,httpOptions);
  }
  getQueries(): Observable<responses[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      })
    };
        
    return this.http.get<responses[]>("https://knowably.stackroute.io:8080/queryservice/api/v1/response",httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.message || "Server Error");
      })
    )
  }
  clearQuery(element) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }),
      body: element
    }
    return this.http.delete("https://knowably.stackroute.io:8080/queryservice/api/v1/response",options);
  }
  clearResponse(element) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }),
      body: element
    }
    return this.http.delete("https://knowably.stackroute.io:8080/analytics-service/api/v1/response",options);
  }
}
