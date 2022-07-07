import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  subjectLoader:Subject<string> = new Subject<string>();
  subjectAlert:Subject<string> = new Subject<string>();
  subjectEditor:Subject<number> = new Subject<number>();
  subjectAdminReload:Subject<boolean> = new Subject<boolean>();
  constructor() { }
  showLoader(message:string){
    this.subjectLoader.next(message);
  }
  showAlert(message:string){
    this.subjectAlert.next(message);
  }
  showEditor(id:number){
    this.subjectEditor.next(id);
  }
  updateAdmin(){
    this.subjectAdminReload.next(true);
  }
  notifyOnLoader():Observable<string>{
    return this.subjectLoader.asObservable();
  }
  notifyOnAlert():Observable<string>{
    return this.subjectAlert.asObservable();
  }
  notifyOnEditor():Observable<number>{
    return this.subjectEditor.asObservable();
  }
  notifyOnUpdateAdmin():Observable<boolean>{
    return this.subjectAdminReload.asObservable();
  }
}
