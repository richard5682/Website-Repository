import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/modules/material/material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/page/homepage/homepage.component';
import { HeaderComponent } from './components/component/header/header.component';
import { SimulatorpanelComponent } from './components/component/simulatorpanel/simulatorpanel.component';
import { AccountViewComponent } from './components/component/accountview/accountView.component';
import { SearchpageComponent } from './components/page/searchpage/searchpage.component';
import { AboutpageComponent } from './components/page/aboutpage/aboutpage.component';
import { RegisterpageComponent } from './components/page/registerpage/registerpage.component';
import { ServicepageComponent } from './components/page/servicepage/servicepage.component';
import { LoginpageComponent } from './components/page/loginpage/loginpage.component';
import { ServiceviewComponent } from './components/component/serviceview/serviceview.component';
import { ServicelistComponent } from './components/component/servicelist/servicelist.component';
import { ServicepictureComponent } from './components/component/servicepicture/servicepicture.component';
import { FooterComponent } from './components/component/footer/footer.component';
import { LoginformComponent } from './components/component/loginform/loginform.component';
import { TextboxComponent } from './components/component/textbox/textbox.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './components/component/comment/comment.component';
import { SearchbarComponent } from './components/component/searchbar/searchbar.component';
import { LoginService } from './services/login.service';
import { FetchService } from './services/fetch.service';
import { ConnectService } from './services/connect.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationPickerComponent } from './components/component/locationPicker/locationPicker.component';
import { AccountpageComponent } from './components/page/accountpage/accountpage.component';
import { UploadimageComponent } from './components/component/uploadimage/uploadimage.component';
import { ServicecreationComponent } from './components/page/servicecreation/servicecreation.component';
import { ServicepickerComponent } from './components/component/servicepicker/servicepicker.component';
import { NavbuttonComponent } from './components/component/navbutton/navbutton.component';
import { BillboardWideComponent } from './components/component/billboard-wide/billboard-wide.component';
import { SubcategoriesComponent } from './components/component/subcategories/subcategories.component';
import { SubcategoryService } from './services/subcategory.service';
import { ServiceRequestComponent } from './components/component/serviceRequest/serviceRequest.component';
import { ServicedashboardpageComponent } from './components/page/servicedashboardpage/servicedashboardpage.component';
import { BookingComponent } from './components/component/booking/booking.component';
import { ChatboxComponent } from './components/component/chatbox/chatbox.component';
import { ChatroomComponent } from './components/component/chatroom/chatroom.component';
import { AccountroomComponent } from './components/component/accountroom/accountroom.component';
import { ChatService } from './services/chat.service';
import { LoaderComponent } from './components/component/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { AlertComponent } from './components/component/alert/alert.component';
import { Servicepicker2Component } from './components/component/servicepicker2/servicepicker2.component';
import { MainService } from './services/main.service';
import { EmergencypickerComponent } from './components/component/emergencypicker/emergencypicker.component';
import { EmergencyquerierComponent } from './components/component/emergencyquerier/emergencyquerier.component';
import { EmergencyquickbuttonComponent } from './components/component/emergencyquickbutton/emergencyquickbutton.component';
import { EmergencypageComponent } from './components/page/emergencypage/emergencypage.component';
import { EmergencyviewComponent } from './components/component/emergencyview/emergencyview.component';
import { BookinglistComponent } from './components/component/bookinglist/bookinglist.component';
import { FormviewComponent } from './components/component/formview/formview.component';
import { ServiceaccountComponent } from './components/component/serviceaccount/serviceaccount.component';
import { FormanswerviewComponent } from './components/component/formanswerview/formanswerview.component';
import { FormcreationComponent } from './components/component/formcreation/formcreation.component';
import { BookinghistoryComponent } from './components/component/bookinghistory/bookinghistory.component';
import { PricepickerComponent } from './components/component/pricepicker/pricepicker.component';
import { PricerequestviewerComponent } from './components/component/pricerequestviewer/pricerequestviewer.component';
import { CalendarComponent } from './components/component/calendar/calendar.component';
import { ServiceoverviewComponent } from './components/component/serviceoverview/serviceoverview.component';
import { IcontemplateComponent } from './components/component/icontemplate/icontemplate.component';
import { SocialLoginModule,SocialAuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';
const authserviceconfig = {
  provide: 'SocialAuthServiceConfig',
  useValue: {
    autoLogin: false,
    providers: [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          'clientId'
        )
      },
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('274689281025894')
      }
    ]
  }as SocialAuthServiceConfig}
const root : Routes = [
  { path: 'homepage', component:HomepageComponent},
  { path: 'login', component:LoginpageComponent},
  { path: 'register', component:RegisterpageComponent},
  { path: 'servicepage/:id', component:ServicepageComponent},
  { path: 'search/:inputSearch', component:SearchpageComponent},
  { path: 'about', component:AboutpageComponent},
  { path: 'account/:userid', component:AccountpageComponent},
  { path: 'servicecreation', component:ServicecreationComponent},
  { path: 'emergencypage', component:EmergencypageComponent},
  { path: 'servicedashboard/:id', component:ServicedashboardpageComponent},
  { path: '', component:HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    SimulatorpanelComponent,
    AccountViewComponent,
    SearchpageComponent,
    AboutpageComponent,
    RegisterpageComponent,
    ServicepageComponent,
    LoginpageComponent,
    ServiceviewComponent,
    ServicelistComponent,
    ServicepictureComponent,
    FooterComponent,
    LoginformComponent,
    TextboxComponent,
    CommentComponent,
    SearchpageComponent,
    NavbuttonComponent,
    SearchbarComponent,
    LocationPickerComponent,
    AccountpageComponent,
    UploadimageComponent,
    ServicecreationComponent,
    ServicepickerComponent,
    BillboardWideComponent,
    SubcategoriesComponent,
    ServiceRequestComponent,
    ServicedashboardpageComponent,
    BookingComponent,
    ChatboxComponent,
    ChatroomComponent,
    AccountroomComponent,
    LoaderComponent,
    AlertComponent,
    Servicepicker2Component,
    EmergencypickerComponent,
    EmergencyquerierComponent,
    EmergencyquickbuttonComponent,
    EmergencypageComponent,
    EmergencyviewComponent,
    BookinglistComponent,
    FormviewComponent,
    ServiceaccountComponent,
    FormanswerviewComponent,
    FormcreationComponent,
    BookinghistoryComponent,
    PricepickerComponent,
    PricerequestviewerComponent,
    CalendarComponent,
    ServiceoverviewComponent,
    IcontemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(root,{useHash:true}),
    SocialLoginModule
  ],
  providers: [
    LoginService,
    FetchService,
    ConnectService,
    SubcategoryService,
    ChatService,
    LoaderService,
    MainService,
    authserviceconfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
