import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, Form, ServiceData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-servicedashboardpage',
  templateUrl: './servicedashboardpage.component.html',
  styleUrls: ['./servicedashboardpage.component.scss']
})
export class ServicedashboardpageComponent implements OnInit {
  serviceID!:number;
  service!:ServiceData;
  constructor(private actroute:ActivatedRoute,private router:Router,private fetch:FetchService,private login:LoginService) { }
  bookings!:Booking[];
  subcategories!:string[];
  forms:Form[] = new Array();

  pickedsubcat!:string;
  pickedform!:Form;
  ngOnInit() {
    var id = this.actroute.snapshot.paramMap.get('id');
    if(id != null){
      this.serviceID = parseInt(id);
    }else{
      this.router.navigate(['homepage']);
    }
    this.fetch.fetchService(this.serviceID)?.subscribe(
      service=>{
        if(this.login.userLoggedIn?.id == service.ownerid){
          this.service = service;
          this.subcategories = this.service.subcategories.split(',');
          this.pickedsubcat = this.subcategories[0];
          this.fetch.fetchServiceBookings(this.serviceID)?.subscribe(
            booking=>{
              this.bookings = booking;
              console.log(this.bookings);
            }
          )
          this.fetch.fetchServiceForms(service.serviceid,null)?.subscribe(
            forms=>{
              this.forms = forms;
            }
          )
        }else{
          this.router.navigate(['homepage']);
        }
      }
    );
    
  }
  subcatpicked(subcat:string){
    this.pickedsubcat = subcat;
    var formexist = false;
    if(this.forms != undefined){
      this.forms.forEach(form=>{
        if(form.subcategory == this.pickedsubcat){
          this.pickedform = form;
          formexist = true;
        }
      })
    }
    if(!formexist){
      var form:Form = {formid:0,serviceid:this.serviceID,subcategory:this.pickedsubcat,formdata:''};
      this.forms.push(form);
      this.pickedform = form;
    }
  }

}
