import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SimulatorComponent } from './components/simulator/simulator.component';


@NgModule({
  declarations: [					
    AppComponent,
    SimulatorComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
