import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Parameter } from '../data/dataType';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  // DOMAIN:string = "http://localhost/boardreviewapi/";
  DOMAIN:string = "http://boardreview.great-site.net/";
  API:any = {
   'fetchquestion':'api/fetchquestion.php',
   'addquestion':'api/addquestion.php',
   'getquestions':'api/admin/getquestions.php',
   'editquestions':'api/admin/editquestions.php',
   'checkadmin':"api/checkadmin.php",
   'deletequestion':'api/admin/deletequestion.php',
   'addstatistics':'api/addstatistics.php',
   'getstatistics':'api/getstatistics.php',
   'uploadquestion':'api/admin/uploadquestion.php',
   'getwebsitestats':'api/admin/getwebsitestats.php',
   'addname':'api/addname.php'
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
          buffer = buffer.set(param.index,encodeURIComponent(param.value));
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
      var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
      var subject = new Subject();
      this.http.post<any>(url,httpparameter,{headers: headers}).subscribe(
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
