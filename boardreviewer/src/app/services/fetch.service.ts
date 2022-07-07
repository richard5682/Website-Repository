import { Injectable, OnInit } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Questions, Parameter, Stats } from '../data/dataType';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class FetchService implements OnInit{

  constructor(private connect:ConnectService) { }

  ngOnInit(){
  }
  
  /////////////////////////////////////////////////////
  //METHOD FOR QUESTION
  /////////////////////////////////////////////////////
  fetchQuestion(limit:number,subject:string):Observable<Questions[]>{
    var param:Parameter[]=[
      {index:'limit',value:limit.toString()},
      {index:'subject',value:subject} 
    ];
    return this.connect.httpPOST('fetchquestion',param).pipe(map(data => data as Questions[]));
  }
  addQuestion(subject:string,question:string,answer:string,name:string):Observable<boolean>{
    var param:Parameter[]=[
      {index:'subject',value:subject},
      {index:'question',value:question},
      {index:'answer',value:answer},
      {index:'name',value:name} 
    ];
    return this.connect.httpPOST('addquestion',param).pipe(map(data=>data as boolean))
  }
  //////////////////////////////////////////
  //// METHOD FOR STATS
  ///////////////////////////////////////////////
  addStatistics(score:string):Observable<Stats>{
    var param:Parameter[]=[
      {index:'score',value:score}
    ]
    return this.connect.httpPOST('addstatistics',param).pipe(map(data=>data as Stats))
  }
  getStatistics():Observable<Stats>{
    return this.connect.httpPOST('getstatistics',null).pipe(map(data=>data as Stats))
  }
  addName(name:string):Observable<boolean>{
    var param:Parameter[]=[
      {index:'name',value:name}
    ];
    return this.connect.httpPOST('addname',param).pipe(map(data => data as boolean));
  }
  ///ADMIN
  getWebsiteStats():Observable<number>{
    return this.connect.httpPOST('getwebsitestats',null).pipe(map(data => data as number));
  }
  uploadQuestion(subject:string,question:string,answer:string,choices:string):Observable<boolean>{
    var param:Parameter[]=[
      {index:'subject',value:subject},
      {index:'question',value:question},
      {index:'answer',value:answer},
      {index:'choices',value:choices}
    ];
    return this.connect.httpPOST('uploadquestion',param).pipe(map(data => data as boolean));
  }
  getQuestions(limit:number,active:number):Observable<Questions[]>{
    var param:Parameter[]=[
      {index:'limit',value:limit.toString()},
      {index:'active',value:active.toString()}
    ];
    return this.connect.httpPOST('getquestions',param).pipe(map(data => data as Questions[]));
  }
  getQuestionID(id:number):Observable<Questions>{
    var param:Parameter[]=[
      {index:'id',value:id.toString()},
    ];
    return this.connect.httpPOST('getquestions',param).pipe(map(data => data as Questions));
  }
  editQuestion(id:number,subject:string,question:string,answer:string,choices:string,name:string,active:number):Observable<boolean>{
    var param:Parameter[]=[
      {index:'subject',value:subject},
      {index:'question',value:question},
      {index:'answer',value:answer},
      {index:'name',value:name},
      {index:'id',value:id.toString()},
      {index:'choices',value:choices},
      {index:'active',value:active.toString()}
    ];
    return this.connect.httpPOST("editquestions",param).pipe(map(data => data as boolean));
  }
  deleteQuestion(id:number):Observable<boolean>{
    var param:Parameter[]=[
      {index:'id',value:id.toString()},
    ];
    return this.connect.httpPOST('deletequestion',param).pipe(map(data => data as boolean));
  }
}
