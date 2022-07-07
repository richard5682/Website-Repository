
export interface UserData{
    id:number;
    firstname:string;
    lastname:string;
    username:string;
    address:Address;
    profileimage:string;
}
export interface ServiceData{
    title:string;
    serviceid:number;
    description:string;
    ownerid:number;
    category:string;
    subcategories:string;
    rating:number;
    price:number;
    available:number;
}
export interface CalendarMarkDate{
    date:Date;
    color:string;
    backcolor:string;
    hint?:string;
}
export interface EmergencyServiceData{
    id:number;
    title:string;
    description:string;
    province:string;
    city:string;
    street:string;
    buildingno:string;
    category:string;
}
export interface PictureData{
    id:number;
    serviceid:number;
    picture:string;
    comment:string;
    thumbnail:number;
}
export interface CommentData{
    serviceID:number;
    userID:number;
    date:string;
    comment:string;
}
export interface Parameter{
    index:string;
    value:string;
}
export interface ServiceRequest{
    id:number;
    serviceid:number;
    time:string;
    state:string;
}
export interface RegisterUserInfo{
    username:string;
    password:string;
    firstname:string;
    lastname:string;
    middlename:string;
    code:string;
    birthday:string;
    address:Address;
    profileimage:string;
}
export interface ChatRoom{
    roomid:number;
    userid1:number;
    userid2:number;
    changed1:number;
    changed2:number;
    seen?:boolean;
    lastmessage:string;
    servicedata?:ServiceData;
    bookingdata?:Booking;
    serviceid:number;
    bookingid:number;
}
export interface Message{
    messageid:number;
    roomid:number;
    senderid:number;
    message:string;
    type:string;
    time:string;
    picturedata?:string;
}
export class SubCategories{
    subcategory!:string[];
    constructor(subcategory:string[]|null){
        if(subcategory != null){
            this.subcategory = subcategory;
        }
        
    }
    getString():string{
        if(this.subcategory != null){
            var buffer:string="";
            this.subcategory.forEach(
                (val,index) => {
                    if(val!="" && val!=null && val!=undefined){
                        if(index != 0){
                            buffer += ",";
                        }
                        buffer += val;
                    }
                }
            );
            return buffer;
        }
        return 'null';
    }
}
export class Pictures{
    picturedata!:string[];
    constructor(picturedata:string[]){
        this.picturedata = picturedata;
    }
    getString():string{
        var buffer:string="";
        this.picturedata.forEach(
            (val,index) => {
                if(val!="" && val!=null && val!=undefined){
                    if(index != 0){
                        buffer += ".";
                    }
                    buffer += val;
                }
            }
        );
        return buffer;
    }
}
export interface ServiceRegisterInfo{
    title:string;
    price:string;
    description:string;
    address:Address;
    servicetype:ServiceType;
    thumbnail:string;
    pictures:Pictures;
}
export interface EmergencyServiceRegisterInfo{
    title:string;
    description:string;
    location:Address;
    category:string;
    thumbnail:string;
}
export interface ServiceType{
    category:string;
    subcategory:SubCategories;
}
export interface Address{
    province:string;
    city:string;
    brgy:string;
    street:string;
    houseno:string;
}
export interface Booking{
    id?:number;
    serviceid:number;
    userid?:number;
    time?:string;
    exectime:string;
    price:number;
    subcategory?:string;
    subcategory_obj:SubCategories;
    active?:number;
}
export interface Form{
    formid:number;
    serviceid:number;
    subcategory:string;
    formdata:string;
}
export interface FormAnswer{
    id?:number;
    bookingid?:number;
    formid:number;
    subcategory:string;
    answer:string;
}
///FORM DATA///
export interface textbox{
    desc:string;
    label:string;
 }
 export interface select{
    desc:string;
    options:{index:number,value:string}[];
    label:string;
}
export interface formcomponent{
    id:number;
    textbox?:textbox;
    select?:select;
}

///////////////////////////////
//FOR QUERYING DATA/////////////
/////////////////////////////////
export interface EmergencyServiceQueryData{
    category:string;
    province:string;
    city:string;
}
export class ServiceQueryData{
    keyword:string[]=['null'];
    servicetype:ServiceType= {category:'null',subcategory:new SubCategories(['null'])};
    ownerid:string='null';
    location:Address={province:'null',city:'null',brgy:'null',street:'null',houseno:'null'};
    limit:string='15';
    constructor(keyword:string[]|null,servicetype:ServiceType|null,ownerid:string|null,location:Address|null,limit:string|null){
        if(keyword!=null){
            this.keyword = keyword;
        }
        if(servicetype != null){
            this.servicetype = servicetype;
        }
        if(ownerid != null){
            this.ownerid = ownerid;
        }
        if(location != null){
            this.location = location;
        }
        if(limit != null){
            this.limit = limit;
        }
    }
    getKeyword():string{
        if(this.keyword != null && this.keyword != undefined){
            var buffer:string="";
            this.keyword.forEach(
                (val,index) => {
                    if(val!="" && val!=null && val!=undefined){
                        if(index != 0){
                            buffer += ",";
                        }
                        buffer += val;
                    }
                }
            );
            return buffer;
        }else{
            return 'null';
        }
    }
}
export interface UserQueryData{
    userID:string;
    username:string;
}
