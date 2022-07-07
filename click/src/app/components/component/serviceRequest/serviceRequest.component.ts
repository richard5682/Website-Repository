import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServiceData, ServiceRequest, UserData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-serviceRequest',
  templateUrl: './serviceRequest.component.html',
  styleUrls: ['./serviceRequest.component.scss']
})
export class ServiceRequestComponent implements OnInit {
  @Input() serviceRequest!:ServiceRequest;
  service!:ServiceData;
  owner!:UserData;
  state!:string;
  @Output() StateChange = new EventEmitter();
  constructor(private fetch:FetchService) { }

  ngOnInit() {
    this.fetch.fetchService(this.serviceRequest.serviceid)?.subscribe(
      data=>{
        this.service=data;
        this.fetch.fetchBasicUser(this.service.ownerid)?.subscribe(
          data=>{
            this.owner=data;
            this.owner.id = this.service.ownerid;
            this.state = this.serviceRequest.state;
          }
        )
      }
    )
  }
  Accept(){
    this.fetch.updateServiceRequest(this.serviceRequest.id,2);
    this.StateChange.emit();
  }
  Decline(){
    this.fetch.updateServiceRequest(this.serviceRequest.id,1);
    this.StateChange.emit();
  }
}
