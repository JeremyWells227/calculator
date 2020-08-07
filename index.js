
let calculatorStack = [];
let valueStack = []
let operatorStack = []
let currNum="";
let evalDone=false;

const addStack = (item)=>{
	if(evalDone){
		clearAll()
		updateDisplay();
		evalDone=false;
	}
	if (isOperator(item))
	{
		flushNumBuffer();
		addtoPrefixStack(item)
	}
	else {
		currNum+=item.toString()
	}
  calculatorStack.push(item);
	updateDisplay();
}

const isOperator = (item) => {
	return (item === "+" || item === "-"
		|| item === "*" || item === "/")
}

const addtoPrefixStack = (item)=>{
	if(typeof(item) === "number") 
	{
		valueStack.push(item);
		if (valueStack.length > 1 && (operatorStack[operatorStack.length-1] === "/" || 
		operatorStack[operatorStack.length-1] === "*") ){
			flushNumBuffer();
			evalOne();
		}
	}
	//string
	else{
		if (item === "+" || item === "-") {
			operatorStack.push(item)

		}
		if (item === "/" || item === "*") {
			operatorStack.push(item)
		}
	}
}

const flushNumBuffer = ()=>
{
	if(currNum!==""){
		let tempNum = currNum;
		currNum="";
		addtoPrefixStack(parseInt(tempNum));
	}
}

const evalOne = () => {
	let num2 = valueStack.pop();
	let num1 = valueStack.pop();
	if (isNaN(num2)  || isNaN(num1)|| valueStack.length > 100)
	{
		alert("Error, invalid input!")
		return false;
	}
	let operator = operatorStack.pop();
	let newVal;
	newVal = operate(num1,num2,operator)
	valueStack.push(newVal)
	return true;
}


const updateDisplay = () =>{
	let displayText = "";
	calculatorStack.forEach((item)=>{
		displayText+= item;
	})
	document.getElementById("displaybar").innerText = displayText;
}

const clearDisplay = ()=> {
	calculatorStack = [];
	updateDisplay();
}
const clearAll = ()=>{
	clearDisplay()
	valueStack = [];
	operatorStack = [];
	currNum="";
}

const evalStack =  ()=>{
	flushNumBuffer();
	let goodEval = true
	while(operatorStack.length > 0 && goodEval){
		goodEval = evalOne()
		if(!goodEval){
			clearAll();
		}
	}

	clearDisplay();
	calculatorStack = valueStack;
	updateDisplay();
	evalDone=true;
}




