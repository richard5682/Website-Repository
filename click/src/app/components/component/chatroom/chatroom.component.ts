import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChatRoom, Message } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit,OnChanges {
  @Input() messages!:Message[];
  loginid!:number;
  isUser:boolean=false;
  constructor(private login:LoginService,public fetch:FetchService,private chat:ChatService,private loader:LoaderService) { }

  ngOnInit() {
    this.login.notifyOnLogin().subscribe(
      data=>{
        this.loginid = data.id;
      }
    )
  }
  ngOnChanges(changes:SimpleChanges){
    for(let c in changes){
      if(c=="messages"){
        setTimeout(()=>{
          this.chat.subjectChatControl.next('scrolldown');
        },1000);
      }
    }
  }
  pricerequestaccept(message:Message){
    var value = message.message.split("|")[0];
    this.loader.showLoader("Accepting Price Request");
    this.chat.editMessage(value+"|2",message.messageid)?.subscribe(
      data=>{
        this.loader.showLoader("hide");
      },
      error=>{
        this.loader.showLoader("hide");
        this.loader.showAlert(error);
      }
    )
  }
  pricerequestdecline(message:Message,isUser:boolean){
    var value = message.message.split("|")[0];
    console.log(isUser);
    if(isUser){
      this.chat.editMessage(value+"|0",message.messageid)?.subscribe(
        data=>{
          this.loader.showLoader("hide");
        },
        error=>{
          this.loader.showLoader("hide");
          this.loader.showAlert(error);
        }
      )
    }else{
      this.chat.editMessage(value+"|3",message.messageid)?.subscribe(
        data=>{
          this.loader.showLoader("hide");
        },
        error=>{
          this.loader.showLoader("hide");
          this.loader.showAlert(error);
        }
      )
    }
  }
}
