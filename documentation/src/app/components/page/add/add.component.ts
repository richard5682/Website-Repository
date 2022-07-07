import { SelectorContext } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/service/fetch.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  type;
  constructor(private actroute:ActivatedRoute,private fetch:FetchService,private router:Router) { }

  ngOnInit() {
    this.type = this.actroute.snapshot.paramMap.get('type');
  }
  addComponent(iclass,selector,desc,input,output){
    this.fetch.addComponent(iclass,selector,desc,input,output).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  addService(iclass,desc,method){
    this.fetch.addService(iclass,desc,method).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  addPage(iclass,desc,selector,routeselector,params){
    this.fetch.addPage(iclass,desc,selector,routeselector,params).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  addData(iclass,desc,data){
    this.fetch.addData(iclass,desc,data).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
}
