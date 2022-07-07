import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Booking, ChatRoom, Message, ServiceData, ServiceQueryData, UserData } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { UploadimageComponent } from '../uploadimage/uploadimage.component';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  rooms!:ChatRoom[]|undefined;
  roommessages:{roomid:number,messages:Message[]}[] = new Array();
  
  picturedata:{roomid:number,filename:string,picturedata:string}[] = new Array();

  currentroom!:ChatRoom|null;
  currentmessages!:Message[];
  currentuser!:UserData|null;

  currentAccount!:{userdata:UserData|null,servicedata:ServiceData|null};

  divwrapper!:HTMLElement|null;
  listening:boolean=true;

  containershowing:boolean=false;
  iconcontainer!:HTMLElement|null;

  photomode:boolean=true;
  bookingmode:boolean=false;

  userservicesdata!:ServiceData[];

  accountselectorshowing:boolean = false;

  listwrapper!:HTMLElement|null;
  messagescroller!:HTMLElement|null;
  
  @ViewChild('inbox') inbox:ElementRef<HTMLElement>|null = null;
  
  constructor(private fetch:FetchService,private chat:ChatService,public login:LoginService,private loader:LoaderService) { }
  ngOnInit() {
    this.messagescroller = document.getElementById('messagescroller');
    this.listwrapper = document.getElementById('list');
    this.divwrapper = document.getElementById('main');
    this.iconcontainer = document.getElementById('slidercontainer');

    this.chat.subjectChatControl.subscribe(
      command => {
        if(command == 'minimize'){
          this.minimize();
        }else if(command == 'maximize'){
          this.maximize();
        }else if(command == 'reload'){
          this.removeData();
          this.loadRooms(false);
        }else if(command == 'dump'){
          this.removeData();
        }else if(command == 'scrolldown'){
          this.scrollToBottom();
        }
      }
    )
    this.login.notifyOnLogin().subscribe(
      data=>{
        this.loadRooms(false);
        this.loadUserServices();
        this.currentAccount = {userdata:this.login.userLoggedIn,servicedata:null};
        this.listenforchanges();
      }
    )
    this.login.notifyOnLogout().subscribe(
      data=>{
        this.removeData();
        this.listening=true;
      }
    )
    this.chat.notifyChangeOnRoom().subscribe(
      data=>{
        this.changeRoom(data);
      }
    )
  }
  removeData(){
    this.rooms = undefined;
    this.roommessages = new Array();
    this.currentmessages = new Array();
    this.userservicesdata = new Array();
    this.currentuser = null;
    this.currentroom = null;
  }
  loadUserServices(){
    this.userservicesdata = new Array();
    if(this.login.userLoggedIn?.id != undefined){
      this.fetch.queryService(new ServiceQueryData(null,null,this.login.userLoggedIn?.id.toString(),null,null))?.subscribe(
        services=>{
          this.userservicesdata = services;
        }
      )
    }
  }
  loadRooms(listenafter:boolean){
    var tasks:Observable<any>[] = new Array();
    this.chat.GetChatRooms()?.subscribe(
      rooms=>{
        if(this.rooms == undefined){
          //INSTANTIATE ROOMS
          this.rooms = rooms;
        }else{
          
          rooms.forEach(newroom=>{
            //FIND THE NEW ROOM AND ADD IT TO THE LIST
            var roomfound=false;
            this.rooms?.forEach(oldroom=>{
              if(newroom.roomid == oldroom.roomid){
                roomfound=true;
              }
            })
            if(!roomfound){
              this.rooms?.push(newroom);
            }
          })
        }
        if(rooms.length > 0){
          //ITERATE ALL THE ROOM AND FIND WHERE IT CHANGE
          var bool=false;
          var i=0;
          rooms.forEach((room)=>{
            //IF THE ROOMDATA IS ALREADY LOADED THEN DONT LOAD
            var dontLoadService = false;
            var dontLoadBooking = false;
            this.rooms?.forEach(loadedroom=>{
              if(loadedroom.roomid == room.roomid){
                if(loadedroom.servicedata != undefined){
                  dontLoadService = true;
                }
                if(loadedroom.bookingdata != undefined){
                  dontLoadBooking = true;
                }
              }
            })
            if(!dontLoadService)
              this.fetch.fetchService(room.serviceid)?.subscribe(
                servicedata=>{
                 
                  room.servicedata = servicedata;
                }
              )
            if(!dontLoadBooking)
            if(room.bookingid != 0){
              this.fetch.fetchBooking(room.bookingid)?.subscribe(
                booking=>{
                  if(this.currentroom?.bookingid == room.bookingid){
                    this.currentroom.bookingdata = booking;
                  }
                  room.bookingdata = booking;
                }
              )
             }
            var hasChanged = false;
            if(room.roomid == this.currentroom?.roomid){
              bool = true;
            }
            if(room.userid1 == this.login.userLoggedIn?.id){
              if(room.changed1 == 1){
                i++;
                hasChanged = true;
              }
            }else{
              if(room.changed2 == 1){
                i++;
                hasChanged = true;
              }
            }
            //FIND THE MESSAGES THE ROOM CONTAIN
            var roominstancefound = false;
            this.roommessages.forEach(roommessage=>{
              if(roommessage.roomid == room.roomid){
                roominstancefound = true;
              }
            })
            if(!roominstancefound){
              //IF THERE IS NO MESSAGE IN THIS ROOM INSTANTIATE IT
              var btask = this.chat.fetchMessage(room.roomid);
              btask?.subscribe(
                messages=>{
                  if(messages!=null){
                    messages.forEach(message=>{
                      //CHECK IF PICTURES ARE ALREADY LOADED
                      if(message.type == 'image'){
                        var imageloaded:any=null;
                        this.picturedata.forEach(data=>{
                          if(data.roomid == message.roomid && data.filename == message.message){
                            imageloaded = data.picturedata;
                          }
                        })
                        if(imageloaded != null){
                          message.picturedata = imageloaded;
                        }else{
                          //LOAD PICTURE
                          this.fetch.getChatPictures(room.roomid.toString(),message.message)?.subscribe(picturedatastring=>{
                            this.picturedata.push({roomid:room.roomid,filename:message.message,picturedata:picturedatastring});
                            message.picturedata = picturedatastring;
                          })
                        }
                      }

                    })
                    this.roommessages.push({roomid:room.roomid,messages:messages});
                    
                  }else{
                    this.roommessages.push({roomid:room.roomid,messages:new Array()});
                  }
                }
              )
              if(btask != undefined)
              tasks.push(btask);
            }else{
              //IF THERE IS A MESSAGE CHECK IF IT HAS CHANGE
              if(hasChanged){
                var btask = this.chat.fetchMessage(room.roomid);
                btask?.subscribe(
                  messages=>{
                    this.roommessages.forEach(roommessage=>{ // PROBLEM
                      if(roommessage.roomid == room.roomid){
                        messages.forEach(message=>{
                          //CHECK IF PICTURES ARE ALREADY LOADED
                          if(message.type == 'image'){
                            var imageloaded:any=null;
                            this.picturedata.forEach(data=>{
                              if(data.roomid == message.roomid && data.filename == message.message){
                                imageloaded = data.picturedata;
                              }
                            })
                            if(imageloaded != null){
                              message.picturedata = imageloaded;
                            }else{
                              //LOAD PICTURE
                              this.fetch.getChatPictures(room.roomid.toString(),message.message)?.subscribe(picturedatastring=>{
                                this.picturedata.push({roomid:room.roomid,filename:message.message,picturedata:picturedatastring});
                                message.picturedata = picturedatastring;
                                this.loadMessage();
                              })
                            }
                          }
                        })
                        roommessage.messages = messages;
                      }
                    })
                  }
                )
                if(btask != undefined)
                tasks.push(btask);
              }
            }
          })
          //IF THE CURRENT ROOM IS NOT SET
          if(!bool){ 
            this.changeRoom(rooms[0]);
          }
          //CHANGE THE BADGE NUMBER FOR NOTIFICATION
          this.chat.changeBadgeNumber(i.toString());
          forkJoin(tasks).subscribe(
            res=>{
              this.loadWhenComplete();
              if(listenafter){
                this.listenforchanges();
              }
            }
          );
        }
      }
    )
    
    //LOAD CURRENT MESSAGE AND ARRANGE ROOM WHEN COMPLETE
   
  }
  arrangerooms(){
    if(this.rooms != undefined){
      //CLASSIFY INTO SERVICE ROOM AND BOOKING ROOM
      var servicerooms:ChatRoom[] = new Array();
      var bookingrooms:ChatRoom[] = new Array();
      var newrooms:ChatRoom[] = new Array();
      this.rooms.forEach(room => {
        if(room.bookingid == 0){
          servicerooms.push(room);
        }else{
          bookingrooms.push(room);
        }
      });
      //REARRANGE ALL ROOM
      servicerooms.forEach(serviceroom => {
        newrooms.push(serviceroom);
        bookingrooms.forEach(bookingroom =>{
          if(serviceroom.servicedata){
            if(serviceroom.servicedata.ownerid != bookingroom.userid1){
              if(bookingroom.userid1 == serviceroom.userid1 && bookingroom.serviceid == serviceroom.serviceid){
                newrooms.push(bookingroom);
              }
            }else{
              if(bookingroom.userid2 == serviceroom.userid2 && bookingroom.serviceid == serviceroom.serviceid){
                newrooms.push(bookingroom);
              }
            }
          }
        })
      });
      newrooms.forEach(room=>{
        this.roommessages.forEach(roommessage=>{
          if(room.roomid == roommessage.roomid){
            room.lastmessage = roommessage.messages[roommessage.messages.length-1].message;
          }
        })
      })
      this.rooms = newrooms;
    }
  }
  loadWhenComplete(){
    setTimeout(()=>{
      if(this.roommessages.length > 0){
        this.arrangerooms();
        this.loadMessage();
      }else{
        this.loadWhenComplete();
      }
    },500)
  }
  listenforchanges(){
    if(this.login.loggedin && this.listening){
      this.listening=false;
      this.chat.checkforchanges()?.subscribe(
        data=>{
          this.listening=true;
          if(data == 'true'){
            this.loadRooms(true);
          }else if (this.login.loggedin){
            this.listenforchanges();
          }
        }
      )
    }
  }
  changeRoom(room:ChatRoom){
    this.currentroom=room;
    if(room.userid1 == this.login.userLoggedIn?.id){
      this.fetch.fetchBasicUser(room.userid2)?.subscribe(
        data=>{
          this.currentuser = data;
        }
      )
    }else{
      this.fetch.fetchBasicUser(room.userid1)?.subscribe(
        data=>{
          this.currentuser = data;
        }
      )
    }
    this.loadMessage();
  }
  showInbox(){
    if(this.inbox)
    this.inbox.nativeElement.style.display = "initial";
  }
  changeView(data:{room:ChatRoom,user:UserData}){
    if(this.inbox)
    this.inbox.nativeElement.style.display = "none";
    this.currentroom = data.room;
    this.currentuser = data.user;
    this.loadMessage();
  }
  loadMessage(){
    if(this.currentroom != null){
      this.roommessages.forEach(roommessage => {
        if(roommessage.roomid == this.currentroom?.roomid){
          this.currentmessages = roommessage.messages;
          this.scrollToBottom();
        }
      });
    }
  }
  sendMessage(message:string,type:string){
    if(this.containershowing){
      this.triggerslider();
    }
    if(message != '' && message != undefined && this.rooms != undefined){
      for(var i=0;i<this.rooms.length;i++){
        if(this.currentroom?.roomid == this.rooms[i].roomid){
          if(this.login.userLoggedIn?.id != undefined){
            if(type=='text' || type=='pricerequest' || type == 'forms' || type == 'system'){
              this.currentmessages.push({messageid:0,roomid:this.currentroom.roomid,message:message,senderid:this.login.userLoggedIn.id,type:type,time:Date.now().toString()});
            }else if(type =='image'){
              this.currentmessages.push({messageid:0,roomid:this.currentroom.roomid,message:'Image Uploading',senderid:this.login.userLoggedIn.id,type:'text',time:Date.now().toString()});
            }
          }
        }
      }
      if(this.currentroom != null){
        this.chat.sendMessage(message,this.currentroom.roomid,type)?.subscribe(
          data=>{
            this.scrollToBottom();
          },
          error=>{
            console.log(error);
          }
        );
      }
    }
  }
  minimize(){
    if(this.divwrapper != null){
      this.divwrapper.style.display = 'none';
    }
  }
  maximize(){
    if(this.divwrapper != null){
      this.divwrapper.style.display = 'flex';
    }
  }
  triggerslider(){
    if(this.containershowing){
      if(this.iconcontainer != null){
        this.iconcontainer.style.bottom='-12em';
        this.iconcontainer.style.opacity='0';
      }
    }else{
      if(this.iconcontainer != null){
        this.iconcontainer.style.bottom='3em';
        this.iconcontainer.style.opacity='1';
      }
    }
    this.containershowing = !this.containershowing;
  }
  sendTypeMessage(imagedata:string){
    if(this.photomode){
      this.sendMessage(imagedata,'image');
    }else if(this.bookingmode){
     
    }
  }
  triggerselector(){
    if(this.accountselectorshowing){
      this.accountselectorshowing = false;
      if(this.listwrapper != null){
        this.listwrapper.style.height = '0';
      }
    }else{
      this.accountselectorshowing = true;
      if(this.listwrapper != null){
        this.listwrapper.style.height = '40em';
      }
    }
  }
  sendPriceRequest(price:number){
    this.sendMessage(price+"|1","pricerequest");
  }
  setAccount(account:{userdata:UserData|null,servicedata:ServiceData|null}){
    this.currentAccount = account;
    if(this.inbox)
    this.inbox.nativeElement.style.display = "block";
    this.triggerselector();
  }
  setBooking(booking:Booking){
    booking.active = 3;
    this.loader.showLoader("Setting Booking Up");
    this.fetch.editBooking(booking)?.subscribe(
      data=>{
        this.loader.showLoader("hide");
        this.sendMessage("Booking is accepted by the provider any change to the booking will result on booking cancellation",'system');
      },
      error=>{
        this.loader.showLoader("hide");
        this.loader.showAlert(error);
      }
    )
  }
  scrollToBottom(){
    if(this.messagescroller){
      this.messagescroller.scrollTop = this.messagescroller?.scrollHeight;
    }
  }
}
