import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  constructor(private authService:SocialAuthService,private loader:LoaderService,private loginservice:LoginService,public router:Router) { }

  ngOnInit() {
  }
  login(username:string,password:string){
    this.loader.showLoader('Logging In');
    this.loginservice.login(username,password).subscribe(
      data=>{
        if(data == 1){ 
          this.loader.showLoader('hide');
          this.router.navigate(['homepage']);
        }
      },
      error => {
        this.loader.showAlert(error);
        this.loader.showLoader('hide');
      }
    );
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
