import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loaderwrapper!:HTMLElement|null;
  message:string = "LOADING";
  constructor(private loader:LoaderService) { }

  ngOnInit() {
    this.loaderwrapper = document.getElementById('loader');                        
    this.loader.notifyOnLoader().subscribe(
      message=>{
        if(this.loaderwrapper != null){
          if(message == 'hide'){
            this.loaderwrapper.style.display = 'none';
          }else{
            this.loaderwrapper.style.display = 'flex';
            this.message = message;
          }
        }
        
      }
    )
  }

}
