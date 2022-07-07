import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Address, EmergencyServiceQueryData } from 'src/app/data/dataType';

@Component({
  selector: 'app-emergencyquerier',
  templateUrl: './emergencyquerier.component.html',
  styleUrls: ['./emergencyquerier.component.scss']
})
export class EmergencyquerierComponent implements OnInit {
  @Output() submit:EventEmitter<EmergencyServiceQueryData> = new EventEmitter<EmergencyServiceQueryData>();
  constructor() { }

  ngOnInit() {
  }
  SearchButtonClicked(category:string,location:Address){
    this.submit.emit({category:category,province:location.province,city:location.city});
  }
}
