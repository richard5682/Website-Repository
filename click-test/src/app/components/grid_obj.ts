import { Transform } from "./drawable";
import { Object, Properties} from "./object";
import { Vector1x2 } from "./vectormath";

export class Grid_obj extends Object{

    constructor(public nogrid:number,transform:Transform,properties:Properties,ctx:CanvasRenderingContext2D|null){
        super(transform,properties,ctx);
        Object.addObject(this);
    }
    clicked(pos:Vector1x2){

    }
    mousedown(pos:Vector1x2){
        console.log(pos);
    }
    drawObject(){
        for(var x=0;x<this.properties.width;x+=this.properties.width/this.nogrid){
            this.drawLine(x,0,x,this.properties.height);
        }
        for(var y=0;y<this.properties.width;y+=this.properties.width/this.nogrid){
           this.drawLine(0,y,this.properties.width,y);
        }
    }
}
