import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergencyquickbutton',
  templateUrl: './emergencyquickbutton.component.html',
  styleUrls: ['./emergencyquickbutton.component.scss']
})
export class EmergencyquickbuttonComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

}
