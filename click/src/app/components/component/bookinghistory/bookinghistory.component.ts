import { Component, Input, OnInit } from '@angular/core';
import { Booking, UserData } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

interface BookingInfo{
  booking:Booking;
  client:UserData;
  date:Date;
  state:number;
  clientpicture:string;
}

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.scss']
})
export class BookinghistoryComponent implements OnInit {
  @Input() bookings!:Booking[];
  bookinginfos:BookingInfo[] = new Array();
  constructor(private loader:LoaderService,private fetch:FetchService,private chat:ChatService) { }

  ngOnInit() {
    if(this.bookings != undefined){
      this.bookings.forEach(booking => {
        var date = new Date();
        var state:number = 0;
        //0 REJECT
        //1 PENDING
        //2 ACCEPTED
        //3 ACCEPTED PAST TIME
        //4 FINISH

        date.setTime(parseInt(booking.exectime));
        
        if(booking.active == 1 || booking.active == 2){
          state = 1;
        }else if (booking.active == 0){
          state = 0;
        }else if (booking.active == 3){
          if(parseInt(booking.exectime) < Date.now()){
            state = 3;
          }else{
            state = 2;
          }
        }else if(booking.active == 4){
          state = 4;
        }
        if(booking.userid)
          this.fetch.fetchBasicUser(booking.userid)?.subscribe(
          userdata=>{
            this.bookinginfos.push({booking:booking,date:date,client:userdata,clientpicture:this.fetch.getProfilePicture(userdata.profileimage),state:state});
          }
        )
      });
    }
  }
  openChat(booking:Booking){
    this.loader.showLoader("Opening Chat");
    if(booking.userid && booking.id)
    this.chat.fetchChatRoom(booking.userid,booking.serviceid,booking.id)?.subscribe(
      room=>{
        this.chat.setCurrentRoom(room);
        this.chat.maximize();
        this.loader.showLoader("hide");
      }
    )
  }
  finishBooking(booking:Booking){
    booking.active = 4;
    this.loader.showLoader("UPDATING BOOKING");
    this.fetch.editBooking(booking)?.subscribe(
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
