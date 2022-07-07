import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin:boolean = false;
  constructor(public router:Router,private admin:AdminService) { }

  ngOnInit() {
    this.admin.subscribeOnAdmin().subscribe(
      data=>{
        if(data){
          this.isAdmin = this.admin.isAdmin;
        }
      }
    )
  }
  gotoLink(url:string){
    window.open(url,'_blank');
  }

}
