import { Component, Input, OnInit } from '@angular/core';
import { EmergencyServiceData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-emergencyview',
  templateUrl: './emergencyview.component.html',
  styleUrls: ['./emergencyview.component.scss']
})
export class EmergencyviewComponent implements OnInit {
  @Input() service!:EmergencyServiceData;
  @Input() shadow:boolean=false;
  @Input() icon!:string;
  @Input() iconColor!:string;
  pictureURL!:string;
  constructor(private fetch:FetchService) { }

  ngOnInit() {
    if(this.service != undefined){
      this.pictureURL = this.fetch.getEmergencyPicture(this.service.id);
    }
  }

}
