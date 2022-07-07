import { Drawable } from "./drawable";
import { Object } from "./object";
import { Triangle, Vector1x2, Vector2x2 } from "./vectormath";

export class Collider extends Drawable{
    constructor(public object:Object){
        super(object.ctx,object.transform);
    }
    drawObject(){
        this.reloadMatrix();
        this.drawLine(0,0,this.object.properties.width,0,2,'green');
        this.drawLine(this.object.properties.width,0,this.object.properties.width,this.object.properties.height,2,'green');
        this.drawLine(this.object.properties.width,this.object.properties.height,0,this.object.properties.height,2,'green');
        this.drawLine(0,this.object.properties.height,0,0,2,'green');
    }
    checkMouseInside(mousepos:Vector1x2):boolean{
        var point1:Vector1x2 = new Vector1x2(0,0);
        var point2:Vector1x2 = new Vector1x2(this.object.properties.width,0);
        var point3:Vector1x2 = new Vector1x2(this.object.properties.width,this.object.properties.height);
        var point4:Vector1x2 = new Vector1x2(0,this.object.properties.height);
        point1.fulltransform(this.object.transform);
        point2.fulltransform(this.object.transform);
        point3.fulltransform(this.object.transform);
        point4.fulltransform(this.object.transform);
        var triangle1 = new Triangle(point1,point2,point3);
        var triangle2 = new Triangle(point1,point3,point4);
        if(triangle1.checkInside(mousepos) || triangle2.checkInside(mousepos)){
            return true;
        }
        return false;
    }
}
