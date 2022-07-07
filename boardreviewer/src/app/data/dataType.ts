export interface Parameter{
    index:string;
    value:string;
}
export interface Questions{
    id:number;
    question:string;
    answer:string;
    choices:string;
    wrong:number;
    correct:number;
    likes:number;
    name:string;
    subject:string;
    active:number;
}
export interface question_obj{
    subject:string;
    question:string;
    answer:string;
    choices:string;
  }
export interface Stats{
    ip:string;
    score:string;
    name:string;
}
export class DATA{
    public static subjects:string[] = [
        'Electronics','Math','GEAS','EST','Law','Unit'
    ]
    public static ip:string;
    public static ipname:string;
}