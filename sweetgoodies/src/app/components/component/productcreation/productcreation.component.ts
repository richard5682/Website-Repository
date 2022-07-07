import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Subject } from 'rxjs';
import { Item, Product, Struct_Product } from 'src/app/data/data';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ImageuploaderComponent } from '../imageuploader/imageuploader.component';
import { TextboxComponent } from '../textbox/textbox.component';

@Component({
  selector: 'app-productcreation',
  templateUrl: './productcreation.component.html',
  styleUrls: ['./productcreation.component.scss']
})
export class ProductcreationComponent implements OnInit {
  @ViewChild('main') main:ElementRef<HTMLElement>;
  @ViewChild('title') title:TextboxComponent;
  @ViewChild('desc') desc:TextboxComponent;
  @ViewChild('price') price:TextboxComponent;
  @ViewChild('extra') extra:TextboxComponent;
  @ViewChild('image') image:ImageuploaderComponent;
  @ViewChild('select') item:MatSelect;

  items:Item[];
  current_product:Product;
  current_subj:Subject<boolean>;
  creation_mode:boolean = false;
  picture_change = false;
  constructor(private fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
    this.reset_editor();
    this.loadItems();
  }
  reset_editor(){
    this.current_product = {
      id:0,
      description:'Description',
      extra:'Extra',
      itemid:0,
      price:'0.00',
      title:'Title',
      picture_link:'0.PNG'
    }
    this.picture_change = false;
    this.current_product.id = 0;
    this.current_product.description = 'Description';
    this.current_product.extra = '';
    this.current_product.itemid = 0;
    this.current_product.price = '0.00';
    this.current_product.title = 'Title';
  }
  createProduct(){
    this.loader.showLoader();
    this.fetch.addProducts(Struct_Product.Construct_Struct(this.current_product,this.picture_change)).subscribe(
      data=>{
        this.loader.hideLoader();
        this.current_subj.next(true);
        this.current_subj.complete();
        this.hide();
      }
    )
  }
  editProduct(){
    this.loader.showLoader();
    this.fetch.editProducts(Struct_Product.Construct_Struct(this.current_product,this.picture_change)).subscribe(
      data=>{
        this.loader.hideLoader();
        this.current_subj.next(true);
        this.current_subj.complete();
        this.hide();
      }
    )
  }
  showCreation(subj:Subject<boolean>){
    this.reset_editor();
    this.loadItems();
    this.creation_mode = true;
    this.current_subj = subj;
    this.show();
  }
  showEditor(product:Product,subj:Subject<boolean>){
    this.loadItems();
    this.creation_mode = false;
    this.current_subj = subj;
    this.current_product = product;
    this.title.value = product.title;
    this.desc.value = product.description;
    this.price.value = product.price;
    this.extra.value = product.extra;
    this.item.value = product.itemid;
    this.image.data = product.picture_data;
    this.title.value = '';
    this.desc.value = '';
    this.extra.value = '';
    this.item.value = '';
    this.show();
  }
  cancel(){
    this.current_subj.next(false);
    this.current_subj.complete();
    this.hide();
  }
  hide(){
    this.main.nativeElement.style.display = 'none';
  }
  show(){
    this.main.nativeElement.style.display = 'block';
  }
  loadItems(){
    this.fetch.fetchItems().subscribe(
      data=>{
        this.items = data;
      }
    )
  }
  itemidchange(value:MatSelectChange){
    this.current_product.itemid = value.value;
  }
  imagechange(data:string){
    this.current_product.picture_data = data;
    this.picture_change = true;
  }
  titlechange(title:string){
    this.current_product.title = title;
  }
  descriptionchange(desc:string){
    this.current_product.description = desc;
  }
  pricechange(price:string){
    this.current_product.price = price;
  }
  extrachange(extra:string){
    this.current_product.extra = extra;
  }
}
