import { Component, Input, OnInit } from '@angular/core';
import { question_obj } from 'src/app/data/dataType';

@Component({
  selector: 'app-question_upload',
  templateUrl: './question_upload.component.html',
  styleUrls: ['./question_upload.component.scss']
})
export class Question_uploadComponent implements OnInit {
  @Input() question:question_obj;
  constructor() { }

  ngOnInit() {
  }

}
