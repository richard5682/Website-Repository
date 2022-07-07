import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { browser } from 'protractor';
import { forkJoin } from 'rxjs';
import { Item, Product } from 'src/app/data/data';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ItemlistComponent } from '../../component/itemlist/itemlist.component';
import { LoaderComponent } from '../../component/loader/loader.component';
import { ProductlistComponent } from '../../component/productlist/productlist.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('itemlist') itemlist:ItemlistComponent;
  billboard1_link:string[] = [
    this.fetch.getLink('0.PNG','billboards'),
    this.fetch.getLink('1.PNG','billboards'),
    this.fetch.getLink('2.PNG','billboards'),
    this.fetch.getLink('3.PNG','billboards'),
    this.fetch.getLink('4.PNG','billboards'),
    this.fetch.getLink('5.PNG','billboards'),
    this.fetch.getLink('6.PNG','billboards'),
    this.fetch.getLink('7.PNG','billboards'),
    this.fetch.getLink('8.PNG','billboards')
  ]
  Products:Product[] = new Array();
  Items:Item[] = new Array();
  chosenItems:Item[] = new Array();
  constructor(private fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
      this.loadProducts();
  }
  loadProducts(){
    this.loader.showLoader();
    var items = this.fetch.fetchItems();
    items.subscribe(
      data=>{
        this.Items = data;
        this.itemlist.setItem(data[0]);
      }
    )
    var products = this.fetch.fetchProducts();
    products.subscribe(
      data=>{
        this.Products = data;
       
      }
    )
    forkJoin({items,products}).subscribe(
      data => {
        this.loader.hideLoader();
        var firstitem = data.items[0].id;
        this.getProducts(firstitem);
        this.itemlist.setItem(data.items[0]);
      },
      error => {
        this.loader.hideLoader();
      },
      () => {
        this.loader.hideLoader();
      }
    )
  }
  getProducts(itemid:number){
    this.chosenItems = new Array();
    this.Products.forEach(product => {
      if(itemid == product.itemid){
        this.chosenItems.push(product);
      }
    });
  }
  changeProduct(item:Item){
    this.getProducts(item.id);
  }

}
