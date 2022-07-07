import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs/operators';
import { Address, RegisterUserInfo } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent implements OnInit {
  @ViewChild('formwrapper') form:ElementRef<HTMLElement>|null = null;
  @ViewChild('verificationwrapper') verification:ElementRef<HTMLElement>|null = null;
  constructor(private loader:LoaderService,private fetch:FetchService,private router:Router) { }

  ngOnInit() {
  }
  validate(username:string,email:string){
    this.loader.showLoader("Validating Account");
    this.fetch.verifyEmail(username,email)?.subscribe(
      data=>{
        if(this.verification)
        this.verification.nativeElement.style.display = 'flex';
        if(this.form)
        this.form.nativeElement.style.display = 'none';
        this.loader.showLoader("hide");
      },
      error=>{
        this.loader.showLoader("hide");
        this.loader.showAlert(error);
      }
    )
  }
  register(username:string,password:string,firstname:string,lastname:string,middlename:string,code:string,birthday:string,address:Address,profileimage:string){
    this.loader.showLoader("Registering Account");
    var userinfo:RegisterUserInfo = {
      username:username,
      password:password,
      firstname:firstname,
      lastname:lastname,
      middlename:middlename,
      code:code,
      birthday:birthday,
      address:address,
      profileimage:profileimage
    };
    this.fetch.registerUser(userinfo)?.subscribe(
      data=>{
        if(data){
          this.loader.showLoader('hide');
          this.router.navigate(['login']);
          }
        },
        error=>{
          this.loader.showLoader('hide');
          this.loader.showAlert(error);
        }
      );
  }
}
