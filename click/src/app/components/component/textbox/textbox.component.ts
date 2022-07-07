import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  @Input() type:string = "text";
  @Input() label!:string;
  @Input() hint:string = "";
  @Input() maxchar!:number;
  @Input() minchar:number=0;
  @Input() icon!:string;
  @Input() appearance:string = "outline";
  @Input() passref!:TextboxComponent;
  @Output() changeval = new EventEmitter<string>();
  ban:string = "";
  visible:boolean = false;
  validate:boolean = false;
  value!:string;
  constructor() { }

  ngOnInit() {
  }
  validateTextInput(){
    if(this.value != undefined){
      if(this.value.length > this.maxchar || this.value.length < this.minchar){
        this.validate = false;
        return;
      }
      this.validate = true;
    }
  }
  validatePassInput(){
    if(this.value != undefined){
      if(this.value.length > this.maxchar || this.value.length < this.minchar){
        this.validate = false;
        return;
      }
      this.validate = true;
    }
  }
  validateRepassInput(){
    if(this.value != undefined){
      if(this.value == this.passref.value){
        this.validate=true;
        return;
      }
      this.validate = false;
    }
  }
  inputtextchange(){
    this.validateTextInput();
    this.changeval.emit(this.value);
  }
  inputpasschange(){
    this.validatePassInput();
    this.changeval.emit(this.value);
  }
  inputrepasschange(){
    this.validateRepassInput();
  }
  inputemailchange(){
    this.validateEmail();
    this.changeval.emit(this.value);
  }
  validateEmail(){
    if(this.value != undefined){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.validate = re.test(this.value.toLowerCase());
    }else{
      this.validate = false;
    }
  }
}
