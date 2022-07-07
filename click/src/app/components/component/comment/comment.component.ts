import { Component, Input, OnInit } from '@angular/core';
import { CommentData, UserData } from 'src/app/data/dataType';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!:CommentData;
  user!:UserData;
  constructor(private fetch:FetchService) { }

  ngOnInit() {
    
  }

}
