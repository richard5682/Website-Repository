import { Injectable, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
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
  constructor(private authService:SocialAuthService,private connect:ConnectService,private loader:LoaderService) { }
  ngOnInit(){
    this.authService.authState.subscribe(
      user=>{
        console.log(user);

      }
    )
  }


  login(username:string,password:string):Observable<number>{
    var params:Parameter[] = [
      {index:"username",value:username},
      {index:"password",value:password}
    ];
    var subjectresult = new Subject<number>();
    var obs:Observable<{userdata:UserData,token:string}>|undefined = this.connect.httpPOST('login',params)?.pipe(map(
      (res)=>res as {userdata:UserData,token:string}
    ));
    obs?.subscribe(
      data=>{
        this.userLoggedIn = data.userdata;
        this.loggedin = true;
        this.connect.SetToken(data.token);
        this.subjectlogin.next(data.userdata);
        subjectresult.next(1);
      },
      error=>{
        subjectresult.error(error);
        subjectresult.complete();
      }
    );
    return subjectresult.asObservable();
  }
  logout(){
    this.loader.showLoader('Logging Out');
    this.connect.httpPOST('logout',null)?.subscribe(
      data=>{
        this.loader.showLoader('hide');
        this.loggedin = false;
        this.userLoggedIn = null;
        this.subjectlogout.next(null);
      }
    );
  }
  checkLoggedIn(){
    if(this.userLoggedIn == null){
      this.connect.httpPOST('getloggedin',null)?.subscribe(
        data=>{
          this.loggedin = true;
          this.userLoggedIn = data;
          this.subjectlogin.next(data);
        },
        error=>{
          this.loggedin = false;
          this.userLoggedIn = null;
          this.subjectlogout.next(undefined);
        }
      )
    }
  }
  notifyOnLogin() : Observable<UserData>{
    return this.subjectlogin.asObservable();
  }
  notifyOnLogout() : Observable<any>{
    return this.subjectlogout.asObservable();
  }
}
