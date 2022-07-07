import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Questions } from 'src/app/data/dataType';
import { MATH_GJ, variables } from 'src/app/data/Math_GJ';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';
import { QuestionComponent } from '../question/question.component';

export interface question_obj{
  question:Questions;
  no:number;
  timer:number;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  isStart:boolean=false;
  @Output() event_hide = new EventEmitter();
  @Output() event_finish = new EventEmitter();
  @Input() mode:number;
  questions:question_obj[];
  current_question:question_obj;

  quickTest:boolean=false;
  mathTest:boolean=false;
  geasTest:boolean=false;
  elecsTest:boolean=false;
  estTest:boolean=false;
  unitTest:boolean=false;

  overallscore:number=0;
  categoryscore:{category:string,correct:number,wrong:number}[];

  correct:number = 0;
  wrong:number = 0;
  number:number = 0;

  countdownNumber:number=3;

  isShowingScore:boolean=false;
  isRecievingAnswer:boolean=true;
  @ViewChild('countdown') countdown:ElementRef<HTMLElement>;
  @ViewChild('question') question:QuestionComponent;
  
  //MODE CONFIG
  //1 QUICK TEST
  //2 MATH TEST
  //3 GEAS TEST
  //4 ELECS TEST
  //5 EST TEST
  constructor(private fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
    this.quickTest=false;
    this.mathTest=false;
    this.geasTest = false;
    this.elecsTest = false;
    this.estTest = false;
    if(this.mode == 1){
      this.quickTest = true;
    }else if(this.mode==2){
      this.mathTest = true;
    }else if(this.mode==3){
      this.geasTest = true;
    }else if(this.mode==4){
      this.elecsTest = true;
    }else if(this.mode==5){
      this.estTest = true;
    }else if(this.mode==6){
      this.unitTest = true;
    }
  }
  resetTest(){
    this.categoryscore = new Array();
    this.quickTest=false;
    this.mathTest=false;
    this.geasTest = false;
    this.elecsTest = false;
    this.estTest = false;
    this.unitTest = false;
  }
  loadQuestion(limit:number,subject:string|null,timer:number){
    this.loader.showLoader("Loading Your Questions");
    this.questions = new Array();
    this.fetch.fetchQuestion(limit,subject).subscribe(
      questions => {
        var i=0;
        questions.forEach(question => {
          i++;
          var parts_question = question.question.split("#");
          var var_obj:variables[] = new Array();
          if(parts_question[0]=="computation"){
            var generated = MATH_GJ.GenerateVariables(parts_question[1]);
            var_obj = generated.var_obj;
            question.question = generated.question;
            question.answer = MATH_GJ.GenerateChoices(question.answer,var_obj);
            var choices = question.choices.split(',');
            var new_choices:string[] = new Array();
            choices.forEach(choice => {
              new_choices.push(MATH_GJ.GenerateChoices(choice,var_obj));
            });
            question.choices = new_choices.join(',');
          }
          this.questions.push({question:question,no:i,timer:timer});
        });
        this.resetTest();
        this.isStart = true;
        this.loader.showLoader('hide');
        this.current_question = this.questions[0];
        this.startCountDown(3);
      },
      error =>{
        this.loader.showLoader('hide');
        this.loader.showAlert(error);
      },
      ()=>{
        this.loader.showLoader('hide');
      }
    )
  }
  timeout(question:Questions){
    this.answered({correct:false,question:question});
  }
  answered(param:{correct:boolean,question:Questions}){
    if(this.isRecievingAnswer){
      this.isRecievingAnswer = false;
      if(param.correct){
        this.correct++;
      }else{
        this.wrong++;
      }
      this.addScoreCategory(param.correct,this.question.question.question.subject);
      //NEXT OR FINISH
      this.number++;
      if(this.questions[this.number] != undefined){
        //TEST NOT FINISH
        this.question.reveal();
        this.question.resetTimer();
        setTimeout(()=>{
          this.isRecievingAnswer = true;
          this.next();
        },2000)
      }else{
        //TEST FINISH
        this.question.reveal();
        this.question.resetTimer();
        setTimeout(()=>{
          this.isRecievingAnswer = true;
          this.overallscore = this.correct/(this.correct+this.wrong);
          this.showScore();
          this.updateScore();
        },2000)
      }
    }
  }
  addScoreCategory(correct:boolean,category:string){
    var isDefined:boolean = false;
    this.categoryscore.forEach(score=>{
      if(score.category == category){
        isDefined = true;
      }
    })
    if(!isDefined){
      this.categoryscore.push({category:category,correct:0,wrong:0});
    }
    this.categoryscore.forEach(score=>{
      if(score.category == category){
        if(correct){
          score.correct++;
        }else{
          score.wrong++;
        }
      }
    })
  }
  updateScore(){
    var buffer = '';
    var isStart = false;
    this.categoryscore.forEach(score=>{
      if(isStart){
        buffer += "|";
      }else{
        isStart = true;
      }
      buffer += score.category+","+score.correct+","+score.wrong;
    })
    this.fetch.addStatistics(buffer).subscribe(
      data=>{
        if(data){
          this.event_finish.emit();
        }
      }
    )
  }
  next(){
    this.current_question = this.questions[this.number];
    this.question.resetTimer();
    this.question.startTimer();
  }
  loadMathQuestion(){

  }
  reset(){

  }
  showScore(){
    this.isShowingScore = true;
  }
  start(){
    this.number = 0;
    this.correct = 0;
    this.wrong = 0;
    if(this.quickTest){
      this.loadQuestion(10,null,45);
    }else if(this.mathTest){
      this.loadQuestion(10,'Math',60);
    }else if(this.geasTest){
      this.loadQuestion(10,'GEAS,Unit',30);
    }else if(this.elecsTest){
      this.loadQuestion(10,'Electronics,Unit',30);
    }else if(this.unitTest){
      this.loadQuestion(10,'Unit',30);
    }else if(this.estTest){
      this.loadQuestion(10,'EST',30);
    }
  }
  startCountDown(max:number){
    this.countdown.nativeElement.style.display = 'block';
    this.countdownNumber=max;
    this.countDown();
  }
  countDown(){
    if(this.countdownNumber > 0){
      setTimeout(()=>{this.countdownNumber -= 1;this.countDown()},1000);
    
    }else{
      this.question.startTimer();
      this.countdown.nativeElement.style.display = 'none';
    }
  }
  hide(){
    this.event_hide.emit();
  }
}
