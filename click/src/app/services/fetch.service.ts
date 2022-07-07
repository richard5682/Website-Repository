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

  //EXAMPLE DATA
  sampleComments:CommentData[] = [
    {serviceID:1,userID:4,date:'5/10/21',comment:'WOW THIS SERVICE IS GREAT!'},
    {serviceID:1,userID:1,date:'5/11/21',comment:'WOW THIS SERVICE IS GOOD!'},
    {serviceID:1,userID:6,date:'5/13/21',comment:'WOWIE !'},
    {serviceID:1,userID:8,date:'4/12/21',comment:'HELLO MALOU'},
    {serviceID:1,userID:10,date:'5/10/21',comment:'HEY IM A COMMENT!'},
    {serviceID:1,userID:4,date:'5/10/21',comment:'HEY THIS IS A VERY LONG COMMENT TO TEST THE COMMENT COMPONENT!'},
  ];
  sampleCommentSubject = new Subject<CommentData[]>();
  sampleUserSubject = new Subject<UserData>();
  samplePictureSubject = new Subject<string[]>();
  constructor(private connect:ConnectService,private cache:CacheService) { }

  ngOnInit(){
  }
  simulateFetch2(){
    this.sampleCommentSubject.next(this.sampleComments);
  }
  /////////////////////////////////////////////////////
  //METHOD FOR SERVICES
  /////////////////////////////////////////////////////
  fetchService(serviceid:number,useCache:boolean = false):Observable<ServiceData>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()}
    ];
    if(useCache){
      var data = this.cache.findServiceData(serviceid);
      if(data != null){
        var subject1 = new ReplaySubject<ServiceData>();
        subject1.next(data);
        subject1.complete();
        return subject1.asObservable();
      }else{
        var subject2 = new ReplaySubject<ServiceData>();
        this.connect.httpPOST('fetchservice',params)?.pipe(map(data => data as ServiceData)).subscribe(
          servicedata => {
            this.cache.cacheServiceData(servicedata);
            subject2.next(servicedata);
            subject2.complete();
          }
        )
        return subject2.asObservable();
      }
     
    }else{
      return(this.connect.httpPOST('fetchservice',params)?.pipe(map(data => data as ServiceData)));
    }
    
  }
  queryService(query:ServiceQueryData):Observable<ServiceData[]>|undefined{
    var params:Parameter[] = [
      {index:'keyword',value:query.getKeyword()},
      {index:'category',value:query.servicetype.category},
      {index:'subcategory',value:query.servicetype.subcategory.getString()},
      {index:'ownerid',value:query.ownerid},
      {index:'province',value:query.location.province},
      {index:'city',value:query.location.city},
      {index:'brgy',value:query.location.brgy},
      {index:'limit',value:query.limit}
    ]
    return(this.connect.httpPOST('queryservice',params)?.pipe(map(data => data as ServiceData[])));
  }
  queryEmergencyService(query:EmergencyServiceQueryData):Observable<EmergencyServiceData[]>|undefined{
    var params:Parameter[] = [
      {index:'category',value:query.category},
      {index:'province',value:query.province},
      {index:'city',value:query.city}
    ]
    return this.connect.httpPOST('queryemergency',params)?.pipe(map(data => data as EmergencyServiceData[]));
  }
  fetchComment(serviceid:number):Observable<CommentData[]>{
    setTimeout(()=>{this.simulateFetch2()},500);
    this.sampleComments.forEach(val=>{
      val.serviceID = serviceid;
    });
    return this.sampleCommentSubject.asObservable();
  }
  fetchPictures(serviceid:number,useCache:boolean=false):Observable<PictureData[]>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()}
    ];
    if(useCache){
      var pictures = this.cache.findServicePicture(serviceid);
      if(pictures != null){
        var subject1 = new ReplaySubject<PictureData[]>();
        subject1.next(pictures);
        subject1.complete();
        return subject1.asObservable();
      }else{
        var subject2 = new ReplaySubject<PictureData[]>();
        this.connect.httpPOST('getpictures',params)?.pipe(map(response => response as PictureData[])).subscribe(
          picturedata=>{
            subject2.next(picturedata);
            subject2.complete();
            this.cache.cacheServicePicture(serviceid,picturedata);
          }
        )
        return subject2.asObservable();
      }
    }else{
      return this.connect.httpPOST('getpictures',params)?.pipe(map(response => response as PictureData[]))
    }
  }
  registerService(serviceinfo:ServiceRegisterInfo):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'title',value:serviceinfo.title},
      {index:'price',value:serviceinfo.price},
      {index:'description',value:serviceinfo.description},
      {index:'province',value:serviceinfo.address.province},
      {index:'city',value:serviceinfo.address.city},
      {index:'brgy',value:serviceinfo.address.brgy},
      {index:'street',value:serviceinfo.address.street},
      {index:'houseno',value:serviceinfo.address.houseno},
      {index:'category',value:serviceinfo.servicetype.category},
      {index:'subcategory',value:serviceinfo.servicetype.subcategory.getString()},
      {index:'thumbnail',value:serviceinfo.thumbnail},
      {index:'pictures',value:serviceinfo.pictures.getString()}
    ];
    return this.connect.httpPOST("servicecreation",params)?.pipe(map(data=>data as boolean));
  }
  registerEmergencyService(emergencyinfo:EmergencyServiceRegisterInfo):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'title',value:emergencyinfo.title},
      {index:'desc',value:emergencyinfo.description},
      {index:'province',value:emergencyinfo.location.province},
      {index:'city',value:emergencyinfo.location.city},
      {index:'street',value:emergencyinfo.location.street},
      {index:'buildingno',value:emergencyinfo.location.houseno},
      {index:'category',value:emergencyinfo.category},
      {index:'thumbnail',value:emergencyinfo.thumbnail}
    ];
    return this.connect.httpPOST("emergencycreation",params)?.pipe(map(data=>data as boolean));
  }
  updateServiceRequest(requestid:number,state:number):Observable<boolean>|undefined{
    //0 To be Process will deactivate service
    //1 Denied will deactivate service
    //2 Accepted will activate service
    var params:Parameter[] = [
      {index:'id',value:requestid.toString()},
      {index:'state',value:state.toString()}
    ];
    return this.connect.httpPOST("updaterequest",params)?.pipe(map((data)=>data as boolean));
  }

  addFollower(serviceid:number):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()}
    ];
    return this.connect.httpPOST("addfollowers",params)?.pipe(map((data)=>data as boolean));
  }
  removeFollower(serviceid:number):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()}
    ];
    return this.connect.httpPOST("removefollowers",params)?.pipe(map((data)=>data as boolean));
  }
  fetchServiceFollowers(serviceid:number):Observable<number[]>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()},
      {index:'userid',value:'null'}
    ];
    return this.connect.httpPOST("fetchfollowers",params)?.pipe(map((data)=>data as number[]));
  }
  fetchUserFollowers(userid:number):Observable<number[]>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:'null'},
      {index:'userid',value:userid.toString()}
    ];
    return this.connect.httpPOST("fetchfollowers",params)?.pipe(map((data)=>data as number[]));
  }

  /////////////////////////////////////////////////////
  //METHOD FOR USERS
  /////////////////////////////////////////////////////
  fetchBasicUser(userID:number,useCache:boolean = false):Observable<UserData>|undefined{
    var params:Parameter[] = [
      {index:'id',value:userID.toString()}
    ];
    if(useCache){
      var UserData = this.cache.findUserData(userID);
      if(UserData != null){
        var subject1 = new ReplaySubject<UserData>();
        subject1.next(UserData);
        subject1.complete();
        return subject1.asObservable();
      }else{
        var subject2 = new ReplaySubject<UserData>();
        this.connect.httpPOST('getuserbasic',params)?.pipe(map(data=>data as UserData)).subscribe(
          UserData1=>{
            subject2.next(UserData1);
            subject2.complete();
            this.cache.cacheUserData(UserData1);
          }
        )
        return subject2.asObservable();
      }
    }else{
      return this.connect.httpPOST('getuserbasic',params)?.pipe(map(data=>data as UserData));
    }
  }
  fetchUserBookings():Observable<Booking[]>|undefined{
    return this.connect.httpPOST('getuserbooking',null)?.pipe(map(data=>data as Booking[]));
  }
  registerUser(userinfo:RegisterUserInfo):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'username',value:userinfo.username},
      {index:'password',value:userinfo.password},
      {index:'firstname',value:userinfo.firstname},
      {index:'lastname',value:userinfo.lastname},
      {index:'middlename',value:userinfo.middlename},
      {index:'birthday',value:userinfo.birthday},
      {index:'code',value:userinfo.code},
      {index:'birthday',value:userinfo.birthday},
      {index:'profileimage',value:userinfo.profileimage},
      {index:'province',value:userinfo.address.province},
      {index:'city',value:userinfo.address.city},
      {index:'brgy',value:userinfo.address.brgy},
      {index:'street',value:userinfo.address.street},
      {index:'houseno',value:userinfo.address.houseno},
    ];
    return this.connect.httpPOST('register',params)?.pipe(
      map(response => response as boolean)
    )
  }
  verifyEmail(username:string,email:string):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'username',value:username},
      {index:'email',value:email}
    ];
    return this.connect.httpPOST('verifyemail',params)?.pipe(
      map(response => response as boolean)
    )
  }
  getUserInformation(query:UserQueryData):Observable<UserData>|undefined{
    return this.connect.httpPOST("test",[
      {index:"userID",value:query.userID},
      {index:"username",value:query.username}
    ])?.pipe(map((data)=>data as UserData));
  }

  /////////////////////////////////////////////////////
  //METHOD FOR FORMS
  /////////////////////////////////////////////////////
  fetchServiceForms(serviceid:number|null,formid:number|null):Observable<Form[]>|undefined{
    var servicevalue,formvalue;
    if(serviceid != null){
      servicevalue = serviceid;
    }else{
      servicevalue = '';
    }
    if(formid != null){
      formvalue = formid;
    }else{
      formvalue = '';
    }
    var params:Parameter[] = [
      {index:'serviceid',value:servicevalue.toString()},
      {index:'formid',value:formvalue.toString()}
    ];
    return this.connect.httpPOST('fetchserviceform',params)?.pipe(map(data => data as Form[]));
  }
  submitFormAnswer(bookingid:number,subcategory:string,answer:string,formid:number):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'bookingid',value:bookingid.toString()},
      {index:'subcategory',value:subcategory},
      {index:'answer',value:answer},
      {index:'formid',value:formid.toString()}
    ];
    return this.connect.httpPOST('createanswerform',params)?.pipe(map(data => data as boolean));
  }
  createServiceForm(serviceid:number,subcategory:string,formdata:string):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()},
      {index:'subcategory',value:subcategory},
      {index:'formdata',value:formdata}
    ];
    return this.connect.httpPOST('createserviceform',params)?.pipe(map(data => data as boolean));
  }
  fetchFormAnswer(bookingid:number,subcategory:string,userid:number):Observable<FormAnswer>|undefined{
    var params:Parameter[] = [
      {index:'bookingid',value:bookingid.toString()},
      {index:'subcategory',value:subcategory},
      {index:'userid',value:userid.toString()}
    ];
    return this.connect.httpPOST('getformanswer',params)?.pipe(map(data => data as FormAnswer));
  }
  fetchFormAnswerID(formanswerid:number):Observable<FormAnswer>|undefined{
    var params:Parameter[] = [
      {index:'bookingid',value:''},
      {index:'subcategory',value:''},
      {index:'userid',value:''},
      {index:'formanswerid',value:formanswerid.toString()}
    ];
    return this.connect.httpPOST('getformanswer',params)?.pipe(map(data => data as FormAnswer));
  }
  //METHOD FOR BOOKING
  instantBooking(query:ServiceQueryData):Observable<ServiceData[]>|undefined{
    var params:Parameter[] = [
      {index:'keyword',value:query.getKeyword()},
      {index:'category',value:query.servicetype.category},
      {index:'subcategory',value:query.servicetype.subcategory.getString()},
      {index:'ownerid',value:query.ownerid},
      {index:'province',value:query.location.province},
      {index:'city',value:query.location.city},
      {index:'brgy',value:query.location.brgy},
      {index:'limit',value:query.limit}
    ]
    return(this.connect.httpPOST('instantbook',params)?.pipe(map(data => data as ServiceData[])));
  }
  createBooking(booking:Booking):Observable<number>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:booking.serviceid.toString()},
      {index:'subcategory',value:booking.subcategory_obj.getString()},
      {index:'exectime',value:booking.exectime},
      {index:'price',value:booking.price.toString()},
      {index:'pictures',value:""},//<-ADD PICTURES HERE
    ];
    return this.connect.httpPOST('createbooking',params)?.pipe(map(data=>data as number));
  }
  editBooking(booking:Booking):Observable<boolean>|undefined{
    if(booking.id != undefined && booking.active != undefined){
      var params:Parameter[] = [
        {index:'bookingid',value:booking.id.toString()},
        {index:'exectime',value:booking.exectime},
        {index:'price',value:booking.price.toString()},
        {index:'active',value:booking.active.toString()}
      ];
      return this. connect.httpPOST('editbooking',params)?.pipe(map(data=>data as boolean));
    }
  }
  deleteBooking(bookingid:number):Observable<boolean>|undefined{
    var params:Parameter[] = [
      {index:'bookingid', value:bookingid.toString()}
    ]
    return this.connect.httpPOST('deletebookings',params)?.pipe(map(data=>data as boolean));
  }
  fetchServiceBookings(serviceid:number):Observable<Booking[]>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()}
    ]
    return this.connect.httpPOST('getservicebooking',params)?.pipe(map(data=>data as Booking[]));
  }
  fetchBookingTime(serviceid:number):Observable<number[]|boolean>|undefined{
    var params:Parameter[] = [
      {index:'serviceid',value:serviceid.toString()}
    ]
    return this.connect.httpPOST('fetchbookingtime',params)?.pipe(map(data=>data as number[]|boolean));
  }
  fetchBooking(bookingid:number):Observable<Booking>|undefined{
    var params:Parameter[] = [
      {index:'bookingid', value:bookingid.toString()}
    ]
    return this.connect.httpPOST('fetchbooking',params)?.pipe(map(data=>data as Booking));
  }
  //METHOD FOR ADMIN
  

  /////////////////////////////////////////////////////
  //ADMIN
  /////////////////////////////////////////////////////
  

  //////////////////
  //FETCHING PICTURES LINK AND DATA  
  getServiceThumbnail(pictures:PictureData[],serviceid:number):string|null{
    var buffer!:PictureData;
    pictures.forEach(val=>{
      if(val.thumbnail == 1){
        buffer = val;
      }
    })
    if(buffer != undefined){ 
      return this.connect.DOMAIN+"public/image/serviceimage/"+serviceid+"/"+buffer.picture;
    }else{
      return null;
    }
  }
  getServicePictures(pictures:PictureData[],serviceID:number):string[]{
    var buffer:string[] = new Array();
    pictures.forEach(
      val=>{
        buffer.push(this.connect.DOMAIN+"public/image/serviceimage/"+serviceID+"/"+val.picture);
      }
    )
    return buffer;
  }
  getChatPictures(roomid:string,filename:string):Observable<string>|undefined{
    var params:Parameter[] = [
      {index:'roomid',value:roomid},
      {index:'filename',value:filename}
    ];
    return this.connect.httpPOST('fetchchatpicture',params)?.pipe(map(data => data as string));
  }
  getProfilePicture(picture:string):string{
    return this.connect.DOMAIN+"public/image/profileimage/"+picture;
  }
  getEmergencyPicture(id:number):string{
    return this.connect.DOMAIN+"public/image/emergencyserviceimage/"+id+"/0.PNG";
  }
}
