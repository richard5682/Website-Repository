export interface exp_obj{
    exp:string;
    startpos:number;
    endpos:number;
    offset:number;
}
export interface answer_obj{
    answer:number;
    startpos:number;
    endpos:number;
}
export interface variables{
    variable:string;
    value:string;
}
export class MATH_GJ {
    public static processExpressionVar(exp:string,variables:string):number{
        var variables_array = variables.split(',');
        var var_obj:variables[] = new Array();
        variables_array.forEach(variable => {
            var parts = variable.split('=');
            var_obj.push({variable:parts[0],value:parts[1]});
        });
        var new_exp = this.PutVariable(exp,var_obj);
        return this.processExpression(new_exp);
    }
    public static processExpressionVar_obj(exp:string,var_obj:variables[]):number{
        var new_exp = this.PutVariable(exp,var_obj);
        return this.processExpression(new_exp);
    }
    public static GenerateVariables(question:string):{question:string,var_obj:variables[]}{
        var bpos = question.indexOf('{',0);
        var var_obj:variables[] = new Array();
        while(bpos != -1){
            var endpos = question.indexOf('}',bpos);
            var parts = question.slice(bpos+1,endpos).split(',');
            var varname = parts[0];
            var min = parts[1];
            var max = parts[2];
            var value = this.randomInt(parseInt(min),parseInt(max));
            var_obj.push({variable:varname,value:value.toString()});
            var startslice = question.slice(0,bpos);
            var endslice = question.slice(endpos+1,question.length);
            question = startslice+value.toString()+endslice;
            bpos = question.indexOf('{',0);
        }
        return {question:question,var_obj:var_obj};
    }
    public static BeautifyNumber(number:number):string{
        var value = number.toPrecision(4);
        var epos = value.indexOf('e',0);
        if(epos != -1){
            var startslice = value.slice(0,epos);
            var endslice = value.slice(epos+1,value.length);
            value = startslice+"x10^("+endslice+")";
        }
        return value;
    }
    public static GenerateChoices(exp:string,var_obj:variables[]):string{
        while(exp.indexOf('{') != -1){
            var startpos = exp.indexOf('{',0);
            var endpos = exp.indexOf('}',startpos);
            var equation = exp.slice(startpos+1,endpos);
            var solved = this.processExpressionVar_obj(equation,var_obj);
            var startslice = exp.slice(0,startpos);
            var endslice = exp.slice(endpos+1,exp.length);
            exp = startslice+this.BeautifyNumber(solved)+endslice;
        }
        return exp;
    }
    public static randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    public static processExpression(exp:string):number{
        while(exp.indexOf('(',0) != -1){
            var bexp = this.GetInnerExpression(exp);
            while(bexp.exp.indexOf('*',0) != -1 || bexp.exp.indexOf('/',0)!= -1){
                bexp.exp = this.solveMultiplicationDivision(bexp.exp);
            }
            while(bexp.exp.indexOf('+',0) != -1 || bexp.exp.indexOf('s',0)!= -1){
                bexp.exp = this.solveAdditionSubtraction(bexp.exp);
            }
            var startslice = exp.slice(0,bexp.startpos);
            var endslice = exp.slice(bexp.endpos,exp.length);
            exp = startslice+bexp.exp+endslice;
        }
        while(exp.indexOf('*',0) != -1 || exp.indexOf('/',0)!= -1){
            exp = this.solveMultiplicationDivision(exp);
        }
        while(exp.indexOf('+',0) != -1 || exp.indexOf('s',0)!= -1){
            exp = this.solveAdditionSubtraction(exp);
        }
        return parseFloat(exp);
    }
    public static PutVariable(exp:string,variables:variables[]):string{
        var isVariablePresent:boolean = true;
        while(isVariablePresent){
            var varpresent:boolean = false;
            variables.forEach(variable => {
                if(exp.indexOf(variable.variable) != -1){
                    varpresent = true;
                }
            });
            if(varpresent){
                variables.forEach(variable => {
                    var index = exp.indexOf(variable.variable);
                    if(index != -1){
                        var startslice = exp.slice(0,index);
                        var endslice = exp.slice(index+1,exp.length);
                        exp = startslice+variable.value+endslice;
                    }
                });
            }else{
                isVariablePresent = false;
            }
        }
        return exp;
    }
    public static GetInnerExpression(exp:string):exp_obj{
        var buff_exp = {exp:exp,startpos:0,endpos:exp.length,offset:0};
        while(this.CheckParentehsis(buff_exp.exp)){
            buff_exp = this.GetExpressionInParenthesis(buff_exp.exp,buff_exp.offset);
        }
        return buff_exp;
    }
    // public static solveExpression(innerexp:exp_obj,exp):string{

    // }
    public static solveMultiplicationDivision(exp:string):string{
        var mpos = exp.indexOf('*',0);
        var dpos = exp.indexOf('/',0);
        var value;
        if(dpos != -1 && dpos < mpos){
            //DIVIDE
            var val1 = this.getNumber(dpos-1,exp);
            var val2 = this.getNumber(dpos+1,exp);
            value = (val1.answer/val2.answer).toString();
        }else if(mpos != -1){
            //MULTIPLY
            var val1 = this.getNumber(mpos-1,exp);
            var val2 = this.getNumber(mpos+1,exp);
            value = (val1.answer*val2.answer).toString();
        }else if(dpos != -1){
            //DIVIDE
            var val1 = this.getNumber(dpos-1,exp);
            var val2 = this.getNumber(dpos+1,exp);
            value = (val1.answer/val2.answer).toString();
        }
        var startpos = val1.startpos;
        var endpos = val2.endpos+1;
        var startslice = exp.slice(0,startpos);
        var endslice = exp.slice(endpos,exp.length);
        return startslice+value+endslice;
    }
    public static solveAdditionSubtraction(exp:string):string{
        var apos = exp.indexOf('+',0);
        var spos = exp.indexOf('s',0);
        var value;
        if(spos != -1 && spos < apos){
            //DIVIDE
            var val1 = this.getNumber(spos-1,exp);
            var val2 = this.getNumber(spos+1,exp);
            value = (val1.answer-val2.answer).toString();
        }else if(apos != -1){
            //MULTIPLY
            var val1 = this.getNumber(apos-1,exp);
            var val2 = this.getNumber(apos+1,exp);
            value = (val1.answer+val2.answer).toString();
        }else if(spos != -1){
            //DIVIDE
            var val1 = this.getNumber(spos-1,exp);
            var val2 = this.getNumber(spos+1,exp);
            value = (val1.answer-val2.answer).toString();
        }else{
            return exp;
        }
        var startpos = val1.startpos;
        var endpos = val2.endpos+1;
        var startslice = exp.slice(0,startpos);
        var endslice = exp.slice(endpos,exp.length);
        return startslice+value+endslice;
    }
    public static getNumber(pos:number,exp:string):answer_obj{
        if(pos == 0){
            return  {startpos:0,endpos:0,answer:parseFloat(exp.charAt(0))};
        }else if(pos == exp.length){
            return  {startpos:exp.length,endpos:exp.length,answer:parseFloat(exp.charAt(exp.length))};
        }
        var isRightside = false;
        var atLeft = exp.charAt(pos-1);
        if(this.checkOperation(atLeft)){
            isRightside = true;
        }
        var endpos = pos;
        if(isRightside){
            while(!this.checkOperation(exp.charAt(endpos))){
                if(endpos == exp.length){
                    break;
                }
                endpos++;
            }
            return {answer:parseFloat(exp.slice(pos,endpos)),startpos:pos,endpos:endpos-1};
        }else{
            while(!this.checkOperation(exp.charAt(endpos))){
                if(endpos == -1){
                    break;
                }
                endpos--;
            }
            endpos++;
            pos++;
            return {answer:parseFloat(exp.slice(endpos,pos)),startpos:endpos,endpos:pos-1};
        }
      
    }
    public static checkOperation(char:string):boolean{
        if(char == '+' || char == 's' || char == '*' || char == '/'){
            return true;
        }
        return false;
    }
    public  static GetExpressionInParenthesis(exp:string,offset:number):exp_obj{
        var i=0;
        var pos = exp.indexOf('(',0);
        var startingpos = pos;
        if(pos != -1){
            i++;
            pos++;
            while(i>0){
                if(pos == exp.length){
                    pos--;
                    break;
                }
                if(exp.charAt(pos) == '('){
                    pos++;
                    i++;
                }else if(exp.charAt(pos) == ')'){
                    pos++;
                    i--;
                }else{
                    pos++;
                }
            }
            var endingpos = pos;
        }
        startingpos++;
        endingpos--;
        return {exp:exp.slice(startingpos,endingpos),startpos:startingpos+offset-1,endpos:endingpos+offset,offset:startingpos+offset};
    }
    public static CheckParentehsis(exp:string):boolean{
        return exp.includes("(",0);
    }
}
