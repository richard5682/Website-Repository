import { Component, Input, OnInit } from '@angular/core';
import { Questions } from 'src/app/data/dataType';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-questionviewer',
  templateUrl: './questionviewer.component.html',
  styleUrls: ['./questionviewer.component.scss']
})
export class QuestionviewerComponent implements OnInit {
  @Input() question:Questions;
  constructor(private loader:LoaderService) { }

  ngOnInit() {
  }
  editQuestion(){
    this.loader.showEditor(this.question.id);
  }
}
