import { Component, Input, OnInit } from '@angular/core';
import { Form, formcomponent } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-formview',
  templateUrl: './formview.component.html',
  styleUrls: ['./formview.component.scss']
})
export class FormviewComponent implements OnInit {
  form!:Form|null;
  formdata!:string;
  formcomponents:formcomponent[] = new Array();
  id:number=0;
  values:string[] = new Array();

  wrapper!:HTMLElement|null;

  constructor(private loader:LoaderService,private fetch:FetchService,private main:MainService) { }

  ngOnInit() {
    this.wrapper = document.getElementById('wrapper');
    this.main.notifyOnFormSubject().subscribe(
      form=>{
        if(form!=null){
          this.form = form;
          this.decodedata();
          if(this.wrapper != null){
            this.wrapper.style.display='block';
          }
        }else{
          if(this.wrapper != null){
            this.wrapper.style.display='none';
          }
        }
      }
    )
  }
  removedata(){
    this.formdata = '';
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
  submit(){
    var theresempty=false;
    this.values.forEach(val=>{
      if(val == ""){
        theresempty = true;
      }
    });
    if(theresempty){
      this.loader.showAlert("Fill All Questions");
    }else{
      this.main.updateAnswer(this.form,this.values);
    }
  }
  close(){
    
    this.main.updateAnswer(this.form,null);
    this.main.showform(null);
  }
}
