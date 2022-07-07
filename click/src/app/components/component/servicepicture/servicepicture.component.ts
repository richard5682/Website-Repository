import { Component, Input, OnInit } from '@angular/core';
import { PictureData } from 'src/app/data/dataType';
import { ConnectService } from 'src/app/services/connect.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-servicepicture',
  templateUrl: './servicepicture.component.html',
  styleUrls: ['./servicepicture.component.scss']
})
export class ServicepictureComponent implements OnInit {
  @Input() serviceID!:number;
  @Input() scrollnumber:number=5;
  previewimage!:string;
  picturesURL = new Array<string>();
  slidecontainer!:HTMLElement;
  container!:HTMLElement;
  slidercontainerwidth!:number;
  containerwidth!:number;
  leftoffset:number=0;
  deltaoffset!:number;
  constructor(private fetch:FetchService,private connect:ConnectService) { }

  ngOnInit() {
    this.fetch.fetchPictures(this.serviceID)?.subscribe(
      data=> {
        this.picturesURL = this.fetch.getServicePictures(data,this.serviceID);
      }
    );
    this.slidecontainer = document.getElementsByClassName('slidercontainer')[0] as HTMLElement;
    this.container = document.getElementsByClassName('container')[0] as HTMLElement;
    this.containerwidth = this.container.offsetWidth;
  }
  prevbutton(event:MouseEvent){
    this.initialize();
    this.leftoffset += this.deltaoffset;
    if(this.leftoffset > 0){
      this.leftoffset = 0;
    }
    this.slidecontainer.style.left = this.leftoffset+"px";
  }
  nextbutton(){
    this.initialize();
    
    this.leftoffset -= this.deltaoffset;
    if(this.leftoffset < -this.slidercontainerwidth+this.containerwidth){
      this.leftoffset = -this.slidercontainerwidth+this.containerwidth;
    }
    this.slidecontainer.style.left = this.leftoffset+"px";
  }
  initialize(){
    if(this.slidercontainerwidth == undefined){
      this.slidercontainerwidth = this.slidecontainer.clientWidth;
      this.deltaoffset = this.slidercontainerwidth/this.scrollnumber;
      if(this.deltaoffset > this.containerwidth){
        this.deltaoffset = this.containerwidth;
      }
    }
  }
}
