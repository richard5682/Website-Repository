import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MaterialModule } from './module/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/page/homepage/homepage.component';
import { RouterModule, Routes} from '@angular/router';
import { HeaderComponent } from './components/component/header/header.component';
import { TablelistComponent } from './components/component/tablelist/tablelist.component';
import { FetchService } from './service/fetch.service';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './components/page/add/add.component';
import { EditComponent } from './components/page/edit/edit.component';
import { CalendarblockComponent } from './components/component/calendarblock/calendarblock.component';
import { CalendarComponent } from './components/component/calendar/calendar.component';
import { AddeventComponent } from './components/page/addevent/addevent.component';

const routes : Routes = [
  {path:'', component:HomepageComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'add/:type',component:AddComponent},
  {path:'edit/:type/:id',component:EditComponent},
  {path:'addevent/:type/:id/:date/:month/:icon/:color/:backcolor/:text',component:AddeventComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    TablelistComponent,
    AddComponent,
    EditComponent,
    CalendarblockComponent,
    CalendarComponent,
    AddeventComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [FetchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
