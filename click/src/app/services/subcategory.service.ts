import { Injectable, Input, OnInit } from '@angular/core';
export interface categories{
  value:string,
  subcategories:string[]
}

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService implements OnInit{
  ROOT:string = "assets/SubCategories/";

  EXT:string=".png";

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

  EmergencyPicture:any = {
    'Fire Station':'assets/Emergency/Fire.png',
    'Police':'assets/Emergency/Police.png',
    'Hospital':'assets/Emergency/Hospital.png',
  }
  CatPicture:any = {
    'Laundry':this.ROOT+"Laundry/"+"wetclean"+this.EXT,
    'Cleaning':this.ROOT+"Cleaning/"+"condo"+this.EXT,
    'Aircon Cleaning':this.ROOT+"Aircon Cleaning/"+"splittype"+this.EXT,
    'Food':this.ROOT+"Food/"+"catering"+this.EXT,
    'Tutorial':this.ROOT+"Tutorial/"+"academictutor"+this.EXT,
    'Pet':this.ROOT+"Pet/"+"catgrooming"+this.EXT,
    'Beauty':this.ROOT+"Beauty/"+"massageforwomen"+this.EXT,
    'Carpentry':this.ROOT+"Carpentry/"+"roofing"+this.EXT,
    'Automotive':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Computer':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'Technician':this.ROOT+"Technician/"+"technician"+this.EXT,
    'Electrician':this.ROOT+"Electrician/"+"electrician"+this.EXT,
    'Events':this.ROOT+"Events/"+"lightsandsound"+this.EXT
  }
  SubCatPicture:any = {
    //LAUNDRY
    'Wet Cleaning':this.ROOT+"Laundry/"+"wetclean"+this.EXT,
    'Dry Cleaning':this.ROOT+"Laundry/"+"dryclean"+this.EXT,
    'Comforter':this.ROOT+"Laundry/"+"comforter"+this.EXT,
    //CLEANING
    'Condo':this.ROOT+"Cleaning/"+"condo"+this.EXT,
    'House':this.ROOT+"Cleaning/"+"house"+this.EXT,
    //AIRCON CLEANING
    'Window Type Cleaning':this.ROOT+"Aircon Cleaning/"+"windowtype"+this.EXT,
    'Split Type Cleaning':this.ROOT+"Aircon Cleaning/"+"splittype"+this.EXT,
    //FOOD SERVICE
    'Catering':this.ROOT+"Food/"+"catering"+this.EXT,
    'Food Delivery':this.ROOT+"Food/"+"food"+this.EXT,
    //TUTORIAL
    'Academic Tutor':this.ROOT+"Tutorial/"+"academictutor"+this.EXT,
    //PET
    'Cat Grooming':this.ROOT+"Pet/"+"catgrooming"+this.EXT,
    'Dog Grooming':this.ROOT+"Pet/"+"doggroomning"+this.EXT,
    //BEAUTY
    'Manicure':this.ROOT+"Beauty/"+"manicure"+this.EXT,
    'Pedicure':this.ROOT+"Beauty/"+"pedicure"+this.EXT,
    'Mani-Pedi':this.ROOT+"Beauty/"+"mani-pedi"+this.EXT,
    'Foot Spa':this.ROOT+"Beauty/"+"footspa"+this.EXT,
    'Massage for Women':this.ROOT+"Beauty/"+"massageforwomen"+this.EXT,
    'Massage for Men':this.ROOT+"Beauty/"+"massageformen"+this.EXT,
    'Make-Up Artist':this.ROOT+"Beauty/"+"makeupartist"+this.EXT,
    //CARPENTRY
    'Plumbing':this.ROOT+"Carpentry/"+"plumbing"+this.EXT,
    'Painting':this.ROOT+"Carpentry/"+"painting"+this.EXT,
    'Roofing':this.ROOT+"Carpentry/"+"roofing"+this.EXT,
    'Tiling':this.ROOT+"Carpentry/"+"tiling"+this.EXT,
    //AUTOMOTIVE
    'Aircon Cleaning':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Radiator Cleaning':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Change Oil':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Tune Up':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Electrical':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Paint/Dents Repair':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    'Battery Delivery Replacement':this.ROOT+"Automotive/"+"automotive"+this.EXT,
    //COMPUTER
    'PC/Laptop Repair':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'PC/Laptop Reformat':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'PC/Laptop Cleaning and Assembly':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'OS Upgrade':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'Software Installation/Upgrade':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'PC/Laptop HDD/SSD Installation/Upgrade':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    'PC/Laptop RAM Replacement/Upgrade':this.ROOT+"Computer/"+"computerservice"+this.EXT,
    //TECHNICIAN
    'Smart/LCD/LED TV Repair':this.ROOT+"Technician/"+"technician"+this.EXT,
    'Smartphone Reformat/Repair':this.ROOT+"Technician/"+"technician"+this.EXT,
    'Gadget Repair':this.ROOT+"Technician/"+"technician"+this.EXT,
    'Appliances Repair':this.ROOT+"Technician/"+"technician"+this.EXT,
    //ELECTRICIAN
    'Wiring Installation/Repair':this.ROOT+"Electrician/"+"electrician"+this.EXT,
    'Lights Replacement/Repair':this.ROOT+"Electrician/"+"electrician"+this.EXT,
    'Electrical Problem Repair':this.ROOT+"Electrician/"+"electrician"+this.EXT,
    //EVENTS
    'Photographer':this.ROOT+"Events/"+"videographer"+this.EXT,
    'Videographer':this.ROOT+"Events/"+"photographer"+this.EXT,
    'Lights and Sounds':this.ROOT+"Events/"+"lightsandsound"+this.EXT,
    'Videoke Rentals':this.ROOT+"Events/"+"videoke"+this.EXT,
    'Magician':this.ROOT+"Events/"+"magician"+this.EXT,
    'Clown':this.ROOT+"Events/"+"clown"+this.EXT,
    'Singer':this.ROOT+"Events/"+"singer"+this.EXT,
    'Event Host':this.ROOT+"Events/"+"eventhost"+this.EXT,
    'Band':this.ROOT+"Events/"+"band"+this.EXT,
    'Video Editing':this.ROOT+"Events/"+"videoeditor"+this.EXT
  }
  constructor() { 
    
  }
  getSubCategory(category:string):string[]{
    var buffer!:string[];
    this.Category.forEach(val=>{
      if(val.value == category){
        buffer = val.subcategories;
      }
    })
    return buffer;
  }
  ngOnInit(){
    console.log(this.SubCatPicture['Wet Cleaning']);
  }
}
