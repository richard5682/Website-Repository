import { Transform } from "./drawable";


export class Vector2x2{
    constructor(public a:number,public b:number,public c:number,public d:number){

    }
}
export class Vector1x2{
    constructor(public a:number,public b:number){

    }
    fulltransform(transform:Transform){
        this.translate(new Vector1x2(transform.lx,transform.ly));
        this.transform(Vectormath.createRotateMat(transform.rotate));
        this.translate(new Vector1x2(transform.wx,transform.wy));
    }
    transform(mat:Vector2x2){
        var a=(this.a*mat.a)+(this.b*mat.c);
        var b=(this.a*mat.b)+(this.b*mat.d);
        this.a = a;
        this.b = b;
    }
    translate(vec1:Vector1x2){
        var a = this.a+vec1.a;
        var b = this.b+vec1.b;
        this.a = a;
        this.b = b;
    }
}
export class Triangle{
    v1!:Vector1x2;
    v2!:Vector1x2;
    A!:number;
    constructor(public p1:Vector1x2,public p2:Vector1x2,public p3:Vector1x2){
        this.changeValue(p1,p2,p3);
    }
    changeValue(p1:Vector1x2,p2:Vector1x2,p3:Vector1x2){
        this.v1 = Vectormath.minusVector(p2,p1);
        this.v2 = Vectormath.minusVector(p3,p1);
        this.A = this.v2.b/this.v2.a;
    }
    checkInside(mousepos:Vector1x2):boolean{
        var pos = Vectormath.minusVector(mousepos,this.p1);
        var w1 = ((this.A*pos.a)-pos.b)/((this.A*this.v1.a)-this.v1.b);
        var w2  = (pos.b-(w1*this.v1.b))/this.v2.b;
        if(w1+w2 > 1 || w1 < 0 || w2 < 0){
            return false;
        }else{
            return true;
        }
    }
}
export class Vectormath {
    static multiply2x2(vec1:Vector2x2,vec2:Vector2x2){
        return new Vector2x2(
            (vec1.a*vec2.a)+(vec1.b*vec2.c),(vec1.a*vec2.b)+(vec1.b*vec2.d),
            (vec1.c*vec2.a)+(vec1.d*vec2.c),(vec1.c*vec2.b)+(vec1.d*vec2.d));
    }
    static createRotateMat(deg:number){
        return new Vector2x2(
            Math.cos(deg),-Math.sin(deg),Math.sin(deg),Math.cos(deg)
        );
    }
    static transform(vec1:Vector1x2,mat:Vector2x2):Vector1x2{
        return new Vector1x2((vec1.a*mat.a)+(vec1.b*mat.c),(vec1.a*mat.b)+(vec1.b*mat.d));
    }
    static minusVector(vec1:Vector1x2,vec2:Vector1x2):Vector1x2{
        return new Vector1x2(vec1.a-vec2.a,vec1.b-vec2.b);
    }
    static addVector(vec1:Vector1x2,vec2:Vector1x2):Vector1x2{
        return new Vector1x2(vec1.a+vec2.a,vec1.b+vec2.b);
    }
}
