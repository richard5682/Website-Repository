import { Collider } from "./collider";
import { Drawable, Transform } from "./drawable";
import { Grid_obj } from "./grid_obj";
import { Vector1x2 } from "./vectormath";

export class Properties{
    constructor(public width:number=100,public height:number=100){}
}
export interface UpdateEvent{
    mousepos:Vector1x2;
    mousedown:boolean;
    mouseup:boolean;
}
export abstract class Object extends Drawable{
    id:number=0;
    static OBJECTS:Object[]=new Array();
    static UpdateEvent:UpdateEvent;
    collider!:Collider;
    constructor(public transform:Transform,public properties:Properties,ctx:CanvasRenderingContext2D|null){
        super(ctx,transform);
        Object.UpdateEvent = {mousepos:new Vector1x2(0,0),mousedown:false,mouseup:true};
        this.collider = new Collider(this);
    }
    abstract clicked(pos:Vector1x2):void;
    abstract mousedown(pos:Vector1x2):void;
    static addObject(obj:Object){
        obj.id = Object.OBJECTS.length;
        Object.OBJECTS.push(obj);
    }
    static renderObject(ctx:CanvasRenderingContext2D|null){
        if(ctx){
            ctx.clearRect(0,0,500,500)
        }
        Object.OBJECTS.forEach(obj => {
            obj.reloadMatrix();
            obj.drawLocalOrigin();
            obj.drawObject();
            if(obj.collider != undefined){
                obj.collider.drawObject();
            }
        });
    }
    static updateObject(){
        Object.OBJECTS.forEach(obj => {
            if(this.UpdateEvent.mousedown){
                if(obj.collider.checkMouseInside(this.UpdateEvent.mousepos)){
                    obj.mousedown(this.UpdateEvent.mousepos);
                }
            }
        })
    }
    static eventmouseClicked(pos:Vector1x2){
        
    }
    static eventmouseDown(pos:Vector1x2){
        Object.UpdateEvent.mousedown = true;
        Object.UpdateEvent.mouseup = false;
        Object.UpdateEvent.mousepos = pos;
    }
    static eventmouseUp(pos:Vector1x2){
        Object.UpdateEvent.mousedown = false;
        Object.UpdateEvent.mouseup = true;
        Object.UpdateEvent.mousepos = pos;
    }
    static eventmouseMove(pos:Vector1x2){
        Object.UpdateEvent.mousepos = pos;
    }
}
