import { Component, Input, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-billboardeditor',
  templateUrl: './billboardeditor.component.html',
  styleUrls: ['./billboardeditor.component.scss']
})
export class BillboardeditorComponent implements OnInit {
  @Input() filename:string;
  constructor(public fetch:FetchService,private loader:LoaderService) { }

  ngOnInit() {
  }
  edit(){
    this.loader.showImageUploader().subscribe(
      data=>{
        if(data != ''){
          this.loader.showLoader();
          this.fetch.editbillboard(this.filename+'.PNG',data).subscribe(
            data=>{
              this.loader.hideLoader();
            },
            error=>{
              this.loader.hideLoader();
            }
          )
        }
      }
    )
  }
}
