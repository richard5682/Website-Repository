import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ComponentData } from '../components/dataType/ComponentData';
import { DataInterface } from '../components/dataType/DataInterface';
import { Day } from '../components/dataType/Day';
import { PageData } from '../components/dataType/PageData';
import { ServiceData } from '../components/dataType/ServiceData';

@Injectable({
  providedIn: 'root'
})
export class FetchService implements OnInit{
  link = 'clickdocumentation.000webhostapp.com';
  // link = 'localhost';
  phpfile = Array();
  component:ComponentData[] = [
  ];
  datatype:DataInterface[] = [
  ];
  page:PageData[] = [
  ];
  service:ServiceData[] = [
  ];
  constructor(private http:HttpClient) { 
    this.phpfile['fetchdata'] = 'FetchData.php';
    this.phpfile['addcomponent'] = 'AddComponent.php';
    this.phpfile['adddata'] = 'AddData.php';
    this.phpfile['addservice'] = 'AddService.php';
    this.phpfile['addpage'] = 'AddPage.php';
    this.phpfile['editcomponent'] = 'EditComponent.php';
    this.phpfile['editdata'] = 'EditData.php';
    this.phpfile['editservice'] = 'EditService.php';
    this.phpfile['editpage'] = 'EditPage.php';
    this.phpfile['addevent'] = 'AddEvent.php';
    this.phpfile['editevent'] = 'EditEvent.php';
    this.phpfile['fetchevent'] = 'FetchEvent.php';
  }
  ngOnInit(){
    
  }
  addComponent(iclass,selector,desc,input,output){
    var params = new HttpParams()
    .set('class',iclass)
    .set('selector',selector)
    .set('desc',desc)
    .set('input',input)
    .set('output',output);
    return this.getRequest('addcomponent',params);
  }
  addService(iclass,desc,method){
    var params = new HttpParams()
    .set('class',iclass)
    .set('desc',desc)
    .set('method',method);
    return this.getRequest('addservice',params);
  }
  addPage(iclass,desc,selector,routeselector,param){
    var params = new HttpParams()
    .set('class',iclass)
    .set('selector',selector)
    .set('desc',desc)
    .set('routeselector',routeselector)
    .set('params',param);
    return this.getRequest('addpage',params);
  }
  addData(iclass,desc,data){
    var params = new HttpParams()
    .set('class',iclass)
    .set('desc',desc)
    .set('data',data);
    return this.getRequest('adddata',params);
  }
  editComponent(id,iclass,selector,desc,input,output){
    var params = new HttpParams()
    .set('id',id)
    .set('class',iclass)
    .set('selector',selector)
    .set('desc',desc)
    .set('input',input)
    .set('output',output);
    return this.getRequest('editcomponent',params);
  }
  editService(id,iclass,desc,method){
    var params = new HttpParams()
    .set('id',id)
    .set('class',iclass)
    .set('desc',desc)
    .set('method',method);
    return this.getRequest('editservice',params);
  }
  editPage(id,iclass,desc,selector,routeselector,param){
    var params = new HttpParams()
    .set('id',id)
    .set('class',iclass)
    .set('selector',selector)
    .set('desc',desc)
    .set('routeselector',routeselector)
    .set('params',param);
    return this.getRequest('editpage',params);
  }
  editData(id,iclass,desc,data){
    var params = new HttpParams()
    .set('id',id)
    .set('class',iclass)
    .set('desc',desc)
    .set('data',data);
    return this.getRequest('editdata',params);
  }
  getRequest(file:string,params:HttpParams):Observable<any>{
    var url = "http://"+this.link+"/doclib/"+this.phpfile[file];
    return this.http.get(url,{params:params});
  }
  addEvent(day:Day){
    var params = new HttpParams()
    .set('date',day.date.toString())
    .set('month',day.month.toString())
    .set('icon',day.icon)
    .set('color',day.color)
    .set('backcolor',day.backcolor)
    .set('text',day.text);
    return this.getRequest('addevent',params);
  }
  editEvent(day:Day){
    var params = new HttpParams()
    .set('id',day.id.toString())
    .set('date',day.date.toString())
    .set('month',day.month.toString())
    .set('icon',day.icon)
    .set('color',day.color)
    .set('backcolor',day.backcolor)
    .set('text',day.text);
    return this.getRequest('editevent',params);
  }
  fetchEvent(month:number):Observable<any>{
    var params = new HttpParams()
    .set('month',month.toString());
    return this.getRequest('fetchevent',params);
  }
}
