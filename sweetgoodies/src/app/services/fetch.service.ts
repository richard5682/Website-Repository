import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, Parameter, Product, Struct_Product } from '../data/data';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private connect:ConnectService) { }
  fetchItems():Observable<Item[]>|null{
    return this.connect.httpPOST('fetchitems',null).pipe(map(data => data as Item[]));
  }
  fetchProducts():Observable<Product[]>|null{
    return this.connect.httpPOST('fetchproducts',null).pipe(map(data => data as Product[]));
  }
  //ADMIN//
  checkAdmin():Observable<boolean>|null{
    return this.connect.httpPOST('checkadmin',null).pipe(map(data => data as boolean));
  }

  //--
  addProducts(product:Struct_Product):Observable<boolean>|null{
    return this.connect.httpPOST('addproducts',product.getParams()).pipe(map(data => data as boolean));
  }
  editProducts(product:Struct_Product):Observable<boolean>|null{
    return this.connect.httpPOST('editproducts',product.getParams()).pipe(map(data => data as boolean));
  }
  deleteProducts(id:number):Observable<boolean>|null{
    var params:Parameter[] = [
      {index:'id',value:id.toString()},
    ]
    return this.connect.httpPOST('deleteproducts',params).pipe(map(data => data as boolean));
  }
  
  addItems(title:string):Observable<boolean>|null{
    var params:Parameter[] = [
      {index:'title',value:title},
    ]
    return this.connect.httpPOST('additem',params).pipe(map(data => data as boolean));
  }
  editItems(id:number,title:string):Observable<boolean>|null{
    var params:Parameter[] = [
      {index:'id',value:id.toString()},
      {index:'title',value:title},
    ]
    return this.connect.httpPOST('edititem',params).pipe(map(data => data as boolean));
  }
  deleteItems(id:number):Observable<boolean>|null{
    var params:Parameter[] = [
      {index:'id',value:id.toString()}
    ]
    return this.connect.httpPOST('deleteitem',params).pipe(map(data => data as boolean));
  }

  editbillboard(filename:string,picture_data:string):Observable<boolean>|null{
    var params:Parameter[] = [
      {index:'picture_data',value:picture_data.toString()},
      {index:'filename',value:filename}
    ]
    return this.connect.httpPOST('editbillboard',params).pipe(map(data => data as boolean));
  }
  editmenu(picture_data:string):Observable<boolean>|null{
    var params:Parameter[] = [
      {index:'picture_data',value:picture_data.toString()}
    ]
    return this.connect.httpPOST('editmenu',params).pipe(map(data => data as boolean));
  }

  //UTIL//
  getLink(filename:string,type:string):string{
    return this.connect.DOMAIN+"pictures/"+type+"/"+filename;
  }
}
