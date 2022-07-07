import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Booking, ServiceData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.scss']
})
export class BookinglistComponent implements OnInit,OnChanges {
  @Input() bookings:Booking[] = new Array<Booking>();
  @Input() forUser:boolean = true;
  bookingcardinfo:{booking:Booking,servicedata:ServiceData,date:Date, class:string}[] = new Array();
  years:number[] = new Array();
  constructor(private fetch:FetchService,private loader:LoaderService,private login:LoginService,private router:Router) { }



  ngOnInit() {
    this.loadBookingCardInfo();
  }
  ngOnChanges(changes:SimpleChanges){
    for(let c in changes){
      if(c=="bookings"){
        this.loadBookingCardInfo();
      }
    }
  }
  loadBookingCardInfo(){
    if(this.bookings != undefined && this.login.loggedin){
      this.bookingcardinfo= new Array();
      this.bookings.forEach(booking => {
        this.fetch.fetchService(booking.serviceid)?.subscribe(
            servicedata=>{
              if(this.forUser){
                if(servicedata.ownerid != this.login.userLoggedIn?.id){
                  var date = new Date(parseInt(booking.exectime));
                  var classname:string = 'accepted';
                  if(booking.active == 1 || booking.active == 2){
                    classname = 'pending';
                  }else if(booking.active == 0){
                    classname = 'rejected';
                  }
                  this.bookingcardinfo.push({booking:booking,servicedata:servicedata,date,class:classname});
                  var yearSet:boolean=false;
                  this.years.forEach(year => {
                    if(year == date.getFullYear()){
                      yearSet = true;
                    }
                  });
                  if(!yearSet){
                    this.years.push(date.getFullYear());
                  }
                }
              }else{
                if(servicedata.ownerid == this.login.userLoggedIn?.id){
                  var date = new Date(parseInt(booking.exectime));
                  var classname:string = 'accepted';
                  if(booking.active == 1 || booking.active == 2){
                    classname = 'pending';
                  }else if(booking.active == 0){
                    classname = 'rejected';
                  }
                  this.bookingcardinfo.push({booking:booking,servicedata:servicedata,date,class:classname});
                  var yearSet:boolean=false;
                  this.years.forEach(year => {
                    if(year == date.getFullYear()){
                      yearSet = true;
                    }
                  });
                  if(!yearSet){
                    this.years.push(date.getFullYear());
                  }
                }
              }
            },
            error=>{
              console.log(error);
            }
          )
        }
      )  
    }
  }
  GoToService(booking:Booking){
    this.router.navigate(['servicepage',booking.serviceid]);
  }
}
