import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Form, formcomponent } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-formcreation',
  templateUrl: './formcreation.component.html',
  styleUrls: ['./formcreation.component.scss']
})
export class FormcreationComponent implements OnInit,OnChanges {
  @Input() form!:Form|null;

  formdata!:string;
  formcomponents:formcomponent[] = new Array();
  formcomponents_data!:string[];
  id:number=0;
  values:string[] = new Array();
  constructor(private loader:LoaderService,private fetch:FetchService) { }

  ngOnInit() {
    if(this.form?.formdata == ''){
      this.form.formdata = "forms";
    }
  }
  ngOnChanges(changes:SimpleChanges){
    for(let c in changes){
      if(c="form"){
        this.decodedata();
      }
    }
  }
  removedata(){
    this.formcomponents = new Array();
    this.id = 0;
    this.values = new Array();
  }
  decodedata(){
    this.removedata();
    if(this.form != null){
      this.formdata = this.form.formdata;
      var components = this.formdata.split('||');
      if(components[0] == 'forms'){
        components.splice(0,1);
        this.formcomponents_data = components;
        components.forEach(component=>{
          this.formcomponents.push(this.getComponent(component));
        })
      }
    }
  }
  getComponent(componentdata:string):formcomponent{
    var elements = componentdata.split('|');
    var buffer:formcomponent = {id:this.id};
    var type = elements.splice(0,1);
    if(type[0]=='textbox'){
      buffer.textbox = {desc:elements[0],label:elements[1]};
      this.values.push('');
    }else if(type[0]=='select'){
      var desc = elements.splice(0,1);
      var length = elements.length;
      var options = elements.splice(0,length-1);
      var options_obj:{index:number,value:string}[] = new Array();
      options.forEach((option,index) => {
        options_obj.push({index:index,value:option});
      });
      var value = elements[0];
      this.values.push('');
      buffer.select = {desc:desc[0],options:options_obj,label:value}
    }
    this.id++;
    return buffer;
  }
  editTextbox(id:number,question:string,label:string){
    if(question == ''){
      question = "QUESTION";
    }
    if(label == ''){
      label = 'LABEL';
    }
    this.formcomponents_data.forEach((formcomponent_data,index) => {
      if(index == id){
        this.formcomponents_data[index] = "textbox|"+question+"|"+label;
      }
    });
    this.rebuildform(this.formcomponents_data);
  }
  editSelector(id:number,question:string,label:string,value:string,indexchoice1:number){
    if(question == ''){
      question = "QUESTION";
    }
    if(label == ''){
      label = 'LABEL';
    }
    console.log(value+"   "+indexchoice1);
    if(value != null && indexchoice1 != null){
      this.formcomponents_data.forEach((formcomponent_data,indexcomp) => {
        if(indexcomp == id){
          var component = formcomponent_data.split("|");
          var choices = component.splice(2,component.length-3);
          this.formcomponents_data[indexcomp] = "select|"+question;
          choices.forEach((choice,indexchoice) => {
            if(indexchoice == indexchoice1){
              this.formcomponents_data[indexcomp] += "|"+value;
            }else{
              this.formcomponents_data[indexcomp] += "|"+choice;
            }
          });
          this.formcomponents_data[indexcomp] += "|"+label;
          console.log( this.formcomponents_data[indexcomp]);
        }
      });
    }else{
      this.formcomponents_data.forEach((formcomponent_data,index) => {
        if(index == id){
          var component = formcomponent_data.split("|");
          var choices = component.splice(2,component.length-3);
          this.formcomponents_data[index] = "select|"+question;
          choices.forEach(choice => {
            this.formcomponents_data[index] += "|"+choice;
          });
          this.formcomponents_data[index] += "|"+label;
        }
      });
    }
    this.rebuildform(this.formcomponents_data);
  }
  addSelectorChoice(id:number){
    this.formcomponents_data.forEach((formcomponent_data,indexcomp) => {
      if(indexcomp == id){
        var component = formcomponent_data.split("|");
        var choices = component.splice(2,component.length-3);
        this.formcomponents_data[indexcomp] = "select|"+component[1];
        choices.forEach((choice) => {
            this.formcomponents_data[indexcomp] += "|"+choice;
        });
        this.formcomponents_data[indexcomp] += "|Choices";
        this.formcomponents_data[indexcomp] += "|"+component[2];
      }
    });
    this.rebuildform(this.formcomponents_data);
  }
  rebuildform(formdata:string[]){
    if(this.form != undefined){
      this.form.formdata = this.rebuilddata(formdata);
      this.decodedata();
    }
  }
  rebuilddata(formcomponents:string[]):string{
    var buffer='forms';
    formcomponents.forEach(formcomponent => {
      buffer+="||"+formcomponent;
    });
    console.log(buffer);
    return buffer;
  }
  addText(){
    var bufferform = this.form;
    if(bufferform != undefined){
      if(bufferform.formdata == ''){
        bufferform.formdata += "forms"
      }
      bufferform.formdata += "||textbox|Question|Label";
      this.form = bufferform;
      this.decodedata();
    }
  }
  addSelector(){
    var bufferform = this.form;
    if(bufferform != undefined){
      if(bufferform.formdata == ''){
        bufferform.formdata += "forms"
      }
      bufferform.formdata += "||select|Question|Choice1|Choice2|Label";
      this.form = bufferform;
      this.decodedata();
    }
  }
  submitform(){
    if(this.form != undefined){
      this.loader.showLoader("Updating Form For "+this.form.subcategory);
      this.fetch.createServiceForm(this.form.serviceid,this.form.subcategory,this.form.formdata)?.subscribe(
        data=>{
          this.loader.showLoader("hide");
        } 
      )
    }
  }
  deletecomponent(id:number){
    this.formcomponents_data.splice(id,1);
    this.rebuildform(this.formcomponents_data);
  }
}
