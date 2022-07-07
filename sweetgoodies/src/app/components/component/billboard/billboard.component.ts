import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.scss']
})
export class BillboardComponent implements OnInit, AfterViewInit {
  @ViewChild('image') image:ElementRef<HTMLElement>;
  @ViewChild('wrapper') wrapper:ElementRef<HTMLElement>;
  @ViewChild('shadow') shadow:ElementRef<HTMLElement>;
  @Input() images_link:string[];
  image_index:number = 0;
  BOOLINITIAL = false;
  
  constructor(public loader:LoaderService) { }

  ngOnInit() {
   
   
  }
  ngAfterViewInit(){
    setTimeout(() => {
      this.reset();
    }, 500);
    
  }
  animate(height:number){
    this.shadow.nativeElement.style.transition = 'ease 2s';
    this.shadow.nativeElement.style.opacity = '0';
    this.image.nativeElement.style.transition = '25s linear';
    var wrapperheight = this.wrapper.nativeElement.offsetHeight;
    var offset = -(height-wrapperheight);
    this.image.nativeElement.style.top = offset+'px';
    setTimeout(() => {
      this.image_index++
      this.reset();
    }, 6000);
  }
  reset(){
    if(this.image_index >= this.images_link.length){
      this.image_index = 0;
    }
    this.image.nativeElement.style.transition = '0s';
    this.image.nativeElement.style.top = '0px';
    this.shadow.nativeElement.style.transition = '0s';
    this.shadow.nativeElement.style.opacity = '1';
    setTimeout(() => {
      var height = this.image.nativeElement.offsetHeight
      this.animate(height);
      
      },10);
      
  }
}
