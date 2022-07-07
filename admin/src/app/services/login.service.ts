import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Parameter, UserData, UserQueryData } from '../data/dataType';
import { ConnectService } from './connect.service';
import { LoaderService } from './loader.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit{
  subjectlogin = new Subject<UserData>();
  subjectlogout = new Subject();
  userLoggedIn:UserData|null =null;
  loggedin:boolean=false;
  constructor(private connect:ConnectService,private loader:LoaderService) { }
  ngOnInit(){
    
  }
}
