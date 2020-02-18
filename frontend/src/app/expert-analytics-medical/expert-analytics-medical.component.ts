import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics-service/analytics.service';
import { Router } from '@angular/router';
import { analytics } from 'src/analytics';
import { searchQuery } from 'src/searchQuery';

@Component({
  selector: 'app-expert-analytics-medical',
  templateUrl: './expert-analytics-medical.component.html',
  styleUrls: ['./expert-analytics-medical.component.css']
})
export class ExpertAnalyticsMedicalComponent implements OnInit {
  public responses =  [];
  public errorMsg;
  public sessionId;
  public displayedColumns: string[] = ['domain','query','result','posResponse','negResponse','actions'];
  constructor(private _analytics1: AnalyticsService,private router:Router) { }

  ngOnInit() {
    this._analytics1.changeURL("https://knowably.stackroute.io:8080/analytics-service/api/v1/display/medical");
    this._analytics1.getResponses()
        .subscribe(data => this.responses=data,
                   error => this.errorMsg = error);
  }
  editQuery(term:analytics) {
    this.router.navigate(['/expert-validate']);
    this.sessionId=new Date().valueOf();
    localStorage.setItem("sessionId",this.sessionId);
    let sessionId=localStorage.getItem("sessionId");
    var query:searchQuery = {"domain":term.key.domain, "searchTerm":term.key.query,"sessionId":this.sessionId};
    this._analytics1.postQuery(query)
      .subscribe(data => {
          console.log(data);
        },
        error => console.log(error));
  }
  deleteResponse(element) {
    this._analytics1.clearResponse(element)
      .subscribe(data=>{
        this.ngOnInit();
      });
  }
}
