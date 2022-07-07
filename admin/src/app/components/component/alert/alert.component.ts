import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alertwrapper!:HTMLElement|null;
  message:string = "LOADING";
  constructor(private loader:LoaderService) { }

  ngOnInit() {
    this.alertwrapper = document.getElementById('alert');                        
    this.loader.notifyOnAlert().subscribe(
      message=>{
        if(this.alertwrapper != null){
          if(message == 'hide'){
            this.alertwrapper.style.display = 'none';
          }else{
            this.alertwrapper.style.display = 'flex';
            this.message = message;
          }
        }
        
      }
    )
  }
  hide(){
    if(this.alertwrapper != null){
      this.alertwrapper.style.display = 'none';
    }
  }
}
