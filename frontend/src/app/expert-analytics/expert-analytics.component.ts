import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics-service/analytics.service';
import { analytics } from 'src/analytics';
import { searchQuery } from 'src/searchQuery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-expert-analytics',
  templateUrl: './expert-analytics.component.html',
  styleUrls: ['./expert-analytics.component.css']
})
export class ExpertAnalyticsComponent implements OnInit {
  public responses =  [];
  public errorMsg;
  public sessionId :any;
  public displayedColumns: string[] = ['domain','query','result','posResponse','negResponse','actions'];
  constructor(private _analytics: AnalyticsService,private router:Router) { }
  ngOnInit() {
    this._analytics.changeURL("https://knowably.stackroute.io:8080/analytics-service/api/v1/display");
    this._analytics.getResponses()
      .subscribe(data => this.responses=data,
        error => this.errorMsg = error);
  }
  editQuery(term:analytics) {
    this.router.navigate(['/expert-validate']);
    this.sessionId=new Date().valueOf();
    localStorage.setItem("sessionId",this.sessionId);
    let sessionId=localStorage.getItem("sessionId");
    var query:searchQuery = {"domain":term.key.domain, "searchTerm":term.key.query,"sessionId":this.sessionId};
    this._analytics.postQuery(query)
      .subscribe(data => {
          console.log(data);
        },
        error => console.log(error));
  }
  deleteResponse(element) {
    this._analytics.clearResponse(element)
                   .subscribe(data=>{
                     this.ngOnInit();
                   });

  }

}
