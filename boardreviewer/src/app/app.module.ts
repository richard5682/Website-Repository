import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AlertComponent } from './components/component/alert/alert.component';
import { CirclescoreComponent } from './components/component/circlescore/circlescore.component';
import { FactboxComponent } from './components/component/factbox/factbox.component';
import { FooterComponent } from './components/component/footer/footer.component';
import { HeaderComponent } from './components/component/header/header.component';
import { LoaderComponent } from './components/component/loader/loader.component';
import { QuestionComponent } from './components/component/question/question.component';
import { QuestioneditorComponent } from './components/component/questioneditor/questioneditor.component';
import { QuestionviewerComponent } from './components/component/questionviewer/questionviewer.component';
import { Question_uploadComponent } from './components/component/question_upload/question_upload.component';
import { TestComponent } from './components/component/test/test.component';
import { TextboxComponent } from './components/component/textbox/textbox.component';
import { AboutuspageComponent } from './components/page/aboutuspage/aboutuspage.component';
import { AdminpageComponent } from './components/page/adminpage/adminpage.component';
import { HomepageComponent } from './components/page/homepage/homepage.component';
import { QuestionsubmissionComponent } from './components/page/questionsubmission/questionsubmission.component';
import { MaterialModule } from './modules/material/material.module';
import { AdminService } from './services/admin.service';
import { ConnectService } from './services/connect.service';
import { FetchService } from './services/fetch.service';
import { LoaderService } from './services/loader.service';

const root : Routes = [
  {path:'homepage',component:HomepageComponent},
  {path:'adminpage',component:AdminpageComponent},
  {path:'questionsubmission',component:QuestionsubmissionComponent},
  {path:'aboutuspage',component:AboutuspageComponent},
  {path:'',component:HomepageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    AlertComponent,
    TextboxComponent,
    HomepageComponent,
    HeaderComponent,
    FactboxComponent,
    QuestionComponent,
    TestComponent,
    CirclescoreComponent,
    QuestionsubmissionComponent,
    AdminpageComponent,
    QuestionviewerComponent,
    QuestioneditorComponent,
    AboutuspageComponent,
    Question_uploadComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(root,{useHash:true})
  ],
  providers: [
    ConnectService,
    FetchService,
    LoaderService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
