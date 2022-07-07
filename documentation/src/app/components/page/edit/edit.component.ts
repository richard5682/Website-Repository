import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchService } from 'src/app/service/fetch.service';
import { ComponentData } from '../../dataType/ComponentData';
import { DataInterface } from '../../dataType/DataInterface';
import { PageData } from '../../dataType/PageData';
import { ServiceData } from '../../dataType/ServiceData';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  type;
  id;
  component:ComponentData;
  service:ServiceData;
  data:DataInterface;
  page:PageData;
  constructor(private actroute:ActivatedRoute,private fetch:FetchService,private router:Router) { }

  ngOnInit() {
    this.type = this.actroute.snapshot.paramMap.get('type');
    this.id = this.actroute.snapshot.paramMap.get('id');
    if(this.type == 'component'){
      this.fetch.component.forEach(e => {
        if(e.position == this.id){
          this.component = e;
        }
      });
    }else if(this.type == 'service'){
      this.fetch.service.forEach(e => {
        if(e.position == this.id){
          this.service = e;
        }
      });

    }else if(this.type == 'data'){
      this.fetch.datatype.forEach(e => {
        if(e.position == this.id){
          this.data = e;
        }
      });

    }if(this.type == 'page'){
      this.fetch.page.forEach(e => {
        if(e.position == this.id){
          this.page = e;
        }
      });
    }
    if(this.component == null && this.service == null && this.data == null && this.page == null){
      this.router.navigate(['homepage']);
    }
  }
  editPage(iclass,desc,selector,routeselector,params){
    this.fetch.editPage(this.id,iclass,desc,selector,routeselector,params).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  editComponent(iclass,selector,desc,input,output){
    this.fetch.editComponent(this.id,iclass,selector,desc,input,output).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  editService(iclass,desc,method){
    this.fetch.editService(this.id,iclass,desc,method).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
  editData(iclass,desc,data){
    this.fetch.editData(this.id,iclass,desc,data).subscribe(
      data => {
        if(data['result'] == 1){
          this.router.navigate(['homepage']);
        }
      }
    );
  }
}
