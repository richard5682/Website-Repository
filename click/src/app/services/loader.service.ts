import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  subjectLoader:Subject<string> = new Subject<string>();
  subjectAlert:Subject<string> = new Subject<string>();
  constructor() { }
  showLoader(message:string){
    this.subjectLoader.next(message);
  }
  showAlert(message:string){
    this.subjectAlert.next(message);
  }
  notifyOnLoader():Observable<string>{
    return this.subjectLoader.asObservable();
  }
  notifyOnAlert():Observable<string>{
    return this.subjectAlert.asObservable();
  }
}
