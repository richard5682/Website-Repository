export interface Parameter{
    index:string;
    value:string;
}
export interface Product{
   id:number;
   itemid:number;
   description:string;
   title:string;
   price:string;
   extra:string;
   picture_link:string;
   picture_data?:string
}
export class Struct_Product{
    constructor(
        public id:number,
        public itemid:number,
        public description:string,
        public title:string,
        public price:string,
        public extra:string,
        public picture_data?:string
    ){}
    public getParams():Parameter[]{
        var params:Parameter[] = [
            {index:'id',value:this.id.toString()},
            {index:'itemid',value:this.itemid.toString()},
            {index:'description',value:this.description},
            {index:'title',value:this.title},
            {index:'price',value:this.price},
            {index:'extra',value:this.extra}
          ]
        if(this.picture_data != undefined){
            params.push({index:'picture_data',value:this.picture_data})
        }else{
            params.push({index:'picture_data',value:''})
        }
        return params;
    }
    public static Construct_Struct(products:Product,picture_change:boolean):Struct_Product{
        if(products.picture_data != undefined && picture_change){
            return new Struct_Product(
                products.id,products.itemid,products.description,products.title,
                products.price,products.extra,products.picture_data
            );
        }else{
            return new Struct_Product(
                products.id,products.itemid,products.description,products.title,
                products.price,products.extra
            );
        }

        
    }
}
export interface Item{
    id:number;
    title:string;
}