import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circlescore',
  templateUrl: './circlescore.component.html',
  styleUrls: ['./circlescore.component.scss']
})
export class CirclescoreComponent implements OnInit,AfterViewInit,OnChanges {
  @Input() fill:number;
  @Input() correct:number;
  @Input() wrong:number;
  @Input() label:string='LABEL';
  setdeg:number=0;
  deg1:number = 45;
  deg2:number = -45;
  deg3:number = -135;
  @ViewChild('blocker1') blocker1:ElementRef<HTMLElement>;
  @ViewChild('blocker2') blocker2:ElementRef<HTMLElement>;
  @ViewChild('blocker3') blocker3:ElementRef<HTMLElement>;
  constructor() { }
  ngOnChanges(changes:SimpleChanges){
    for(var c in changes){
      if(c=="fill" || c=="correct" || c=="wrong"){
        if(this.blocker3 != undefined){
          this.initialize();
        }
        
        
      }
    }
  }
  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.initialize();
  }
  initialize(){
    if(this.fill == undefined){
      this.fill = this.correct/(this.correct+this.wrong);
    }
    this.setdeg = this.lerp(this.fill,45,-225);
    if(this.setdeg < 45){
      this.deg1 = this.setdeg;
    }
    if(this.setdeg < -45){
      this.deg2 = this.setdeg;
    }
    if(this.setdeg < -135){
      this.deg3 = this.setdeg;
    }
    this.blocker1.nativeElement.style.transform = "rotate("+this.deg1+"deg)";
    this.blocker2.nativeElement.style.transform = "rotate("+this.deg2+"deg)";
    this.blocker3.nativeElement.style.transform = "rotate("+this.deg3+"deg)";
  }
  lerp(param:number,min:number,max:number):number{
    var slope = max-min;
    return (param*slope) + min;
  }
}
