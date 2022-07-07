import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentData } from '../../dataType/ComponentData';
import { DataInterface } from '../../dataType/DataInterface';
import { PageData } from '../../dataType/PageData';
import { ServiceData } from '../../dataType/ServiceData';

@Component({
  selector: 'app-tablelist',
  templateUrl: './tablelist.component.html',
  styleUrls: ['./tablelist.component.scss']
})
export class TablelistComponent implements OnInit {
  @Input() componentdatas:ComponentData[];
  @Input() servicedatas:ServiceData[];
  @Input() datatypedatas:DataInterface[];
  @Input() pagedatas:PageData[];
  @Input() keys;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  GotoEdit(type:string,id:number){
    this.router.navigate(['edit',type,id]);
  }
}
