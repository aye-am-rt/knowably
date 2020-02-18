import { Injectable } from '@angular/core';
import {searchQuery} from '../../searchQuery';
import {HttpHeaders, HttpClient } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MedicalSearchService {
  sessionId:any;
  constructor(private http: HttpClient) { }
  userSearchService(search: searchQuery) {
    this.sessionId=localStorage.getItem("sessionId");
    console.log('service ' + search.searchTerm);
    search.domain = 'medical';
    search.sessionId=this.sessionId;
    console.log("medical s-id "+search.sessionId);
    return this.http.post('https://knowably.stackroute.io:8080/queryservice/api/v1/query', search, httpOptions)
  }
  private _searchQuery: searchQuery;
  suggestionSearchService(searchTerm, sessionId) {
    let domain = "medical";
    this.sessionId=localStorage.getItem("sessionId");
    this._searchQuery = {
      searchTerm,
      domain,sessionId:sessionId+""
    };
    console.log('service ' + this._searchQuery.domain + this._searchQuery.searchTerm+this._searchQuery.sessionId);
    return this.http.post('https://knowably.stackroute.io:8080/queryservice/api/v1/query', this._searchQuery, httpOptions)
  }
  VoiceSearchService(searchTerm) {
  let domain = "medical";
  this.sessionId=localStorage.getItem("sessionId");
    this._searchQuery = {
      searchTerm,
      domain,sessionId:this.sessionId+""
    };
    console.log('service ' + this._searchQuery.domain + this._searchQuery.searchTerm+this._searchQuery.sessionId);
    return this.http.post('https://knowably.stackroute.io:8080/queryservice/api/v1/query', this._searchQuery, httpOptions)
  }

}
