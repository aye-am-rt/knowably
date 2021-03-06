import { Component, OnInit, Inject } from '@angular/core';
import { WebSocketService } from '../websocket-service/websocket.service';
import { domaindata } from 'src/domaindata';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-expert-validate-dashboard',
  templateUrl: './expert-validate-dashboard.component.html',
  styleUrls: ['./expert-validate-dashboard.component.css']
})
export class ExpertValidateDashboardComponent implements OnInit {
  webSocketService: any;
  results: string;
  domaindata:domaindata[]=[];
  temp:string;
  display="none";
  collapsed:boolean=true;
  flag:boolean=false;
  flag1:boolean;

  constructor(private webSocket:WebSocketService,public dialog: MatDialog,public router:Router) { }

  ngOnInit() {
  this.flag=true;
    let stompClient =this.webSocket.connect();
    let sessionId=localStorage.getItem("sessionId");
    console.log(sessionId);
    stompClient.connect({},frame =>{
      stompClient.subscribe('/queue/domain/'+sessionId,notifications=>{
        this.domaindata=JSON.parse(notifications.body);
         if(this.domaindata!=null)
	 {
	 this.flag=false;
	 }
        console.log("JSON.parse(notifications.body)***", JSON.parse(notifications.body));
        console.log("*****88",this.domaindata)
        this.collapsed=true;
      })
    });

  }

  clearAll():void{
    this.collapsed=false;
    this.router.navigate(['/expert-analytics']);
    // document.getElementById("clear").textContent=" ";

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: this.domaindata
    });
    dialogRef.afterClosed().subscribe(result => {
    this.flag1=true;
    console.log(this.flag1);
    console.log('The dialog was closed');
    });
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  stompClient =this.webSocket.connect();


  constructor(    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: domaindata[],private webSocket:WebSocketService) {
      console.log(data)
    }

    onClickSubmit(expertdata:any){
      console.log(expertdata);
      
      let temp=JSON.stringify(expertdata);
     
      console.log(temp)
        this.stompClient.send("/app/formdata",{priority:90},temp);
        this.onNoClick();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }




}

