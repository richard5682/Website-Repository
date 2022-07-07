import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Form } from '../data/dataType';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  formSubject:Subject<Form|null> = new Subject<Form|null>();
  formAnswerSubject!:Subject<{form:Form,answer:string[]}|null>;
  constructor(private router:Router) { }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  updateAnswer(form:Form|null,answer:string[]|null){
    if(answer != null && form != null){
      this.formAnswerSubject.next({form:form,answer:answer});
      this.formAnswerSubject.complete();
    }else{
      this.formAnswerSubject.next(null);
      this.formAnswerSubject.complete();
    }
    
  }
  showform(form:Form|null){
    this.formSubject.next(form);
  }
  notifyOnFormSubject():Observable<Form|null>{
    return this.formSubject.asObservable();
  }
  notifyOnAnswer(form:Form|null):Observable<{form:Form,answer:string[]}|null>{
    this.formAnswerSubject = new Subject<{form:Form,answer:string[]}|null>();
    this.formSubject.next(form);
    return this.formAnswerSubject.asObservable();
  }
}
