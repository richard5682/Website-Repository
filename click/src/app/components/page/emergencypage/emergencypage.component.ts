import { Component, OnInit } from '@angular/core';
import { EmergencyServiceData, EmergencyServiceQueryData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-emergencypage',
  templateUrl: './emergencypage.component.html',
  styleUrls: ['./emergencypage.component.scss']
})
export class EmergencypageComponent implements OnInit {
  emergency_services!:EmergencyServiceData[];
  constructor(private fetch:FetchService,private loader:LoaderService) { }
  ngOnInit() {
    
  }
  QueryEmergencyService(query:EmergencyServiceQueryData){
    this.loader.showLoader("Querying Emergency Services");
    this.fetch.queryEmergencyService(query)?.subscribe(
      data=>{
        this.loader.showLoader("hide");
        this.emergency_services = data;
        console.log(data);
      },
      error=>{
        this.loader.showLoader("hide");
        this.loader.showAlert(error)
      }
    )
  }

}
