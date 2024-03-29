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
            case "x":
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

    if(clearHist === true){
        history.textContent = "";
        clearHist = false;
    }
    
    if(input==="."){ //Block for decimal-specific handling
        if(display.value.includes(".")){
            return
        }
        else if(display.value.length===0){
            display.value = "0";
        }
    }
    display.value += String(input);
    return;
} 

function allClear(){
    display.value = history.textContent = "";
    num1 = num2 =0;
    numStored = opReady = clearDisp = false;
    return;
}

function delLastInput(){
    display.value = display.value.substring(0,display.value.length-1);
    return;
}

function operatorPress(op){
    //Case 1: num1 not stored, store num1 and op pressed, turn all flags on
    if(numStored===false){
        if(display.value !== ""){
            num1 = Number(display.value);
        }
        operator = op;
        numStored = clearDisp = opReady = true;
        history.textContent += `(${num1}${operator}`;
    }
    //Case 2: numStored = true, clearDisp = false(when num2 has been input)
    else if(clearDisp===false){
        //if opReady, then can operate
        if(opReady === true){
            if(display.value === "0" && operator ==="/"){
                allClear();
                history.textContent = "ERROR! CANNOT DIVIDE BY 0";
                clearHist = true; 
            }
            else {
                num2 = Number(display.value);
                num1 = operate(num1,num2,operator); //run last operation
                operator = op; //store new operator
                display.value = num1;
                clearDisp = true;
                history.textContent = `(${history.textContent}`;
                history.textContent += `${num2})${operator}`;
            }
        }
        //if op!Ready,that means only num1 stored, need new op and num2 (after =)
        else{
            operator = op; //store new operator
            opReady = true;
            clearDisp = true;
            history.textContent = `(${display.value}${operator}`;
            
        } 
    }
     //Case 3: numStored = true, clearDisp = true (when no new num has been input)
    else if(clearDisp ===true){
        operator = op; //replace previous op with new op
        history.textContent = history.textContent.substring(0,history.textContent.length-1);
        history.textContent += operator;
    }
}

function equalPress(){ //function for when '=' is pressed
    if(numStored===true && opReady===true && clearDisp === false){
        if(display.value === "0" && operator==="/"){
            allClear();
            history.textContent = "ERROR! CANNOT DIVIDE BY 0";
            clearHist = true; 
        }
        else {
            num2 = Number(display.value);
            num1 = operate(num1,num2,operator);
            display.value = num1;
            history.textContent += `${num2})=`;
            opReady = false;
        }
    }
    return;
}

//Variables & Flags
let num1 = 0, num2 = 0, operator = "";
let display = document.getElementById("calcDisp");
let history = document.getElementById("historyDisp");
let numStored = opReady = clearHist = false;
let clearDisp = true;

//Event listener for keyboard input
document.addEventListener("keydown", (event)=>{
    let pressedKey = event.key; 
    if(pressedKey==="+" || pressedKey==="-"  || pressedKey==="/"  || pressedKey==="x" ){
        operatorPress(pressedKey);
    }
    else if(pressedKey==="*"){
        operatorPress("x");
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
    else if(!isNaN(Number(pressedKey)) || pressedKey === "."){//Will return NaN for non-numbers
        populateDisp(pressedKey);
    }
});

//Buttons and click listeners
const acButton = document.querySelector("#ac");
const delButton = document.querySelector("#del");
const equalButton = document.querySelector("#equals");

acButton.addEventListener('click', ()=>{ 
    allClear(); 
    acButton.blur();
});
delButton.addEventListener('click', ()=>{
    delLastInput();
    delButton.blur();
});
equalButton.addEventListener('click', ()=>{
    equalPress(); 
    equalButton.blur();
});

const opButtons = [];
const operatorIDs = ["#divide","#multiply","#add","#subtract"];

for(let i = 0; i<4; i++){
    opButtons.push(document.querySelector(operatorIDs[i]));
    opButtons[i].addEventListener('click', ()=>{
        operatorPress(opButtons[i].textContent);
        opButtons[i].blur();
    })
}

const numButtons = [];
for(let i = 0; i < 10; i++) {
    numButtons.push(document.querySelector(`#b${String(i)}`));
    numButtons[i].addEventListener('click', () => {
        populateDisp(String(i));
        numButtons[i].blur();
    })
}

const decButton = document.querySelector("#dec");
decButton.addEventListener('click', ()=>{
    populateDisp('.');
    decButton.blur();
})
