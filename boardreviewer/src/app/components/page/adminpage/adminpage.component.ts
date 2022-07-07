import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DATA, Questions, question_obj } from 'src/app/data/dataType';
import { AdminService } from 'src/app/services/admin.service';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.scss']
})
export class AdminpageComponent implements OnInit {
  subjects:string[];
  constructor(private loader:LoaderService,private router:Router,private admin:AdminService,private fetch:FetchService) { }
  questions:Questions[];
  question_upload:question_obj[];
  state:number = 0;
  limit:number = 1000;
  visitor:number = 0;
  ngOnInit() {
    this.subjects = DATA.subjects;
    if(!this.admin.isAdmin){
      this.router.navigate(['homepage']);
      return;
    }
    this.loader.notifyOnUpdateAdmin().subscribe(
      data=>{
        this.loadQuestions();
      }
    )
    this.fetch.getWebsiteStats().subscribe(
      data=>{
        this.visitor = data;
      }
    )
    this.loadQuestions();
  }
  stateSelectorChange(state:number){
    this.state = state;
    this.loadQuestions();
  }
  loadQuestions(){
    this.loader.showLoader("Loading Questions");
    this.fetch.getQuestions(this.limit,this.state).subscribe(
      data=>{
        this.loader.showLoader("hide");
        this.questions = data;
      },
      error=>{
        this.questions = null;
        this.loader.showLoader("hide");
      }
    )
  }
  fileChange(event){
    var files:FileList = event.target.files;
    var reader:FileReader = new FileReader();
    reader.onloadend  = (e) => {
      this.loadTextQuestion(reader.result.toString());
    }
    if(files.length > 0){
      reader.readAsText(files.item(0));
    }
  }
  loadTextQuestion(parsequestions:string){
    var bufferquestion_obj:question_obj[] = new Array();
    var questions:string[] = parsequestions.split("||");
    questions.forEach(question => {
      var parts = question.split("|");
      //0 subject
      //1 question
      //2 answer
      //3 choices
      bufferquestion_obj.push({subject:parts[0],question:parts[1],answer:parts[2],choices:parts[3]});
    });
    this.question_upload = bufferquestion_obj;
  }
  uploadquestion(){
    var error:number = 0;
    var questionerror:string[] = new Array();
    this.question_upload.forEach(question => {
      if(question.question == '' || question.question == undefined){
        error++;
        questionerror.push(question.question);
      }else if(question.choices.split(',').length != 3){
        error++;
        questionerror.push(question.question);
      }
    });

    if(error == 0){
      if(this.question_upload.length > 0){
        this.loader.showLoader("Uploading : "+this.question_upload.length.toString()+" Question");
        var toUpload = this.question_upload[0];
        this.fetch.uploadQuestion(toUpload.subject,toUpload.question,toUpload.answer,toUpload.choices).subscribe(
          data=>{
            if(data){
              this.question_upload.splice(0,1);
              this.uploadquestion();
            }
          },
          error=>{
            this.loader.showLoader('hide');
            this.loader.showAlert(error+"Uploading Failed, Press upload to re-upload");
          }
        )
      }else{
        this.question_upload = undefined;
        this.loader.showLoader('hide');
        this.loader.showAlert("Upload Successfuly|done|green");
      }
    }else{
      this.loader.showLoader('hide');
      this.loader.showAlert("Number of error : "+error);
      console.log(questionerror);
    }
  }
  openQuestion(id:number){
    if(id != undefined){
      this.loader.showEditor(id);
    }
  }
}
