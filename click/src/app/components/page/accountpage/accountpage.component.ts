import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Booking, ServiceData, ServiceQueryData, UserData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-accountpage',
  templateUrl: './accountpage.component.html',
  styleUrls: ['./accountpage.component.scss']
})
export class AccountpageComponent implements OnInit,OnDestroy {
  userid!:number;
  userservices!:ServiceData[];
  pickedService!:ServiceData;
  bookings_accepted:Booking[] = new Array<Booking>();
  bookings_pending:Booking[] = new Array<Booking>();
  bookings_rejected:Booking[] = new Array<Booking>();
  bookings_finish:Booking[] = new Array<Booking>();

  logoutSubscriber!:Subscription;

  constructor(private login:LoginService,private router:Router,private fetch:FetchService) { }
  ngOnDestroy(){
    if(this.logoutSubscriber){
      this.logoutSubscriber.unsubscribe();
    }
  }
  ngOnInit() {
    if(!this.login.loggedin){
      this.logoutSubscriber = this.login.notifyOnLogout().subscribe(
        data=>{
        this.router.navigate(['homepage']);
      })
      this.login.notifyOnLogin().subscribe(
        userdata=>{
          this.reloadAccount();
        }
      )
    }else{
      this.reloadAccount();
    }
  }
  reloadAccount(){
    if(this.login.userLoggedIn)this.userid = this.login.userLoggedIn?.id;
      var bookings_accepted:Booking[] = new Array<Booking>();
      var bookings_pending:Booking[] = new Array<Booking>();
      var bookings_rejected:Booking[] = new Array<Booking>();
      var bookings_finish:Booking[] = new Array<Booking>();
      this.fetch.fetchUserBookings()?.subscribe(
        bookings=>{
          bookings.forEach(booking => {
            if(booking.active == 0){
              bookings_rejected.push(booking);
            }else if(booking.active == 1 || booking.active == 2){
              bookings_pending.push(booking);
            }else if(booking.active == 3){
              bookings_accepted.push(booking);
            }else if(booking.active == 4){
              bookings_finish.push(booking);
            }
          });
        },
        error=>{},
        ()=>{
          this.bookings_accepted = bookings_accepted;
          this.bookings_pending = bookings_pending;
          this.bookings_rejected = bookings_rejected;
          this.bookings_finish= bookings_finish;
        }
      )
      if(this.login.userLoggedIn)
      this.fetch.queryService(new ServiceQueryData(null,null,this.login.userLoggedIn?.id.toString(),null,null))?.subscribe(
        services=>{
          this.userservices = services;
        }
      )
  }
  changeService(servicedata:ServiceData){
    this.pickedService = servicedata;
  }
}
