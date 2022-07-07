import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/data/dataType';
import { ConnectService } from 'src/app/services/connect.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-accountView',
  templateUrl: './accountView.component.html',
  styleUrls: ['./accountView.component.scss']
})
export class AccountViewComponent implements OnInit,AfterViewInit {
  @Input() right?:boolean = true;
  @Input() bottom?:boolean = false;
  @Input() userdata!:UserData;
  @Input() size:string="1em";
  @Input() bordersize:string="0";
  @Input() bordercolor:string="black";
  @Output() imageclick = new EventEmitter<UserData>();
  @ViewChild('mainwrapper') wrapper:ElementRef<HTMLElement>|null = null;
  @ViewChild('image') image:ElementRef<HTMLElement>|null = null;
  domain!:string;
  constructor(private connect:ConnectService) { }

  ngOnInit() {
    this.domain = this.connect.DOMAIN;
    
    
  }
  ngAfterViewInit(){
    if(this.wrapper != null){
      this.wrapper.nativeElement.style.fontSize = this.size;
      
    }
    if(this.image != null){
      this.image.nativeElement.style.border = "solid";
      this.image.nativeElement.style.borderWidth = this.bordersize;
      this.image.nativeElement.style.borderColor = this.bordercolor;
    }
  

  }
  imageClicked(){
    this.imageclick.emit(this.userdata);
  }
}
