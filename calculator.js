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

//testing area
const result = divide(10,2.2);
console.log(result);