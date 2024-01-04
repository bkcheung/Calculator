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

function populateDisp(input){
    if(clearDisp === true){ //if there is a number stored, clear disp first
        display.value = "";
        clearDisp = false;
    }
    
    if(input==="."){ //Block for decimal-specific handling
        if(display.value.includes(".")){ //Limit to one decimal place
            console.log(display.value);
            return;
        }
        else if(display.value.length == 0){ //Initialize with 0
            display.value = 0;
        }
    }

    display.value = display.value + input;
    return;
    
} 


function allClear(){
    display.value = "";
    num1 = 0;
    num2 = 0;
    numStored = false;
    opStored = false;
    console.log(num1, num2, operator, numStored, opStored);
    return;
}

function delLastInput(){
    display.value = display.value.substring(0,display.value.length-1);
    return;
}

function operatorPress(op){
    if(display.value !== ""){
        num1 = display.value;
    }
    operator = op;
    numStored = opStored = clearDisp = true;

    console.log(num1, num2, operator, numStored, opStored, clearDisp);
}

//Variables
let num1 = 0, num2 = 0, operator = '+';
let display = document.getElementById("calcDisplay");
display.value = "";

//console.log(num1, num2, operator);

//Flags
let numStored = opStored = clearDisp = false;



// //testing area
// const result = operate(10,2.22,'/');
// console.log(result);