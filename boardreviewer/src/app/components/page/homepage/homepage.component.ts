import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DATA } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit,AfterViewInit {
  isTestStart:boolean=false;
  testmode:number = 0;
  overallscore:number;
  categoryscore:{category:string,correct:number,wrong:number}[];


  numberOfButton:number = 6;
  action_slider_left:number=0;
  action_slider_width:number;
  @ViewChild('actionsslider') action_slider:ElementRef<HTMLElement>;
  @ViewChild('greeter') greeter:ElementRef<HTMLElement>;
  constructor(private fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    this.action_slider_width = this.action_slider.nativeElement.clientWidth;
    this.loadStats();
  }
  startTest(mode:number){
    this.testmode = mode;
    this.isTestStart=true;
    
  }
  hideTest(){
    this.testmode = 0;
    this.isTestStart=false;
  }
  gotoLink(url:string){
    window.open(url,'_blank');
  }
  loadStats(){
    this.fetch.getStatistics().subscribe(
      data=>{
        DATA.ip = data.ip;
        DATA.ipname = data.name;
        var correct:number=0;
        var wrong:number=0;
        this.categoryscore = new Array();
        var subjects_score = data.score.split('|');
        subjects_score.forEach(subject => {
          var score = subject.split(',');
          var bcorrect = Number.parseInt(score[1]);
          var bwrong = Number.parseInt(score[2]);
          correct += bcorrect;
          wrong += bwrong;
          this.categoryscore.push({category:score[0],
            correct:bcorrect,
            wrong:bwrong})
        });
        this.overallscore = correct/(correct+wrong);
      },
      error=>{
        if(!error){
          this.greeter.nativeElement.style.display = 'block';
        }
      }
    )
  }
  next_action(){
    if(this.action_slider_left - this.action_slider_width/this.numberOfButton > -this.action_slider_width+this.action_slider_width/this.numberOfButton){
      this.action_slider_left -= this.action_slider_width/this.numberOfButton;
      this.action_slider.nativeElement.style.left = this.action_slider_left+"px";
    }else{
      this.action_slider_left = -this.action_slider_width+this.action_slider_width/this.numberOfButton;
      this.action_slider.nativeElement.style.left = this.action_slider_left+"px";
    }
    
  }
  prev_action(){
    if(this.action_slider_left + this.action_slider_width/this.numberOfButton <= 0){
      this.action_slider_left += this.action_slider_width/this.numberOfButton;
      this.action_slider.nativeElement.style.left = this.action_slider_left+"px";
    }else{
      this.action_slider_left = 0;
      this.action_slider.nativeElement.style.left = this.action_slider_left+"px";
    }
  }
  setName(name:string){
    this.loader.showLoader("Registering");
    this.fetch.addName(name).subscribe(
      data=>{
        this.loader.showLoader("hide");
        this.loader.showAlert('Register Complete!|done|green');
        this.greeter.nativeElement.style.display = 'none';
      },
      error=>{
        this.loader.showLoader("hide");
        this.loader.showAlert("Oops Something Happen");
        this.greeter.nativeElement.style.display = 'none';
      }
    )
  }
}
