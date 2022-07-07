import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AlertComponent } from './components/component/alert/alert.component';
import { LoaderComponent } from './components/component/loader/loader.component';
import { LoginformComponent } from './components/component/loginform/loginform.component';
import { TextboxComponent } from './components/component/textbox/textbox.component';
import { MaterialModule } from './modules/material/material.module';
import { ConnectService } from './services/connect.service';
import { FetchService } from './services/fetch.service';
import { LoaderService } from './services/loader.service';
import { LoginService } from './services/login.service';

const root : Routes = [
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginformComponent,
    AlertComponent,
    TextboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(root,{useHash:true}),
  ],
  providers: [
    ConnectService,
    FetchService,
    LoaderService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
