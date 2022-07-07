import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ImageuploaderComponent } from '../imageuploader/imageuploader.component';

@Component({
  selector: 'app-imageuploader_popup',
  templateUrl: './imageuploader_popup.component.html',
  styleUrls: ['./imageuploader_popup.component.scss']
})
export class Imageuploader_popupComponent implements OnInit {
  @ViewChild('main') main:ElementRef<HTMLElement>;
  @ViewChild('image') image:ImageuploaderComponent;
  current_subj:Subject<string>;
  data:string;
  constructor() { }

  ngOnInit() {
  }
  showUploader(subj:Subject<string>){
    this.show();
    this.image.setImage('');
    this.data = undefined;
    this.current_subj = subj;
  }
  imagechange(data:string){
    this.data = data;
  }
  check(){
    this.hide();
    this.current_subj.next(this.data);
    this.current_subj.complete();
  }
  cancel(){
    this.hide();
    this.current_subj.next('');
    this.current_subj.complete();
  }
  hide(){
    this.main.nativeElement.style.display = 'none'
  }
  show(){
    this.main.nativeElement.style.display = 'block'
  }
}
