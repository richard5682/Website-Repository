import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {
  @Input() subcategory!:string;
  @Input() icon:string="book";
  @Input() text:string="BOOK";
  @Input() available:number=0;
  @Output() subcatClicked = new EventEmitter<string>();
  imagesrc!:string;
  constructor(private subcat:SubcategoryService) { }

  ngOnInit() {
    this.imagesrc = this.subcat.SubCatPicture[this.subcategory];
  }
  emitevent(){
    this.subcatClicked.emit(this.subcategory);
  }
}
