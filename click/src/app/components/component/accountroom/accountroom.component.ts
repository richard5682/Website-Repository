import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { Booking, ChatRoom, ServiceData, UserData } from 'src/app/data/dataType';
import { ConnectService } from 'src/app/services/connect.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-accountroom',
  templateUrl: './accountroom.component.html',
  styleUrls: ['./accountroom.component.scss']
})
export class AccountroomComponent implements OnInit,OnChanges {
  @Input() room!:ChatRoom;
  @Input() selected!:boolean;
  @Output() clickevent = new EventEmitter<{room:ChatRoom, user:UserData}>();
  userdata!:UserData;
  servicedata!:ServiceData;
  servicepictureURL!:string|null;
  bookingdata!:Booking;
  servicemode:boolean=false;
  bookingmode:boolean=false;
  bookingclass:string='pending';
  domain!:string;
  constructor(private connect:ConnectService,private fetch:FetchService,private login:LoginService) { }

  ngOnInit() {
    this.domain = this.connect.DOMAIN;
    var user1:number = this.room.userid1;
    var user2:number = this.room.userid2;
    var user!:number;
    if(this.login.userLoggedIn?.id != user1){
      user = user1;
    }else{
      user = user2;
    }
    this.fetch.fetchBasicUser(user,true)?.subscribe(
      data=>{
        this.userdata = data;
      }
    );
    this.fetch.fetchService(this.room.serviceid,true)?.subscribe(
      service=>{
        this.servicedata = service;
        this.fetch.fetchPictures(service.serviceid,true)?.subscribe(
          pictures=>{
            this.servicepictureURL = this.fetch.getServiceThumbnail(pictures,service.serviceid);
          }
        )
        if(this.servicedata.ownerid != this.login.userLoggedIn?.id){
          this.servicemode=true;
        }
        if(this.room.bookingid != 0){
          this.bookingmode = true;
          this.servicemode = false;
          if(this.room.bookingdata){
            this.bookingdata = this.room.bookingdata;
            if(this.bookingdata.active == 2){
              this.bookingclass = 'priceaccepted';
            }else if(this.bookingdata.active == 3){
              this.bookingclass = 'bookset';
            }else if(this.bookingdata.active == 0){
              this.bookingclass = 'reject';
            }
          }
        }
      }
    );
  }
  ngOnChanges(changes:SimpleChanges){
    for(let c in changes){
      if(c == "room"){
        
      }
    }
  }
  imageClicked(){
    this.clickevent.emit({room:this.room,user:this.userdata});
  }
}
