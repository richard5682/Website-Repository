import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  admin:boolean=false;
  constructor(public router:Router,private fetch:FetchService) { }

  ngOnInit() {
    this.fetch.checkAdmin().subscribe(
      data=>{
        this.admin=data;
      }
    )
  }

}
