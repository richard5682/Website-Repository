import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking, CalendarMarkDate, CommentData, Form, FormAnswer, ServiceData, SubCategories } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { ConnectService } from 'src/app/services/connect.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { MainService } from 'src/app/services/main.service';
import { CalendarComponent } from '../../component/calendar/calendar.component';
@Component({
  selector: 'app-servicepage',
  templateUrl: './servicepage.component.html',
  styleUrls: ['./servicepage.component.scss']
})
export class ServicepageComponent implements OnInit {
  @ViewChild(CalendarComponent) calendar!:CalendarComponent;

  serviceID!:number;
  service!:ServiceData;
  comments!:CommentData[];
  subcategories!:string[];
  thumbnail!:string;
  pickedsub:string[] = new Array();
  booked:boolean=false;
  booked_data!:Booking;
  forms!:Form[];
  form_answers:FormAnswer[]=new Array();
  setdate!:CalendarMarkDate;
  settime!:number;

  followerscount:number = 0;
  isuserfollowing:boolean=false;

  available:boolean = true;

  markedDate!:CalendarMarkDate[];
  bookingdate:CalendarMarkDate[] = new Array();
  constructor(private main:MainService,private loader:LoaderService,public chat:ChatService,private router:Router,private login:LoginService,private actroute:ActivatedRoute,private fetch:FetchService,private connect:ConnectService) { 

  }

  ngOnInit() {
    if(this.actroute.snapshot.paramMap.get('id') != null){
      this.serviceID = parseInt(this.actroute.snapshot.paramMap.get('id')!);
      this.fetch.fetchServiceForms(this.serviceID,null)?.subscribe(
        forms=>{
          this.forms = forms;
        }
      )
      this.fetch.fetchServiceFollowers(this.serviceID)?.subscribe(
        data=>{
          this.followerscount = data.length;
          data.forEach(userid => {
            if(userid == this.login.userLoggedIn?.id){
              this.isuserfollowing = true;
            }
          });
        }
      )
      this.fetch.fetchService(this.serviceID)?.subscribe(
        next => {
          this.service=next;
          this.subcategories = this.service.subcategories.split(',');
          if(this.service.ownerid == this.login.userLoggedIn?.id){
            this.router.navigate(['servicedashboard',this.serviceID]);
          }
          this.fetch.fetchPictures(this.serviceID)?.subscribe(
            data =>{
              var url = this.fetch.getServiceThumbnail(data,this.serviceID);
              if(url!=null){
                this.thumbnail = url;
              }
            }
          );
        }
      );
      // this.fetch.fetchBookingTime(this.serviceID)?.subscribe(
      //   datas=>{
      //     datas.forEach(data => {
      //       var date = new Date();
      //       date.setTime(data);
      //       this.bookingdate.push({date:date,color:'white',backcolor:'orange'});
      //     });
      //   },
      //   error=>{},
      //   ()=>{
      //     // this.setMarkedDate();
      //   }
      // );
      this.fetch.fetchBookingTime(this.serviceID)?.subscribe(
           datas=>{
              if(datas == false || datas == true){
                this.available = true;
              }else{
                this.available = false;
                this.loader.showAlert("SERVICE ALREADY BOOKED");
              }
           }
      )
      this.fetchBookings();
      this.fetch.fetchComment(this.serviceID).subscribe(
        next => this.comments=next,
        error=>{}
      );
    }
  }
  // setMarkedDate(){
  //   this.markedDate = new Array();
  //   this.bookingdate.forEach(date=>{
  //     this.markedDate.push(date);
  //   });
  //   if(this.setdate != undefined){
  //     this.markedDate.push(this.setdate);
  //   }
  //   this.calendar.markDates();
  // }
  fetchBookings(){
    this.fetch.fetchUserBookings()?.subscribe(
      bookings =>{
        bookings.forEach(val=>{
          if(val.serviceid == this.serviceID && (val.active == 1 || val.active == 2 || val.active == 3)){
            this.booked=true;
            this.booked_data = val;
          }
        })
      },
      error=>{

      }
    )
  }
  addService(subcategory:string){
    if(this.available){
      return;
    }
    var bool=true;
    this.pickedsub.forEach(val=>{
    if(val == subcategory){
       bool=false;
      }
    });
    if(bool){
      this.forms.forEach(form => {
        if(form.subcategory == subcategory){
          this.main.notifyOnAnswer(form).subscribe(
            form_answer=>{
              if(form_answer!=null){
                this.main.showform(null);
                var buffer = '';
                var bool1 = false;
                form_answer.answer.forEach(ans=>{
                  if(bool1){
                    buffer = buffer+"|";
                  }else{
                    bool1 = true;
                  }
                  buffer = buffer+ans;
                })
                this.form_answers.push({subcategory:subcategory,answer:buffer,formid:form_answer.form.formid});
                console.log(this.form_answers);
                this.pickedsub.push(subcategory);
              }else{
                this.loader.showAlert("Booking Cancelled");
              }
            }
          );
        }
      });
    } 
  }
  removeService(subcategory:string){
    this.pickedsub.forEach(
      (val,index)=>{
        if(val==subcategory){
          this.pickedsub.splice(index,1);
        }
      }
    )
    this.form_answers.forEach(
      (answer,index) => {
      if(answer.subcategory == subcategory){
        this.form_answers.splice(index,1);
      }
    });
  }
  followService(){
    if(this.login.loggedin){
      this.fetch.addFollower(this.serviceID)?.subscribe(
        data=>{
          if(data){
            this.followerscount++;
            this.isuserfollowing = true;
          }
        }
      );
    }else{
      this.router.navigate(['login']);
    }
  }
  unfollowService(){
    if(this.login.loggedin){
      this.fetch.removeFollower(this.serviceID)?.subscribe(
        data=>{
          if(data){
            this.followerscount--;
            this.isuserfollowing = false;
          }
        }
      );
    }else{
      this.router.navigate(['login']);
    }
  }
  bookout(){
    this.loader.showLoader("Booking Now");
    if(!this.available){
      this.loader.showAlert("Service Is Fully Booked!");
      return;
    }
    if(this.login.userLoggedIn){
      if(this.setdate != undefined || true){
        this.fetch.createBooking({serviceid:this.serviceID,subcategory_obj:new SubCategories(this.pickedsub),exectime:(Date.now()).toString(),price:this.service.price})?.subscribe(
          bool => {
            if(bool){
              this.loader.showLoader("Fetching Bookings");
              this.fetch.fetchUserBookings()?.subscribe(
                bookings =>{
                  bookings.forEach(val=>{
                    if(val.serviceid == this.serviceID && val.active == 1){
                      this.booked=true;
                      this.booked_data = val;
                     
                      this.chat.fetchChatRoom(this.service.ownerid,this.serviceID,0)?.subscribe(
                        data=>{
                          this.loader.showLoader("Creating Chatroom For Booking");
                        if(this.booked_data.id != undefined)this.chat.fetchChatRoom(this.service.ownerid,this.serviceID,this.booked_data.id)?.subscribe(
                          data=>{
                             //UPLOAD FORM
                            var uploaded = 1;
                            this.loader.showLoader("Uploading Forms "+uploaded+" out of "+this.form_answers.length);
                            this.form_answers.forEach(form_answer => {
                              if(this.booked_data.id != undefined){
                                this.fetch.submitFormAnswer(this.booked_data.id,form_answer.subcategory,form_answer.answer,form_answer.formid)?.subscribe(
                                  data=>{
                                    uploaded++;
                                    //SEND FORM MESSAGE
                                    this.chat.fetchChatRoom(this.service.ownerid,this.serviceID,0)?.subscribe(
                                      chatroomservice=>{
                                        this.chat.sendMessage(this.login.userLoggedIn?.firstname+","+this.login.userLoggedIn?.lastname+" has book a service on "+new SubCategories(this.pickedsub).getString(),
                                        chatroomservice.roomid,'system');
                                      }
                                    )
                                    if(this.booked_data.id != undefined)this.chat.fetchChatRoom(this.service.ownerid,this.serviceID,this.booked_data.id)?.subscribe(
                                      chatroombooking=>{
                                        if(this.booked_data.id != undefined && this.login.userLoggedIn)this.fetch.fetchFormAnswer(this.booked_data.id,form_answer.subcategory,this.login.userLoggedIn?.id)?.subscribe(
                                          formanswer=>{
                                            if(formanswer.id)this.chat.sendMessage(formanswer.id.toString(),chatroombooking.roomid,"forms");
                                            this.chat.setCurrentRoom(chatroombooking);
                                          }
                                        )
                                      }
                                    )
  
                                    this.loader.showLoader("Uploading Forms "+uploaded+" out of "+this.form_answers.length);
                                    if(uploaded > this.form_answers.length){
                                      this.chat.reload();
                                      this.chat.maximize();
                                      this.loader.showLoader("hide");
                                    }
                                  },
                                  error=>{
                                    this.loader.showLoader("hide");
                                    this.loader.showAlert(error);
                                  }
                                )
                              }
                          });
                          }
                        )}
                      )
                    }
                  })
                },
                error=>{

                }
              )
            }else{
              this.loader.showLoader("hide");
              this.loader.showAlert("Booking Error!");
            }
          },
          error=>{
            this.loader.showLoader("hide");
            this.loader.showAlert(error);
          }
        )
      }else{
        this.loader.showLoader("hide");
        this.loader.showAlert("Choose a date First");
      }
    }else{
      this.loader.showLoader("hide");
      this.loader.showAlert("Please Login First");
      this.router.navigate(['login']);
    }
  }
  chatWithService(){
    if(this.login.loggedin){
      this.chat.fetchChatRoom(this.service.ownerid,this.serviceID,0)?.subscribe(
        data=>{
          this.chat.reload();
          this.chat.maximize();
          this.chat.setCurrentRoom(data);
        }
      )
    }else{
      this.router.navigate(['login']);
    }
  }
  // setDate(setdate:Date){
  //   if(this.settime != undefined){
  //     var conflict=false;
  //     this.bookingdate.forEach(bookingdate => {
  //       var year1 =  bookingdate.date.getFullYear();
  //       var year2 = setdate.getFullYear();
  //       var month1 = bookingdate.date.getMonth();
  //       var month2 = setdate.getMonth();
  //       var date1 = bookingdate.date.getDate();
  //       var date2 = setdate.getDate();
  //       if(date1 == date2 && year1 == year2 && month1 == month2){
  //         conflict = true;
  //       }
  //     });
  //     if(!conflict){
  //       if(setdate.getTime() > Date.now()){
  //         this.setdate = {date:setdate,color:'white',backcolor:'black'};
  //         var time = this.settime.toString().split(':');
  //         this.setdate.date.setHours(parseInt(time[0]),parseInt(time[1]));
  //         this.setMarkedDate();
  //       }
  //     }else{
  //       this.loader.showAlert("The day is occupied")
  //     }
  //   }
  // }
}
