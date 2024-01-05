function add(a,b){
    if(typeof(a)==="number"&&typeof(b)==="number"){
        return a+b;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function subtract(a,b){
    if(typeof a==="number" && typeof b==="number"){
        return a-b;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function multiply(a,b){
    if(typeof a==="number" && typeof b==="number"){
        return a*b;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function divide(a,b){
    if(typeof a==="number" && typeof b==="number"){
        return a/b;
    }
    else{
        throw new Error("Both inputs must be numbers");
    }
}

function operate(num1,num2,operator){
    if(typeof(operator)==="string"){
        switch(operator){
            case "+":
                return add(num1,num2);
                break;
            case "-":
                return subtract(num1,num2);
                break;
            case "/":
                return divide(num1,num2);
                break;
            case "*":
                return multiply(num1,num2);
                break;
        }
    }
}

function populateDisp(input){
    if(clearDisp === true){ //if there is a number stored, clear disp first
        display.value = "";
        clearDisp = false;
        opReady = true;
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
    opReady = false;
    console.log(num1, num2, operator, numStored, opReady);
    return;
}

function delLastInput(){
    display.value = display.value.substring(0,display.value.length-1);
    return;
}

function operatorPress(op){//what to do when Operator is pressed
    //Case 1: num1 not stored, store num1 and op pressed, turn all flags on
    if(numStored===false){
        if(display.value !== ""){
            num1 = Number(display.value);
        }
        operator = op;
        numStored = clearDisp = opReady = true;
    }
    //Case 2: numStored = true, clearDisp = false(when num2 has been input)
    else if(clearDisp===false){
        //if opReady, then can operate
        if(opReady === true){
            num2 = Number(display.value);
            num1 = operate(num1,num2,operator); //run last operation
            operator = op; //store new operator

            display.value = num1;
            clearDisp = true;
        }
        //if op!Ready,that means only num1 stored, need new op and num2 (after =)
        else{
            operator = op; //store new operator
            opReady = true;
            clearDisp = true;
        } 
    }
     //Case 3: numStored = true, clearDisp = true (when no new num has been input)
    else if(clearDisp ===true){
        operator = op; //replace previous op with new op
    }
    
    console.log(`Num1:${num1}, Num2:${num2}, Op: ${operator}, opReady: ${opReady}, clearDisp:${clearDisp}`); 
}

function equalPress(){ //function for when '=' is pressed
    //Case 1: everything is empty -> nothing
    //Case 2:display not empty, num1 not stored -> nothing
    //Case 3: num1 stored, op stored, num2 not populated -> nothing
    //Case 4: num1 stored, op stored, num2 populated -> operate
    if(numStored===true && opReady===true && clearDisp === false){
        num2 = Number(display.value);
        num1 = operate(num1,num2,operator);
        display.value = num1;
        clearDisp = true;
        opReady = false; //turn flag off

        console.log(`Num1:${num1}, Num2:${num2}, Op: ${operator}, opReady: ${opReady}, clearDisp:${clearDisp}`); 
    }
    return;
}

//Variables
let num1 = 0, num2 = 0, operator = "";
let display = document.getElementById("calcDisplay");
display.value = "";

//Flags
let numStored = opReady = clearDisp = false;

// //testing area
// const result = operate(10,2.22,"/");
// console.log(result);