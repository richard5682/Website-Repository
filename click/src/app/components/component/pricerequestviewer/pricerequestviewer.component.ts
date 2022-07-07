import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pricerequestviewer',
  templateUrl: './pricerequestviewer.component.html',
  styleUrls: ['./pricerequestviewer.component.scss']
})
export class PricerequestviewerComponent implements OnInit {
  @Input() pricedata!:string;
  @Input() isUser:boolean=false;
  @Output() accepted = new EventEmitter();
  @Output() decline = new EventEmitter<boolean>();
  value!:number;
  state!:number;
  class:string="pending";
  constructor() { }

  ngOnInit() {
    var data = this.pricedata.split("|");
    this.value = parseInt(data[0]);
    this.state = parseInt(data[1]);
    if(this.state == 0){
      this.class = "rejected";
    }else if(this.state == 1){
      this.class = "pending";
    }else  if(this.state == 2){
      this.class = "accepted";
    }else if(this.state == 3){
      this.class = "cancelled";
    }
  }
}
