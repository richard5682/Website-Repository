import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MATH_GJ } from './data/Math_GJ';
import { AdminService } from './services/admin.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ECE Board Reviewer';
  constructor(private admin:AdminService,private titleservice:Title){}

  ngOnInit(){
    this.titleservice.setTitle(this.title);
    this.admin.checkAdmin();
    console.log("Version 1.0");
  }
}
