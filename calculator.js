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
        display.textContent = "";
        clearDisp = false;
        opReady = true;
    }
    
    if(input==="." && display.textContent.includes(".")){ //Block for decimal-specific handling
        return;
    }
    display.textContent += input;
    return;
} 

function allClear(){
    display.textContent = "";
    num1 = 0;
    num2 = 0;
    numStored = false;
    opReady = false;
    console.log(num1, num2, operator, numStored, opReady);
    return;
}

function delLastInput(){
    display.textContent = display.textContent.substring(0,display.textContent.length-1);
    return;
}

function operatorPress(op){//what to do when Operator is pressed
    //Case 1: num1 not stored, store num1 and op pressed, turn all flags on
    if(numStored===false){
        if(display.textContent !== ""){
            num1 = Number(display.textContent);
        }
        operator = op;
        numStored = clearDisp = opReady = true;
    }
    //Case 2: numStored = true, clearDisp = false(when num2 has been input)
    else if(clearDisp===false){
        //if opReady, then can operate
        if(opReady === true){
            num2 = Number(display.textContent);
            console.log(`WHEEEEE`);
            num1 = operate(num1,num2,operator); //run last operation
            operator = op; //store new operator

            display.textContent = num1;
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
        num2 = Number(display.textContent);
        num1 = operate(num1,num2,operator);
        display.textContent = num1;
        clearDisp = true;
        opReady = false; //turn flag off

        console.log(`Num1:${num1}, Num2:${num2}, Op: ${operator}, opReady: ${opReady}, clearDisp:${clearDisp}`); 
    }
    return;
}

//Variables & Flags
let num1 = 0, num2 = 0, operator = "";
let display = document.getElementById("calcDisplay");
let numStored = opReady = false;
let clearDisp = true;

//Event listener for keyboard input
document.addEventListener("keydown", (event)=>{
    let pressedKey = event.key; 
    if(pressedKey==="+" || pressedKey==="-"  || pressedKey==="/"  || pressedKey==="*" ){
        operatorPress(pressedKey);
    }
    else if(pressedKey==="="|| pressedKey==="Enter"){
        equalPress();
    }
    else if(pressedKey==="Backspace"){
        delLastInput();
    }
    else if(pressedKey==="Escape"){
        allClear();
    }
    else if(!isNaN(Number(pressedKey))){//Will return NaN for non-numbers
        populateDisp(pressedKey);
    }
});