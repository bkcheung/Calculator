function add(a,b){
    if(typeof(a)==='number'&&typeof(b)==='number'){
        return a+b;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function subtract(a,b){
    if(typeof a==='number' && typeof b==='number'){
        return a-b;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function multiply(a,b){
    if(typeof a==='number' && typeof b==='number'){
        //returns result rounded to 3 decimal places
        return Math.round(a*b*1000)/1000;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function divide(a,b){
    if(typeof a==='number' && typeof b==='number'){
        //returns result rounded to 3 decimal places
        return Math.round(a/b*1000)/1000;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function operate(num1,num2,operator){
    if(typeof(operator)==='string'){
        switch(operator){
            case '+':
                return add(num1,num2);
                break;
            case '-':
                return subtract(num1,num2);
                break;
            case '/':
                return divide(num1,num2);
                break;
            case '*':
                return multiply(num1,num2);
                break;
        }
    }
}

let num1 = 0;
let num2 = 0;
let operator = '+';

//testing area
const result = operate(10,2.22,'/');
console.log(result);