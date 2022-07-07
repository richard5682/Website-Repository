import { isDefined } from '@angular/compiler/src/util';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceData } from 'src/app/data/dataType';
import { ConnectService } from 'src/app/services/connect.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-serviceview',
  templateUrl: './serviceview.component.html',
  styleUrls: ['./serviceview.component.scss']
})
export class ServiceviewComponent implements OnInit,OnChanges {
  @Input() service!:ServiceData;
  @Input() shadow:boolean=false;
  @Input() icon!:string;
  @Input() iconColor!:string;
  @Input() redirect:boolean=true;

  @Output() clickedService = new EventEmitter<ServiceData>();
  pictureURL!:string;
  ratingarray!:Array<any>;
  constructor(private router:Router,private connect:ConnectService,private fetch:FetchService) { }

  ngOnInit() {

  }
  ngOnChanges(changes:SimpleChanges) {
    for(let c in changes){
      if(c=="service"){
        if(this.service != undefined){
          this.ratingarray = Array(Math.round(this.service.rating)).fill(5);
          this.fetch.fetchPictures(this.service.serviceid)?.subscribe(
            data=>{
                var url = this.fetch.getServiceThumbnail(data,this.service.serviceid);
                if(url!= null){
                  this.pictureURL = url;
                }
            }
          )
        }
      }
    }
  }
  serviceClicked(){
    if(this.redirect){
      this.router.navigate(['servicepage',this.service.serviceid]);
    }
    this.clickedService.emit(this.service);
  }
}
