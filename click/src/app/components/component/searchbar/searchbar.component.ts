import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { AccountViewComponent } from '../accountView/accountView.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
 private router: Router;
 public inputSearch: any;

  constructor(router:Router) { 
    this.router = router;
  }
  onclick(inputSearch: any) {
    this.router.navigate(["search/", inputSearch]);
  }
  ngOnInit(){

  }
  

}
