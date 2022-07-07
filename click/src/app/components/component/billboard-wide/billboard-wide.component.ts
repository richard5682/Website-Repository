import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billboard-wide',
  templateUrl: './billboard-wide.component.html',
  styleUrls: ['./billboard-wide.component.scss']
})
export class BillboardWideComponent implements OnInit {
  slideIndex = 1;
  timer:any = null;
  constructor() { }
  ngOnInit() {
    this.showSlides(this.slideIndex);
  }
plusSlides(n:number) {
  clearTimeout(this.timer);
  this.showSlides(this.slideIndex += n);
}

currentSlide(n:number) {
  clearTimeout(this.timer);
  this.showSlides(this.slideIndex = n);
}
showSlides(n:number|null) {
  var i;
  var slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement> ;
  var dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;
  if (n==undefined){n = ++this.slideIndex}
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display='none';
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[this.slideIndex-1].style.display = "block";
  dots[this.slideIndex-1].className += " active";
  this.timer = setTimeout(()=>{this.showSlides(null)}, 5000);
}
}
