import { Component, OnInit } from '@angular/core';
import { ServiceType, SubCategories } from 'src/app/data/dataType';
import { SubcategoryService } from 'src/app/services/subcategory.service';


@Component({
  selector: 'app-servicepicker',
  templateUrl: './servicepicker.component.html',
  styleUrls: ['./servicepicker.component.scss']
})
export class ServicepickerComponent implements OnInit {


  picked_category!:string;
  picked_sub!:string;
  picked_subcategory = new Array<string>();
  constructor(public subcat:SubcategoryService) { }
  getValue():ServiceType{
    var buffer:ServiceType = {
      category:this.picked_category,
      subcategory: new SubCategories(this.picked_subcategory)
    };
    return buffer;
  }
  addSubCategory(subcategory:string){
    var contain = false;
    this.picked_subcategory.forEach(
      val=>{
        if(val == subcategory){
          contain = true;
        }
      }
    );
    if(!contain){
      this.picked_subcategory.push(subcategory);
    }
  }
  clearchips(){
    this.picked_subcategory = new Array<string>();
  }
  removesubcategory(subcategory:string){
    this.picked_subcategory.forEach(
      (val,index)=>{
        if(val==subcategory){
          this.picked_subcategory.splice(index,1);
        }
      }
    );
  }
  validate():boolean{
    if(this.picked_category != null && this.picked_subcategory.length != 0){
      return true;
    }
    return false;
  }

  ngOnInit() {
  }

}
