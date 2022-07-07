import { Component, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Imageuploader_popupComponent } from './components/component/imageuploader_popup/imageuploader_popup.component';
import { ItemcreationComponent } from './components/component/itemcreation/itemcreation.component';
import { LoaderComponent } from './components/component/loader/loader.component';
import { ProductcreationComponent } from './components/component/productcreation/productcreation.component';
import { Item, Product } from './data/data';
import { ConnectService } from './services/connect.service';
import { FetchService } from './services/fetch.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loader') loadercomponent:LoaderComponent;
  @ViewChild('itemcreation') item:ItemcreationComponent;
  @ViewChild('productcreation') product:ProductcreationComponent;
  @ViewChild('imageuploader') imageuploader:Imageuploader_popupComponent;
  title = 'sweetgoodies';
  constructor(private loader:LoaderService){
    this.loader.getObservable().subscribe(
      data=>{
        if(data == 'show'){
          this.loadercomponent.showLoader();
        }else if(data == 'hide'){
          this.loadercomponent.hideLoader();
        }
      }
    )
    this.loader.edititemSubject.asObservable().subscribe(
      data=>{
        this.showItemEditor(data.item,data.subj);
      }
    )
    this.loader.createitemSubject.asObservable().subscribe(
      data=>{
        this.showItemCreation(data);
      }
    )
    this.loader.editproductSubject.asObservable().subscribe(
      data=>{
        this.showProductEditor(data.product,data.subj);
      }
    )
    this.loader.createproductSubject.asObservable().subscribe(
      data=>{
        this.showProductCreation(data);
      }
    )
    this.loader.imageuploaderSubject.asObservable().subscribe(
      data=>{
        this.showImageuploader(data);
      }
    )
  }
  showImageuploader(subj:Subject<string>):Observable<string>{
    this.imageuploader.showUploader(subj);
    return subj.asObservable();
  }
  showItemCreation(subj:Subject<boolean>):Observable<boolean>{
    this.item.showCreation(subj);
    return subj.asObservable();
  }
  showItemEditor(item:Item,subj:Subject<boolean>):Observable<boolean>{
    this.item.showEditor(subj,item);
    return subj.asObservable();
  }
  showProductCreation(subj:Subject<boolean>):Observable<boolean>{
    this.product.showCreation(subj);
    return subj.asObservable();
  }
  showProductEditor(product:Product,subj:Subject<boolean>):Observable<boolean>{
    this.product.showEditor(product,subj);
    return subj.asObservable();
  }
}
