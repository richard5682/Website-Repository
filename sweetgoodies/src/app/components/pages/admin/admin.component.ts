import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Item, Product } from 'src/app/data/data';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  Products:Product[] = new Array();
  Items:Item[] = new Array();
  constructor(private router:Router,public fetch:FetchService,private loader:LoaderService){
    
  }
  ngOnInit() {
    this.loadProducts();
    this.loader.adminSubject.asObservable().subscribe(
      command => {
        if(command == 'reload'){
          this.loadProducts();
        }
      }
    )
    this.fetch.checkAdmin().subscribe(
      data=>{
        if(!data){
          this.router.navigate(['homepage']);
        }
      }
    )
  }
  changeMenu(){
    this.loader.showImageUploader().subscribe(
      data=>{
        if(data != ''){
          this.loader.showLoader();
          this.fetch.editmenu(data).subscribe(
            data=>{
              this.loader.hideLoader();
            },
            error=>{
              this.loader.hideLoader();
            }
          )
        }
      }
    )
  }
  loadProducts(){
    this.loader.showLoader();
    var items = this.fetch.fetchItems();
    items.subscribe(
      data=>{
        this.Items = data;
      },
      error=>{
        this.Products = null;
      }
    )
    var products = this.fetch.fetchProducts();
    products.subscribe(
      data=>{
        this.Products = data;
      },
      error=>{
        this.Products = null;
      }
    )
    forkJoin({items,products}).subscribe(
      data => {
        this.loader.hideLoader();
      },
      error=>{
        this.loader.hideLoader();
      },
      () => {
        this.loader.hideLoader();
      }
    )
  }
}
