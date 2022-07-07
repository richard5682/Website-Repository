import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/service/fetch.service';
import { Day } from '../../dataType/Day';
import { Month } from '../../dataType/Month';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() month:Month;
  events:Array<any>;
  days:Day[] = [];
  time = new Date();
  currmonth;
  currday;
  constructor(private fetch:FetchService,private router:Router) { }

  ngOnInit() {
    this.refetchEvent();
    this.currmonth = this.time.getMonth()+1;
    this.currday = this.time.getDate();
  }
  refetchEvent(){
    this.fetch.fetchEvent(this.month.no_month).subscribe(
      data=>{
        if(data['result']==1){
          this.events = data['data'];
          for(var i=0;i<this.month.skip_block;i++){
            this.days[i] = {set:false};
          }
          for(var i=0;i<this.month.no_day;i++){
            this.days[i+this.month.skip_block] = {set:true,date:i+1,month:this.month.no_month};
            if(this.days[i+this.month.skip_block].month == this.currmonth && this.days[i+this.month.skip_block].date == this.currday){
              this.days[i+this.month.skip_block].currday = true;
            }else{
              this.days[i+this.month.skip_block].currday = false;
            }
            for(var v=0;v<this.events.length;v++){
              if(i+1==this.events[v]['date']){
                this.days[i+this.month.skip_block].id = this.events[v]['id'];
                this.days[i+this.month.skip_block].date = this.events[v]['date'];
                this.days[i+this.month.skip_block].month = this.events[v]['month'];
                this.days[i+this.month.skip_block].backcolor = this.events[v]['backcolor'];
                this.days[i+this.month.skip_block].color = this.events[v]['color'];
                this.days[i+this.month.skip_block].text = this.events[v]['text'];
                this.days[i+this.month.skip_block].icon = this.events[v]['icon'];
                break;
              }
            }
          }
        }else{
          for(var i=0;i<this.month.skip_block;i++){
            this.days[i] = {set:false};
          }
          for(var i=0;i<this.month.no_day;i++){
            this.days[i+this.month.skip_block] = {set:true,date:i+1,month:this.month.no_month};
            if(this.days[i+this.month.skip_block].month == this.currmonth && this.days[i+this.month.skip_block].date == this.currday){
              this.days[i+this.month.skip_block].currday = true;
            }else{
              this.days[i+this.month.skip_block].currday = false;
            }
          }
        }
      }
    );
  }
  editbuttonclicked(day:Day){
    if(day.set && day.text != null){
      console.log("WATAPAK");
      this.router.navigate(['addevent','edit',day.id,day.date,day.month,day.icon,day.color,day.backcolor,day.text]);
    }else{
      this.router.navigate(['addevent','add','',day.date,day.month,'','','','']);
    }
  }
}
