import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginuser:UserData|null = null;
  fixwrapper!:HTMLElement|null;
  chatbadge!:string;
  isMenuShowing=false;
  isRequestingMenu=false;
  public logIn:boolean = false;
  public admin:boolean = false;
  constructor(public chat:ChatService,public login:LoginService,public router:Router) { }
  
  ngOnInit() {
    this.login.notifyOnLogin().subscribe(
      data => {
        this.loginuser = data;
        this.logIn = true;
        if(data['username']=='admin_root'){
          this.admin=true;
        }
      }
    );
    this.login.notifyOnLogout().subscribe(
      data => {
        this.loginuser = data;
        this.logIn = false;
        this.admin = false;
      }
    );
    this.chat.notifyChangeOnBadgeNumber().subscribe(
      data => {
        this.chatbadge = data;
      }
    );
    this.fixwrapper = document.getElementById('wrapperfix');
    this.triggerHeader();
  }
  @HostListener('document:click',['$event'])
  click(event:Event){
    if(this.isMenuShowing){
      this.isMenuShowing = !this.isMenuShowing;
    }else if(this.isRequestingMenu){
      this.isRequestingMenu = false;
      this.isMenuShowing = true;
    }
  }
  @HostListener('window:scroll',['$event'])
  scroll(event:Event){
    this.triggerHeader();
  }
  triggerHeader(){
    if(window.pageYOffset > 140){
      if (this.fixwrapper){
        this.fixwrapper.style.top = '0';
      }
    }else{
      if (this.fixwrapper){
        this.fixwrapper.style.top = '-6em';
      }
    }
  }
  gotoAccountPage(user:UserData){
    if(user!=null && user.username == "admin_root" && this.login.userLoggedIn?.username == "admin_root"){
      this.router.navigate(['adminpage']);
    }else{
      if(user!=null){
        this.router.navigate(['account',user.id]);
      }else{
        this.router.navigate(['login']);
      }
    }
  }
  OpenChat(){
    if(this.login.loggedin){
      this.chat.maximize();
      this.chat.changeBadgeNumber('0');
    }else{
      this.router.navigate(['login']);
    }
    
  }
}
