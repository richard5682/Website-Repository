import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChatRoom } from 'src/app/data/dataType';

@Component({
  selector: 'app-pricepicker',
  templateUrl: './pricepicker.component.html',
  styleUrls: ['./pricepicker.component.scss']
})
export class PricepickerComponent implements OnInit{
  @Input() fixvalue:number=0;
  @Input() percentage:number=0;
  total!:number;
  @Input()currentval:number=0;
  @Output() priceSet = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    this.calculateTotal();
  }
  getBooking(){

  }
  calculateTotal(){
    if(this.fixvalue != undefined){
      this.total = this.currentval + this.fixvalue;
    }else if(this.percentage != undefined){
      this.total = this.currentval + (this.currentval*this.percentage);
    }
  }
  emitPrice(){
    this.calculateTotal();
    this.priceSet.emit(this.total);
  }
}
