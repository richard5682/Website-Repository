import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item, Product } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  adminSubject:Subject<string> = new Subject<string>();
  loaderSubject:Subject<string> = new Subject<string>();
  createitemSubject:Subject<Subject<boolean>> = new Subject<Subject<boolean>>();
  edititemSubject:Subject<{item:Item,subj:Subject<boolean>}> = new Subject<{item:Item,subj:Subject<boolean>}>();
  createproductSubject:Subject<Subject<boolean>> = new Subject<Subject<boolean>>();
  editproductSubject:Subject<{product:Product,subj:Subject<boolean>}> = new Subject<{product:Product,subj:Subject<boolean>}>();
  imageuploaderSubject:Subject<Subject<string>> = new Subject<Subject<string>>();
  constructor() { }
  showLoader(){
    this.loaderSubject.next('show');
  }
  hideLoader(){
    this.loaderSubject.next('hide');
  }
  getObservable():Observable<string>{
    return this.loaderSubject.asObservable();
  }
  showImageUploader():Observable<string>{
    var subj:Subject<string> = new Subject<string>();
    this.imageuploaderSubject.next(subj);
    return subj;
  }
  editItem(item:Item):Observable<boolean>{
    var subj:Subject<boolean> = new Subject<boolean>();
    this.edititemSubject.next({item:item,subj:subj});
    return subj.asObservable();
  }
  createItem():Observable<boolean>{
    var subj:Subject<boolean>  = new Subject<boolean>();
    this.createitemSubject.next(subj);
    return subj.asObservable();
  }
  editProduct(product:Product):Observable<boolean>{
    var subj:Subject<boolean> = new Subject<boolean>();
    this.editproductSubject.next({product:product,subj:subj});
    return subj.asObservable();
  }
  createProduct():Observable<boolean>{
    var subj:Subject<boolean>  = new Subject<boolean>();
    this.createproductSubject.next(subj);
    return subj.asObservable();
  }
  redirect(url:string){
    window.open(url, '_blank');
  }
}
