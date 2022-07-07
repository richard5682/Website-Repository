import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSequence } from 'selenium-webdriver';
import { FetchService } from 'src/app/service/fetch.service';
import { Day } from '../../dataType/Day';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss']
})
export class AddeventComponent implements OnInit {
  id=0;
  type;
  date;
  month;
  icon;
  color;
  backcolor;
  text;
  routerp;
  constructor(private router:Router,private actroute:ActivatedRoute,private fetch:FetchService) { 
    this.routerp = router;
  }

  ngOnInit() {
    this.id = parseInt(this.actroute.snapshot.paramMap.get('id'));
    this.type = this.actroute.snapshot.paramMap.get('type');
    this.date = this.actroute.snapshot.paramMap.get('date');
    this.month = this.actroute.snapshot.paramMap.get('month');
    this.icon = this.actroute.snapshot.paramMap.get('icon');
    this.color = this.actroute.snapshot.paramMap.get('color');
    this.backcolor = this.actroute.snapshot.paramMap.get('backcolor');
    this.text = this.actroute.snapshot.paramMap.get('text');
  }
  addEvent(date,month,icon,color,backcolor,text){
    var day:Day = {set:true,id:0,date:date,month:month,icon:icon,color:color,backcolor:backcolor,text:text};
    this.fetch.addEvent(day).subscribe(
      data=> {
        if(data['result']==1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  editEvent(date,month,icon,color,backcolor,text){
    var day:Day = {set:true,id:this.id,date:date,month:month,icon:icon,color:color,backcolor:backcolor,text:text};
    this.fetch.editEvent(day).subscribe(
      data=> {
        if(data['result']==1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
}
