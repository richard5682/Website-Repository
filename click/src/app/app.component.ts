
import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ConnectService } from './services/connect.service';
import { filter } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { FetchService } from './services/fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'click';
  constructor(public router:Router,public login:LoginService,private fetch:FetchService,private renderer:Renderer2){
    
  }
  ngOnInit(){
    const script = this.renderer.createElement('script');
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event=> {
        window.scrollTo(0,0);
        this.login.checkLoggedIn();
    });
  }
//   ValidateEmail(mail:string) 
// {
//  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }
}
