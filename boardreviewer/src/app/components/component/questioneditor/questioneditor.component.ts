import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { DATA, Questions } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TextboxComponent } from '../textbox/textbox.component';

@Component({
  selector: 'app-questioneditor',
  templateUrl: './questioneditor.component.html',
  styleUrls: ['./questioneditor.component.scss']
})
export class QuestioneditorComponent implements OnInit {
  subjects:string[];
  @ViewChild('editor') editorwrapper:ElementRef<HTMLElement>; 
  @ViewChild('question') question:TextboxComponent; 
  @ViewChild('answer') answer:TextboxComponent; 
  @ViewChild('choices1') choices1:TextboxComponent; 
  @ViewChild('choices2') choices2:TextboxComponent; 
  @ViewChild('choices3') choices3:TextboxComponent; 
  @ViewChild('name') name:TextboxComponent; 
  @ViewChild('subject') subject:MatSelect; 
  @ViewChild('state') state:MatSelect; 

  currentQuestion:Questions;
  constructor(private loader:LoaderService,private fetch:FetchService) { }

  ngOnInit() {
    this.subjects = DATA.subjects;
    this.loader.notifyOnEditor().subscribe(
      id=>{
        this.loadQuestion(id);
      }
    )
  }
  loadQuestion(id:number){
    this.editorwrapper.nativeElement.style.display = 'flex';
    this.loader.showLoader('Loading Question');
    this.fetch.getQuestionID(id).subscribe(question=>{
      var choices = question.choices.split(',');
      this.loader.showLoader('hide');
      this.currentQuestion = question;
      this.question.value = question.question;
      this.answer.value = question.answer;
      this.name.value = question.name;
      this.choices1.value = choices[0];
      this.choices2.value = choices[1];
      this.choices3.value = choices[2];
      this.subject.value = question.subject;
      this.state.value = question.active;
    },
    error=>{
      this.hide();
      this.loader.showLoader('hide');
      this.loader.showAlert(error);
    })
  }
  hide(){
    this.editorwrapper.nativeElement.style.display = 'none';
    this.currentQuestion = null;
  }
  save(){
    this.loader.showLoader('Saving');
    this.fetch.editQuestion(
      this.currentQuestion.id,
      this.subject.value,
      this.question.value,
      this.answer.value,
      this.choices1.value+","+this.choices2.value+","+this.choices3.value,
      this.name.value,
      this.state.value
    ).subscribe(
      data=>{
        if(data){
          this.currentQuestion = null;
          this.loader.showLoader('hide');
          this.hide();
          this.loader.showAlert('Saved|save|green')
          this.loader.updateAdmin();
        }
      },
      error=>{
        this.loader.showAlert(error);
      }
    )
  }
  delete(){
    this.loader.showLoader('Deleting');
    this.fetch.deleteQuestion(this.currentQuestion.id).subscribe(
      data=>{
        if(data){
          this.currentQuestion = null;
          this.loader.showLoader('hide');
          this.hide();
          this.loader.showAlert('Deleted|delete|black');
          this.loader.updateAdmin();
        }
      },
      error=>{
        this.loader.showLoader('hide');
        this.loader.showAlert(error);
      }
    )
  }
}
