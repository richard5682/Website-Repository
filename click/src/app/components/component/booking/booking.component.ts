import { Component, Input, OnInit } from '@angular/core';
import { Booking, ServiceData, UserData } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  @Input() booking!:Booking;
  @Input() forUser:boolean = true;
  service!:ServiceData;
  owner!:UserData;
  servicepicture!:string;
  profilepicture!:string;
  user!:UserData;
  constructor(private fetch:FetchService,private chat:ChatService,private main:MainService,private loader:LoaderService) { }

  ngOnInit() {
    if(this.forUser){
      this.fetch.fetchService(this.booking.serviceid)?.subscribe(
        servicedata =>{
          this.service = servicedata;
          this.fetch.fetchPictures(this.service.serviceid)?.subscribe(
            pictures =>{
              var thumbnail =  this.fetch.getServiceThumbnail(pictures,this.service.serviceid);
              if(thumbnail != null){
                this.servicepicture =  thumbnail;
              }
            }
          )
          this.fetch.fetchBasicUser(this.service.ownerid)?.subscribe(
            userdata => {
              this.owner = userdata;
            }
          )
        }
      );
    }else{
      if(this.booking.userid != undefined){
        this.fetch.fetchBasicUser(this.booking.userid)?.subscribe(
          userdata => {
            this.user = userdata;
            this.profilepicture = this.fetch.getProfilePicture(this.user.profileimage);
          }
        )
      }
    }
  }
  deleteBooking(){
    this.loader.showLoader("Deleting Bookings");
    if(this.booking.id != undefined){
      this.fetch.deleteBooking(this.booking.id)?.subscribe(
        data=>{
          this.loader.showLoader("hide");
          this.main.reloadCurrentRoute();
        },
        error=>{
          this.loader.showLoader("hide");
          this.loader.showAlert(error);
        }
      )
    }
  }
  showMessage(){
    if(this.booking.userid != undefined && this.booking.id != undefined){
      if(this.forUser){
        this.chat.fetchChatRoom(this.service.ownerid,this.service.serviceid,this.booking.id)?.subscribe(
          data=>{
            this.chat.setCurrentRoom(data);
          }
        )
      }else{
        this.chat.fetchChatRoom(this.booking.userid,this.booking.serviceid,this.booking.id)?.subscribe(
          data=>{
            this.chat.setCurrentRoom(data);
          }
        )
      }
    }
    this.chat.maximize();
  }
}
