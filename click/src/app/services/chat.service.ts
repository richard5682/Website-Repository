import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatRoom, Message, Parameter } from '../data/dataType';
import { ConnectService } from './connect.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  subjectChatControl = new Subject<string>();
  subjectCurrentRoom = new Subject<ChatRoom>();
  subjectBadgeNumber = new Subject<string>();
  badgenumber!:number;
  constructor(private connect:ConnectService) { }
  checkforchanges():Observable<string>|undefined{
    return this.connect.httpPOST('checkforchanges',null)?.pipe(map(data => data as string));
  }
  sendMessage(message:string, roomid:number, type:string):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'roomid',value:roomid.toString()},
      {index:'message',value:message},
      {index:'type',value:type}
    ];
    return this.connect.httpPOST('sendmessage',params)?.pipe(map(data => data as boolean));
  }
  editMessage(message:string,messageid:number):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'messageid',value:messageid.toString()},
      {index:'message',value:message}
    ];
    return this.connect.httpPOST('editmessage',params)?.pipe(map(data => data as boolean));
  }
  fetchMessage(roomid:number):Observable<Message[]>|undefined{
    var params:Parameter[] = [
      {index:'roomid',value:roomid.toString()},
    ];
    return this.connect.httpPOST('fetchmessage',params)?.pipe(map(data => data as Message[]));
  }
  fetchChatRoom(userid:number|string,serviceid:number,bookingid:number):Observable<ChatRoom>|undefined{
    var params:Parameter[] = [
      {index:'userid',value:userid.toString()},
      {index:'bookingid',value:bookingid.toString()},
      {index:'serviceid',value:serviceid.toString()}
    ];
    return this.connect.httpPOST('fetchchatroom',params)?.pipe(map(data => data as ChatRoom));
  }
  GetChatRooms():Observable<ChatRoom[]>|undefined{
    return this.connect.httpPOST('getchatrooms',null)?.pipe(map(data => data as ChatRoom[]));
  }
  getSubjectChat():Observable<string>{
    return this.subjectChatControl.asObservable();
  }
  maximize(){
    this.subjectChatControl.next('maximize');
  }
  minimize(){
    this.subjectChatControl.next('minimize');
  }
  reload(){
    this.subjectChatControl.next('reload');
  }
  dump(){
    this.subjectChatControl.next('dump');
  }
  setCurrentRoom(room:ChatRoom){
    this.subjectCurrentRoom.next(room);
  }
  changeBadgeNumber(number:string){
    this.subjectBadgeNumber.next(number);
  }
  notifyChangeOnRoom():Observable<ChatRoom>{
    return this.subjectCurrentRoom.asObservable();
  }
  notifyChangeOnBadgeNumber():Observable<string>{
    return this.subjectBadgeNumber.asObservable();
  }
}
