import { Injectable } from '@angular/core';
import { PictureData, ServiceData, UserData } from '../data/dataType';

interface CacheFormsAnswer{
  cache_formanswer:{form_answerid:number,statement:{number:string,question:string,answer:string}[]};
}
interface CacheProfilePicture{
  cache_profilepicture:{userid:number,link:string};
}
interface CacheServicePicture{
  cache_servicepicture:{serviceid:number,picture:PictureData[]};
}
interface CacheServiceData{
  cache_servicedata:ServiceData;
}
interface CacheUserData{
  cache_userdata:UserData;
}
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  formanswer_statements:CacheFormsAnswer[] = new Array();
  profilepictures:CacheProfilePicture[] = new Array();
  servicepictures:CacheServicePicture[] = new Array();
  servicedatas:CacheServiceData[] = new Array();
  userdatas:CacheUserData[] = new Array();
  constructor() { }
  //GET
  findFormAnswer(formanswerid:number):{number:string,question:string,answer:string}[]|null{
    for(var i=0;i<this.formanswer_statements.length;i++){
      if(this.formanswer_statements[i].cache_formanswer.form_answerid == formanswerid){
        return this.formanswer_statements[i].cache_formanswer.statement;
      }
    }
    return null;
  }
  findProfilePicture(userid:number):string|null{
    for(var i=0;i<this.profilepictures.length;i++){
      if(this.profilepictures[i].cache_profilepicture.userid == userid){
        return this.profilepictures[i].cache_profilepicture.link;
      }
    }
    return null;
  }
  findServicePicture(serviceid:number):PictureData[]|null{
    for(var i=0;i<this.servicepictures.length;i++){
      if(this.servicepictures[i].cache_servicepicture.serviceid == serviceid){
        return this.servicepictures[i].cache_servicepicture.picture;
      }
    }
    return null;
  }
  findServiceData(serviceid:number):ServiceData|null{
    for(var i=0;i<this.servicedatas.length;i++){
      if(this.servicedatas[i].cache_servicedata.serviceid == serviceid){
        return this.servicedatas[i].cache_servicedata;
      }
    }
    return null;
  }
  findUserData(userid:number):UserData|null{
    for(var i=0;i<this.userdatas.length;i++){
      if(this.userdatas[i].cache_userdata.id == userid){
        return this.userdatas[i].cache_userdata;
      }
    }
    return null;
  }
  //CACHE
  addFormAnswer(form_answerid:number,statement:{number:string,question:string,answer:string}[]){
    this.formanswer_statements.push({cache_formanswer:{form_answerid:form_answerid,statement:statement}});
  }
  cacheProfilePicture(userid:number,link:string){
    this.profilepictures.push({cache_profilepicture:{userid:userid,link:link}});
  }
  cacheServicePicture(serviceid:number,pictures:PictureData[]){
    for(var i=0;i<this.servicepictures.length;i++){
      if(this.servicepictures[i].cache_servicepicture.serviceid == serviceid){
        this.servicepictures[i].cache_servicepicture.picture = pictures;
        return;
      }
    }
    this.servicepictures.push({cache_servicepicture:{serviceid:serviceid,picture:pictures}});
  }
  cacheServiceData(servicedata:ServiceData){
    for(var i=0;i<this.servicedatas.length;i++){
      if(this.servicedatas[i].cache_servicedata.serviceid == servicedata.serviceid){
        this.servicedatas[i].cache_servicedata = servicedata;
        return
      }
    }
    this.servicedatas.push({cache_servicedata:servicedata});
  }
  cacheUserData(userdata:UserData){
    for(var i=0;i<this.userdatas.length;i++){
      if(this.userdatas[i].cache_userdata.id == userdata.id){
        this.userdatas[i].cache_userdata = userdata;
        return
      }
    }
    this.userdatas.push({cache_userdata:userdata});
  }
}
