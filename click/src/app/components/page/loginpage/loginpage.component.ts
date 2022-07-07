import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit,AfterContentChecked {

  constructor(private login:LoginService,private router:Router) { }
  ngAfterContentChecked(){
    if(this.login.userLoggedIn != null){
      this.router.navigate(['homepage']);
    }
  }
  ngOnInit() {
    
  }

}
