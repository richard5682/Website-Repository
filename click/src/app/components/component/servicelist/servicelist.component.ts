import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { EmergencyServiceData, ServiceData } from 'src/app/data/dataType';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit,OnChanges {
  @Input() services_array!:ServiceData[][];
  @Input() services!:ServiceData[];
  @Input() emergencyservices!:EmergencyServiceData[];
  @Input() title!:string;
  @Input() horizontal!:boolean;
  @Input() shadow:boolean=true;
  @Input() titlecolor:string="orange";
  @Input() icon!:string;
  @Input() iconColor:string="black";
  @Input() redirect:boolean=true;

  @Output() clickedService = new EventEmitter<ServiceData>();
  isEmergency:boolean = false;
  constructor() { }

  ngOnInit() {
    if(this.emergencyservices != undefined){
      this.isEmergency = true;
    }
    if(this.services_array != undefined){
      this.services = new Array<ServiceData>();
      this.services_array.forEach(
        services =>{
          services.forEach(
            service => {
              this.services.push(service);
            }
          )
        }
      )
    }
  }
  ngOnChanges(changes:SimpleChanges){
    for(let c in changes){
      if(c == 'emergencyservices'){
        if(this.emergencyservices != undefined){
          if(this.emergencyservices != undefined){
            this.isEmergency = true;
          }
        }
      }
    }
  }

}
