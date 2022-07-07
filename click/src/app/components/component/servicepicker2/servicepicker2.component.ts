import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ServiceType, SubCategories } from 'src/app/data/dataType';
import { SubcategoryService } from 'src/app/services/subcategory.service';

interface categories{
  value:string,
  subcategories:string[]
}

@Component({
  selector: 'app-servicepicker2',
  templateUrl: './servicepicker2.component.html',
  styleUrls: ['./servicepicker2.component.scss']
})
export class Servicepicker2Component implements OnInit {
  @Output() CategoryPicked = new EventEmitter<string>();

  constructor(public subcat:SubcategoryService) { }

  laundry_sub:string[]           = ['Wet Cleaning','Dry Cleaning','Comforter'];

  cleaning_sub:string[]          = ['Condo','House'];
  
  airconcleaning_sub:string[]    = ['Window Type Cleaning','Split Type Cleaning'];
  
  foodservice_sub:string[]       = ['Catering','Food Delivery'];
  
  tutorialservice_sub:string[]   = ['Academic Tutor'];
  
  petservice_sub:string[]        = ['Cat Grooming','Dog Grooming',];
  
  beautyservice_sub:string[]     = ['Manicure','Pedicure','Mani-Pedi','Foot Spa','Massage for Women','Massage for Men','Make-Up Artist'];
  
  carpentryservice_sub:string[]  = ['Plumbing','Painting','Roofing','Tiling'];
  
  automotiveservice_sub:string[] = ['Aircon Cleaning','Radiator Cleaning','Change Oil','Tune Up','Electrical','Paint/Dents Repair',
                                    'Battery Delivery Replacement'];
  
  computerservice_sub:string[]   = ['PC/Laptop Repair','PC/Laptop Reformat','PC/Laptop Cleaning and Assembly','OS Upgrade','Software Installation/Upgrade',
                                    'PC/Laptop HDD/SSD Installation/Upgrade','PC/Laptop RAM Replacement/Upgrade'];
  
  technicianservice_sub:string[] = ['Smart/LCD/LED TV Repair','Smartphone Reformat/Repair','Gadget Repair','Appliances Repair'];
  
  electricianservice_sub:string[]= ['Wiring Installation/Repair','Lights Replacement/Repair','Electrical Problem Repair'];
  
  eventservice_sub:string[]      = ['Photographer','Videographer','Lights and Sounds','Videoke Rentals','Magician','Clown','Singer',
                                    'Event Host','Band','Video Editing'];
  pickedsub:string[] = new Array();
    Category:categories[] = 
    [
      {value:"Laundry",subcategories:this.laundry_sub},
      {value:"Cleaning",subcategories:this.cleaning_sub},
      {value:"Aircon Cleaning",subcategories:this.airconcleaning_sub},
      {value:"Food",subcategories:this.foodservice_sub},
      {value:"Tutorial",subcategories:this.tutorialservice_sub},
      {value:"Pet",subcategories:this.petservice_sub},
      {value:"Beauty",subcategories:this.beautyservice_sub},
      {value:"Carpentry",subcategories:this.carpentryservice_sub},
      {value:"Automotive",subcategories:this.automotiveservice_sub},
      {value:"Computer",subcategories:this.computerservice_sub},
      {value:"Technician",subcategories:this.technicianservice_sub},
      {value:"Electrician",subcategories:this.electricianservice_sub},
      {value:"Events",subcategories:this.eventservice_sub}
    ];
    picked_category!:string;
    picked_sub!:string;
    picked_subcategory = new Array<string>();
    getValue():ServiceType{
      var buffer:ServiceType = {
        category:this.picked_category,
        subcategory: new SubCategories(this.picked_subcategory)
      };
      return buffer;
    }
    getSubCategory():string[]{
      var buffer!:string[];
      this.Category.forEach(val=>{
        if(val.value == this.picked_category){
          buffer = val.subcategories;
        }
      })
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
    categoryClicked(category:string){
      this.CategoryPicked.emit(category);
    }
    ngOnInit() {
    }
  

}
