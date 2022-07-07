import { Vector1x2, Vector2x2, Vectormath } from "./vectormath";

export class Transform{
    constructor(public wx:number,public wy:number
        ,public lx:number=0,public ly:number=0
        ,public sw:number=1,public sh:number=1,
                public rotate:number=0){};
}
export abstract class Drawable {
    rotateMatrix!:Vector2x2;
    localtranslateMatrix!:Vector1x2;
    worldtranslateMatrix!:Vector1x2;
    constructor(public ctx:CanvasRenderingContext2D|null,public transform:Transform){
        this.setRotation(transform.rotate);
    }
    abstract drawObject():void;

    setContext(ctx:CanvasRenderingContext2D|null){
        this.ctx = ctx;
    }
    private setRotation(degrees:number){
        this.rotateMatrix = Vectormath.createRotateMat(degrees);
    }
    private setLocalTranslation(x:number,y:number){
        this.localtranslateMatrix = new Vector1x2(x,y);
    }
    private setWorldTranslation(x:number,y:number){
        this.worldtranslateMatrix = new Vector1x2(x,y);
    }
    private moveToVec(vec:Vector1x2){
        if(this.ctx)this.ctx.moveTo(vec.a,vec.b);
    }
    private lineToVec(vec:Vector1x2){
        if(this.ctx)this.ctx.lineTo(vec.a,vec.b);
    }
    reloadMatrix(){
        this.setRotation(this.transform.rotate);
        this.setLocalTranslation(this.transform.lx,this.transform.ly);
        this.setWorldTranslation(this.transform.wx,this.transform.wy);
    }
    drawLocalOrigin(){
        var point1:Vector1x2 = new Vector1x2(0,0);
        point1.transform(this.rotateMatrix);
        point1.translate(this.worldtranslateMatrix);
        this.drawCircle(point1.a,point1.b);
    }
    drawLine(x1:number,y1:number,x2:number,y2:number,width:number=1,color:string='black'){
        if(this.ctx){
            this.ctx.beginPath();
            var point1:Vector1x2 = new Vector1x2(x1,y1);
            var point2:Vector1x2 = new Vector1x2(x2,y2);
            point1.fulltransform(this.transform);
            point2.fulltransform(this.transform);
            this.ctx.lineWidth = width;
            this.ctx.strokeStyle = color;
            this.moveToVec(point1);
            this.lineToVec(point2)
            this.ctx.stroke();
        }
    } 
    drawCircle(x:number,y:number,rad:number=5,color:string='red'){
        if(this.ctx){
            this.ctx.strokeStyle = color;
            this.ctx.beginPath();
            this.ctx.ellipse(x,y,rad,rad,0,0,2*Math.PI);
            this.ctx.stroke();
        }
    }  
}
