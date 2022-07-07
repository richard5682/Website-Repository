import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-emergencypicker',
  templateUrl: './emergencypicker.component.html',
  styleUrls: ['./emergencypicker.component.scss']
})
export class EmergencypickerComponent implements OnInit {
  value!:string;
  validate:boolean=false;
  emergency_category:string[] = [
    'Police','Hospital','Fire Station'
  ]
  @Output() CategoryChange = new EventEmitter();
  constructor(public subcat:SubcategoryService) { }

  ngOnInit() {
  }
  changeValue(category:string){
    this.value=category;
    if(this.value != undefined){
      this.validate= true;
    }
    this.CategoryChange.emit();
  }
}
