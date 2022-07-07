import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Grid_obj } from '../grid_obj';
import { Transform } from '../drawable';
import { Object, Properties } from '../object';
import { Vector1x2 } from '../vectormath';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit,AfterViewInit  {
  @ViewChild('canvas', {static: false})
  canvas!:ElementRef<HTMLCanvasElement>;
  ctx!:CanvasRenderingContext2D|null;

  grid!:Grid_obj;

  constructor() { }
  ngAfterViewInit(){
    if(this.canvas!=undefined){
      this.canvas.nativeElement.height = 500;
      this.canvas.nativeElement.width = 500;
      this.ctx = this.canvas.nativeElement.getContext('2d');
      this.grid = new Grid_obj(10,new Transform(200,200,0,0,200,200,0),new Properties(250,250),this.ctx);
    }
  }
  ngOnInit() {
    this.render();
  }
  render(){
    setTimeout(()=>{
      this.update();
      Object.renderObject(this.ctx);
      this.render();
    },1000/10)
  }
  test=0;
  update(){

    Object.updateObject()
  }
  mouseclick(e:PointerEvent){
  }
  mouseup(e:MouseEvent){
    Object.eventmouseUp(new Vector1x2(e.x,e.y));
  }
  mousedown(e:MouseEvent){
    Object.eventmouseDown(new Vector1x2(e.x,e.y));
  }
  mousemove(e:MouseEvent){
    Object.eventmouseMove(new Vector1x2(e.x,e.y));
  }
}
