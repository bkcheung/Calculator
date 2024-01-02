function add(a,b){
    if(typeof(a)==='number'&&typeof(b)==='number'){
        return a+b;
    }
    else{
        throw new Error("Must input two numbers to add");
    }
}

//testing area
const result = add(10,2);
console.log(result);