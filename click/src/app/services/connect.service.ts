import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Parameter } from '../data/dataType';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  // DOMAIN:string = "http://localhost/";
  DOMAIN:string = "https://www.clickph.net/";
  API:any = {
    "login":"api/login.php",
    "logout":"api/logout.php",
    "test":"api/test.php",
    "register":"api/registeruser.php",
    "getloggedin":"api/getloggedin.php",
    "servicecreation":"api/wlogin/servicecreation.php",
    "queryservice":"api/queryservice.php",
    "fetchservice":"api/fetchservice.php",
    "getpictures":"api/getpictures.php",
    "getuserbasic":"api/getUserBasic.php",
    "createbooking":"api/wlogin/createbooking.php",
    "getuserbooking":"api/wlogin/getuserbooking.php",
    "getservicebooking":"api/wlogin/getservicebooking.php",
    "sendmessage":"api/wlogin/sendmessage.php",
    "fetchmessage":"api/wlogin/fetchmessages.php",
    "fetchchatroom":"api/wlogin/fetchchatroom.php",
    "getchatrooms":"api/wlogin/getchatroom.php",
    "checkforchanges":"api/wlogin/listenforchatchanges.php",
    "deletebookings":"api/wlogin/deletebookings.php",
    "queryemergency":"api/queryemergency.php",
    "fetchchatpicture":"api/wlogin/fetchchatpicture.php",
    "fetchserviceform":"api/fetchforms.php",
    "createserviceform":"api/wlogin/createform.php",
    "createanswerform":"api/wlogin/createanswerform.php",
    "getformanswer":"api/wlogin/getformanswer.php",
    "fetchbooking":"api/wlogin/fetchbooking.php",
    "editbooking":"api/wlogin/editbooking.php",
    'editmessage':"api/wlogin/editmessage.php",
    'fetchbookingtime':'api/fetchbookingtime.php',
    'addfollowers':"api/wlogin/addFollowers.php",
    'removefollowers':"api/wlogin/removeFollowers.php",
    'fetchfollowers':"api/fetchFollowers.php",
    "instantbook":"api/instantbook.php",
    "verifyemail":"api/verifyemail.php"
  };
  DEVELOPERTEST = true;
  constructor(private http:HttpClient,private loader:LoaderService) { 
  }
  GetToken():string{
    var token = localStorage.getItem('token');
    if(token!=null){
      return token;
    }else{
      return 'null';
    } 
  }
  SetToken(token:string){
    localStorage.setItem('token',token);
  }
  GetHttpParams(params:Parameter[]|null):HttpParams{
    var buffer = new HttpParams();
    if(params != null){
      params.forEach(
        (param)=>{
          buffer = buffer.set(param.index,param.value);
        }
      );
    }
    buffer = buffer.set('token',this.GetToken());
    return buffer; 
  }
  httpGET(api:string,params:Parameter[]|null):null|Observable<any>{
    var xAPI = this.API[api];
    if(xAPI != undefined){
      var url = this.DOMAIN+xAPI;
      var httpparameter = this.GetHttpParams(params);
      var subject = new Subject();
      if(this.DEVELOPERTEST){
        console.log(url+"?"+httpparameter.toString());
      }
      this.http.get<any>(url,{params:httpparameter}).subscribe(
        data => {
          if(data['result']==1){
            subject.next(data['data']);
            subject.complete();
          }else{
            subject.error(data['error']);
            subject.complete();
          }
        }
      );
      return subject.asObservable();
    }else{
      console.log("ERROR NO API FOR " +api);
      return null;
    }
  }
  httpPOST(api:string,params:Parameter[]|null):null|Observable<any>{
    var xAPI = this.API[api];
    if(xAPI != undefined){
      var url = this.DOMAIN+xAPI;
      var httpparameter = this.GetHttpParams(params);
      var subject = new Subject();
      this.http.post<any>(url,httpparameter).subscribe(
        data => {
          if(data['result']==1){
            subject.next(data['data']);
            subject.complete();
          }else{
            subject.error(data['error']);
            subject.complete();
          }
        },
        error=>{
          this.loader.showLoader('hide');
          this.loader.showAlert("Oops Something Went Wrong");
          subject.complete();
        }
      );
      return subject.asObservable();
    }else{
      console.log("ERROR NO API FOR " +api);
      return null;
    }
  }
}
