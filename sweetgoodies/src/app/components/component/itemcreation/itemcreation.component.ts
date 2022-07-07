import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Item } from 'src/app/data/data';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TextboxComponent } from '../textbox/textbox.component';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.scss']
})
export class ItemcreationComponent implements OnInit {
  @ViewChild('main') main:ElementRef<HTMLElement>;
  @ViewChild('title') title_value:TextboxComponent;
  current_item:Item;
  creationmode:boolean = true;
  current_subj:Subject<boolean>;
  constructor(private fetch:FetchService) { }

  ngOnInit() {
   
  }
  showCreation(subj:Subject<boolean>){
    this.creationmode = true;
    this.current_subj = subj;
    this.showForm();
  }
  showEditor(subj:Subject<boolean>,item:Item){
    this.creationmode = false;
    this.title_value.value = item.title;
    this.current_item = item;
    this.current_subj = subj;
    console.log(this.current_subj);
    this.showForm();
  }
  showForm(){
    this.main.nativeElement.style.display = 'block';
  }
  hideForm(){
    this.main.nativeElement.style.display = 'none';
  }
  cancel(){
    this.current_subj.next(false);
    this.current_subj.complete();
    this.hideForm();
  }
  addTitle(title:string){
    if(this.creationmode){
      this.fetch.addItems(title).subscribe(
        data=>{
          this.current_subj.next(true);
          this.current_subj.complete();
          this.hideForm();
        }
      )
    }else{
      this.fetch.editItems(this.current_item.id,title).subscribe(
        data=>{
          this.current_subj.next(true);
          this.current_subj.complete();
          this.hideForm();
        }
      )
    }
  }
}
