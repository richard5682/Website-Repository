import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ServiceData } from 'src/app/data/dataType';
import { CacheService } from 'src/app/services/cache.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-serviceaccount',
  templateUrl: './serviceaccount.component.html',
  styleUrls: ['./serviceaccount.component.scss']
})
export class ServiceaccountComponent implements OnInit,OnChanges {
  @Input() servicedata!:ServiceData;
  @Input() bottom:boolean=true;
  @Output() imageclick = new EventEmitter();
  servicepictureURL:string|null=null;
  constructor(private fetch:FetchService,private cache:CacheService) { }

  ngOnInit() {
    
  }
  ngOnChanges(c:SimpleChanges){
    for(let changes in c){
      if(changes == "servicedata"){
        this.fetch.fetchService(this.servicedata.serviceid,true)?.subscribe(
          service=>{
            this.servicedata = service;
            this.fetch.fetchPictures(service.serviceid,true)?.subscribe(
              pictures=>{
                this.servicepictureURL = this.fetch.getServiceThumbnail(pictures,service.serviceid);
              }
            )
          }
        );
      }
    }
  }
  imageClicked(){
    this.imageclick.emit(this.servicedata);
  }
}
