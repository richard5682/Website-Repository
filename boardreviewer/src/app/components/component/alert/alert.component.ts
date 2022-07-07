import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  alertwrapper!:HTMLElement|null;
  message:string = "LOADING";
  icon:string = "done";
  color:string = 'darkred';
  @ViewChild('iconobj') iconobj:ElementRef<HTMLElement>;
  constructor(private loader:LoaderService) { }

  ngOnInit() {
    this.alertwrapper = document.getElementById('alert');                        
    this.loader.notifyOnAlert().subscribe(
      message=>{
        if(this.alertwrapper != null){
          if(message == 'hide'){
            this.alertwrapper.style.display = 'none';
          }else{
            var messagesplit = message.split("|");
            this.alertwrapper.style.display = 'flex';
            if(messagesplit.length > 1 ){
              this.icon = messagesplit[1];
              this.message = messagesplit[0];
              this.iconobj.nativeElement.style.color = messagesplit[2];
            }else{
              this.icon = 'error';
              this.message = message;
              this.iconobj.nativeElement.style.color = "darkred";
            }
            
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
