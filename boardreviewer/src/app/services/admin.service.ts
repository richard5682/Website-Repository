import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  isAdmin:boolean=false;
  notifyOnAdmin:Subject<boolean> = new Subject<boolean>();
  constructor(private connect:ConnectService) { }
  checkAdmin(){
    this.connect.httpPOST('checkadmin',null).subscribe(
      data=>{
        if(data){
          this.isAdmin = true;
          this.notifyOnAdmin.next(true);
        }
      },
      error=>{

      }
    )
  }
  subscribeOnAdmin():Observable<boolean>{
    return this.notifyOnAdmin.asObservable();
  }
}
