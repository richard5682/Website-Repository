import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Parameter } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  // DOMAIN:string = "http://localhost/";
  DOMAIN:string = "http://sweetdreamsgoodies.great-site.net/";
  TESTING:boolean = true;
  API:any = {
    'fetchproducts':'api/fetchproducts.php',
    'fetchitems':'api/fetchitems.php',
    'addproducts':'api/admin/addproducts.php',
    'deleteproducts':'api/admin/deleteproducts.php',
    'editproducts':'api/admin/editproducts.php',
    'edititem':'api/admin/edititem.php',
    'additem':'api/admin/additem.php',
    'deleteitem':'api/admin/deleteitem.php',
    'checkadmin':'api/checkadmin.php',
    'editmenu':'api/admin/editmenu.php',
    'editbillboard':'api/admin/editbillboard.php'
  };
  constructor(private http:HttpClient) { }
  GetHttpParams(params:Parameter[]|null):HttpParams{
    var buffer = new HttpParams();
    if(params != null){
      params.forEach(
        (param)=>{
          buffer = buffer.set(param.index,encodeURIComponent(param.value));
        }
      );
    }
    return buffer; 
  }
  httpPOST(api:string,params:Parameter[]|null):null|Observable<any>{
    var xAPI = this.API[api];
    if(xAPI != undefined){
      if(this.TESTING){
        var url = this.DOMAIN+'sweetgoodies/'+xAPI;
      }else{
        var url = this.DOMAIN+xAPI;
      }
      var httpparameter = this.GetHttpParams(params);
      var headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
      var subject = new Subject();
      this.http.post<any>(url,httpparameter,{headers:headers}).subscribe(
        data => {
          if(data['result'] == 1){
            subject.next(data['data']);
            subject.complete();
          }else{
            subject.error(data['error']);
            subject.complete();
          }
        },
        error=> {
          console.log("SOMETHING WENT WRONG");
          subject.error(error);
          subject.complete();
        }
      );
      return subject.asObservable();
    }else{
      console.log("ERROR NO API FOR " + api);
      return null;
    }
  }
}
