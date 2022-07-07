import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.scss']
})
export class LoginformComponent implements OnInit {

  constructor(private loader:LoaderService,private loginservice:LoginService,public router:Router) { }

  ngOnInit() {
  }
  login(username:string,password:string){
    
  }
}
