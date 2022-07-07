import { Component, OnInit } from '@angular/core';
import { RegisterUserInfo, ServiceData, ServiceQueryData, UserData, UserQueryData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-simulatorpanel',
  templateUrl: './simulatorpanel.component.html',
  styleUrls: ['./simulatorpanel.component.scss']
})
export class SimulatorpanelComponent implements OnInit {
  userLoggedIn : UserData | null = null;
  sampleService : ServiceData | null = null;
  constructor(private fetch:FetchService,private login:LoginService) { }
  ngOnInit() {
    this.login.notifyOnLogin().subscribe(
      data=>{
        console.log(" A USER HAS LOGGED IN WITH A USER DATA OF : ");
        console.log(data);
        this.userLoggedIn = data;
      }
    );
    this.login.notifyOnLogout().subscribe(
      data=>{
        console.log(" A USER HAS LOGGED OUT ");
        this.userLoggedIn = null
      }
    );
  }
  simulateLogin(){
    // var userinfo:RegisterUserInfo = {
    //   username:"gallaird",
    //   password:"password123",
    //   email:"myEmail@yahoo.com",
    //   birthday:"06/13/00",
    //   address:{
    //     city:"Novaliches",
    //     brgy:"STA LUCIA",
    //     street:"street 5",
    //     houseno:"#443"
    //   }
    // };
    // this.fetch.registerUser(userinfo)?.subscribe(
    //   data=>{console.log(data)}
    // );
    
  }
}
