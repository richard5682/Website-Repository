import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Booking, CalendarMarkDate, ServiceData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-serviceoverview',
  templateUrl: './serviceoverview.component.html',
  styleUrls: ['./serviceoverview.component.scss']
})
export class ServiceoverviewComponent implements OnInit,OnChanges {
  @Input() servicedata!:ServiceData;
  serviceID!:number;
  pending_bookings!:Booking[];
  active_bookings!:Booking[];
  past_bookings!:Booking[];
  markdate:CalendarMarkDate[] = new Array();
  constructor(private fetch:FetchService) { }
  ngOnChanges(change:SimpleChanges){
    for(let c in change){
      if(c=="servicedata"){
        this.loadBooking();
      }
    }
  }
  ngOnInit() {
    this.loadBooking();
  }
  loadBooking(){
    this.serviceID = this.servicedata.serviceid;
    this.fetch.fetchServiceBookings(this.serviceID)?.subscribe(
      booking=>{
        var active_bookings:Booking[] = new Array();
        var pending_bookings:Booking[] = new Array();
        var past_bookings:Booking[] = new Array();
        this.markdate = new Array();
        booking.forEach(book => {
          if(book.active == 2 || book.active == 1){
            pending_bookings.push(book);
          }else if(book.active != 0 && book.active != 4){
            if(parseInt(book.exectime) < Date.now()){
              past_bookings.push(book);
            }else{
              active_bookings.push(book);
            }
          }
          
          var date = new Date();
          date.setTime(parseInt(book.exectime));
          if(parseInt(book.exectime) < Date.now()){
            this.markdate.push({date:date,color:'white',backcolor:'#ff450080'});
          }else{
            this.markdate.push({date:date,color:'white',backcolor:'orangered'});
          }
         
        }
        );
        this.active_bookings = active_bookings;
        this.past_bookings = past_bookings;
        this.pending_bookings = pending_bookings;
      },
      error=>{
        this.markdate = new Array();
        this.active_bookings = new Array();
        this.past_bookings = new Array();
        this.pending_bookings = new Array();
      }
    )
  }

}
