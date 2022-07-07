import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address, Pictures, ServiceType } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-servicecreation',
  templateUrl: './servicecreation.component.html',
  styleUrls: ['./servicecreation.component.scss']
})
export class ServicecreationComponent implements OnInit {

  constructor(private login:LoginService,private loader:LoaderService, private fetch:FetchService,private router:Router) { }

  ngOnInit() {
    if(!this.login.loggedin){
      this.router.navigate(['login']);
    }
  }
  submit(price:string,title:string,desc:string,service:ServiceType,location:Address,thumbnail:string,image1:string,image2:string,image3:string,image4:string,image5:string){
    var pictures = new Array<string>();
    pictures.push(image1);
    pictures.push(image2);
    pictures.push(image3);
    pictures.push(image4);
    pictures.push(image5);
    var picturesobject:Pictures = new Pictures(pictures)
    console.log(picturesobject.getString());
    this.loader.showLoader("Registering Service Please Wait");      
    this.fetch.registerService({title:title,price:price,description:desc,address:location,thumbnail:thumbnail,pictures:picturesobject,servicetype:service})?.subscribe(
      data=>{
        if(data){
          this.loader.showLoader("hide");
          this.router.navigate(['homepage']);
        }
      },
      error=>{
        this.loader.showLoader("hide");
        this.loader.showAlert(error);
      }
    );
  }
}
