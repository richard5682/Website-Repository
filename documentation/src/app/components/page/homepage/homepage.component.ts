import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/service/fetch.service';
import { ComponentData } from '../../dataType/ComponentData';
import { DataInterface } from '../../dataType/DataInterface';
import { Month } from '../../dataType/Month';
import { PageData } from '../../dataType/PageData';
import { ServiceData } from '../../dataType/ServiceData';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  component:ComponentData[] = [
  ];
  datatype:DataInterface[] = [
  ];
  page:PageData[] = [
  ];
  service:ServiceData[] = [
  ];
  componentkey = ['edit','id','class','selector','description','input','output'];
  servicekey = ['edit','id','class','description','methods'];
  datakey = ['edit','id','class','description','data']
  pagekey = ['edit','id','class','description','selector','routeselector','params']

  month : Month[] = [
    {month:'March',no_month:3,no_day:31,skip_block:1},
    {month:'April',no_month:4,no_day:30,skip_block:4},
    {month:'May',no_month:5,no_day:31,skip_block:6},
    {month:'June',no_month:6,no_day:30,skip_block:2},
    {month:'July',no_month:7,no_day:31,skip_block:4},
    {month:'August',no_month:8,no_day:31,skip_block:0}
  ];
  constructor(private fetch:FetchService,private router:Router,private http:HttpClient) { }

  ngOnInit() {
    this.fetch.getRequest('fetchdata',new HttpParams()).subscribe(
      data => {
        if(data['result']==1){
          this.component = data['components'];
          this.datatype = data['datatype'];
          this.service = data['services'];
          this.page = data['pages'];
          this.fetch.component = data['components'];
          this.fetch.service = data['services'];
          this.fetch.page = data['pages'];
          this.fetch.datatype = data['datatype'];
        }
      }
    )
  }
  GotoAdd(type:string){
    this.router.navigate(['add',type]);
  }
  GotoEdit(type:string){
    this.router.navigate(['edit',type]);
  }
}
