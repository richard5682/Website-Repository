import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/data/data';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {
  @Input() products:Product[];
  @Input() admin:boolean = false;
  constructor(private loader:LoaderService) { }

  ngOnInit() {
  }
  addProduct(){
    this.loader.createProduct().subscribe(
      data=>{
        if(data){
          this.loader.adminSubject.next('reload');
        }
       
      }
    )
  }
}
