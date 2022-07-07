import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Questions } from 'src/app/data/dataType';
import { question_obj } from '../test/test.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit,OnChanges {
  @Input() question:question_obj;
  @Output() answered = new EventEmitter<{correct:boolean,question:Questions}>();
  @Output() timeout = new EventEmitter<Questions>();
  choices:{index:number,choice:string,answer:boolean}[];
  correct_index:number;
  timer:number = 5;
  isEnabled:boolean = false;
  timeout_timer;
  isRevealing:boolean=false;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges){
    for(var c in changes){
      if(c == 'question'){
        this.loadquestion();
      }
    }
  }
  loadquestion(){
    this.isRevealing = false;
    var choices = this.question.question.choices.split(",");
    choices.push(this.question.question.answer);
    var shuffle = this.shuffle(choices);
    this.choices = new Array();
    for(var i=0;i<shuffle.length;i++){
      if(shuffle[i] == this.question.question.answer){
        this.choices.push({index:i,choice:shuffle[i],answer:true});
      }else{
        this.choices.push({index:i,choice:shuffle[i],answer:false});
      }
    }
  }
  answer(index:number){
    if(this.question != undefined)
    if(this.choices[index].choice == this.question.question.answer){
      this.answered.emit({correct:true,question:this.question.question});
    }else{
      this.answered.emit({correct:false,question:this.question.question});
    }
  }
  shuffle(a:string[]):string[] {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  startTimer(){
    this.isEnabled = true;
    this.timer = this.question.timer;
    this.countDown();
  }
  countDown(){
    if(this.timer > 0 && this.isEnabled){
      this.timeout_timer = setTimeout(()=>{
        this.timer -= 1;
        this.countDown();
      },1000);
    }else{
      this.timeout.emit(this.question.question);
      this.isEnabled = false;
    }
  }
  resetTimer(){
    clearTimeout(this.timeout_timer);
    this.isEnabled = false;
  }
  reveal(){
    this.isRevealing = true;
  }
}
