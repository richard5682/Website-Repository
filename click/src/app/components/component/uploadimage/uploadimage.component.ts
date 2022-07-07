import { Component, Input, OnInit, Output } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.scss']
})
export class UploadimageComponent implements OnInit {
  @Input() maxfilesizeKB:number=500000;
  @Input() required:boolean=false;
  value!:string|undefined ;
  filesize!:string;
  width!:string;
  height!:string;
  constructor(private loader:LoaderService) { }
  ngOnInit() {
  }
  fileuploaded(event:any){
    if(event.target.files.length == 1){
      var chosenfile:File = event.target.files[0];
      if(chosenfile.size <= this.maxfilesizeKB){
        var img = new Image();
        var reader = new FileReader();
        this.filesize = (chosenfile.size/1000).toString();
        img.onload = (e)=>{
          this.width = img.width.toString();
          this.height = img.height.toString();
        }
        reader.onloadend = (e)=>{
          this.value = reader.result?.toString();
          if(this.value != undefined){
            img.src = this.value;
          }
        }
        reader.readAsDataURL(chosenfile);
      }else{
        this.value = undefined;
        this.filesize = "TOO BIG!";
        this.width = '0';
        this.height = '0';
      }
    }else if(event.target.file.length > 1){
      console.log("1 FILE ONLY!");
    }else{
      console.log("CHOOSE A FILE");
    }
  }
  validate():boolean{
    if(this.value!=undefined){
      return true;
    }else{
      return false;
    }
  }
}
