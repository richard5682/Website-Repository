import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/data/data';
import { ConnectService } from 'src/app/services/connect.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-productblock',
  templateUrl: './productblock.component.html',
  styleUrls: ['./productblock.component.scss']
})
export class ProductblockComponent implements OnInit {
  @Input() product:Product;
  @Input() admin:boolean = false;
  constructor(public fetch:FetchService,public loader:LoaderService) { }

  ngOnInit() {
  }
  edit(){
    this.loader.editProduct(this.product);
  }
  deleteProduct(){
    this.loader.showLoader();
    this.fetch.deleteProducts(this.product.id).subscribe(
      data=>{
        this.loader.hideLoader();
        this.loader.adminSubject.next('reload');
      },
      error => {
        this.loader.hideLoader();
      },
      () => {
        this.loader.hideLoader();
      }
    )
  
  }
}
