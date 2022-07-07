import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { mainModule } from 'process';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements AfterViewInit {
  @ViewChild('mainwrapper') main:ElementRef<HTMLElement>;
  constructor() { 
  }

  ngAfterViewInit() {
  }
  showLoader(){
    this.main.nativeElement.style.display = 'block';
  }
  hideLoader(){
    this.main.nativeElement.style.display = 'none';
  }
}
