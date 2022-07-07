import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarMarkDate } from 'src/app/data/dataType';

interface dayobj{
  date:Date;
  color:string;
  backcolor:string;
  hint?:string;
}
interface monthobj{
  days:dayobj[];
  month:number;
  filler?:number[];
}
interface yearobj{
  months:monthobj[];
  year:number;
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit,AfterViewInit,OnChanges {
  
  
  @Input() year!:number;
  @Input() month!:number;
  @Input() days!:number;

  @Input() markdate!:CalendarMarkDate[];

  @Output() dateClick = new EventEmitter<Date>();
  years:yearobj[] = new Array();
  currentDate = new Date(Date.now());

  monthswrapper!:HTMLCollectionOf<HTMLElement>;
  yearwrapper!:HTMLCollectionOf<HTMLElement>
  deltamonthheight!:number;
  bottommonthcurrent:number = 0;

  deltayearheight!:number;
  bottomyearcurrent:number = 0;

  setyear!:number;
  constructor() { }
  ngOnChanges(changes:SimpleChanges){
    for(let c in changes){
      if(c=="markdate"){
        this.markDates();
      }
    }
  }
  ngAfterViewInit(){
    this.monthswrapper = document.getElementsByClassName("monthwrapper") as HTMLCollectionOf<HTMLElement>;
    this.yearwrapper = document.getElementsByClassName('yearwrapper') as HTMLCollectionOf<HTMLElement>;
    var mheight = this.monthswrapper.item(0)?.clientHeight;
    var yheight = this.monthswrapper.item(0)?.clientHeight;
    
    if(mheight != undefined){
      this.deltamonthheight = mheight;
    }
    if(yheight != undefined){
      this.deltayearheight = yheight;
    }
    this.slideto(this.month);
  }
  ngOnInit() {
    this.year = this.currentDate.getFullYear();
    this.setyear = this.year;
    this.month = this.currentDate.getMonth();
    this.days = this.currentDate.getDate();
    
    this.years.push(this.generateYear(this.year));
    this.years.push(this.generateYear(this.year+1));
    this.years[0].months[this.month].days[this.days-1].color = "white";
    this.years[0].months[this.month].days[this.days-1].backcolor = 'gray';
    this.markDates();
  }
  markDates(){
    if(this.markdate != undefined){
      this.clearDates();
      this.markdate.forEach(date => {
        var year = date.date.getFullYear()-this.year;
        var month = date.date.getMonth();
        var days = date.date.getDate()-1;
        this.years[year].months[month].days[days].color = date.color;
        this.years[year].months[month].days[days].backcolor = date.backcolor;
      });
    }
    
  }
  clearDates(){
    this.years.forEach(year => {
      year.months.forEach(month => {
        month.days.forEach(day => {
          if(day.date.getTime() < Date.now()){
            day.backcolor = 'whitesmoke';
            day.color = 'gray';
          }else{
            day.backcolor = 'white';
            day.color = 'black';
          }
        });
      });
    });
    if(this.years[0] != undefined){
      this.years[0].months[this.month].days[this.days-1].color = "white";
      this.years[0].months[this.month].days[this.days-1].backcolor = 'gray';
    }
  }
  generateYear(year:number):yearobj{
    var monthbuffer:monthobj[] = new Array();
    for(var i=0;i<12;i++){
      var month = this.generateMonth(year,i);
      if(month != undefined){
        var filler:number[] = new Array();
        for(var f=0;f<month.days[0].date.getDay();f++){
          filler.push(f);
        }
        month.filler = filler;
        monthbuffer.push(month);
      }
    }
    return {months:monthbuffer,year:year};
  }
  generateMonth(year:number,month:number):monthobj|undefined{
    var leapyear:boolean = false;
    if(year % 4 == 0){
      leapyear = true;
    }
    switch(month){
      case 0:
        return {days:this.generateDays(year,month,31),month:month};
      break;
      case 1:
        if(leapyear){
          return {days:this.generateDays(year,month,29),month:month};
        }else{
          return {days:this.generateDays(year,month,28),month:month};
        }
      break;
      case 2:
        return {days:this.generateDays(year,month,31),month:month};
      break;
      case 3:
        return {days:this.generateDays(year,month,30),month:month};
      break;
      case 4:
        return {days:this.generateDays(year,month,31),month:month};
      break;
      case 5:
        return {days:this.generateDays(year,month,30),month:month};
      break;
      case 9:
        return {days:this.generateDays(year,month,31),month:month};
      break;
      case 7:
        return {days:this.generateDays(year,month,31),month:month};
      break;
      case 8:
        return {days:this.generateDays(year,month,30),month:month};
      break;
      case 9:
        return {days:this.generateDays(year,month,31),month:month};
      break;
      case 10:
        return {days:this.generateDays(year,month,30),month:month};
      break;
      case 11:
        return {days:this.generateDays(year,month,31),month:month};
      break;
    }
    return undefined;
  }
  generateDays(year:number,month:number,noday:number):dayobj[]{
    var daybuffer:dayobj[] = new Array();
    for(var i=1;i<=noday;i++){
      var date = new Date();
      date.setFullYear(year);
      date.setMonth(month);
      date.setDate(i);
      daybuffer.push({date:date,color:'black',backcolor:'white'});
    }
    return daybuffer;
  }
  slideto(month:number){
    this.bottommonthcurrent += this.deltamonthheight*month;
    for(var i=0;i<this.monthswrapper.length;i++){
      this.monthswrapper[i].style.bottom =this.bottommonthcurrent+"px";
    }
  }
  slideup(){
    if(this.monthswrapper != null){
      this.bottommonthcurrent += this.deltamonthheight;
      if(this.bottommonthcurrent > this.deltamonthheight*10){
        this.bottomyearcurrent += this.deltayearheight;
        if(this.bottomyearcurrent > this.deltayearheight*(this.years.length-1)){
          this.bottommonthcurrent =  this.deltamonthheight*10;
          this.bottomyearcurrent = this.deltayearheight*(this.years.length-1);
        }else{
          this.bottommonthcurrent = 0;
          
        }
      }
      for(var i=0;i<this.monthswrapper.length;i++){
        this.monthswrapper[i].style.bottom =this.bottommonthcurrent+"px";
      }
      for(var i=0;i<this.yearwrapper.length;i++){
        this.yearwrapper[i].style.bottom =this.bottomyearcurrent+"px";
      }
    }
  }
  slidedown(){
    if(this.monthswrapper != null){
      this.bottommonthcurrent -= this.deltamonthheight;
      if(this.bottommonthcurrent < 0){
        this.bottomyearcurrent -= this.deltayearheight;
        if(this.bottomyearcurrent < 0){
          this.bottommonthcurrent = 0;
          this.bottomyearcurrent = 0;
        }else{
          this.bottommonthcurrent = this.deltamonthheight*10;
        }
      }
      for(var i=0;i<this.monthswrapper.length;i++){
        this.monthswrapper[i].style.bottom =this.bottommonthcurrent+"px";
      }
      for(var i=0;i<this.yearwrapper.length;i++){
        this.yearwrapper[i].style.bottom =this.bottomyearcurrent+"px";
      }
    }
  }
  emitDate(date:Date){
    this.dateClick.emit(date);
  }
}
