import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DATA } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { TextboxComponent } from '../../component/textbox/textbox.component';

@Component({
  selector: 'app-questionsubmission',
  templateUrl: './questionsubmission.component.html',
  styleUrls: ['./questionsubmission.component.scss']
})
export class QuestionsubmissionComponent implements OnInit,AfterViewInit {
  subjects:string[];
  @ViewChild('name') name:TextboxComponent;
  @ViewChild('question') question:TextboxComponent;
  @ViewChild('answer') answer:TextboxComponent;
  @ViewChild('subject') subject:TextboxComponent;
  constructor(private fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
    this.subjects = DATA.subjects;
  }
  ngAfterViewInit(){
    if(DATA.ipname != '' && DATA.ipname != undefined){
      this.name.value = DATA.ipname;
      this.name.validate = true;
    }
  }
  submit(name:string,question:string,answer:string,subject:string){
    this.loader.showLoader("Submitting Question");
    this.fetch.addQuestion(subject,question,answer,name).subscribe(
      data=>{
        this.loader.showLoader('hide');
        this.loader.showAlert('Submission Success|done|green');
        this.resetForm();
      },
      error=>{
        this.loader.showLoader('hide');
        this.loader.showAlert(error);
      }
    )
  }
  resetForm(){
    this.answer.value = '';
    this.question.value = '';
  }
}
