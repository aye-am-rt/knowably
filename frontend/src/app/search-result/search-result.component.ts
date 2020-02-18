import { Component, OnInit, Input } from '@angular/core';
import {UserResponseService} from '../user-response-service/user-response.service';
import { MedicalSearchService } from '../medical_search_service/medical-search.service';
import { Router } from '@angular/router';
import { WebSocketService } from '../websocket-service/websocket.service';
import Speech from 'speak-tts' ;
import {MovieSearchService} from "../movie_search_service/movie-search.service";


@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(private userResponseService:UserResponseService, private medicalSearchService:MedicalSearchService, private route:Router, private webSocketService: WebSocketService, private  movieSearchService:MovieSearchService) {

  }
  resultString: string;
  result:string[];
  query: string;
  flag:boolean = true;
  suggestionString:string;
  suggestion:string[];
  suggestionFlag:boolean = true;
  likeFlag:boolean;
  notifications: any;

  analyticsString:string;
  userFlag:string;
  reportFlag:boolean =true;
  domain:string;
  status:string;
  resultFlag=true;
  goBackFlag:Boolean=true;
  ngOnInit() {
    if(localStorage.getItem('domain') == 'medical'){
      this.goBackFlag = true;
    }else{
      this.goBackFlag = false
    }
    const speech = new Speech()
    this.likeFlag=true;
    this.status = localStorage.getItem('status');
    console.log(status);
    if(this.status == 'notFound'){
      console.log(this.status);
      this.query = "Sorry... We are not able to search for your Query";
      this.flag =false
    }
    else if(this.status == 'noresult'){
      this.resultFlag= false;
      this.query = localStorage.getItem('searchQuery');
      this.result.shift();
      this.result[0]= "no such data exists"
      speech.speak({
        text: 'Sorry!! No Such Data Exist',
        }).then(() => {
            console.log("Success !")
        }).catch(e => {
            console.error("An error occurred :", e)
        })
    }else{
      this.resultString = localStorage.getItem('result');
      this.result = this.resultString.split(":");
      if(this.result.length < 2){
        this.query = "No Result Found";
        this.flag =false
        speech.speak({
          text: 'Sorry!! We did not find any result in our database',
          }).then(() => {
              console.log("Success !")
          }).catch(e => {
              console.error("An error occurred :", e)
          })
      }else{
        this.resultString = localStorage.getItem('result');
        this.result = this.resultString.split(":");
        this.query = localStorage.getItem('searchQuery');
        //this.query = this.result[0];
        this.result.shift();
        this.suggestionString = localStorage.getItem('suggestion');
        console.log(this.suggestionString);
        this.suggestion = this.suggestionString.split(':');
        console.log(this.suggestion.length);
        if(this.suggestion.length == 1){
          this.suggestionFlag = false;
        }
        speech.speak({
         text: 'For Your Query We found the Result'+ this.result,
         }).then(() => {
             console.log("Success !")
         }).catch(e => {
             console.error("An error occurred :", e)
         })
      }
    }
  }
  userLike(query, result){
    this.likeFlag = false;
    console.log(query);
    this.analyticsString = result.join(",");
    console.log(this.analyticsString);
    this.userFlag= "accurate";
    this.userResponseService.userLike(query,this.analyticsString,this.userFlag).subscribe(
      (response) => {
        console.log("response", response);
      },
      (error: any) => {
        console.log("error", error)
      })
  }
  userReport(query, result){
    this.reportFlag = false
    console.log(query);
    this.analyticsString = result.join(",");
    console.log(this.analyticsString);
    this.userFlag= "inaccurate";
    this.userResponseService.userReport(query,this.analyticsString,this.userFlag).subscribe(
      (response) => {
        console.log("response", response);
      },
      (error: any) => {
        console.log("error", error)
      })
  }
  suggestionSearch(searchQuery){
    let sessionId = localStorage.getItem('sessionId');
    localStorage.setItem('searchQuery',searchQuery);
     localStorage.setItem('sessionId',sessionId);
     let domain:string = localStorage.getItem('domain')
      let stompClient =this.webSocketService.connect();
      if(domain.length == 7){
        this.medicalSearchService.suggestionSearchService(searchQuery, sessionId)
          .subscribe(data=>{
            console.log(data);
            let stompClient =this.webSocketService.connect();
            // tslint:disable-next-line: align
            stompClient.connect({},frame =>{

              stompClient.subscribe('/topic/notification/'+sessionId,notifications=>{
                this.notifications=JSON.parse(notifications.body);
                localStorage.setItem('query',this.notifications.query);
                localStorage.setItem('status',this.notifications.status);
                localStorage.setItem('result',this.notifications.result.join(':'));
                if(this.notifications.suggestions!=null){
                  localStorage.setItem('suggestion',this.notifications.suggestions.join(':'));
                }
                this.ngOnInit();
              })
            });

          },error=>{
            console.log(error);
            this.route.navigateByUrl('/medical-domain');
          });
      }
      else{
        this.movieSearchService.suggestionSearchService(searchQuery, sessionId)
          .subscribe(data=>{
            console.log(data);
            let stompClient =this.webSocketService.connect();
            // tslint:disable-next-line: align
            stompClient.connect({},frame =>{

              stompClient.subscribe('/topic/notification/'+sessionId,notifications=>{
                this.notifications=JSON.parse(notifications.body);
                localStorage.setItem('query',this.notifications.query);
                localStorage.setItem('status',this.notifications.status);
                localStorage.setItem('result',this.notifications.result.join(':'));
                if(this.notifications.suggestions!=null){
                  localStorage.setItem('suggestion',this.notifications.suggestions.join(':'));
                }
                //  this.route.navigateByUrl('').then(e=>{
                //    this.route.navigateByUrl('/search-result');
                //    window.location.reload();
                //   })
              })
            });

          },error=>{
            console.log(error);
            this.route.navigateByUrl('/movie-domain');
          });
      }
  }


}
