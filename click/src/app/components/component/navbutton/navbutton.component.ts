import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbutton',
  templateUrl: './navbutton.component.html',
  styleUrls: ['./navbutton.component.scss']
})
export class NavbuttonComponent implements OnInit {
  @Input() icon!:string;
  @Input() tip!:string;
  constructor(public router:Router) { }

  ngOnInit() {
  }

}
