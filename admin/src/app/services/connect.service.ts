import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Parameter } from '../data/dataType';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  DOMAIN:string = "http://localhost/admin";
  // DOMAIN:string = "https://admin.clickph.net/";
  API:any = {
   
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
