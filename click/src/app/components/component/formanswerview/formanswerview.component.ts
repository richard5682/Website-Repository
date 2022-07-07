import { Component, Input, OnInit } from '@angular/core';
import { Form, FormAnswer, Message } from 'src/app/data/dataType';
import { CacheService } from 'src/app/services/cache.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-formanswerview',
  templateUrl: './formanswerview.component.html',
  styleUrls: ['./formanswerview.component.scss']
})
export class FormanswerviewComponent implements OnInit {
  @Input() formanswerid!:number;
  form!:Form;
  form_answer!:FormAnswer;
  statements:{number:string,question:string,answer:string}[] = new Array();
  constructor(private fetch:FetchService,private cache:CacheService) { }

  ngOnInit() {
    var statement:{number:string,question:string,answer:string}[]|null;
    statement = this.cache.findFormAnswer(this.formanswerid)
    if(statement != null){
      this.statements = statement;
    }else{
      this.fetch.fetchFormAnswerID(this.formanswerid)?.subscribe(
        form_answer =>{
          this.form_answer = form_answer;
          this.fetch.fetchServiceForms(null,form_answer.formid)?.subscribe(
            form=>{
              this.form=form[0];
              this.generateStatement();
            }
          )
        },
        error=>{
          console.log(error);
        }
      )
    }
  }
  generateStatement(){
    var answers = this.form_answer.answer.split("|");
    var datas = this.form.formdata.split("||");
    if(datas[0] == 'forms'){
      datas.splice(0,1);
      datas.forEach((data,index) => {
        this.statements.push(this.decodecomponent(index,data,answers[index]));
      });
    }
    this.cache.addFormAnswer(this.formanswerid,this.statements);
  }
  decodecomponent(index:number,data:string,answer:string):{number:string,question:string,answer:string}{
    var elements = data.split("|");
    var type = elements[0];
    var bufferquestion = 'Question';
    elements.splice(0,1);
    if(type == 'textbox'){
      bufferquestion = elements[0];
    }else if(type == 'select'){
      bufferquestion = elements[0];
    }
    return {number:(index+1).toString(),question:bufferquestion,answer:answer};
  }
}
