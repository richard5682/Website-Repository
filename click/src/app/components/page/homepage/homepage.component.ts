import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceData, ServiceQueryData, SubCategories } from 'src/app/data/dataType';
import { ChatService } from 'src/app/services/chat.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoginService } from 'src/app/services/login.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

interface SubCategoryAvailable{
  subcat:string;
  available:number;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  @ViewChild('backdrop') backdrop:ElementRef|null = null;

  backdrop_picture!:string;
  backdrop_color!:string;
  image_opacity:number=0;

  pickedCategory!:string;
  subcategories!:SubCategoryAvailable[];

  cleaning_services!:ServiceData[];
  laundry_services!:ServiceData[];
  food_services!:ServiceData[];
  carpentry_services!:ServiceData[];
  query_services!:ServiceData[];
  all_services!:ServiceData[][];
  load_attempt=0;
  MAXLOADATTEMPT=2;
  constructor(private chat:ChatService,private loader:LoaderService,public fetch:FetchService,private subcat:SubcategoryService,public login:LoginService,private router:Router) { }
  @HostListener('window:scroll',['$event'])
  scroll(event:Event){
    this.scrollevent();
  }
  scrollevent(){
    var offset = window.pageYOffset;
    
    if(this.backdrop){
      if(offset > 800){
        this.backdrop.nativeElement.style.opacity = "1"
        console.log(this.backdrop.nativeElement.style.backcolor);
        this.backdrop_color = "white";
        this.image_opacity = 0;
      }else if(offset > 200){
        this.backdrop.nativeElement.style.opacity = "1";
        this.backdrop_color = "white";
        this.image_opacity = 1;
      }else{
        this.backdrop.nativeElement.style.opacity = "0";
        this.image_opacity = 1;
      }
    }

    
  }
  subcategoryClick(subcat:string){
    var subcatarray = new Array();
    subcatarray.push(subcat);
   
    if(this.login.userLoggedIn){
      this.loader.showLoader("Finding Service")
      var query:ServiceQueryData = new ServiceQueryData(null,{category:this.pickedCategory,subcategory:new SubCategories(subcatarray)},null,this.login.userLoggedIn.address,null);
      var service_avail:ServiceData[] = new Array();
      this.fetch.instantBooking(query)?.subscribe(
        services=>{
          this.loader.showLoader("Finding Available Service")
          services.forEach(service => {
            if(service.available == 1 && service.ownerid != this.login.userLoggedIn?.id){
              service_avail.push(service);
            }
          });
          if(service_avail.length > 0){
            this.randomBooking(service_avail,subcatarray);
          }else{
            this.loader.showLoader("hide");
            this.loader.showAlert("No Available Service Found In Your Area")
          }
          
        },
        error=>{
          this.loader.showLoader("hide");
          this.loader.showAlert(error);
        }
      )
    }else{
      this.router.navigate(['login']);
    }
  }
  randomBooking(services:ServiceData[],subcat:string[]){
    var rindex = Math.floor(Math.random()*(services.length));
    var cservice = services[rindex];
    this.fetch.createBooking({serviceid:cservice.serviceid,exectime:(Date.now()+3600000).toString(),price:cservice.price,subcategory_obj:new SubCategories(subcat)})?.subscribe(
      id=>{
        if(this.login.userLoggedIn){
          this.chat.fetchChatRoom('null',cservice.serviceid,0)?.subscribe(
            servicechatroom=>{
              this.chat.fetchChatRoom('null',cservice.serviceid,id)?.subscribe(
                bookingchatroom=>{
                  this.chat.setCurrentRoom(bookingchatroom);
                  this.chat.maximize();
                  this.loader.showLoader('hide');
                },
                error=>{
                  this.loader.showLoader('hide');
                  this.loader.showAlert(error);
                }
              );
            }
          );
          
        } 
      },
      error=>{
        this.loader.showLoader('hide');
        this.loader.showAlert(error);
      }
    )
  }
  categoryClick(cat:string){
    this.pickedCategory = cat;
    this.backdrop_picture = this.subcat.CatPicture[cat];
    var buffersubcat:SubCategoryAvailable[] = new Array();
    this.subcat.getSubCategory(cat).forEach(subcat=>{
      buffersubcat.push({subcat:subcat,available:0});
    })
    this.subcategories = buffersubcat;
    if(this.login.userLoggedIn){
      var query:ServiceQueryData = new ServiceQueryData(null,{category:this.pickedCategory,subcategory:new SubCategories(null)},null,this.login.userLoggedIn.address,null);
      this.fetch.instantBooking(query)?.subscribe(
        services=>{
          services.forEach(service => {
            buffersubcat.forEach(buffersub => {
              var servicesubcategories = service.subcategories.split(",");
              servicesubcategories.forEach(servicesubcategory => {
              if(buffersub.subcat == servicesubcategory){
                buffersub.available++;
              }
              });
            });
          });
        },
        error=>{},
        ()=>{
          this.subcategories = buffersubcat;
        }
      )
    }
  }
  ngOnInit() {
    // this.loader.showLoader("LOADING SERVICES");
    // this.fetch.queryService(new ServiceQueryData(null,{category:"Cleaning",subcategory:new SubCategories(null)},null,null,null))?.subscribe(
    //   (data) => {
    //     this.cleaning_services = data; 
        
    //   }
    // );
    // this.fetch.queryService(new ServiceQueryData(null,{category:"Food",subcategory:new SubCategories(null)},null,null,null))?.subscribe(
    //   (data) => {
    //     this.food_services = data;
        
    //   }
    // );
    // this.fetch.queryService(new ServiceQueryData(null,{category:"Carpentry",subcategory:new SubCategories(null)},null,null,null))?.subscribe(
    //   (data) => {
    //     this.carpentry_services = data;
        
    //   }
    // );
    // this.fetch.queryService(new ServiceQueryData(null,{category:"Laundry",subcategory:new SubCategories(null)},null,null,null))?.subscribe(
    //   (data) => {
    //     this.laundry_services = data;
        
    //   }
    // );
    
    // this.WaitTillAllLoad();
  }
  searchService(category:string){
    this.loader.showLoader("QUERYING SERVICE");
    this.fetch.queryService(new ServiceQueryData(null,{category:category,subcategory:new SubCategories(null)},null,null,null))?.subscribe(
      (data) => {
        this.loader.showLoader("hide");
        this.query_services = data;
      },
      (error)=>{
        this.loader.showAlert("NO SERVICE FOUND!");
        this.loader.showLoader("hide");
      }
    );
  }
  WaitTillAllLoad(){
    setTimeout(()=>{
      if(this.carpentry_services && this.cleaning_services && this.food_services && this.laundry_services){
        this.all_services = new Array();
        this.all_services.push(this.laundry_services);
        this.all_services.push(this.carpentry_services);
        this.all_services.push(this.food_services);
        this.all_services.push(this.cleaning_services);
        this.loader.showLoader("hide");
      }else{
        if(this.load_attempt < this.MAXLOADATTEMPT){
          this.WaitTillAllLoad();
          this.load_attempt++;
        }else{
          this.loader.showLoader("hide");
          if(this.carpentry_services){
            this.all_services.push(this.carpentry_services);
          }
          if(this.cleaning_services){
            this.all_services.push(this.cleaning_services);
          }
          if(this.food_services){
            this.all_services.push(this.food_services);
          }
          if(this.laundry_services){
            this.all_services.push(this.laundry_services);
          }
        }
      }
    },1000);
  }
}
