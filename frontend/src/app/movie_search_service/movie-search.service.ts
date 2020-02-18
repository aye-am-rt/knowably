import { Injectable } from '@angular/core';
import { searchQuery } from 'src/searchQuery';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  sessionId:any;
  constructor(private http:HttpClient) { }
  userSearchService(search:searchQuery){
    this.sessionId=localStorage.getItem("sessionId");
    search.domain = "movie";
    search.sessionId=this.sessionId;
    console.log("service "+search.searchTerm);
    console.log(search.domain);
    console.log(search.sessionId);
    return this.http.post("https://knowably.stackroute.io:8080/queryservice/api/v1/query", search, httpOptions)
  }
  private _searchQuery: searchQuery;
  VoiceSearchService(searchTerm) {
    this.sessionId=localStorage.getItem("sessionId");
    let domain = "movie";
    this._searchQuery = {
      searchTerm,domain,sessionId:this.sessionId +""
    };
    console.log('service ' + this._searchQuery.domain + this._searchQuery.searchTerm+this._searchQuery.sessionId);
    return this.http.post('https://knowably.stackroute.io:8080/queryservice/api/v1/query', this._searchQuery, httpOptions)
  }
  private _searchQuery1: searchQuery;
  suggestionSearchService(searchTerm, sessionId) {
    let domain = "medical";
    this._searchQuery1 = {
      searchTerm,
      domain,sessionId:sessionId+""
    };
    console.log('service ' + this._searchQuery.domain + this._searchQuery.searchTerm+this._searchQuery.sessionId);
    return this.http.post('https://knowably.stackroute.io:8080/queryservice/api/v1/query', this._searchQuery1, httpOptions)
  }
}
