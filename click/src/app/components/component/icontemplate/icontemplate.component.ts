import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icontemplate',
  templateUrl: './icontemplate.component.html',
  styleUrls: ['./icontemplate.component.scss']
})
export class IcontemplateComponent implements OnInit {
  @Input() icon!:string;
  @Input() text!:string;
  @Input() color:string='black';
  @Input() opacity:number=1;
  constructor() { }

  ngOnInit() {
  }

}
