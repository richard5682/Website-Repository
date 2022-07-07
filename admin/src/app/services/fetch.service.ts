import { Injectable, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Booking, CommentData, EmergencyServiceData, EmergencyServiceQueryData, EmergencyServiceRegisterInfo, Form, FormAnswer, Parameter, PictureData, RegisterUserInfo, ServiceData, ServiceQueryData, ServiceRegisterInfo, ServiceRequest, ServiceType, UserData, UserQueryData } from '../data/dataType';
import { ConnectService } from './connect.service';
import { map } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService implements OnInit{

  constructor(private connect:ConnectService,private cache:CacheService) { }

  ngOnInit(){
  }
  /////////////////////////////////////////////////////
  //METHOD FOR SERVICES
  /////////////////////////////////////////////////////
  
}
