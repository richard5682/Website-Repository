import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-imageuploader',
  templateUrl: './imageuploader.component.html',
  styleUrls: ['./imageuploader.component.scss']
})
export class ImageuploaderComponent implements OnInit {
  data:string;
  @Output() imagechange = new EventEmitter();
  constructor(public fetch:FetchService) { }

  ngOnInit() {
  }
  uploadImage(event){
    var files:FileList = event.target.files;
    var file = files[0];
    var filereader:FileReader = new FileReader();
    filereader.onload = (e) =>{
      this.data = e.target.result.toString();
      this.imagechange.emit(this.data);
    }
    filereader.readAsDataURL(file);
  }
  setImage(data:string){
    this.data = data;
  }
}
