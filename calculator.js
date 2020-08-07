function add (x,y) {
	return x+y
	
}

function subtract (x,y) {
	return x-y
	
}

function sum (args) {
	let ret = args.reduce((acc,val)=>{return acc+val},0);
	return(ret)
}

function multiply(x,y) {
	return(x*y)
}

function divide (x,y) {
	return x/y;
}
function power(base,exp) {
	return base**exp;
	
}

function factorial(n) {
	if(n==0) {return 1} 
	if(n==1) {return 1} 
	return n * factorial(n-1)
}

function operate(x,y,operation) { 
	console.log(`Operating ${x} ${operation} ${y}`)
	switch(operation){
		case '+': return (add(x,y)); 
		case '-': return (subtract(x,y)); 
		case '*': return (multiply(x,y)); 
		case '/': return (divide(x,y)); 
	}

}

