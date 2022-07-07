import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/data/data';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.scss']
})
export class ItemlistComponent implements OnInit {
  @Input() items:Item[];
  @Input() admin:boolean = false;
  @Output() itemClick = new EventEmitter<Item>();
  chosenItem:Item;
  constructor(private fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
  }
  setItem(item:Item){
    this.chosenItem = item;
    this.itemClick.emit(item);
  }
  deleteItem(item:Item){
    this.loader.showLoader();
    this.fetch.deleteItems(item.id).subscribe(
      data=>{
        this.loader.hideLoader();
        this.fetch.fetchItems().subscribe(
          data=>{
            this.items=data;
          }
        )
      },
      error=>{
        this.loader.hideLoader();
      }
    )
  }
  addProduct(item:Item){
    if(this.admin){
      console.log(item);
    }

  }
  editItem(item:Item){
    this.loader.showLoader();
    this.loader.editItem(item).subscribe(
      data=>{
        if(data){
          this.loader.hideLoader();
          this.loader.adminSubject.next('reload');
        }
      }
    )
  }
  addItem(){
    this.loader.createItem().subscribe(
      data=>{
        if(data){
          this.loader.adminSubject.next('reload');
        }
      }
    )
  }
}
